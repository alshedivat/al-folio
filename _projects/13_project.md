---
layout: page
title: Generation of Real world images from Simulated images
description: As a part of course work of High Level Computer Vsion implemented image translation pipeline
img: assets/img/image_translation.png
importance: 2
category: academics
---


<a href="/assets/pdf/HLCV_Project.pdf">Get Presentation Slides of Project here</a> <br>
<a href="/assets/pdf/hlcv_project_final_report.pdf">Get Project Report here</a>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hlcv_pipeline.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pipeline of Image Translation
</div>

In Field of autonomous driving collection of dataset is expensive hence researchers tend to use simulated data for training and testing algorithms which naturally leads into distribution shift problem. The gaol of this project is to train an image translation pipeline that can generate real world image given the simulated image. We try different backbones such as Unet, ViT and Swin transformers for generator and use Patch discriminator. 