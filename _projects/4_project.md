---
layout: page
title: Vehicle Traffic Management and Analysis
description: Estimation of Traffic Congestion  and controlling of traffic lights for proper management of traffic.
img: assets/img/traffic_detect.png
importance: 3
category: academics
---

<a href="/assets/pdf/Vehicle_Traffic_Management_and_Analysis.pdf">Get Full Project Report here</a> <br>
<iframe title="vimeo-player" src="https://player.vimeo.com/video/757835792?h=8a0dd6f424" width="720" height="512" frameborder="0" allowfullscreen></iframe>

With increase in population density the use of vehicles for trasnport has increased drastically mainly in the Kathmandu Valley. This has gave arise to problem of traffic jams. People tend to spend their valuable time waiting in the queue of traffic. This indicated that proper traffic management is necessary. But in junctions traffic lights are operated with fixed timing that results in deadlocks and unnecessary delays.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/traffic_congestion.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Traffic Congestion
</div>

With this in mind our project focuses detecting the flow of traffic across those junctions,to estimate the traffic desnity and generating effective traffic light sequence for proper flow of traffic through junctions. For the collection of data camera were used to capture video of the specific junction at different interval of day. The data collected provided rough estimate of the traffic density at different time interval.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/traffic_analysis.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Taffic Congestion distribution
</div>

On basis of estimate of traffic congestion timing sequence was generated accordingly. In order to test the efficiency of the timing sequence generated, the simulation software PTV Vissim was used, a microscopic multimodal traffic flow simulation software.
We also developed a prototype traffic light controller for the demonstration. This prototype can show synchronization in traffic signals on the basis of live feed from the cameras. All the systems can be monitored and even manually controlled via an easy web based interface.

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.html path="assets/img/traffic_web.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/traffic_ckt.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <b>Left:</b> Real time web based interface of the traffic lights  <b>Right:</b> Traffic Signal Controller Prototype
</div>


