---
layout: page
title: ML for matching networks
description: Investigation of the abilities and limitations of machine learning techniques to the application of real-time, tunable matching networks.
img: assets/img/smith.png
importance: 2
category:  work
---
Tunable matching networks are important devices in RF engineering that allow for devices such as amplifiers to continuously be matched 
under varying operating conditions. These are especially important in transceiver systems where the antenna impedance may vary. However, previous
methods of tuning matching networks over time required prerequisite knowledge of the system or the load trajectory.

We have investigated and demonstrated that it is possible to apply optimization techniques to tunable matching networks to minimize reflections seen in the system 
in *real time* and under *dynamic* loading conditions. Specifically, the use of data-driven projected gradient descent methods were applied by taking periodic functional evaluations of the reflection behavior and estimating the gradient. This work was published in "Zeroth-Order Optimization for Varactor-Tuned Matching Network" and presented at the International Microwave Symposium in June of 2022.

Further work is currently being explored on additional machine learning methods to demonstrate the potential ability and limitations of multiple techniques.



<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-5 mt-md-0">
        {% include figure.html path="assets/img/TMN.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/possible_loads.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
<<<<<<< HEAD
    Image of the matching network seen on the left. Load characterization of the matching network is shown on the right. Green loads could have a match better than -20dB, orange loads could match between -10 and -20dB, and red loads could not be matched better than -10dB.
=======
    This image can also have a caption. It's like magic.
>>>>>>> parent of 1858503 (update p2/3)
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, *bled* for your project, and then... you reveal its glory in the next row of images.

<<<<<<< HEAD
=======

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
>>>>>>> parent of 1858503 (update p2/3)
<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-4 mt-md-0">
        {% include figure.html path="assets/img/constant_step.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-4 mt-md-0">
        {% include figure.html path="assets/img/adaptive_step.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<<<<<<< HEAD
<div class="caption">
    These plots represent the function space, where the x and y axes are the two capacitor values and the heat map is the amount of reflections, with blue being regions of minimization. A comparison of two different step size approaches in the gradient descent method are shown at load VSWR 6 angle 45 degrees. On the left is the constant step size approach, which is one set value throughout and is seen to jump around in the function plane. ON the right is the adaptive step size approach, which scales to the estimated gradient and is seen to more tightly follow the region of minimization. 
</div>
=======
```
{% endraw %}
>>>>>>> parent of 1858503 (update p2/3)
