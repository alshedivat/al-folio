---
layout: page
title: Partitioned 2D & 3D FSI
description: Partitioned FSI numerical framework validtion
img: assets/img/Axial_disp.png
importance: 1
category: work
related_publications: false
---

***This page is currently a `WORK IN PROGRESS`. Here I will be presenting the stepwise results I collected while validating the accuracy of the partitioned fluid structure interaction solvers that I developed as part of my research on ["*coupling  instability in low mass-ratio partitioned FSI simulations*"](https://jtgonzo.github.io/)***

 In what is to come; I will show how I **successfully** reproduced the results from three challenging FSI benchmarks when comparing them to those results presented in the literature and that produced by established commercial software. These results served mainly to demonstrate the accuracy of the domain solvers themselves and, generally speaking, the robustness of the developed numerical framework to handle complex FSI problems with strong added-mass effects, high structural nonlinearity, and considerable mesh deformation. 

The benchmarks successfully reproduced included;
<ul>
    <li> 2D Incompressible Flow over a Cantilevered (Linear) Elastic Beam</li>
    <li> 2D Incompressible Flow over a Cantilevered (Nonlinear) Elastic Beam</li>
    <li> 3D Pressure Pulse Propogation through an Elastic Tube</li>
</ul>

---