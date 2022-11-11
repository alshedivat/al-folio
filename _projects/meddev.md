---
layout: page
title: MIT Medical Device Design
description: Design of a quick-connect coupling for dialysis
img: assets/img/meddev_1.jpeg
importance: 1
category: hardware
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

Finally, we examined the flow dynamics of the connection by running fluid through at various orientations of the coupling. We generated a theoretical model of this flow, and we confirmed experimentally that no significant pressure drop occurred through the connection. In addition to testing fluid flow accross the connection, we tested the "complexity" of the connection by trying to use it with different levels of simulated physical impairment. To simulate physical impairment we attempted to close the connection without using our thumbs, only two fingers, and only using one hand. 


<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-5 mt-md-0">
        {% include figure.html path="assets/img/flow_test.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-5 mt-md-0">
        {% include figure.html path="assets/img/dexterity.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Slides showing our brief experimental tests of system performance.
</div>


Below is a brief demo video of the full system:

<p align="center">
    <iframe width="760" height="470" src="https://www.youtube.com/embed/FuueCeA5GVs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</p>
