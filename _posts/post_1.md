---
layout: post
title: Validation of Partitioned FSI completed
date: 2023-05-25 16:11:00-0400
inline: false
related_posts: false
---

To validate the accuracy of the developed partitioned framework, we present our results for three challenging FSI benchmarks and compare them to both those re-sults presented in the literature and that produced by established software. The results presented here serve mainly to demonstrate the accuracy of the domain solvers themselves and, generally speaking, the robustness of the scheme to handle complex FSI problems with strong added-mass effects, high structural nonlinear-ity, and considerable mesh deformation. 

---

#### Benchmark Cases
<ul>
    <li> 2D Incompressible Flow over a Cantilevered Elastic Beam</li>
    <li> 3D Pressure Pulse Propogation through an Elastic Tube</li>
</ul>


In all cases each code was derived from a source [redbKIT monolithic FSI](https://github.com/JTGonzo/Monolithic_FSI) solver. These solvers were decomposed into their baseline elements and were then strategically reassembled and further built upon such that we finally ended up with a **partitioned** numerical framework. These partitoned solvers (given above) served as a robust testbed for my subsequent investigation of ["*coupling  instability in low mass-ratio partitioned FSI simulations*"](https://jtgonzo.github.io/). From this effort, algorithmic solutions to stabilize and accelerate the fixed point coupling procedure comensurate with the partitioned approach [were recommended](https://github.com/JTGonzo/Multi-Threaded_Partitioned_FSI).  

Features unique to the partitioned strategy that have been included in each of the solvers provided include:<br>
* Coupling Methods:
  - Anderson Acceleration
  - Generalized Broyden
  - Broyden's Second Method
  - Multi-Vector Least Square 
  - Dynamic Aitken Relaxation 
  - Constant Relaxation 
  - Pure Gauss-Seidel Iterations

* Filtering Strategies:
  - QR1 filtering
  - QR2 (Classic Gram-Schmidt) filtering
  - QR2 (Modified Gram-Schmidt) filtering
  - QR2 (Householder Reflections) filtering
  - POD filtering

* Interface Mapping Techniques:
  - Nearest Neighbour Interpolation
  - Projection and Linear Interpolation
  - Radial Basis Function Interpolation

* Extrapolation Methods:
  - Constant
  - Linear 
  - Quadratic
  - Cubic

* [Work in Progress Tools](https://github.com/JTGonzo/Multi-Threaded_Partitioned_FSI):
  - Interface tracking 
  - Adaptive Regularization Least Squares
  - Selective Secant Inclusion
  - Truncated SVD filtering
