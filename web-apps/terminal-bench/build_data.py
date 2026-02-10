#!/usr/bin/env python3
"""Build data/data.json from traj_all/ and GitHub task metadata."""

import json
import glob
import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import HTTPError

TRAJ_DIR = Path(__file__).parent / "data" / "traj_all"
OUT_PATH = Path(__file__).parent / "data" / "data.json"
TASK_YAML_URL = "https://raw.githubusercontent.com/laude-institute/terminal-bench/main/original-tasks/{task}/task.yaml"

SCAFFOLDS = ["claude-code", "codex", "gemini-cli", "mini-swe-agent", "openhands", "terminus-2"]


def parse_yaml_simple(text: str) -> dict:
    """Minimal YAML parser for task.yaml files (flat keys + tags list + block scalars)."""
    result = {}
    lines = text.splitlines()
    i = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Skip empty lines and comments
        if not stripped or stripped.startswith("#"):
            i += 1
            continue

        # Must be a top-level key (no leading whitespace for keys)
        if ":" in stripped and not line[0].isspace():
            key, _, val = stripped.partition(":")
            key = key.strip()
            val = val.strip()

            if val in ("|-", "|", ">-", ">"):
                # Block scalar - collect indented lines
                i += 1
                block_lines = []
                while i < len(lines):
                    if lines[i].strip() == "":
                        block_lines.append("")
                        i += 1
                        continue
                    if lines[i][0].isspace():
                        # Determine indent of first content line
                        if not block_lines or all(bl == "" for bl in block_lines):
                            indent = len(lines[i]) - len(lines[i].lstrip())
                        block_lines.append(lines[i][indent:] if len(lines[i]) > indent else lines[i].strip())
                        i += 1
                    else:
                        break
                # Strip trailing empty lines for |- and >-
                while block_lines and block_lines[-1] == "":
                    block_lines.pop()
                result[key] = "\n".join(block_lines)
                continue

            elif val == "":
                # Could be a list - peek ahead
                i += 1
                items = []
                while i < len(lines) and lines[i].strip().startswith("- "):
                    items.append(lines[i].strip()[2:].strip())
                    i += 1
                if items:
                    result[key] = items
                else:
                    result[key] = ""
                continue

            else:
                # Simple key: value
                if val.startswith('"') and val.endswith('"'):
                    val = val[1:-1]
                elif val.startswith("'") and val.endswith("'"):
                    val = val[1:-1]
                result[key] = val

        i += 1

    return result


def fetch_task_yaml(task_name: str) -> dict | None:
    """Fetch and parse task.yaml from GitHub."""
    url = TASK_YAML_URL.format(task=task_name)
    try:
        req = Request(url, headers={"User-Agent": "terminal-bench-builder"})
        with urlopen(req, timeout=30) as resp:
            text = resp.read().decode("utf-8")
        return parse_yaml_simple(text)
    except HTTPError as e:
        print(f"  WARN: {task_name}: HTTP {e.code}", file=sys.stderr)
        return None
    except Exception as e:
        print(f"  WARN: {task_name}: {e}", file=sys.stderr)
        return None


def get_scaffold(agent_model: str) -> str:
    """Extract scaffold from agent_model string."""
    for s in SCAFFOLDS:
        if agent_model.startswith(s + "/"):
            return s
    return agent_model.split("/")[0]


def main():
    # 1. Discover tasks from traj_all/
    traj_files = sorted(glob.glob(str(TRAJ_DIR / "*.json")))
    traj_files = [f for f in traj_files if "_progress" not in os.path.basename(f)]
    task_names = [Path(f).stem for f in traj_files]
    print(f"Found {len(task_names)} tasks in traj_all/")

    # 2. Fetch task.yaml metadata in parallel
    print("Fetching task metadata from GitHub...")
    task_meta = {}
    with ThreadPoolExecutor(max_workers=20) as pool:
        futures = {pool.submit(fetch_task_yaml, name): name for name in task_names}
        for fut in as_completed(futures):
            name = futures[fut]
            result = fut.result()
            if result:
                task_meta[name] = result
            else:
                print(f"  Missing metadata for {name}, using defaults")
                task_meta[name] = {}

    print(f"Got metadata for {sum(1 for v in task_meta.values() if v)}/{len(task_names)} tasks")

    # 3. Scan trajectories
    print("Scanning trajectories...")
    all_agent_models = set()
    scores = {}  # task -> agent_model -> {pass, n}
    trials = {}  # task -> agent_model -> [trial summaries]

    for traj_file in traj_files:
        task_name = Path(traj_file).stem
        with open(traj_file) as f:
            data = json.load(f)

        task_scores = {}
        task_trials = {}

        for key, entry in data.items():
            am = entry.get("agent_model", "")
            if not am:
                continue
            all_agent_models.add(am)

            # Accumulate scores
            if am not in task_scores:
                task_scores[am] = {"pass": 0, "n": 0}
            task_scores[am]["n"] += 1
            if entry.get("reward"):
                task_scores[am]["pass"] += 1

            # Build trial summary (no steps)
            if am not in task_trials:
                task_trials[am] = []
            task_trials[am].append({
                "trial_id": entry.get("trial_id", key.split("/")[-1]),
                "reward": entry.get("reward", 0),
                "dur_s": entry.get("dur_s"),
                "in_tok": entry.get("in_tok"),
                "out_tok": entry.get("out_tok"),
                "cost_c": entry.get("cost_c"),
            })

        # Compute rates
        scores[task_name] = {}
        for am, sc in task_scores.items():
            scores[task_name][am] = {
                "rate": sc["pass"] / sc["n"] if sc["n"] > 0 else 0,
                "n": sc["n"],
                "pass": sc["pass"],
            }

        trials[task_name] = task_trials

    agent_models = sorted(all_agent_models)
    scaffolds = sorted(set(get_scaffold(am) for am in agent_models))
    print(f"Found {len(agent_models)} agent/model combos across {len(scaffolds)} scaffolds")

    # 4. Compute discriminability variance per task
    disc = {}
    for task_name in task_names:
        task_scores = scores.get(task_name, {})
        rates = [task_scores[am]["rate"] for am in agent_models if am in task_scores]
        if len(rates) >= 2:
            mean = sum(rates) / len(rates)
            var = sum((r - mean) ** 2 for r in rates) / len(rates)
            disc[task_name] = {"var": round(var, 6)}
        else:
            disc[task_name] = {"var": 0}

    # 5. Build tasks dict
    tasks = {}
    for name in task_names:
        meta = task_meta.get(name, {})
        instruction = meta.get("instruction", "")
        # Clean up multi-line instruction
        if instruction:
            lines = instruction.split("\n")
            # Remove leading/trailing empty lines
            while lines and not lines[0].strip():
                lines.pop(0)
            while lines and not lines[-1].strip():
                lines.pop()
            instruction = "\n".join(lines)

        difficulty = meta.get("difficulty", "medium")
        category = meta.get("category", "unknown")
        tags = meta.get("tags", [])
        if isinstance(tags, str):
            tags = [tags]

        # Parse numeric fields
        def parse_num(val, default=None):
            if val is None:
                return default
            try:
                return float(val)
            except (ValueError, TypeError):
                return default

        tasks[name] = {
            "name": name,
            "difficulty": difficulty,
            "category": category,
            "tags": tags,
            "instruction": instruction,
            "expert_time_min": int(parse_num(meta.get("expert_time_estimate_min"), 0)),
            "junior_time_min": int(parse_num(meta.get("junior_time_estimate_min"), 0)),
            "agent_timeout_sec": int(parse_num(meta.get("max_agent_timeout_sec"), 1800)),
        }

    # 6. Output
    output = {
        "scaffolds": scaffolds,
        "agent_models": agent_models,
        "tasks": tasks,
        "scores": scores,
        "disc": disc,
        "trials": trials,
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT_PATH, "w") as f:
        json.dump(output, f, separators=(",", ":"))

    size_mb = OUT_PATH.stat().st_size / 1024 / 1024
    total_trials = sum(
        len(ts) for task_trials in trials.values() for ts in task_trials.values()
    )
    print(f"\nWrote {OUT_PATH} ({size_mb:.1f} MB)")
    print(f"  {len(tasks)} tasks, {len(agent_models)} agent/models, {total_trials} trials")


if __name__ == "__main__":
    main()
