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




    





</div>
<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-5 mt-md-0">
        {% include figure.html path="assets/img/TMN.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-5 mt-md-0">
        {% include figure.html path="assets/img/possible_loads.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Matching network seen on left. Image of the matching network seen on the left. Load characterization of the matching network is shown on the right. Green loads could have a match better than -20dB, orange loads could match between -10 and -20dB, and red loads could not be matched better than -10dB.


</div>
<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-4 mt-md-0">
        {% include figure.html path="assets/img/constant_step.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-4 mt-md-0">
        {% include figure.html path="assets/img/adaptive_step.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Matching network seen on left. Image of the matching network seen on the left. Load characterization of the matching network is shown on the right. Green loads could have a match better than -20dB, orange loads could match between -10 and -20dB, and red loads could not be matched better than -10dB.
</div>
