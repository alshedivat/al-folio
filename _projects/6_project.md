---
layout: page
title: Unscented Kalman Filter for Pose Estimation 
description: 
img:  assets/img/UKF/preview.jpg
importance: 4
category: course
---
__Collaborators: \\__
In this project, we are going to implement an Unscented Kalman Filter (UKF) for estimating the trajectories of euler angles given by an inertial measurement unit (IMU). The ground truth of euler angle trajectories are measured by a motion capture system. And our goal is to give the best estimation of euler angles given the observations from the IMU that consists of gyroscopes and accelerometers. Note that the euler angles are not obtained directly from the IMU's interface.

Here is a quick introduction to UKF. Kalman Filter (KF) is a widely-used tool for state estimation in robotics. Typically, we can get robot's state by either
    - directly quirying current observation of robot's state
    - propagating estimated state at the last moment by one time step given the robot's action and dynamics 
A KF generates a "best" estimation by combining these two resource. However, the KF assumes linear dynamics. UFK further introduces [unscented transform](https://en.wikipedia.org/wiki/Unscented_transform) for updating the mean and variance in the propagating part deal with nonlinear dynamics. To do so, UKF
- Sample a few points from the Gaussian $$N(\mu_{k\mid k}, \sigma_{k\mid k})$$
- Transform each of the points using the nonlinear dynamics f 
- Compute their mean and covariance to get $$\mu_{k+1\mid k}$$ and $$\sigma_{k+1\mid k}$$ 


To apply UKF to euler angle estimation, we actually use UKF to estimate the robot's state composed of quaternion and angular velocity. And then we convert the quaternion back to euler angles. The detail implementation is decribed in the following PDF. 

<a href="{{ assets/pdf/hw2_p2_ukf_writeup.pdf | prepend: '/assets/pdf/hw2_p2_ukf_writeup.pdf' | relative_url }}" class="btn btn-sm z-depth-0" role="button">PDF</a>

The code can be found [HERE](https://github.com/TheZeyuanFeng/UKF).

Some preliminary results are present here.
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/UKF/Figure_1.png" title="example image" class="img-fluid rounded z-depth-1" width="600" %}
    </div>
</div>
The solid lines are euler angles from the motion capture system while the dashed lines are euler angles recovered from the IMU's data.