---
layout: page
title: Path Planning
description: C++, Unity, WebSocket
img: assets/img/path_planning/result.png
importance: sdc-93
category: Self-Driving Cars
github: https://github.com/evanfebrianto/Udacity-PathPlanning
---

### General Info
The goals / steps of this project are the following:
* Implement a path planning algorithm and finite state machine
* Use localization and sensor fusion data and waypoints to plan a safe path in traffic at 50mph
* Develop an understanding of Frenet coordinates and use them to perform maneuvers (e.g. lane switches)
* Use the simulator to test the path planning algorithm and finite state machine

### Approach
This project utilizes a Frenet coordinates, a finite state machine, and a spline object to plan the path of the autonomous car in the simulator.

* `main.cpp` - communicates with the simulator, contains the finite state machine and generates a path using localization and sensor fusion data
* `helpers.h` - contains useful functions for the path planning implementation
* `spline.h` - imported spline object to create smooth trajectories using points
* `json.hpp` - imported default JSON file format

#### Constraints during Design
* Drives over 5 miles without any incidents
* Stays below the speed limit of 50 mph
* Limits total acceleration and jerk below 10 m/s^2 and 10 ms^3 respectively
* No collisions with other traffic
* Stays in its lane unless lane changing (taking < 3s to change lanes)
* Changes lanes when traffic is slow and a nearby lane is free

#### Finite State Machine
<table class="table table-striped">
<thead class="thead-dark">
    <tr>
    <th scope="col">State 0</th>
    <th scope="col">State 1</th>
    <th scope="col">State 2</th>
    </tr>
</thead>
<tbody>
    <tr>
    <td>When there is no car ahead, the car will accelerate to its max speed</td>
    <td>Vehicle is following the car ahead without tailgating</td>
    <td>Prepare to switch lanes and checking for gaps in traffic</td>
    </tr>
</tbody>
</table>

* State 0 -> State 1: Car is spotted within 40 meters ahead of the car in the current lane
* State 1 -> State 2: Car in front is slow
* State 2 -> State 0: Successfully changed lanes

A lane change is performed when there are no cars within 30m to the left and/or right lane of the current car's lane. The speed of the adjacent lanes' traffic ahead determines the lane to change to if both have a sufficient gap in traffic. Additionally, a delay is implemented to prevent consecutive lane changes from occuring too quickly.

#### Path Generation
First, vectors `ptsx` and `ptsy` were created to store the to-be-generated path. 
They use the last two coordinates from the remaining path from the previous iteration. Then, the (x,y) coordinates are transformed into Frenet (s,d) coordinates for a simpler analysis.

A spline (from `spline.h`) is used to create a smooth path in Frenet coordinates using the transformed points. By interpolating the distance between initial and final points, an approximate velocity can be calculated (as successive points are executed at 50 Hz).

Finally, the points are converted back to cartesian coordinates to match the global map. 50 points in total are generated (after including the previous remaining path's residual points). This is then sent to the simulator through JSON files for the car to execute the positions based on the generated path.

### Output
An example of the path planning algorithm in action within the simulator is shown below:

Safely driving for more than 7.5 miles:

<div class="col-sm mt-3 mt-md-0" align="center">
    {% include figure.html path="./../../../assets/img/path_planning/result.png" title="twiddle" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
<div class="caption">
    Result
</div>

The complete video can be seen from the YouTube link below. Please take note that I speed up the video 2x.
* Result: [https://youtu.be/yzNIplAPO2w](https://youtu.be/yzNIplAPO2w)