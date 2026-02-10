#!/usr/bin/env python3
"""Download benchmark datasets from HuggingFace and MCE artifact, save samples."""

import json
import os
import shutil
import subprocess
from pathlib import Path
from datasets import load_dataset

OUTPUT_DIR = Path(__file__).parent / "data"
OUTPUT_DIR.mkdir(exist_ok=True)

MCE_ARTIFACT_REPO = "https://github.com/metaevo-ai/mce-artifact.git"
MCE_ARTIFACT_TMP = "/tmp/mce-artifact"

MCE_DATASETS = {
    "mce_finer": {"dir": "finer", "source": "metaevo-ai/mce-artifact (FiNER)", "n_samples": 10},
    "mce_uspto": {"dir": "uspto", "source": "metaevo-ai/mce-artifact (USPTO-50k)", "n_samples": 10},
    "mce_symptom2disease": {"dir": "symptom_diagnosis", "source": "metaevo-ai/mce-artifact (Symptom2Disease)", "n_samples": 10},
    "mce_lawbench": {"dir": "crime_prediction", "source": "metaevo-ai/mce-artifact (LawBench)", "n_samples": 10},
    "mce_aegis": {"dir": "aegis2", "source": "metaevo-ai/mce-artifact (AEGIS 2.0)", "n_samples": 10},
}

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


def download_mce_datasets() -> dict:
    """Download MCE artifact datasets (JSONL from git repo)."""
    if not os.path.isdir(MCE_ARTIFACT_TMP):
        print(f"Cloning {MCE_ARTIFACT_REPO}...")
        subprocess.run(
            ["git", "clone", "--depth=1", MCE_ARTIFACT_REPO, MCE_ARTIFACT_TMP],
            check=True,
            capture_output=True,
        )

    results = {}
    for name, cfg in MCE_DATASETS.items():
        path = os.path.join(MCE_ARTIFACT_TMP, "env", cfg["dir"], "data", "test.jsonl")
        print(f"Loading {name} from {path}...")
        try:
            samples = []
            with open(path, encoding="utf-8") as f:
                for line in f:
                    samples.append(json.loads(line))
                    if len(samples) >= cfg["n_samples"]:
                        break
            results[name] = {"source": cfg["source"], "samples": samples}
            print(f"  -> Got {len(samples)} samples")
        except Exception as e:
            print(f"  -> FAILED: {e}")
    return results


def main():
    all_data = {}

    for name, config in DATASETS.items():
        samples = download_dataset(name, config)
        if samples:
            all_data[name] = {
                "source": config["path"],
                "samples": samples,
            }

    # Add MCE datasets
    all_data.update(download_mce_datasets())

    # Save combined output
    output_path = OUTPUT_DIR / "all_datasets.json"
    with open(output_path, "w") as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)

    print(f"\nSaved {len(all_data)} datasets to {output_path}")


if __name__ == "__main__":
    main()
