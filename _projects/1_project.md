---
layout: page
title: Visual Localisation of Robot
description: Localisation of the mobile robot in case of changing environment by help of camera using concept of multiview geometry and computer vision.
img: assets/img/turtlebot.jpg
importance: 1
category: academics
pdf: POSTER_Major_Project.pdf
---
<iframe src="https://player.vimeo.com/video/757833955?h=f6b17b597f" width="640" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
<a href="/assets/pdf/Visual_Localization.pdf">Get Full Project Report here</a> <br>
<a href="/assets/pdf/Major_Project_pos.pdf">Get Project Poster here</a><br>
<a href="/assets/pdf/Major_Project_Slides.pdf">Get Presentation Slides of Project here</a>

Autonoumous navigation of robot has been a popular task in the field of robotics. In order to navigate the robot needs to first of all perceive the surroundings. How do we human perceive the environment?? We have five senses among which vision is most important one. Similar to human eye camera is used by the robots as a sensor to perceive enviornment through vision. For purpose of mapping the unknown environment and then localising yourself SLAM frameworks are used in robotics. Visual SLAM is type of SLAM which is based upon vision sensor such as monocular camera, stereo camera, kinects etc. 



<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/map.png " title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/localize.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/trajectory.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div>
    <div class="caption">
        <b>a)</b> Mapping of a room.<b>b)</b>Localization in the map<b>c)</b>Trajectory of the camera 
</div>
<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/sfm_paradigm.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Workflow of Structure from motion paradigm used in VSLAM
</div>

Structure from motion paradigm is used in this project generate the map of the environment and localise the camera in the map. It uses monocular camera only to for purpose of mapping and localisation. Dynamic enviornment, varying lighting condition and changing surrounding are major drawbacks for SLAM. We have tried to overcome the problem of dynamic environment as well. Moving objects such as people needs to be rejected while generating map and only static entities are to be considered. We have used segmentation technique to mask the dynamic objects while creating map.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/dynamic_env.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/turtlebot.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <b>Left:</b> Dynamic objects segmentation <b>Right:</b>Turtlebot
</div>

<h3> TEAM </h3>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/team_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>