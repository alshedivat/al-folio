---
layout: page
title: Counter Platform
description: This project was created for the course MEEN 632 (Advanced Computer Aided Engineering) at Texas A&M University along with three other team-mates.
importance: 1
img: assets/img/p1_cover.png
category: Design
---
This project involves the design of a safe and ergonomically comfortable, raised working platform that provides users with better accessibility to the top cabinets in a kitchen.

<h2>Motivations:</h2> 
<div class="row">
    <div class="col-md mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_mot.png" title="motivating stock image" class="img-fluid rounded z-depth-1" style="float:left" %}
    </div>
    <div class="col-sm mt-3 mt-dm-0">
Many a times, people find it difficult to reach the top cabinets in a kitchen due to their height and find it to be limiting and even confidence inhibiting, to overcome this, a simple mechanism is required that can be used to extend your reach while also ensuring user safety when raised higher than ground. 
    </div>
</div>
<div class="caption">
   stock image, illustrating the project motivation.
</div>

---
<h2>Final Design:</h2>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_cover.png" title="Extended Platform" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_2.png" title="Default Configuration" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_3.png" title="Side View" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    An overview of the counter platform design with the extended configuration on the left, the default configuration in the center and a side view showing the platform raising on the right.
</div>

Key Features:
 - Easy to Assemble (DIY)
 - Wider Working are ( 24" - 48")
 - Compact, Lite and Easy to store
 - High User Safety
 - Durable and Reliable

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_4.png" title="Initial Sketches" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   Initial Sketches put together which were later developed into the final design.
</div>
---
<h2> Requirements and Mechanisms: </h2>

<h3>User Driven Requirements:</h3>
 - Withstand a maximum load of 260lbs (95th Percentile US Male).
 - Raise the height of the user by 6”.
 - Stowable in kitchen Toe-kick area (3.5” Height when stocked).
 - Weigh less than 50 lbs.
 - Provide adequate foothold and be expandable. (11” width, 24”-48” length).
 - Non-corrosive, fire resistant, adhering to appropriate standards.
 - Durable, robust and easy to maintain.(Life span of ~3 years and 10,000 cycles)

<h3>Course Driven Requirements:</h3>
 - Shall have at least 12 non-trivial parts.
 - Shall include welded parts. 
 - Shall contain a dynamic mechanism.

<h3>Key Mechanisms:</h3>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_5.png" title="Initial Sketches" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   Key mechanisms that drive funcitionality of the product.
</div>
---
<h2>Part Specifications:</h2>
 - 10 Custom Designed Parts.
 - Self similar parts made of Sheet Metal to optimize costs.
 - All parts have rounded corners.
 - Load bearing members have been stress tested through FEA/ Engineering analysis.

<div class="row">
    <div class="mx-auto">
        {% include figure.html path="assets/img/p1_6.png" title="Part specification list" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="caption">
A detailed part specification list with detailed information on material,quantity and whether the part is custom made or stock.
</div>

<div class="row">
    <div class="mx-auto">
        {% include figure.html path="assets/img/p1_7.png" title="Stress analysis of scissor member" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
An example von-mises stress contour of the most impacted part (the scissor members) is shown. 
</div>

---

<h2> Key Interfaces,Fits and Tolerances: </h2>
The runners and platform structures(bottom and top) are welded together, while most of the other parts are fastened.
Some of the most important interfaces where careful tolerance analysis was undertaken include:
 - Scissor member slots
 - Top structure and extension plates
 - Extension press-pins
 - Extension Rod and Runner
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_8.png" title="Tolerance at the scissor member slot" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_9.png" title="top Structure and Extension plate tolerance" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_10.png" title="Extension rod and runner tolerance" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The tolerances and fits measured in design are shown for various components.
</div>

---

<h2>Fabrication Plan:</h2>
The platform assembly consists of a number of parts, both fabricated and commercial off the shelf (COTS)
 - Multiple sheet metals parts – Made from the 20 gauge steel
 - Water or laser cutting – Rough cut outlines and interior features
 - Bending – Single or multiple bends
 - Brake Press – 630 KN Bending 
 - Finishing machining where necessary – Pin holes 

Many parts have multiple bending steps
All bends are 90 degrees and the equal radii

Plate steel or other fabrication processes:

 - Machined parts – CNC mills for cutting and drilling
 - Progressive die forging
 - Injection molding – Nylon bumpers 
 - Stock – Extruded pipe
 - Stock – Steel bar
 - COTS – Ball bearing slides, pins, fasteners.

---


<h2> Assembly Plan </h2>
- Multiple subassemblies are utilized to aid the flow of the assembly.
- Press Fit pins also utilize a sub-step before final assembly
Welds are completed at the subassembly level 
The preferred process is MIG welding with small wire size
Welds are commonly ⅛” fillet welds 

Subassemblies of top, bottom, and extension platforms allows for the final assembly to be completed in a single step.  
Clearance pins and mating members complete the final assembly
This step can be done by the customer

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_11.png" title="Top Assembly" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/p1_7.png" title="Scissor Assembly" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">

<div>

