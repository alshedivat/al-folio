---
layout: page
title: Pascal VOC Augmentor
description: Python, Multiprocessing
img: assets/img/augmentor/thumbnail.png
importance: cv-95
category: Computer Vision
github: https://github.com/evanfebrianto/pascal_voc_augmentor
---

### General Info
This repository is heavily depending on [imgaug library](https://github.com/aleju/imgaug). This repository allows the user to augment images using Pascal VOC format and it will change the xml files accordingly.

### Output
Below is an example of the result from one input image.
<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/augmentor/output.jpg" title="Output" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Augmented images from one input image
</div>