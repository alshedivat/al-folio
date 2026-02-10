#!/usr/bin/env python3
"""Convert unpacked AppWorld leaderboard experiments into JSON for the web visualizer.

Usage:
    python build_data.py \
        --leaderboard /tmp/appworld-leaderboard \
        --appworld-data /Users/yoonholee/repos/yoonholee.github.io/web-apps/terminal-bench/data \
        --out ./data

Outputs:
    data/data.json  - task metadata + per-model aggregate scores
    data/traj/<task_id>.json - per-task trajectory details (lazy-loaded)
"""

import argparse
import json
import os
import re
from pathlib import Path


def parse_environment_io(md_text: str) -> list[dict]:
    """Parse environment_io.md into a list of interaction steps."""
    MAX_OUTPUT = 3000  # truncate long outputs
    steps = []
    # Split on "### Environment Interaction N"
    parts = re.split(r"### Environment Interaction \d+\n-+\n", md_text)
    for part in parts:
        part = part.strip()
        if not part:
            continue
        # Each interaction has code blocks: first is the action, second is the output
        blocks = re.findall(r"```(?:\w+)?\n(.*?)```", part, re.DOTALL)
        if len(blocks) >= 2:
            output = blocks[1].strip()
            truncated = len(output) > MAX_OUTPUT
            if truncated:
                output = output[:MAX_OUTPUT] + f"\n... ({len(blocks[1].strip())} chars total, truncated)"
            steps.append({
                "action": blocks[0].strip(),
                "output": output,
            })
        elif len(blocks) == 1:
            steps.append({
                "action": blocks[0].strip(),
                "output": "",
            })
    return steps


def load_experiment(exp_dir: Path) -> dict:
    """Load metadata and evaluation results for an experiment."""
    meta_path = exp_dir / "metadata.json"
    if not meta_path.exists():
        return None
    with open(meta_path) as f:
        meta = json.load(f)

    # Load evaluation results
    eval_path = exp_dir / "evaluations"
    eval_data = {}
    for fp in eval_path.glob("*.json"):
        with open(fp) as f:
            eval_data = json.load(f)
        break  # only one json expected

    return {
        "metadata": meta,
        "evaluation": eval_data,
    }


def load_task_trajectory(task_dir: Path) -> dict | None:
    """Load a single task's trajectory from the experiment output."""
    io_path = task_dir / "logs" / "environment_io.md"
    eval_path = task_dir / "evaluation" / "report.md"

    if not io_path.exists():
        return None

    with open(io_path) as f:
        io_text = f.read()

    steps = parse_environment_io(io_text)

    eval_report = ""
    if eval_path.exists():
        with open(eval_path) as f:
            eval_report = f.read()

    # Count API calls
    api_path = task_dir / "logs" / "api_calls.jsonl"
    api_count = 0
    if api_path.exists():
        with open(api_path) as f:
            api_count = sum(1 for _ in f)

    return {
        "steps": steps,
        "eval_report": eval_report,
        "api_call_count": api_count,
        "num_interactions": len(steps),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--leaderboard", required=True, help="Path to cloned appworld-leaderboard repo")
    parser.add_argument("--appworld-data", required=True, help="Path to appworld data/ directory (has tasks/)")
    parser.add_argument("--out", default="./data", help="Output directory")
    args = parser.parse_args()

    lb_root = Path(args.leaderboard)
    aw_data = Path(args.appworld_data)
    out_dir = Path(args.out)
    traj_dir = out_dir / "traj"
    traj_dir.mkdir(parents=True, exist_ok=True)

    # 1. Load task specs from appworld data
    tasks_dir = aw_data / "tasks"
    datasets_dir = aw_data / "datasets"

    # Read test_normal task list
    task_ids = set()
    for split_file in ["test_normal.txt", "test_challenge.txt"]:
        fp = datasets_dir / split_file
        if fp.exists():
            with open(fp) as f:
                for line in f:
                    tid = line.strip()
                    if tid:
                        task_ids.add(tid)

    print(f"Found {len(task_ids)} task IDs across splits")

    # Load task specs
    tasks = {}
    for tid in sorted(task_ids):
        spec_path = tasks_dir / tid / "specs.json"
        if spec_path.exists():
            with open(spec_path) as f:
                spec = json.load(f)
            # Determine split
            split = "unknown"
            for split_name in ["test_normal", "test_challenge"]:
                fp = datasets_dir / f"{split_name}.txt"
                if fp.exists():
                    with open(fp) as sf:
                        if tid in sf.read():
                            split = split_name
                            break
            tasks[tid] = {
                "id": tid,
                "instruction": spec["instruction"],
                "supervisor": spec["supervisor"]["first_name"] + " " + spec["supervisor"]["last_name"],
                "datetime": spec.get("datetime", ""),
                "split": split,
            }

    print(f"Loaded specs for {len(tasks)} tasks")

    # 2. Discover and load all unpacked experiments
    outputs_dir = lb_root / "experiments" / "outputs"
    experiments = {}
    for exp_dir in sorted(outputs_dir.iterdir()):
        if not exp_dir.is_dir():
            continue
        if not (exp_dir / "metadata.json").exists():
            continue
        exp = load_experiment(exp_dir)
        if exp:
            experiments[exp_dir.name] = exp
            print(f"  Loaded experiment: {exp_dir.name} ({exp['metadata']['method']['name']} / {exp['metadata']['llm']['name']})")

    print(f"Loaded {len(experiments)} experiments")

    # 3. Build per-experiment model labels
    models = {}
    for exp_name, exp in experiments.items():
        m = exp["metadata"]
        label = f"{m['method']['name']} / {m['llm']['name']}"
        models[exp_name] = {
            "label": label,
            "method": m["method"]["name"],
            "method_tooltip": m["method"].get("tooltip", ""),
            "llm": m["llm"]["name"],
            "llm_tooltip": m["llm"].get("tooltip", ""),
            "dataset": m["dataset"],
            "url": m.get("url", ""),
        }

    # 4. Build per-task evaluation results
    task_results = {}  # task_id -> {exp_name: {success, num_tests, passes, failures}}
    for exp_name, exp in experiments.items():
        eval_data = exp["evaluation"]
        individual = eval_data.get("individual", {})
        for tid, result in individual.items():
            if tid not in task_results:
                task_results[tid] = {}
            task_results[tid][exp_name] = {
                "success": result["success"],
                "difficulty": result.get("difficulty", 0),
                "num_tests": result.get("num_tests", 0),
                "num_passed": len(result.get("passes", [])),
            }
            # Also update task difficulty from eval data
            if tid in tasks and "difficulty" not in tasks[tid]:
                tasks[tid]["difficulty"] = result.get("difficulty", 0)

    # Set difficulty for tasks from eval data
    for tid in tasks:
        if "difficulty" not in tasks[tid]:
            tasks[tid]["difficulty"] = 0

    # 5. Compute aggregate scores per model
    model_scores = {}  # exp_name -> {total, passed, rate}
    for exp_name in experiments:
        total = 0
        passed = 0
        for tid, results in task_results.items():
            if exp_name in results:
                total += 1
                if results[exp_name]["success"]:
                    passed += 1
        model_scores[exp_name] = {
            "total": total,
            "passed": passed,
            "rate": round(passed / total * 100, 1) if total > 0 else 0,
        }

    # 6. Build per-task trajectories (lazy-loaded files)
    traj_count = 0
    for tid in sorted(tasks.keys()):
        task_trajs = {}
        for exp_name in experiments:
            task_exp_dir = outputs_dir / exp_name / "tasks" / tid
            if not task_exp_dir.exists():
                continue
            traj = load_task_trajectory(task_exp_dir)
            if traj:
                result = task_results.get(tid, {}).get(exp_name, {})
                traj["success"] = result.get("success", False)
                traj["num_tests"] = result.get("num_tests", 0)
                traj["num_passed"] = result.get("num_passed", 0)
                traj["model_label"] = models[exp_name]["label"]
                traj["method"] = models[exp_name]["method"]
                traj["llm"] = models[exp_name]["llm"]
                task_trajs[exp_name] = traj
                traj_count += 1

        if task_trajs:
            with open(traj_dir / f"{tid}.json", "w") as f:
                json.dump(task_trajs, f, separators=(",", ":"))

    print(f"Wrote {traj_count} trajectories across {len(tasks)} tasks")

    # 7. Write main data.json
    # Group experiments by dataset split for cleaner UI
    exp_by_split = {"test_normal": [], "test_challenge": []}
    for exp_name, info in models.items():
        split = info["dataset"]
        if split in exp_by_split:
            exp_by_split[split].append(exp_name)

    data = {
        "tasks": tasks,
        "models": models,
        "model_scores": model_scores,
        "task_results": task_results,
        "experiments_by_split": exp_by_split,
    }

    with open(out_dir / "data.json", "w") as f:
        json.dump(data, f, separators=(",", ":"))

    print(f"Wrote data.json ({os.path.getsize(out_dir / 'data.json') / 1024:.0f} KB)")
    print("Done!")


if __name__ == "__main__":
    main()
