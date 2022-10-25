---
layout: page
title: STAR Design
description: Application of machine learning techniques to reduce self interference in full-duplex system
img: assets/img/overview-v4.png
importance: 1
category: graduate research
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

<div class="row">
    <div class="col-sm mt-2 mt-md-1">
        {% include figure.html path="assets/img/star_plot_new.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Simulated behavior of the architecture with the output power levels shown on the heat map and plotted over the interference cancellation multipliers (x and y).
</div>

Areas of Research and Development:
<ul>
<li> Further exploration into experimental balanced amplifier, full-duplex architecture's capabilities and limitations</li>
<li>Implementation of off-the-shelf components to verify the robustness of this architecture</li>
<li>Creation of real-time feedback system using NI USRP-N200 devices for signal generation and power measurement</li>
<li>Development of Python code in Linux operating system for system control</li>
<li>Analysis of optimization techniques in feedback loop including robustness under varying conditions</li>
<li>Exploration of dynamic loading trajectories and their impact on interference cancellation</li>
</ul>
