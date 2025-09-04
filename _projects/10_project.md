---
layout: page
title: Adversarial Attacks on Image-to-Image Generative Models
description: Investigating the robustness of generative models against adversarial attacks
img: assets/img/publication_preview/adversarial-diffusion.jpg
importance: 2
category: research
related_publications: rico2025adversarial
---

## 🛡️ Adversarial Robustness in Generative AI

**Challenge**: Are generative models, particularly those used for image-to-image translation, vulnerable to adversarial attacks? This project explores the robustness of diffusion-based models against query-free attacks.

**My Solution**: I developed and implemented a framework to test the vulnerability of image-to-image generative models. I conducted extensive experiments to evaluate the impact of adversarial perturbations on the quality of the generated images.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/publication_preview/adversarial-diffusion.jpg" title="Adversarial Attack on a Diffusion Model" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    An example of an adversarial attack on a diffusion model. The original image (left) is perturbed with a small amount of noise (center), resulting in a low-quality generated image (right).
</div>

### 🎯 **Key Findings**

- **Universal Vulnerability**: Diffusion models are highly susceptible to query-free adversarial attacks, regardless of the encoder architecture (VAE or CLIP).
- **Low Perturbation Budget**: A small perturbation budget is sufficient to significantly degrade the quality of the generated images.
- **Ineffective Defenses**: Neither improving data quality nor using robust image encoders provides significant protection against these attacks.

### 🔬 **Research Contributions**

- **Novel Attack Framework**: Designed and implemented a query-free adversarial attack framework for image-to-image generative models.
- **Extensive Evaluation**: Conducted a comprehensive evaluation of the attack's effectiveness on various models and datasets.
- **Identification of Vulnerabilities**: Uncovered fundamental vulnerabilities in diffusion-based generative models, paving the way for future research on defenses.

### 🛠️ **Technology Stack**

**Core ML/AI**: PyTorch, Diffusers, Transformers
**Infrastructure**: Docker, Slurm
**Monitoring**: Weights & Biases

### 🏆 **Recognition & Publications**

- **International Conference on Machine Learning (ICML 2025)** - Submitted paper
