"""
Scrape all trajectories from tbench.ai for terminal-bench 2.0.

Phase 1: Discover all agent/model targets from leaderboard
Phase 2: For each target, discover tasks + trials (sequential per target, parallel across targets)
Phase 3: Fetch individual trial trajectories (fully parallel)

Resumable via _progress.json. Raw per-trial JSONs cached in raw/.
Final output: one JSON per task in data/traj_all/{task}.json
"""

import json
import re
import time
import argparse
import concurrent.futures
from pathlib import Path
from threading import Lock
from urllib.parse import quote

import requests

BASE_URL = "https://www.tbench.ai"
LEADERBOARD_URL = f"{BASE_URL}/leaderboard/terminal-bench/2.0"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

MAX_RETRIES = 3
RETRY_BACKOFF = 5

# Agents confirmed to have trajectory data on tbench.ai (tested 2026-02-09)
AGENTS_WITH_TRAJS = {
    "claude-code", "codex", "gemini-cli", "mini-swe-agent", "openhands", "terminus-2",
}

_JSON_DECODER = json.JSONDecoder()
_print_lock = Lock()


def log(msg):
    with _print_lock:
        print(msg, flush=True)


def fetch(url: str) -> str:
    for attempt in range(MAX_RETRIES):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=60)
            resp.raise_for_status()
            return resp.text
        except requests.HTTPError as e:
            # 4xx/5xx are permanent failures, don't retry
            raise
        except (requests.RequestException, requests.Timeout) as e:
            if attempt == MAX_RETRIES - 1:
                raise
            wait = RETRY_BACKOFF * (attempt + 1)
            time.sleep(wait)


def decode_nextjs_payloads(html: str) -> str:
    combined = ""
    for s in re.findall(r"<script>(.*?)</script>", html, re.DOTALL):
        m = re.match(r"self\.__next_f\.push\((\[1,.*\])\)", s, re.DOTALL)
        if m:
            try:
                arr = json.loads(m.group(1))
                combined += arr[1] + "\n"
            except (json.JSONDecodeError, IndexError):
                pass
    return combined


def get_leaderboard_entries(html: str) -> list[dict]:
    payload = decode_nextjs_payloads(html)
    idx = payload.find('"agentName"')
    if idx < 0:
        return []
    start = payload.rfind("[{", max(0, idx - 50000), idx)
    if start < 0:
        return []
    try:
        result, _ = _JSON_DECODER.raw_decode(payload, start)
        if isinstance(result, list) and len(result) > 0 and "agentName" in result[0]:
            return result
    except json.JSONDecodeError:
        pass
    return []


def get_task_checksums(html: str) -> list[dict]:
    payload = decode_nextjs_payloads(html)
    marker = '"data":[{"taskName"'
    idx = payload.find(marker)
    if idx < 0:
        return []
    arr_start = idx + 7
    try:
        result, _ = _JSON_DECODER.raw_decode(payload, arr_start)
        if isinstance(result, list):
            return result
    except json.JSONDecodeError:
        pass
    return []


def get_trial_ids(html: str) -> list[dict]:
    payload = decode_nextjs_payloads(html)
    marker = '"data":[{"trialId"'
    idx = payload.find(marker)
    if idx >= 0:
        arr_start = idx + 7
    else:
        marker2 = '[{"trialId"'
        idx = payload.find(marker2)
        if idx < 0:
            return []
        arr_start = idx
    try:
        result, _ = _JSON_DECODER.raw_decode(payload, arr_start)
        if isinstance(result, list):
            return result
    except json.JSONDecodeError:
        pass
    return []


def extract_trajectory(html: str) -> dict | None:
    for s in re.findall(r"<script>(.*?)</script>", html, re.DOTALL):
        if "schema_version" not in s:
            continue
        m = re.match(r"self\.__next_f\.push\((\[1,.*\])\)", s, re.DOTALL)
        if not m:
            continue
        try:
            payload = json.loads(m.group(1))[1]
        except (json.JSONDecodeError, IndexError):
            continue
        traj_marker = '"trajectory":{"schema_version"'
        tidx = payload.find(traj_marker)
        if tidx < 0:
            continue
        obj_start = payload.find('{"schema_version"', tidx)
        try:
            traj, _ = _JSON_DECODER.raw_decode(payload, obj_start)
            return traj
        except json.JSONDecodeError:
            return None
    return None


def _extract_obs_text(obs) -> str:
    """Extract readable text from an ATIF observation field."""
    if not obs:
        return ""
    if isinstance(obs, str):
        return obs[:5000]
    if isinstance(obs, dict):
        results = obs.get("results", [])
        parts = []
        for r in results:
            content = r.get("content", "")
            if isinstance(content, str):
                parts.append(content)
            elif isinstance(content, list):
                for c in content:
                    if isinstance(c, dict):
                        parts.append(c.get("text", str(c)))
                    else:
                        parts.append(str(c))
        return "\n".join(parts)[:5000]
    return str(obs)[:5000]


def convert_atif_to_steps(traj: dict) -> list[dict]:
    """Convert ATIF-v1.6 trajectory to our step format.

    ATIF step structure:
      step_id, source, message (str), tool_calls (list), observation (dict/str)
    """
    steps = []
    for s in traj.get("steps", []):
        source = s.get("source", "agent")
        msg = s.get("message", "")
        if not isinstance(msg, str):
            msg = str(msg) if msg else ""

        # Convert tool_calls
        tools = []
        raw_calls = s.get("tool_calls") or []
        for tc in raw_calls:
            fn = tc.get("function_name", "")
            args = tc.get("arguments", {})
            # terminus-2 uses bash_command with keystrokes; claude-code uses Bash with command
            cmd = args.get("command", args.get("keystrokes", ""))
            if not cmd:
                cmd = args.get("file_path", args.get("path", args.get("query", "")))
            # Clean trailing newlines from keystrokes
            if isinstance(cmd, str):
                cmd = cmd.rstrip("\n")
            tools.append({"fn": fn, "cmd": cmd or ""})

        # Extract observation
        obs = _extract_obs_text(s.get("observation"))

        steps.append({
            "src": source,
            "msg": msg,
            "tools": tools if tools else None,
            "obs": obs or None,
        })

    return steps


def scrape_single_trial(trial_url: str, trial: dict, agent_model: str, task_name: str) -> dict | None:
    """Fetch and convert a single trial trajectory."""
    try:
        html = fetch(trial_url)
        if "No trajectory data available" in html:
            return None
        traj = extract_trajectory(html)
        if not traj:
            return None
        steps = convert_atif_to_steps(traj)
        return {
            "agent_model": agent_model,
            "trial_id": trial["trialId"],
            "reward": trial.get("reward"),
            "dur_s": trial.get("durationSec") or trial.get("duration_sec"),
            "in_tok": trial.get("inputTokens") or trial.get("input_tokens"),
            "out_tok": trial.get("outputTokens") or trial.get("output_tokens"),
            "cost_c": trial.get("costCents") or trial.get("cost_cents") or 0,
            "steps": steps,
        }
    except Exception as e:
        log(f"    ERROR {agent_model}/{task_name}/{trial['trialId'][:8]}: {e}")
        return None


def discover_target(target, cache_dir, done):
    """Discover all tasks and trials for one agent/model target.
    Returns list of (agent_model, task_name, trial_dict, trial_url) tuples."""
    agent_model, agent, version, model_at_provider = target
    model_encoded = quote(model_at_provider, safe="")
    model_url = f"{LEADERBOARD_URL}/{agent}/{version}/{model_encoded}"

    # Cache task list
    safe_name = agent_model.replace("/", "_")
    tasks_cache = cache_dir / f"tasks_{safe_name}.json"

    if tasks_cache.exists():
        tasks = json.loads(tasks_cache.read_text())
    else:
        try:
            html = fetch(model_url)
            tasks = get_task_checksums(html)
            tasks_cache.write_text(json.dumps(tasks))
        except Exception as e:
            log(f"  ERROR tasks for {agent_model}: {e}")
            return []

    if not tasks:
        log(f"  {agent_model}: 0 tasks")
        return []

    jobs = []
    for task in tasks:
        task_name = task["taskName"]
        task_checksum = task["taskChecksum"]

        # Cache trial list
        trials_cache = cache_dir / f"trials_{safe_name}_{task_name}.json"
        if trials_cache.exists():
            trials = json.loads(trials_cache.read_text())
        else:
            task_url = f"{model_url}/{task_checksum}"
            try:
                html = fetch(task_url)
                trials = get_trial_ids(html)
                trials_cache.write_text(json.dumps(trials))
            except Exception as e:
                log(f"  ERROR trials for {agent_model}/{task_name}: {e}")
                continue

        for trial in trials:
            trial_id = trial["trialId"]
            progress_key = f"{agent_model}/{task_name}/{trial_id}"
            if progress_key not in done:
                trial_url = f"{model_url}/{task_checksum}/{trial_id}"
                jobs.append((agent_model, task_name, trial, trial_url))

    log(f"  {agent_model}: {len(tasks)} tasks, {len(jobs)} new trials")
    return jobs


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-w", "--workers", type=int, default=8)
    parser.add_argument("--discover-workers", type=int, default=4)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--agents", nargs="+", help="Filter by agent name")
    args = parser.parse_args()

    base_dir = Path(__file__).parent / "data" / "traj_all"
    base_dir.mkdir(parents=True, exist_ok=True)
    raw_dir = base_dir / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    cache_dir = base_dir / "cache"
    cache_dir.mkdir(parents=True, exist_ok=True)

    progress_file = base_dir / "_progress.json"
    done = set()
    if progress_file.exists():
        done = set(json.loads(progress_file.read_text()))
        log(f"Resuming: {len(done)} trials already done")

    # Step 1: Get leaderboard
    log("Fetching leaderboard...")
    html = fetch(LEADERBOARD_URL)
    entries = get_leaderboard_entries(html)
    log(f"  {len(entries)} leaderboard entries")

    targets = []
    for e in entries:
        agent = e.get("agentName", "")
        version = e.get("agentVersion", "unknown")
        model_names = e.get("modelNames", [])
        model_providers = e.get("modelProviders", [])
        if args.agents and agent not in args.agents:
            continue
        if agent not in AGENTS_WITH_TRAJS:
            continue
        for i, mn in enumerate(model_names):
            provider = model_providers[i] if i < len(model_providers) else "unknown"
            agent_model = f"{agent}/{mn}"
            model_at_provider = f"{mn}@{provider}"
            targets.append((agent_model, agent, version, model_at_provider))

    log(f"  {len(targets)} targets")

    # Step 2: Discover tasks + trials (parallel across targets)
    log("\nDiscovering tasks and trials...")
    all_jobs = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.discover_workers) as pool:
        futures = {pool.submit(discover_target, t, cache_dir, done): t for t in targets}
        for future in concurrent.futures.as_completed(futures):
            try:
                jobs = future.result()
                all_jobs.extend(jobs)
            except Exception as e:
                log(f"  Discovery error: {e}")

    log(f"\nTotal trials to fetch: {len(all_jobs)}")
    if args.dry_run:
        return

    # Step 3: Fetch trajectories in parallel
    log(f"\nFetching trajectories ({args.workers} workers)...")
    fetched = 0
    errors = 0
    progress_lock = Lock()

    def fetch_and_save(job):
        nonlocal fetched, errors
        agent_model, task_name, trial, trial_url = job
        trial_id = trial["trialId"]

        entry = scrape_single_trial(trial_url, trial, agent_model, task_name)
        if entry:
            # Save raw
            task_raw = raw_dir / task_name
            task_raw.mkdir(parents=True, exist_ok=True)
            safe_am = agent_model.replace("/", "_")
            raw_file = task_raw / f"{safe_am}_{trial_id[:8]}.json"
            raw_file.write_text(json.dumps(entry))

            progress_key = f"{agent_model}/{task_name}/{trial_id}"
            with progress_lock:
                done.add(progress_key)
                fetched += 1
                if fetched % 50 == 0:
                    log(f"  Progress: {fetched} fetched, {errors} errors")
                    progress_file.write_text(json.dumps(sorted(done)))
            return True
        else:
            with progress_lock:
                errors += 1
            return False

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        list(pool.map(fetch_and_save, all_jobs))

    progress_file.write_text(json.dumps(sorted(done)))
    log(f"\nFetch complete: {fetched} fetched, {errors} errors")

    # Step 4: Assemble per-task files
    log("\nAssembling per-task files...")
    for task_dir in sorted(raw_dir.iterdir()):
        if not task_dir.is_dir():
            continue
        task_data = {}
        for f in sorted(task_dir.glob("*.json")):
            entry = json.loads(f.read_text())
            key = f"{entry['agent_model']}/{entry['trial_id']}"
            task_data[key] = entry
        out_file = base_dir / f"{task_dir.name}.json"
        out_file.write_text(json.dumps(task_data))
        log(f"  {task_dir.name}: {len(task_data)} trajectories")

    log(f"\nAll done! {fetched} new + {len(done)-fetched} cached")


if __name__ == "__main__":
    main()
