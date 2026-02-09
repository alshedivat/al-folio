#!/usr/bin/env python3
"""
Fetch random samples from instruction-following datasets using Hugging Face datasets library.
For prompt-only datasets, generate responses using multiple LLM APIs.

Usage:
    uv run --with datasets,openai,anthropic scrape.py

Environment variables:
    OPENAI_API_KEY - for GPT models
    ANTHROPIC_API_KEY - for Claude models
"""

import json
import os
import random
from pathlib import Path

from datasets import load_dataset

# Models to use for generating responses (varying capability)
MODELS = [
    {"id": "gpt-4o", "provider": "openai", "name": "GPT-4o"},
    {"id": "gpt-4o-mini", "provider": "openai", "name": "GPT-4o Mini"},
    {"id": "claude-sonnet-4-20250514", "provider": "anthropic", "name": "Claude Sonnet 4"},
    {"id": "claude-3-5-haiku-20241022", "provider": "anthropic", "name": "Claude 3.5 Haiku"},
    {"id": "gpt-3.5-turbo", "provider": "openai", "name": "GPT-3.5 Turbo"},
]

DATASETS = [
    {
        "id": "arena-hard",
        "name": "Arena-Hard",
        "description": "500 challenging prompts from Chatbot Arena (evaluation benchmark)",
        "hf_path": "lmarena-ai/arena-hard-auto-v0.1",
        "split": "train",
        "sample_count": 10,
        "needs_responses": True,
        "fields": {
            "prompt": "turns",
            "category": "category",
            "cluster": "cluster",
        },
    },
    {
        "id": "helpsteer2",
        "name": "HelpSteer2",
        "description": "NVIDIA's expert-annotated dataset with 5 quality dimensions",
        "hf_path": "nvidia/HelpSteer2",
        "split": "train",
        "sample_count": 10,
        "needs_responses": False,
        "fields": {
            "prompt": "prompt",
            "response": "response",
            "helpfulness": "helpfulness",
            "correctness": "correctness",
            "coherence": "coherence",
            "complexity": "complexity",
            "verbosity": "verbosity",
        },
    },
    {
        "id": "wildbench",
        "name": "WildBench",
        "description": "1,024 real user queries from WildChat covering 12 task categories",
        "hf_path": "allenai/WildBench",
        "config": "v2",
        "split": "test",
        "sample_count": 10,
        "needs_responses": True,
        "fields": {
            "prompt": "conversation_input",
            "category": "primary_tag",
            "checklist": "checklist",
            "id": "id",
        },
    },
    {
        "id": "ultrafeedback",
        "name": "UltraFeedback",
        "description": "Preference dataset with GPT-4 ratings across 4 dimensions",
        "hf_path": "argilla/ultrafeedback-binarized-preferences-cleaned",
        "split": "train",
        "sample_count": 10,
        "needs_responses": False,
        "fields": {
            "prompt": "prompt",
            "source": "source",
            "chosen": "chosen",
            "chosen_rating": "chosen-rating",
            "rejected": "rejected",
            "rejected_rating": "rejected-rating",
        },
    },
    {
        "id": "hh-rlhf",
        "name": "HH-RLHF",
        "description": "Anthropic's helpfulness and harmlessness preference dataset",
        "hf_path": "Anthropic/hh-rlhf",
        "split": "train",
        "sample_count": 10,
        "needs_responses": False,
        "fields": {
            "chosen": "chosen",
            "rejected": "rejected",
        },
    },
    {
        "id": "shp",
        "name": "SHP",
        "description": "Stanford Human Preferences from 18 subreddits",
        "hf_path": "stanfordnlp/SHP",
        "split": "train",
        "sample_count": 10,
        "needs_responses": False,
        "fields": {
            "prompt": "history",
            "chosen": "human_ref_A",
            "rejected": "human_ref_B",
            "score_chosen": "score_A",
            "score_rejected": "score_B",
            "subreddit": "domain",
        },
    },
    {
        "id": "pku-saferlhf",
        "name": "PKU-SafeRLHF",
        "description": "Dual helpfulness/harmlessness preferences with 19 harm categories",
        "hf_path": "PKU-Alignment/PKU-SafeRLHF",
        "split": "train",
        "sample_count": 10,
        "needs_responses": False,
        "fields": {
            "prompt": "prompt",
            "response_0": "response_0",
            "response_1": "response_1",
            "is_response_0_safe": "is_response_0_safe",
            "is_response_1_safe": "is_response_1_safe",
            "better_response_id": "better_response_id",
            "safer_response_id": "safer_response_id",
        },
    },
]


def generate_response_openai(prompt: str, model_id: str) -> str:
    """Generate response using OpenAI API."""
    from openai import OpenAI

    client = OpenAI()
    messages = [{"role": "user", "content": prompt}]

    response = client.chat.completions.create(
        model=model_id,
        messages=messages,
        max_tokens=1024,
        temperature=0.7,
    )
    return response.choices[0].message.content


def generate_response_anthropic(prompt: str, model_id: str) -> str:
    """Generate response using Anthropic API."""
    from anthropic import Anthropic

    client = Anthropic()

    response = client.messages.create(
        model=model_id,
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text


def generate_responses(prompt: str) -> dict[str, str]:
    """Generate responses from all configured models."""
    responses = {}

    for model in MODELS:
        model_name = model["name"]
        try:
            if model["provider"] == "openai":
                if not os.environ.get("OPENAI_API_KEY"):
                    responses[model_name] = "[OPENAI_API_KEY not set]"
                    continue
                responses[model_name] = generate_response_openai(prompt, model["id"])
            elif model["provider"] == "anthropic":
                if not os.environ.get("ANTHROPIC_API_KEY"):
                    responses[model_name] = "[ANTHROPIC_API_KEY not set]"
                    continue
                responses[model_name] = generate_response_anthropic(prompt, model["id"])
            print(f"    Generated response from {model_name}")
        except Exception as e:
            responses[model_name] = f"[Error: {e}]"
            print(f"    Error from {model_name}: {e}")

    return responses


def extract_prompt_text(sample: dict, ds_config: dict) -> str:
    """Extract the prompt text from a sample for response generation."""
    ds_id = ds_config["id"]

    if ds_id == "arena-hard":
        turns = sample.get("prompt", [])
        if turns and isinstance(turns, list) and len(turns) > 0:
            return turns[0].get("content", "")
        return ""

    if ds_id == "wildbench":
        conv = sample.get("prompt", [])
        if conv and isinstance(conv, list):
            # Get the last user message
            for msg in reversed(conv):
                if msg.get("role") == "user":
                    return msg.get("content", "")
        return ""

    return sample.get("prompt", "")


def fetch_samples(ds_config: dict) -> list[dict]:
    """Fetch random samples from a dataset using the datasets library."""
    hf_path = ds_config["hf_path"]
    split = ds_config["split"]
    n_samples = ds_config["sample_count"]
    config = ds_config.get("config")

    print(f"Loading {hf_path}...")

    try:
        if config:
            ds = load_dataset(hf_path, config, split=split, trust_remote_code=True)
        else:
            ds = load_dataset(hf_path, split=split, trust_remote_code=True)
    except Exception as e:
        print(f"  Error loading dataset: {e}")
        return []

    total_rows = len(ds)
    print(f"  Total rows: {total_rows}")

    # Sample random indices
    indices = random.sample(range(total_rows), min(n_samples, total_rows))

    # Extract samples
    samples = []
    fields = ds_config["fields"]
    for idx in indices:
        row = ds[idx]
        sample = {}
        for key, source_field in fields.items():
            if source_field in row:
                sample[key] = row[source_field]
        samples.append(sample)

    print(f"  Fetched {len(samples)} samples")

    # Generate responses if needed
    if ds_config.get("needs_responses"):
        print(f"  Generating model responses...")
        for i, sample in enumerate(samples):
            prompt_text = extract_prompt_text(sample, ds_config)
            if prompt_text:
                print(f"  Sample {i + 1}/{len(samples)}:")
                sample["model_responses"] = generate_responses(prompt_text)

    return samples


def main():
    output_path = Path(__file__).parent / "data.js"
    all_data = {"datasets": [], "samples": {}, "models": [m["name"] for m in MODELS]}

    for ds_config in DATASETS:
        ds_id = ds_config["id"]

        # Store metadata
        all_data["datasets"].append(
            {
                "id": ds_id,
                "name": ds_config["name"],
                "description": ds_config["description"],
                "hf_path": ds_config["hf_path"],
                "fields": list(ds_config["fields"].keys()),
                "has_model_responses": ds_config.get("needs_responses", False),
            }
        )

        # Fetch and process samples
        samples = fetch_samples(ds_config)
        all_data["samples"][ds_id] = samples

    # Write as JavaScript module
    js_content = f"// Auto-generated by scrape.py\nconst DATASET_DATA = {json.dumps(all_data, indent=2, ensure_ascii=False)};\n"
    output_path.write_text(js_content, encoding="utf-8")
    print(f"\nWrote {output_path}")

    # Summary
    print("\nSummary:")
    for ds in all_data["datasets"]:
        count = len(all_data["samples"][ds["id"]])
        print(f"  {ds['name']}: {count} samples")


if __name__ == "__main__":
    main()
