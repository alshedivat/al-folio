---
layout: page
title: STAR Design
description: Application of machine learning techniques to reduce self interference in full-duplex system
img: assets/img/overview-v4.png
importance: 1
category: work
---
This work is developing new ways to dynamically cancel interference in full-duplex systems. Specifically, a balanced amplifier architecture is 
being implemented, which can simultaneously transmit and receive signals at the same frequency (Gold-STAR). Full-duplex systems suffer from unacceptable levels 
of self-interference (SI), thus this project aims to reduce this by injecting a self-interference cancellation (SIC) signal at the second input of the architecture.
This SIC signal must be the same magnitude and opposite phase of the SI in the system to perfectly cancel the interference at the receiver port.

Previous work has shown that a SIC signal can be successfully injected with prerequisite knowledge of the system behavior, however there has been little work shown on how to 
operate this architecture and cancellation scheme when the load of the system is dynamically changing. We are working to demonstrate that a dynamic SIC signal can be used to cancel changing interference in the system by implementing machine learning and optimization techniques that update the SIC signal in real time.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/overview-v4.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Conceptual overview of optimization integrated in balanced amplifier STAR architecture.
</div>

Areas of Research and Development:
<ul>
<li> Further exploration into experimental balanced amplifier, full-duplex architecture's capabilities and limitations</li>
<li>Implementation of off-the-shelf components to verify the robustness of this architecture</li>
<li>Creation of real-time feedback system using NI USRP-N200 devices for signal generation and power measurement</li>
<li>Development of Python code in Linux operating system for system control</li>
<li>Analysis of gradient descent techniques in feedback loop including robustness under varying condtions</li>
<li>Exploration of dynamic loading trajectories and their impact on interference cancellation</li>
</ul>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, *bled* for your project, and then... you reveal its glory in the next row of images.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>


The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}
```html
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
```
{% endraw %}
