#!/usr/bin/env python3
"""Build and push Terminal-Bench 2.0 dataset to HuggingFace Hub."""

import json
import glob
import os
import sys
from pathlib import Path

DATA_JSON = Path(__file__).parent / "data" / "data.json"
TRAJ_DIR = Path(__file__).parent / "data" / "traj_all"
HF_REPO = "yoonholee/terminalbench-trajectories"

SCAFFOLDS = ["claude-code", "codex", "gemini-cli", "mini-swe-agent", "openhands", "terminus-2"]


def get_scaffold(agent_model: str) -> str:
    for s in SCAFFOLDS:
        if agent_model.startswith(s + "/"):
            return s
    return agent_model.split("/")[0]


def get_model(agent_model: str) -> str:
    scaffold = get_scaffold(agent_model)
    return agent_model[len(scaffold) + 1:]


def generate_rows(task_meta: dict):
    """Generator that yields flattened rows from trajectory files."""
    traj_files = sorted(glob.glob(str(TRAJ_DIR / "*.json")))
    traj_files = [f for f in traj_files if "_progress" not in os.path.basename(f)]

    for traj_file in traj_files:
        task_name = Path(traj_file).stem
        meta = task_meta.get(task_name, {})

        with open(traj_file) as f:
            data = json.load(f)

        for key, entry in data.items():
            am = entry.get("agent_model", "")
            if not am:
                continue

            # Serialize steps as JSON string (complex nested structure)
            steps_raw = entry.get("steps", [])
            steps_json = json.dumps(steps_raw, ensure_ascii=False)

            yield {
                "task_name": task_name,
                "difficulty": meta.get("difficulty", "medium"),
                "category": meta.get("category", "unknown"),
                "tags": meta.get("tags", []),
                "instruction": meta.get("instruction", ""),
                "agent_model": am,
                "scaffold": get_scaffold(am),
                "model": get_model(am),
                "trial_id": entry.get("trial_id", key.split("/")[-1]),
                "reward": int(entry.get("reward", 0)),
                "dur_s": float(entry["dur_s"]) if entry.get("dur_s") is not None else None,
                "in_tok": int(entry["in_tok"]) if entry.get("in_tok") is not None else None,
                "out_tok": int(entry["out_tok"]) if entry.get("out_tok") is not None else None,
                "cost_c": float(entry["cost_c"]) if entry.get("cost_c") is not None else None,
                "steps": steps_json,
            }


def main():
    try:
        from datasets import Dataset, Features, Sequence, Value
    except ImportError:
        print("Error: pip install datasets huggingface_hub", file=sys.stderr)
        sys.exit(1)

    # Load task metadata
    if not DATA_JSON.exists():
        print(f"Error: {DATA_JSON} not found. Run build_data.py first.", file=sys.stderr)
        sys.exit(1)

    with open(DATA_JSON) as f:
        data = json.load(f)
    task_meta = data["tasks"]
    print(f"Loaded metadata for {len(task_meta)} tasks")

    # Define schema (steps serialized as JSON string for simplicity)
    features = Features({
        "task_name": Value("string"),
        "difficulty": Value("string"),
        "category": Value("string"),
        "tags": Sequence(Value("string")),
        "instruction": Value("string"),
        "agent_model": Value("string"),
        "scaffold": Value("string"),
        "model": Value("string"),
        "trial_id": Value("string"),
        "reward": Value("int32"),
        "dur_s": Value("float32"),
        "in_tok": Value("int64"),
        "out_tok": Value("int64"),
        "cost_c": Value("float32"),
        "steps": Value("large_string"),
    })

    # Build dataset from generator
    print("Building dataset from trajectories...")
    ds = Dataset.from_generator(
        lambda: generate_rows(task_meta),
        features=features,
    )
    print(f"Dataset: {len(ds)} rows")
    print(f"Columns: {ds.column_names}")
    print(f"Sample row task_name: {ds[0]['task_name']}, agent_model: {ds[0]['agent_model']}")

    # Push to hub
    print(f"\nPushing to {HF_REPO}...")
    ds.push_to_hub(HF_REPO, private=False)
    print("Done!")


if __name__ == "__main__":
    main()
