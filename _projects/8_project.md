---
layout: page
title: Counterfeit product detection
description: Using multiple areas of interest of given product the custom designed model was trained to classify the product as real or fake
img: /assets/img/counterfeit.jpg
importance: 1
category: work
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/counterfeit.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Real and Counterfeit product
</div>

Counterfeit products has been a major problem worldwide. Researchers have found that counterfeit trafficking currently makes up 5-7 per cent of the world’s trade and is rapidly inclining as well. People generate duplicate copies of popular brands like Louis Vuitton, Gucci, and Chanel. The goal of project was to predict whether the luxury bag was real or fake given its images. images of 10 Different area of interest(AOI) regions for a particular bag were collected such as logo, code, zipper, stitches, shoulder strap etc. These batch of images were passed into a model as a data for a particular bag and was trained to classify product as authentic or counterfeit.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/logo.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/code.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/zipper.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Different area of interest regions given as input to classify the bags. a) Logo, b) Code c)Zipper 
    <br>
    Note:Images of 10 different regions were used 
</div>

