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
        {% include figure.html path="assets/img/gelsight.jpeg" title="sample GelSight image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sample RGB image outputs from Digit (Left), GelSight( Right)
</div>


