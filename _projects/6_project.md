---
layout: page
title: Wearable Virtual Reality Controller
description: Integrated force and movement sensing with virtual reality demo
img: assets/img/force.jpg
importance: 4
category: work
---

Virtual reality (VR) technology has continued to garner interest as both an immersive form of entertainment and for different job training applications. This senior design capstone project focused on exploring further developments of VR controllers by creating a wearable device that could measure not only position of the hand, but also measure additional variables like acceleration and force applied in the arm. 

The critical categories of design for this project included: motion tracking, measuring applied force externally, tracking acceleration and rotation, incorporating the battery and microprocessor into a comfortable wearable device, and integration with a demonstration software. One of the new concepts and challenges in the design was to incorporate force sensing without invasive components. A MyoWare Muscle Sensor was incorporated into the design with some customization to the programming due to replacing the typical gel electrodes with conductive 3-D printed dry electrodes. 

Additional electronic components included coin motor for haptic feedback and an inertial measurement unit (IMU) for tracking rotation and acceleration. The device was made wireless, so an analysis of the heating of a rechargeable battery was considered to ensure wearability. These devices were controlled by an ESP32-S microprocessor.

For the software of the project, TensorFlow was used for general motion tracking of the hand. A virtual reality demo was created in Unity software, where custom codes were created in C. 

A demonstration of the system was provided with a wearable device that showcased the motion and force tracking capabilities of the device. A custom GUI was shown that demonstrated these variables in real time, along with a demonstration of the Unity software demo. This project fulfilled the year long senior design requirements for graduation.




<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/force.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/battery.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example of tracking force in forearm, with areas of sustained force and areas of opening and closing of hand shown on left. On right, the heat analysis of the battery.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/VU_prototype.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/flow_VU.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Prototype of the device shown on left. Flow diagram of the microprocessor and Unity demo shown on right.
</div>

Areas of Research and Development:
<ul>
<li> Development of sensor integration into device: MyoWare Muscle Sensor, coin motors, and inertial measurement unit (IMU)</li>
<li>Mechanical and heat analysis of components and robustness of device</li>
<li>Integration of microprocessor for feedback and control of system</li>
<li> Creation of demo in Unity software</li>
<li>USe of motion tracking in TensorFLow</li>
</ul>
