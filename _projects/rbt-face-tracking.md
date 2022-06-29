---
layout: page
title: Face Tracking on Drone
description: Python, Multiprocessing, OpenCV, PID
img: assets/img/face_tracking/thumbnail.png
importance: rbt-99
category: Robotics
github: 
---

### General Info
One of the applications of drone and computer vision technologies is Drone Face Tracking.   As the drone's "eye," a camera mounted to the drone provides visual information about its environment. The drone can follow a human face using deep learning to identify it and move accordingly.

This project makes use of the DJI Tello, which can be controlled programmatically using Python. The development of a drone control system that is reliable and won't crash is one of the more difficult aspects of this project.

The drone will stop when the detected person raising the hand is too close to the face.

### Output
*Note: Media can be played if your browser resolution is high enough.*

Below is the tracking result.
<div class="container">
    <div class="row align-items-center">
        <div class="col-sm-6 mt-3 mt-md-0" align="center">
            {% include figure.html path="./../../../assets/img/face_tracking/TPP.gif" title="TPP" class="img-fluid rounded z-depth-1" zoomable=true %}
        </div>
        <div class="col-sm-6 mt-3 mt-md-0" align="center">
            {% include figure.html path="./../../../assets/img/face_tracking/FPP.gif" title="FPP" class="img-fluid rounded z-depth-1" zoomable=true %}
        </div>
    </div>
</div>
<div class="caption">
    Third-person perspective (left), First-person perspective (right)
</div>

If you want to see full videos, please visit the following links.
* TPP: [https://youtu.be/eMi82eYjPUk](https://youtu.be/eMi82eYjPUk)
* FPP: [https://youtu.be/oqBhVM208XE](https://youtu.be/oqBhVM208XE)

For the stopping condition, it can only be seen from the youtube FPP video above. Once the drone detects the person raising the hand, it will stop the camera and enter the landing state.

<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/face_tracking/thumbnail.png" title="Output" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    When drone detects the person raising the hand.
</div>