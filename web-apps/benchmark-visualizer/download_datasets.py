#!/usr/bin/env python3
"""Download benchmark datasets from HuggingFace and save samples."""

import json
from pathlib import Path
from datasets import load_dataset

OUTPUT_DIR = Path(__file__).parent / "data"
OUTPUT_DIR.mkdir(exist_ok=True)

DATASETS = {
    "gpqa_diamond": {
        "path": "Idavidrein/gpqa",
        "name": "gpqa_diamond",
        "split": "train",
        "n_samples": 10,
    },
    "arc_agi": {
        "path": "barc0/arc-agi_training-combined",
        "split": "train",
        "n_samples": 10,
    },
    "swe_bench": {
        "path": "princeton-nlp/SWE-bench_Verified",
        "split": "test",
        "n_samples": 10,
    },
    "mmmu": {
        "path": "MMMU/MMMU",
        "name": "Accounting",
        "split": "dev",
        "n_samples": 10,
    },
    "mmmlu": {
        "path": "openai/MMMLU",
        "name": "default",
        "split": "test",
        "n_samples": 10,
    },
    "eq_bench": {
        "path": "pbevan11/EQ-Bench",
        "split": "validation",
        "n_samples": 10,
    },
    "litbench": {
        "path": "SAA-Lab/litbench-test",
        "split": "train",
        "n_samples": 10,
    },
    "booksum": {
        "path": "kmfoda/booksum",
        "split": "test",
        "n_samples": 10,
    },
    "terminal_bench": {
        "path": "ia03/terminal-bench",
        "split": "test",
        "n_samples": 10,
    },
    "persuade": {
        "path": "ChristophSchuhmann/essays-with-instructions",
        "split": "train",
        "n_samples": 10,
    },
    "humaneval": {
        "path": "openai/openai_humaneval",
        "split": "test",
        "n_samples": 10,
    },
    "math": {
        "path": "lighteval/MATH",
        "name": "all",
        "split": "test",
        "n_samples": 10,
    },
    "gsm8k": {
        "path": "openai/gsm8k",
        "name": "main",
        "split": "test",
        "n_samples": 10,
    },
    "hellaswag": {
        "path": "Rowan/hellaswag",
        "split": "validation",
        "n_samples": 10,
    },
    "truthfulqa": {
        "path": "truthfulqa/truthful_qa",
        "name": "multiple_choice",
        "split": "validation",
        "n_samples": 10,
    },
    "winogrande": {
        "path": "allenai/winogrande",
        "name": "winogrande_xl",
        "split": "validation",
        "n_samples": 10,
    },
}


def serialize_example(example: dict) -> dict:
    """Convert dataset example to JSON-serializable format."""
    result = {}
    for key, value in example.items():
        if hasattr(value, "tolist"):  # numpy array
            result[key] = value.tolist()
        elif hasattr(value, "__dict__"):  # PIL Image or similar
            result[key] = f"<{type(value).__name__}>"
        elif isinstance(value, bytes):
            result[key] = "<bytes>"
        elif isinstance(value, (list, dict, str, int, float, bool, type(None))):
            result[key] = value
        else:
            result[key] = str(value)
    return result


def download_dataset(name: str, config: dict) -> list[dict]:
    """Download a dataset and return samples."""
    print(f"Downloading {name}...")
    try:
        if "name" in config:
            ds = load_dataset(
                config["path"],
                config["name"],
                split=config["split"],
                trust_remote_code=True,
            )
        else:
            ds = load_dataset(
                config["path"],
                split=config["split"],
                trust_remote_code=True,
            )

        n = min(config["n_samples"], len(ds))
        samples = [serialize_example(ds[i]) for i in range(n)]
        print(f"  -> Got {n} samples")
        return samples
    except Exception as e:
        print(f"  -> FAILED: {e}")
        return []


def main():
    all_data = {}

    for name, config in DATASETS.items():
        samples = download_dataset(name, config)
        if samples:
            all_data[name] = {
                "source": config["path"],
                "samples": samples,
            }

    # Save combined output
    output_path = OUTPUT_DIR / "all_datasets.json"
    with open(output_path, "w") as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)

    print(f"\nSaved {len(all_data)} datasets to {output_path}")


if __name__ == "__main__":
    main()
