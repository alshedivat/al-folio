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
        {% include figure.html path="assets/img/possible_loads.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Load characterization of the matching network. Green loads could have a match better than -20dB, orange loads could match between -10 and -20dB, and red loads could not be matched better than -10dB.
</div>




<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-5 mt-md-0">
        {% include figure.html path="assets/img/TMN.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/constant_step.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>
