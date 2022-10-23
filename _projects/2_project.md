---
layout: page
title: ML for matching networks
description: Investigation of the abilities and limitations of machine learning techniques to the application of real-time, tunable matching networks.
img: assets/img/smith.png
importance: 2
category: graduate research
---
Tunable matching networks are important devices in RF engineering that allow for devices such as amplifiers to continuously be matched 
under varying operating conditions. These are especially important in transceiver systems where the antenna impedance may vary. However, previous
methods of tuning matching networks over time required prerequisite knowledge of the system or the load trajectory.

We have investigated and demonstrated that it is possible to apply optimization techniques to tunable matching networks to minimize reflections seen in the system 
in *real time* and under *dynamic* loading conditions. Specifically, the use of data-driven projected gradient descent methods were applied by taking periodic functional evaluations of the reflection behavior and estimating the gradient. This work was published in "Zeroth-Order Optimization for Varactor-Tuned Matching Network" and presented at the International Microwave Symposium in June of 2022.

Further work is currently being explored on additional machine learning methods to demonstrate the potential ability and limitations of multiple techniques.











<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-5 mt-md-.25">
        {% include figure.html path="assets/img/TMN.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-5 mt-md-0">
        {% include figure.html path="assets/img/possible_loads.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The physical matching network is seen on left with varactors used as tunable elements. Load characterization of the matching network is shown on the right. Green loads could have a match better than -20dB, orange loads could match between -10 and -20dB, and red loads could not be matched better than -10dB.
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
    These plots represent the function space where the x and y axes are the capacitor values and the heat map is the value of the reflection. Blue regions are areas of minimized reflections. A comparison of two different types of stepsizes used in the gradient descent approach is shown for VSWR 6 angle 45 degrees. ON the left is the constant stepsize approach, which consists of setting it to one value. This method is shown to jump around a lot in the function space. On the right is the adaptive stepsize approach, which scales with the gradient. This method more closely follows the region of minimization. 
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/smith.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Mapping of reflection function behavior over varying loads.
</div>

Areas of Research and Development:
<ul>
<li> Characterization and mapping of reflection behavior over capacitor values at different loads and frequencies</li>
<li>Creation of real-time feedback system using MATLAB and GPIB protocols</li>
<li>Development of algorithms in MATLAB</li>
</ul>
