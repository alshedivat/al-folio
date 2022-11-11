---
layout: page
title: roxie the robot
description: Competition robot for MIT's Design & Manufacturing class
img: assets/img/roxie_view1.jpeg
importance: 2
category: hardware
---

For 2.007 (Design and Manufacturing I), I designed and fabricated a fully functioning robot to complete in a class-wide tournament. During my semester, the competition adopted a Home Alone theme based on the movie, and it was held virtually over zoom. Build kits were shipped to all class participants, and we did all of our design and fabrication work from home.
We were tasked with building a robot that could navigate a gameboard board and accomplish a set of game tasks to earn points. 
    ---
    Skills learned:
    -Woodworking
    -Rapid prototyping
    -Rack/pinion sizing
    -Arduino
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/007_gameboard.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/tasks.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (Left) image of competition game board. (Right) a list of the game tasks that could earn points. Given that many of the tasks required that the robot extend its reach beyond the allowed size limit, my strategy was to design an extension mechanism that would allow my robot to reach and accomplish tasks using some multi-purpose end-effector. 
</div>

# Strategizing


The objective of our robots was to score points. In this year's competition, points could be scored by cutting the string, knocking over the white cylinders, riding down the string zip-line, and pulling the cowbell. The cowbell challenge (also referred to as the iron trap) gave a 2x points multiplier applied to the points total at the end of the round.


Several of the aforementioned tasks required vertical extension of the robot in order to push, pull, or grab onto something. For this reason, I decided to define the extension/retraction module of my robot as the most critical module. A subcomponent to allow my robot to extend/retract to different spaces would allow it to complete several tasks as well as the iron trap challenge.

# Solid modeling and prototyping

I created a simple CAD model to identify critical dimensions so that I could begin building as soon as possible. Given the short timeline and the fact that I needed to do all of the fab in my small room, I prioritized the prototyping over the CAD modeling. My fab strategy was to focus on simplicity to expedite the build and facilitate design iterations.

<p align="center">
<iframe width="610" height="415" src="https://www.youtube.com/embed/kS75_nBccdM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

# Final Design and Takeaways


The final design featured many additional supports including gussets on the sides and cross-bars up front to prevent the sides from deflecting away from each other. In addition to the supports, the rack-and-pinion plate integrated a hook, a blade, and an extrusion all to help Roxie accomplish as many tasks as possible after pulling the iron trap.

One of the key learnings was the importance of rigidity for robustness. The tournament was single-elimination, therefore consistency was key. The additional supports were crucial for maintaining a satisfactory level of consistency.


I stand by my prototype-first approach for this specific build given the uncertainty behind at-home fabrication, but I think that this project showed me the power of intentional design. I think that I could have reduced the number of prototypes I made and potentially identified problems earlier had I spent more time working through more of the details in CAD. My original design was barebones, and now I know that spending a few extra hours on CAD can save you days of work. 

​



<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/roxy_slide.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
