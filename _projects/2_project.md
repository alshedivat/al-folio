---
layout: page
title: ML for matching networks
description: Investigation of the abilities and limitations of machine learning techniques to the application of real-time, tunable matching networks.
img: assets/img/smithchart_fxns_v1 (1).png
importance: 2
category:  graduate research
---
Tunable matching networks are important devices in RF engineering that allow for devices such as amplifiers to continuously be matched 
under varying operating conditions. These are especially important in transceiver systems where the antenna impedance may vary. However, previous
methods of tuning matching networks over time required prerequisite knowledge of the system or the load trajectory.

We have investigated and demonstrated that it is possible to apply optimization techniques to tunable matching networks to minimize reflections seen in the system 
in *real time* and under *dynamic* loading conditions. Specifically, the use of data-driven projected gradient descent methods were applied by taking periodic functional evaluations of the reflection behavior and estimating the gradient. This work was published in "Zeroth-Order Optimization for Varactor-Tuned Matching Network" and presented at the International Microwave Symposium in June of 2022.

Further work is currently being explored on additional machine learning methods to demonstrate the potential ability and limitations of multiple techniques.



Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
Make your photos 1/3, 2/3, or full width.

To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/TMN.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/possible_loads.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/constant_step.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
On the left, the matching network with varactor tuning. A characterization of possible good, acceptable, and bad matches for this specific matching network are shown in the middle. On the right, one example of trajectory of the algorithm for capacitor 1 and 2 tuning over a heat map of the reflection coefficient.

</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, *bled* for your project, and then... you reveal its glory in the next row of images.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>


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
```
{% endraw %}
