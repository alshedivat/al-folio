---
layout: page
title: Impact of Whole-Slide Image Resolution on Foundation Model Performance
description: Evaluating the robustness of foundation models in computational pathology
img: assets/img/publication_preview/pathology.jpg
importance: 3
category: research
related_publications: rico2025impact
---

## 🔬 Foundation Models in Computational Pathology

**Challenge**: Foundation models in computational pathology are typically trained at a fixed magnification. How does their performance change when applied to whole-slide images at different resolutions?

**My Solution**: I systematically evaluated the robustness of the UNI foundation model across multiple magnifications using three breast histology datasets (BACH, BRACS, and BreakHis).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/publication_preview/pathology.jpg" title="Whole-Slide Image Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Analyzing whole-slide images at different magnifications to evaluate the robustness of foundation models.
</div>

### 🎯 **Key Findings**

- **Resolution Matters**: While UNI maintains performance across different resolutions, magnification shifts influence feature quality and classification outcomes.
- **Gated Attention Helps**: Gated attention and non-linear heads improve consistency, guiding the development of more adaptable digital pathology pipelines.

### 🔬 **Research Contributions**

- **Systematic Evaluation**: Conducted the first systematic evaluation of a foundation model's robustness to resolution changes in computational pathology.
- **Preprocessing Pipeline**: Implemented a preprocessing pipeline to generate and validate tiles across varying magnification levels.
- **Ablation Studies**: Performed extensive ablation studies to understand the impact of magnification levels, aggregation strategies, and model architectures.

### 🛠️ **Technology Stack**

**Core ML/AI**: PyTorch, OpenSlide, scikit-learn
**Infrastructure**: Docker, Slurm
**Monitoring**: Weights & Biases

### 🏆 **Recognition & Publications**

- **EPFL Course Project** - CS-433 Machine Learning
