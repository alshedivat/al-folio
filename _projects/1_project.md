---
layout: page
title: Airfoil Leading-Edge Roughness Effects
description: The focus of the study was to explore the effects of surface imperfections (which are much larger than local boundary layer thickness) on the developing boundary layer and trailing edge separation characteristics of NACA4412. We carried out wall-resolved Large-eddy simulation (LES) at a chord-based Reynolds number of \(200,000 \) and at three angle of attack values of \(5, 10, 15^o\).
#img: assets/img/wave-mechanics.gif
importance: 1
category: work
---
<style>
  .top-one {
     margin-top: 0.5cm;
  }
</style>

<h3> Supervisor: Dr. <a href="https://me.queensu.ca/People/Piomelli/"> Ugo Piomelli</a> <sup> 1 </sup> </h3>

<h3> Collaborators: Dr. <a href="https://www.bsc.es/lehmkuhl-oriol"> Oriol Lehmkuhl </a> <sup> 2 </sup> and
Dr. <a href="https://www.bsc.es/miro-jane-arnau"> Arnau Miro </a> <sup> 3 </sup> </h3>

<p class="top-one"> </p>

<h4 class="content"><span> Financing entity: </span> Bombardier Aerospace and Mitacs </h4>
<h4 class="content"><span> Computational resource: </span>  SOSCIP and Compute Canada </h4>

<p class="top-one"> <sup> 1 </sup> Professor, Mechanical Engineering, Queen's University, Kingston, Canada <br>
<sup> 2 </sup> Group Leader, Large-scale turbulence simulation, Barcelona Supercomputing Center (BSC), Spain <br>
<sup> 3 </sup> Postdoctoral researcher, Large-scale turbulence simulation, Barcelona Supercomputing Center (BSC), Spain
</p>

<hr>

<p> Ice depositions can significantly affect aerodynamic performance, thereby increasing cost of operation and degrading airplane safety. The ice-shapes encountered in practice depend on physics governing ice-accretion and can affect the flow in quite different ways. We perform large-eddy simulations of  the flow over an airfoil to understand the effects of leading-edge roughness designed to mimic these ice accretions. The roughness elements protrude outside the boundary layer, which, near the leading edge, is very thin; thus, the configuration does not represent a classical rough-wall boundary layer, but rather the flow over macroscopic obstacles.  A grid convergence study is conducted and results are validated by comparison to numerical and experimental studies in the literature. </p>

<p>
<b><i> Figure a)</i></b>  For a smooth airfoil the boundary layer on the suction side, is initially laminar; the flow separates and reattaches, creating a thin, closed laminar separation. The flow then undergoes a transition process associated with undulations of the spanwise vortices formed in the separated shear-layer. The flow breaks down shortly after the formation of these secondary instabilities, re-attaches and finally develops into \(\Lambda\)-shaped vortices.
</p>

<p>
<b><i> Figure b)</i></b>  In the tripped case the flow is significantly different; spanwise vortices are formed in the shear layer emanating from the top of the first semi-cylindrical element, which are advected downstream. The flow remains coherent for the first 20-30% of the chord (region A), but then the 3D perturbations break the coherence of the spanwise vortices, and horseshoe vortices appear (region B). The flow becomes turbulent much earlier than in the smooth case due to the formation and breakdown of the rollers.&#160;
</p>

<p>
<b><i> Figures c and d)</i></b>  In the case with 3D obstacles we observe an early formation of 3D structures, which coalesce into hairpin-like vortices downstream of the roughness, in the region marked B; For the case with 2D obstacles, quasi-2D vortex-shedding from the obstacles is visible (for example, in region A in panel (d)); the shed vortices become elongated downstream due to the shear. The turbulent structures are significantly larger than in the other cases, reflecting the greater height of the imperfections.
</p>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/SLE-INS.png" title="Smooth surface" class="img-fluid rounded z-depth-1" caption="<b><i> a) </i></b>  Smooth NACA4412 surface" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/TBL-INS.png" title="2D roughness" class="img-fluid rounded z-depth-1" caption="<b><i> b) </i></b>  NACA4412 with 2D roughness" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/RLE1-INS.png" title="3D roughness" class="img-fluid rounded z-depth-1" caption="<b><i> c) </i></b>  NACA4412 with 3D roughness" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/RLE2-INS.png" title="mixed 2D/3D roughness" class="img-fluid rounded z-depth-1" caption="<b><i> d) </i></b>  NACA4412 with mixed 2D/3D roughness" %}
    </div>
</div>
<!-- <div class="caption">
<b><i> Figure a)</i></b>
</div> -->
