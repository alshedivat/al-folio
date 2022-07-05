---
layout: page
title: PID Controller
description: C++, Unity, WebSocket
img: assets/img/pid/pid_udacity.png
importance: sdc-94
category: Self-Driving Cars
github: https://github.com/evanfebrianto/PID-Controller
---

### General Info
In this approach, I manually tune Kp, Ki, and Kd. It was tough to obtain a sturdy figure owing to the different contours of the road, but I ultimately got excellent values that allow the car to travel a full loop without colliding.

### Output
#### Manual Tuning
I began by utilizing the P controller with Kp = 0.15 because I had used this value in my last project, which was behavioral cloning. Based on what I learned in class, I understand the distinction between P, PD, and PID controllers, as depicted in the graphic below.

Using the P controller, the automobile began to occilate. As a result, I inserted an arbitrary integer for Kd in order to create a PD controller. Kd = 2.0 is the value I chose. This constant is enough for handling an automobile traveling at a peak speed of 30 mph. It can manage a quick curve while still allowing the automobile to complete the course. However, because steering shift may occur in the actual world, a PID controller is a popular approach. Based on this, I chose an extremely tiny number for Ki, 5.0e-4. This arrangement produces a nice outcome, which I believe is adequate for passing the project.

#### Twiddle
Another method for determining the best settings is to twiddle. The course's pseudo code for twiddle and its Python implementation are shown below.

{% highlight python linenos %}

def twiddle(tol=1e-10): 
    p = [0, 0, 0]
    dp = [1, 1, 1]
    robot = make_robot()
    x_trajectory, y_trajectory, best_err = run(robot, p)
    while best_err > tol:
        for i in range(3):
            p[i] += dp[i]
            robot = make_robot()
            x_trajectory, y_trajectory, err = run(robot, p)
            if err < best_err:
                best_err = err
                dp[i] *= 1.1
            else:
                p[i] -= 2*dp[i]
                robot = make_robot()
                x_trajectory, y_trajectory, err = run(robot, p)
                if err < best_err:
                    best_err = err
                    dp[i] *= 1.1
                else:
                    p[i] += dp[i]
                    dp[i] *= 0.9
    return p, best_err

{% endhighlight %}

<div class="col-sm mt-3 mt-md-0" align="center">
    {% include figure.html path="./../../../assets/img/pid/twiddle.png" title="twiddle" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
<div class="caption">
    Twiddle Pseudo Code
</div>

The car is able to go explore full track without any collision. The result can be found on YouTube video [here](https://youtu.be/Ne8Qps8Jhdo).