---
layout: page
title: Particle Filter
description: C++, Unity, WebSocket
img: assets/img/particle_filter/20_particles.jpg
importance: sdc-95
category: Self-Driving Cars
github: https://github.com/evanfebrianto/ParticleFilter
---

### General Info
The robot has been abducted and taken to a new place! Fortunately, it contains a map of this area, a (noisy) GPS estimate of its original location, and a variety of (noisy) sensor and control data.

In this project, I need to write a C++ program to build a two-dimensional particle filter. The particle filter will be given a map and some preliminary localization data (analogous to what a GPS would provide). The filter will receive observation and control data at each time step.

Here is the main protocol that main.cpp uses for uWebSocketIO in communicating with the simulator.

**INPUT: values provided by the simulator to the c++ program**

* sense noisy position data from the simulator
  * ["sense_x"]
  * ["sense_y"]
  * ["sense_theta"]

* get the previous velocity and yaw rate to predict the particle's transitioned state
  * ["previous_velocity"]
  * ["previous_yawrate"]

* receive noisy observation data from the simulator, in a respective list of x/y values
  * ["sense_observations_x"]
  * ["sense_observations_y"]

**OUTPUT: values provided by the c++ program to the simulator**

* best particle values used for calculating the error evaluation
  * ["best_particle_x"]
  * ["best_particle_y"]
  * ["best_particle_theta"]

* Optional message data used for debugging particle's sensing and associations

  * for respective (x,y) sensed positions ID label
    * ["best_particle_associations"]

  * for respective (x,y) sensed positions
    * ["best_particle_sense_x"] <= list of sensed x positions
    * ["best_particle_sense_y"] <= list of sensed y positions

Your job is to build out the methods in particle_filter.cpp until the simulator output says:

```Success! Your particle filter passed!```

### Output
This algorithm performance depends on how many particles we used. The error tends to be less if we have more particles. However, it comes with a computational cost. Below are the result of my experiments.

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/particle_filter/3_particles.jpg" title="3_particles" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/particle_filter/5_particles.jpg" title="5_particles" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Result of 3 particles (left) and 5 particles (right)
</div>

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/particle_filter/20_particles.jpg" title="20_particles" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/particle_filter/10000_particles.jpg" title="10000_particles" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Result of 20 particles (left) and 10,000 particles (right)
</div>