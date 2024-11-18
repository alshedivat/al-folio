---
layout: page
title: Underwater Image Enhancement using Masked MSE Loss
description: Image Enhancement, Underwater Imaging,
 Transfer Learning, Masked Image Modelling, Convolutional
 Neural Networks.
img: assets/img/90_img_.png_out.png
importance: 1
category: work
related_publications: true
---

Capturing images in an underwater environment has been one of the most daunting tasks in the computer vision field as it poses quite unique challenges. Undistorted images are hard to acquire the deeper we go. Constraints such as light penetration and the underwater environment hinder the image quality captured. Deteriorated images impact hugely on feature extraction as well as object recognition. Images underwater gets degraded due to color cast, mainly blue and green color cast because blue color and green color possess longer wavelengths compared to others and can travel deeper resulting in selective attenuation with greenish and bluish hues, due to wavelength-dependent attenuation and scattering, due to haze because of suspended particles, and the marine snow
also affecting in the form of noise.

<!-- Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
Make your photos 1/3, 2/3, or full width. -->

<!-- To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    --- -->

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/25_img_.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/603_img_.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/8046.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The following images are feeded to the trained model : (i) On the left, image has minute bluriness and color deviation. (ii) Middle image has high green color deviation and low color contrast. (iii) On the right, image has a high blue color deviation. 
</div>


The goal of this task is for the model to assert its focus on the color chart added to the images taken in the underwater environment by introducing corresponding masked images. Masks, which indicate the position of the color chart, and the underwater images are both applied together to train the network. color chart serve as reference standards to estimate quality degradation under varying lighting
conditions. The loss function has been modified so that the algorithm acts accordingly. This served as a more robust and agile way possible to enhance the images.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/603_img_.png_out.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The trained model UMaskNet-MSE shows the result on the middle image shown above. It enhances almost every object without deviating from the original color.
</div>

This project is based on a pre-built model called Underwater image enhancement via medium transmission
guided multi-color space embedding (Ucolor) created by Li and Anwar {% cite li2021underwater %}.


<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/25_img_.png_out.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/8046.png_out.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    UMaskNet-MSE gives best result by managing to sharpening the contrast and not adding obvious over saturation. The images here are the output of left and right image showed above.
</div>

The aim is to enhance the underwater image by removing the color casts. Continuing the previous work performed {% cite li2021underwater %}, changes have been made to the loss function in such a way that it focuses mainly towards the color chart introduced into the images. To ensure this, corresponding masked images are introduced. To perform the masking procedure, binary mask are added. These binary masks are nothing but an array of binary values of grayscale images holding values. The values that masked image contains are either 0 or 1. Value 1 here corresponds that at that pixel position there is a presence of color chart. Masked images are loaded first in a similar fashion as other images are loaded. Every set of images are then converted into an array of float values. For the training procedure, image patches are selected after randomly cropping them into a shape of 128x128. Patches selected here from the input images, depth
images and the masked images are always picked from same x and y position. Once this is done, the image patches are finally sent to the loss function for evaluation. The loss function consists of combination of MSE loss (LMSE) and VGG loss (Lvgg). MSE loss here is mean squared error while VGG loss corresponds to the network’s loss.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/12348.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2677.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Some more input images feeded to the model.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/12348.png_out.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2677.png_out.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Output of the images shown above.
</div>

For more details regarding the project, you can refer to my dissertation paper: [UMaskNet-MSE](../../assets/pdf/UMaskNet_AnimeshDevendraChourey.pdf)


<!-- The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %} -->
