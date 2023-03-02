---
layout: page
title: Neural Style Transfer
description: Using learned representations to create art.
img: assets/img/CN.gif
importance: 1
category: work
---

This project is an implementation of the paper titled [A Neural Algorithm of Artistic Styles](https://arxiv.org/abs/1508.06576), by Leon A. Gatys, Alexander S. Ecker, and Matthias Bethge. Style transfer uses representations learned by a pre-trainined network to combine the style of one image with the content of another. 

Different layers of a deep neural network learn different features of the input image. For instance, the activation maps produced by early convolutional layers generally correspond to lower level features, while deeper layers learn high level <i>content</i> of the image.

In style transfer, we first pass an image with the desired style through the neural network. We can select the appropriate layers in a network and incorporate their activations into an objective function. We do the same for an image with the desired content, typically selecting a different set of layers (usually a single layer deep in the network is sufficient) to obtain the network's learned representation of the content. Again, this representation is incoroprated into some objective function.

We subsequently train an <i>input</i> image, rather than neural network weights, by enforcing that its content representation should be similar to that of the content image, and its style to that of the style image (we use a gram matrix for this - more details can be found in the paper). 

The final result is an image containing the desired content, but reconstructed in the style of the style image. See the project [here](https://github.com/ZakariaPZ/Style-Transfer).

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/abstractStyle.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0 ">
        {% include figure.html path="assets/img/HDTorontoImg.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    In style transfer, the style of the image on the left is transferred to the image on the right. 
</div>
<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-2">
        {% include figure.html path="assets/img/CN.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/dog_fusion.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The target image is iteratively imbued with the desired style through a standard backpropagation on the image itself.
</div>

<!-- 
The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}
```html
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
``` -->
{% endraw %}
