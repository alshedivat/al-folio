---
layout: page
title: Reduced-Order Modeling study
description: to capture and analyze dynamically important features of airfoil flows
#img: assets/img/anime.gif
importance: 3
category: pipeline
---

<style>
  .top-one {
     margin-top: 0.5cm;
  }
</style>


<h3> Collaborators: <a href="https://www.bsc.es/research-development/research-areas/engineering-simulations/alya-high-performance-computational"> Gianmarco D'Alessandro </a> <sup> 1 </sup>

<h4 class="content"><span> Simulation codes: </span> <a href="https://www.bsc.es/research-development/research-areas/engineering-simulations/alya-high-performance-computational"> Alya </a> and <a href="https://nek5000.mcs.anl.gov/"> Nek5000 </a> </h4>
<h4 class="content"><span> Visualization tools: </span>  Matlab and Paraview </h4>

<p class="top-one"> <sup> 1 </sup> PhD Candidate, Mechanical Engineering, Queen's University, Kingston, Canada
<!-- <br>
<sup> 2 </sup> Group Leader, Large-scale turbulence simulation, Barcelona Supercomputing Center (BSC), Spain <br>
<sup> 3 </sup> Postdoctoral researcher, Large-scale turbulence simulation, Barcelona Supercomputing Center (BSC), Spain -->
</p>

<hr>

<p class="top-one"> </p>

<h5> <u>Aim</u> : To explore the effects of surface imperfections (which are much larger than local boundary layer thickness) on the developing boundary layer and trailing edge separation characteristics of NACA4412. We performed wall-resolved Large-eddy simulation (wrLES) at a chord-based Reynolds number of \(Re_c = U_o c/\nu=200,000\) and at three angle of attack values of \(\alpha = 5 , 10, 15^o\) </h5>

<hr>
<p class="top-one"> </p>

<h2 class="content"><span> Proper Orthogonal Decomposition (POD) </span> </h2>

<p class="top-one"> </p>

<div class="row justify-content-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/test_cyl.gif" title="example image" class="img-fluid rounded z-depth-1" caption="Contours of spanwise vorticity for flow over 2D cylinder at \(Re_D = 100\)."%}
    </div>
</div>

<p class="top-one"> </p>

<h2 class="content"><span> Dynamic Mode Decomposition (DMD) </span> </h2>

<p class="top-one"> </p>


<div class="row justify-content-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cylinder_dmd.png" title="example image" class="img-fluid rounded z-depth-1" caption="(left) Eigenvalues and (right) DMD modes for flow over 2D cylinder at \(Re_D = 100\); real and imaginary parts of the modes are indicated by \(\mathcal{R}\) and \(\mathcal{I}\), respectively."%}
    </div>
</div>




<!-- The code is simple.
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
{% endraw %} -->
