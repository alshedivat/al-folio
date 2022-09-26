---
layout: page
title: Tactile Sensing
description: Implementation of tactile sensing tasks with DIGIT
img: assets/img/digit-logo-black.svg
importance: 1
category: Robotics
---

For the past couple of months, I have been researching tactile sensing and its application in robot dexterity and manipulation.   

    ---
    Tactile sensing is defined as the process of detecting and measuring a given property of a contact event. 
    ---
    
In case you are wondering what this means, here is a simple example. We use our sense of touch pretty much every minute in our lives. When you type on your keyboard, your fingers give you feedback on how hard are the keys and you use this information to subconsiously decide how hard to press on the keys.   
Or think of fastening your shoelaces, using knife to cut veggies, adjusting your grasp when lifting new unknown objects. Humans need tactile feedback to carry out seemingly simple tasks.   

Unfortunately, most robots do not have this sense of touch.Integrating tactile sensors such as DIGIT and GelSight into robot hands will allow the robot to mimic the human touch experience and let the robot perceive the object texture, hardness, and weight. Gelsight was the result of years of work by researchers at MCUBE lab of MIT, while DIGIT was developed by Facebook Research Engineers. 
I personally think that vision-based tactile sensors are becoming popular due to the successful application of deep learning in Computer Vision and increasing compute power. Basically, the output of vision-based tactile sensors are just images of a certain resolution. See below:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/0036.png" title="sample DIGIT image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/gelsight 2.jpeg" title="sample GelSight image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sample RGB image outputs from Digit (Left), GelSight( Right)
</div>
Here are the sample tactile information we can get from digit
<h2>
    Depth
</h2>
Estimating how much of a deformation happens on the gel when the object is pressed:
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/plot2.jpeg" title="depth heatmap" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/depth.gif" title="sample depth real-time" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sample depth construction heatmap(Left) an grayscale depth map with contact area detection video (Right)
</div>
<h2>
    Contact Area Estimation
</h2>
Using the depth information and applying thresholding techniques, PCA analysis, OpenCV ellipse fitting algorithms, we can estimate the orientation angle of the object being pressed on the sensor. This is especially useful when the robot needs to estimate the 2D pose of the object in grasp and use this feedback to manipulate the object pose.
<h2>
    Force direction tracking
</h2>
Adding black markers (dots) on top of the gel can help us track the direction of the forces, as well as their magnitude with some extra calibration.  

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/markers.gif" title="marker tracking" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   Markers on the gel surface provides information about the direction of different forces: normal, shear.
</div>

You can find detailed explanations and the code for all of tasks mentioned above at the following [repo](https://github.com/vocdex/digit-depth) I created.
