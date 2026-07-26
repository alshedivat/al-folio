---
layout: page
title: Trio Diffusion
description: My Experiment with Infinite Image Generation
img: assets/img/trio-diffusion/from_a_chatgpt_generated_image.png
importance: 4
published: false
category: Explorations
---

<div class='container' style='background-color: #f8f9fa; max-width: 100%;
   padding: 20px 20px 5px 20px; margin-bottom: 20px;'>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <p style="font-style: italic; text-align: center; font-size: 1.1em; margin-bottom: 15px;">
            "What if I could generate images that go on forever? – seemed like a fun problem to tackle."
        </p>
    </div>
</div>
</div>
<div class="row">
    <div class='container' style='max-width: 100%; margin: 20px auto;'>
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/trio-diffusion/from_a_chatgpt_generated_image.png" title="Sample infinite generation results" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
</div>
<div class="caption">
</div>

This project continues my [TailorGAN]({{ '/projects/tailorGAN/' | relative_url }}) work but with diffusion models, aiming to generate images of arbitrary size with no real boundaries through auto-regressive patch generation.

## The Basic Idea

Standard diffusion models generate fixed-size images. For larger outputs, you're limited to upscaling or tiling. My approach: generate images piece by piece, auto-regressively, where each new patch conditions on three neighboring patches in an L-shape configuration.

The model looks at a "trio" of patches (top-left, top-right, bottom-left) and generates the missing bottom-right patch, creating seamless spatial continuity.

**Trio Configuration:**
```
[Top-Left]  [Top-Right]
[Bottom-Left]   [To-Be-Generated]
```

## Loss Function Architecture

The model uses a **RobustCombinedLoss** with five key components:

1. **MSE Loss** (well-known) - Base diffusion reconstruction loss
2. **Perceptual Loss** (well-known) - VGG-based perceptual similarity 
3. **LPIPS Loss** (well-known) - Learned perceptual metric
4. **Edge Loss** (well-known) - Preserves high-frequency details
5. **Boundary Loss** - **added for spatial continuity**

## Boundary Loss Details

The Boundary Continuity Loss extracts edge regions from generated patches and compares them to expected boundaries from context patches using both pixel-level MSE and gradient-based MSE (via Sobel filters). This helps reduce visible seams at patch boundaries, though it's just one piece of the auto-regressive generation puzzle.


## Early Results

<div class="row">
    <div class='container' style='max-width: 100%; margin: 20px auto;'>
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/trio-diffusion/000000578922.png" title="Sample infinite generation results" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
</div>
<div class="caption">
    Example of auto-regressive infinite image generation - showing the patch-based approach in action
</div>


<div class="row">
    <div class='container' style='max-width: 100%; margin: 20px auto;'>
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/trio-diffusion/000000578922_3.png" title="Sample infinite generation results" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
</div>
<div class="caption">
    Another example run from the same initial margin patches to generate a larger image
</div>

<div class="row">
    <div class='container' style='max-width: 100%; margin: 20px auto;'>
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/trio-diffusion/000000540502.png" title="Sample infinite generation results" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
</div>
<div class="caption">
    Another example run from the different margin patches.
</div>

<div class="row">
    <div class='container' style='max-width: 100%; margin: 20px auto;'>
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/trio-diffusion/000000581781.png" title="Sample infinite generation results" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
</div>
<div class="caption">
    Yet, another example run from the different margin patches.
</div>


<div class="row">
    <div class='container' style='max-width: 100%; margin: 20px auto;'>
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/trio-diffusion/from_a_chatgpt_generated_image.png" title="Sample infinite generation results" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
</div>
<div class="caption">
    Example of extending a ChatGPT-generated image.
</div>

<div class="row">
    <div class='container' style='max-width: 100%; margin: 20px auto;'>
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/trio-diffusion/from_a_chatgpt_generated_image2.png" title="Sample infinite generation results" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
</div>
<div class="caption">
    Second example of extending a ChatGPT-generated image.
</div>

The current model shows promise with improved local continuity compared to naive tiling. The boundary loss effectively reduces visible seams, though generating complex and realistic objects with long-range coherence remains challenging and requires further experimentation.


**Generation Process:**
- Top and left patches of the initial image condition on real images
- All subsequent patches condition on previously generated content
- Auto-regressive generation enables theoretically infinite image extension


