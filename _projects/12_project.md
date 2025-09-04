---
layout: page
title: "Chatsplaining: EPFL best classmate"
description: An intelligent tutor for EPFL students
img: assets/img/publication_preview/chatsplaining.jpg
importance: 4
category: research
related_publications: rico2025chatsplaining
---

## 🎓 An Intelligent Tutor for EPFL Students

**Challenge**: Can we build an intelligent tutor that can help EPFL students with their coursework? This project explores the development of a chatbot that can answer questions about EPFL courses.

**My Solution**: I fine-tuned the Qwen-0.6B-Base language model on a mixture of datasets to create a chatbot that can answer multiple-choice questions in STEM domains.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/publication_preview/chatsplaining.jpg" title="Chatsplaining" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A chatbot that can help students with their coursework.
</div>

### 🎯 **Key Findings**

- **Curriculum Learning is Key**: A two-stage curriculum learning approach, composed of instruction-based SFT followed by successive SFTs on specific labeled MCQA data, is critical for reliable reasoning.
- **DPO for Alignment**: Direct Preference Optimization (DPO) can effectively align model outputs to human judgments.

### 🔬 **Research Contributions**

- **Intelligent Tutor**: Developed an intelligent tutor for EPFL students.
- **Fine-tuning Strategy**: Investigated and compared multiple training strategies for natural language understanding.
- **Model Alignment**: Demonstrated that DPO can effectively align model outputs to human judgments.

### 🛠️ **Technology Stack**

**Core ML/AI**: PyTorch, Transformers, LoRA, DPO
**Infrastructure**: Docker, Slurm
**Monitoring**: Weights & Biases

### 🏆 **Recognition & Publications**

- **EPFL Course Project** - CS-433 Modern Natural Language Processing
