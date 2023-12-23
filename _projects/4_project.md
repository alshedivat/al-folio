---
layout: page
title: Swirling Kolmogorov Flow
description: modelling ocean turbulent mixing driven by near-inertial waves :-|
img: assets/img/project_4_profile.png
importance: 2
category: work
---

My current master thesis project on 'Swirling Kolmogorov flow' is motivated by two aspects, one by the application to oceanography 🌊, the other by the theoretical turbulence research 🤓.

### Oceanography
<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/N9OxNNeZ8EM?si=607VPJMgk7-_HYiE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</p>
<div class="caption">
    <b>Credit:</b> GFD-DENNOU club. https://www.gfd-dennou.org/index.html.en
</div>
It is well-known that the internal gravity wave in uniformly stratified fluids forms the 'St. Andrew's cross' pattern as shown in the video above. Inside each beam, shears are generated. However, when geophysical rotation is
taken into account, internal waves do not produce a two-dimensional shear flow, but a three-dimensional
flow where the direction of the velocity vector changes with depth. This effect is most prominent for
near-inertial waves where the dominant restoring force is due to the Coriolis effect (see the figure below for illustration).

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="./assets/img/k_flow_shear.jpg" title="k_flow_shear" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <b>Credit:</b> Sutherland BR. Internal waves in uniformly stratified fluid. In: <i>Internal Gravity Waves.</i> Cambridge: Cambridge University Press; 2010:141-212. doi:10.1017/CBO9780511780318.004
</div>


Breaking events of such flow are likely a major contributor to upper-ocean turbulent mixing. Its transportation  of passive scalars can be a key factor to ocean nutrient distribution.

### Turbulence
A big field of research in fluid mechanics is the [Homogeneous Isotropic Turbulence](https://en.wikipedia.org/wiki/Homogeneous_isotropic_turbulence) (HIT), proposed by G.I. Taylor himself. Later, the Soviet math lord Andrey Kolmogorov proposed another type of flow on a periodic domain (2D or 3D) driven by a sinusoidal external force in the large scale to study the linear stability in viscous shear flows, which was later named after him as the Kolmogorov flow. Unlike HIT, the Kolmogorov flow is imhomogeneous (mean shear is different everywhere) and anisotropic (direction of the mean flow changes everywhere), the difference between these two types of turbulence is still an open question.

The swirling🌀 Kolmogorov flow we proposed here is an example of the <b>homogeneous</b> (same shear, hence the energy dissipation, everywhere) yet <b> anisotropic </b> (changing direction) turbulence. Our flow is thus a third type of turbulence, which sits somewhere between the HIT and the regular Kolmogorov flow (hope we can know more about exactly where towards the end of the project :>). Tons of fun to study!

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="./assets/img/project_4_profile.png" title="k_flow" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    External forcing/mean flow profile of regular Kolmogorov flow (<b>left</b>) and swirling Kolmogorov flow (<b>right</b>). 
</div>
