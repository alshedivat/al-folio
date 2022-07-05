---
layout: page
title: Extended Kalman Filter
description: C++, Unity, WebSocket
img: assets/img/ekf/thumbnail.png
importance: sdc-96
category: Self-Driving Cars
github: https://github.com/evanfebrianto/Udacity-Extended-Kalman-Filter
---

### General Info
With noisy lidar and radar readings, you will use a kalman filter to estimate the state of a moving item of interest in this project. To pass the project, RMSE values must be less than the tolerance specified in the project rubric.

Here is the main protocol that main.cpp uses for uWebSocketIO in communicating with the simulator.

* INPUT: values provided by the simulator to the c++ program
    * ["sensor_measurement"] => the measurement that the simulator observed (either lidar or radar)

* OUTPUT: values provided by the c++ program to the simulator
    * ["estimate_x"] <= kalman filter estimated position x
    * ["estimate_y"] <= kalman filter estimated position y
    * ["rmse_x"]
    * ["rmse_y"]
    * ["rmse_vx"]
    * ["rmse_vy"]

### Output
The simulator displays noisy lidar and radar readings as blue and red dots. Green triangles reflect the computed location of the kalman filter.

The results of dataset 1 & 2 are depicted in the animation below.
<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/ekf/dataset1.jpg" title="Dataset 1" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/ekf/dataset2.jpg" title="Dataset 1" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Result of dataset 1 (left) and dataset 2 (right)
</div>