---
layout: page
title: Design of a quick-connect coupling for dialysis
description: Semester project for MIT's Medical Device Design class
img: assets/img/meddev_1.jpeg
importance: 1
category: work
---

For my senior capstone class, Design of Medical Devices, my team and I sought out to create an improved connection system for peritoneal dialysis. Peritoneal dialysis (PD) can be done at home and has the potential to be less expensive than its in-clinic counterpart Hemodialysis, but it is currently not available to many patients because current systems require great dexterity from the user and are costly. Our solution was to design an improved, low-cost connection system that could interface with existing systems to make PD accessible to more patients.

    ---
    Skills Learned:
    -SOLIDWORKS
    -Rapid prototyping
    -3D printing
    -Medical device design
    ---

# Conceptualizing

The short time-frame and the relatively large solution space for this problem meant we had to thoughtfully consider every step of the design process. We identified ease of sterility, water tightness, and complexity as the main functional requirements for our design, and these functional requirements would serve to guide our entire design process. 

From our established design requirements we proceeded to generate potential strategies and concepts to eventually formulate a most critical module for our system.


<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/frdprc.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-5 mt-md-">
        {% include figure.html path="assets/img/concept-prot.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (Left) Prof Slocum's FRDPARRC design framework. (Right) design iterations of connection coupling including a bench-level test using off-the-shelf components.
</div>

# Final Prototype

The final prototype of our system consisted of a quick-connect mechanism and a proposed assembly station for assisting the patient in forming the connection. The patient would simply place the two ends of the connection into the assembly station and pull a lever to complete the setup for PD. This system significantly reduces the number of caps and clamps the patient needs to handle, allowing for a simpler and safer way to do PD. The actual connection consisted of a spring loaded element closing off the fluid flow at each connection end. When the two ends are mated, the spring loaded elements compress against each other, allowing fluid to pass through the connection. The mating is secured by small clips at the side which prevent accidental disengagement of the connection.




<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/coupling.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    FInal prototype of the connection coupling consisting of a spring-loaded ball that enables flow wren engaged and a set of side clips to keep the two sides connected while coupling is in use.
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
