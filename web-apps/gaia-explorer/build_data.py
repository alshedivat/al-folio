#!/usr/bin/env python3
"""Convert smolagents/gaia-traces HuggingFace dataset into JSON for the web visualizer.

Cross-references with gaia-benchmark/GAIA to add level metadata.
The traces dataset contains 71 actual GAIA questions (GPT-4o only, validation split)
plus 436 other math/reasoning tasks (all 3 models).

Usage:
    python build_data.py --out ./data
"""

import argparse
import hashlib
import json
import os
import re
from collections import defaultdict
from pathlib import Path


MODEL_SHORT = {
    "gpt-4o": "GPT-4o",
    "Qwen/Qwen2.5-Coder-32B-Instruct": "Qwen2.5-Coder-32B",
    "meta-llama/Llama-4-Scout-17B-16E-Instruct": "Llama-4-Scout-17B",
}


def extract_gaia_question(first_user_msg: str) -> str | None:
    """Extract the actual GAIA question from the preamble wrapper.

    Returns None if the message doesn't have the GAIA preamble.
    """
    match = re.search(
        r"Here is the task:\n(.*?)(?:\n\nTo solve the task above|\Z)",
        first_user_msg,
        re.DOTALL,
    )
    if match:
        return match.group(1).strip()
    return None


def extract_question(first_user_msg: str) -> str:
    """Extract the question from the first user message."""
    # Try GAIA preamble first
    gaia_q = extract_gaia_question(first_user_msg)
    if gaia_q:
        return gaia_q
    # Remove "New task:\n" prefix for non-GAIA tasks
    if first_user_msg.startswith("New task:\n"):
        return first_user_msg[len("New task:\n"):].strip()
    # Fallback
    markers = ["Task:\n", "Task: "]
    for marker in markers:
        idx = first_user_msg.find(marker)
        if idx >= 0:
            return first_user_msg[idx + len(marker):].strip()
    return first_user_msg.strip()


def question_id(question: str) -> str:
    """Generate a stable short ID from question text."""
    return hashlib.md5(question.encode()).hexdigest()[:10]


def parse_assistant_message(content: str) -> dict:
    """Parse an assistant message into thought + code blocks."""
    result = {"thought": "", "code": ""}

    # Extract thought
    thought_match = re.search(r"Thought:\s*(.*?)(?=Code:|$)", content, re.DOTALL)
    if thought_match:
        result["thought"] = thought_match.group(1).strip()

    # Extract code
    code_match = re.search(r"```(?:py|python)?\n(.*?)```", content, re.DOTALL)
    if code_match:
        result["code"] = code_match.group(1).strip()
        # Remove <end_code> tag
        result["code"] = result["code"].replace("<end_code>", "").strip()
    elif not thought_match:
        # Fallback: just treat the whole thing as thought
        result["thought"] = content.strip()

    return result


def parse_observation(content: str) -> str:
    """Parse a user message that contains an observation."""
    # Strip the "Observation:\nExecution logs:\n" prefix
    content = content.strip()
    for prefix in ["Observation:\nExecution logs:\n", "Observation:\n"]:
        if content.startswith(prefix):
            content = content[len(prefix):]
            break
    # Strip "Last output from code snippet:\n"
    content = content.replace("Last output from code snippet:\n", "").strip()
    return content


MAX_CONTENT = 3000


def truncate(s: str) -> str:
    if len(s) > MAX_CONTENT:
        return s[:MAX_CONTENT] + f"\n... ({len(s)} chars total, truncated)"
    return s


def parse_trace(messages: list[dict]) -> list[dict]:
    """Parse a full conversation into structured steps."""
    steps = []
    i = 0
    while i < len(messages):
        msg = messages[i]

        if msg["role"] == "user" and i == 0:
            # First user message is the task
            i += 1
            continue

        if msg["role"] == "assistant":
            parsed = parse_assistant_message(msg["content"])
            step = {
                "thought": truncate(parsed["thought"]),
                "code": truncate(parsed["code"]),
                "observation": "",
            }
            # Check if next message is an observation
            if i + 1 < len(messages) and messages[i + 1]["role"] == "user":
                next_content = messages[i + 1]["content"]
                if next_content.startswith("Observation:") or next_content.startswith("Now proceed"):
                    step["observation"] = truncate(parse_observation(next_content))
                    i += 1  # skip the observation message
            steps.append(step)

        elif msg["role"] == "user" and i > 0:
            # A user message mid-conversation that isn't an observation
            content = msg["content"]
            if content.startswith("Observation:") or content.startswith("Now proceed"):
                # Standalone observation without preceding assistant
                pass  # skip, will be caught by assistant handler
            else:
                steps.append({
                    "thought": truncate(content),
                    "code": "",
                    "observation": "",
                })

        i += 1

    return steps


def extract_final_answer(messages: list[dict]) -> str:
    """Try to extract the final answer from the trace."""
    # Look for final_answer call in assistant messages (from end)
    for msg in reversed(messages):
        if msg["role"] == "assistant":
            match = re.search(r'final_answer\(["\']?(.*?)["\']?\)', msg["content"], re.DOTALL)
            if match:
                return match.group(1).strip()[:500]
        if msg["role"] == "user" and msg["content"].startswith("Observation:"):
            # The last observation often contains the final output
            obs = parse_observation(msg["content"])
            if obs and len(obs) < 500:
                return obs.strip()
    return ""


def build_gaia_lookup():
    """Load the original GAIA dataset and build a lookup by question text."""
    from datasets import load_dataset

    gaia = load_dataset("gaia-benchmark/GAIA", "2023_all")
    lookup = {}  # question_prefix -> metadata
    for split in ["validation", "test"]:
        for row in gaia[split]:
            q = row["Question"].strip()
            # Use first 80 chars as key for fuzzy matching
            lookup[q[:80]] = {
                "level": int(row["Level"]),
                "split": split,
                "task_id": row["task_id"],
                "final_answer": row["Final answer"],
            }
    print(f"GAIA lookup: {len(lookup)} questions ({sum(1 for v in lookup.values() if v['split'] == 'validation')} val, {sum(1 for v in lookup.values() if v['split'] == 'test')} test)")
    return lookup


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default="./data", help="Output directory")
    args = parser.parse_args()

    from datasets import load_dataset
    ds = load_dataset("smolagents/gaia-traces", split="train")

    out_dir = Path(args.out)
    traj_dir = out_dir / "traj"
    traj_dir.mkdir(parents=True, exist_ok=True)

    print(f"Loaded {len(ds)} traces")
    print(f"Models: {set(ds['model_id'])}")

    # Load GAIA metadata for cross-referencing
    gaia_lookup = build_gaia_lookup()

    # Group traces by question
    questions = {}  # qid -> {question, traces: {model_id: [row_indices]}, is_gaia, ...}
    for i, row in enumerate(ds):
        first_msg = row["messages"][0]["content"]
        q_text = extract_question(first_msg)
        qid = question_id(q_text)

        is_gaia = extract_gaia_question(first_msg) is not None

        if qid not in questions:
            questions[qid] = {
                "question": q_text[:500],
                "models": {},
                "is_gaia": is_gaia,
            }

        model = row["model_id"]
        if model not in questions[qid]["models"]:
            questions[qid]["models"][model] = []
        questions[qid]["models"][model].append(i)

    print(f"Unique questions: {len(questions)}")
    gaia_count = sum(1 for q in questions.values() if q["is_gaia"])
    other_count = len(questions) - gaia_count
    print(f"  GAIA questions: {gaia_count}, Other: {other_count}")

    # Build tasks and trajectories
    tasks = {}
    model_list = sorted(set(ds["model_id"]))

    matched = 0
    traj_count = 0
    for qid, qdata in questions.items():
        task = {
            "id": qid,
            "question": qdata["question"],
            "num_models": len(qdata["models"]),
            "models": list(qdata["models"].keys()),
            "source": "gaia" if qdata["is_gaia"] else "other",
        }

        # Cross-reference with GAIA dataset for level metadata
        q_key = qdata["question"][:80]
        if q_key in gaia_lookup:
            meta = gaia_lookup[q_key]
            task["level"] = meta["level"]
            task["split"] = meta["split"]
            task["gaia_id"] = meta["task_id"]
            task["ground_truth"] = meta["final_answer"]
            matched += 1

        tasks[qid] = task

        # Build trajectory file for this question
        task_trajs = {}
        for model_id, row_indices in qdata["models"].items():
            # Use the first trace for each model
            row_idx = row_indices[0]
            row = ds[row_idx]
            messages = row["messages"]

            steps = parse_trace(messages)
            final_answer = extract_final_answer(messages)

            model_short = MODEL_SHORT.get(model_id, model_id)
            task_trajs[model_id] = {
                "model": model_short,
                "model_id": model_id,
                "num_steps": len(steps),
                "num_messages": len(messages),
                "final_answer": final_answer,
                "steps": steps,
            }
            traj_count += 1

        with open(traj_dir / f"{qid}.json", "w") as f:
            json.dump(task_trajs, f, separators=(",", ":"))

    print(f"Matched {matched} questions to GAIA metadata (levels)")
    print(f"Wrote {traj_count} trajectories for {len(tasks)} questions")

    # Level distribution
    from collections import Counter
    levels = Counter(t.get("level") for t in tasks.values() if "level" in t)
    print(f"Level distribution: {dict(sorted(levels.items()))}")

    # Write main data.json
    data = {
        "tasks": tasks,
        "models": model_list,
        "model_short": MODEL_SHORT,
    }

    with open(out_dir / "data.json", "w") as f:
        json.dump(data, f, separators=(",", ":"))

    print(f"Wrote data.json ({os.path.getsize(out_dir / 'data.json') / 1024:.0f} KB)")
    print("Done!")


if __name__ == "__main__":
    main()
