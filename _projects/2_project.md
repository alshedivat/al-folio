---
layout: page
title: Quasi-Newton Reqularization and Filtering
description: Fixed point iterative stabilization via adaptive regularization and secant selection
img: assets/img/jacobian_approx.png
importance: 2
category: work
---

***This page is currently a `WORK IN PROGRESS`. Here I will be presenting the development of a novel `"Adaptive Regularization and Secant Selection"` strategy that dynamically maintains suitable conditioning of the least-squares optimization problem that underpins all quasi-newton partitioned strategies. In particular, we describe a procedure to assess the usefulness of the collected secant data pairs as well as the efficacy of a given update step. These measures determine what secant data to retain when approximating the interfcaial Jacobian and adaptively adjusts the weighting of a scaled regularization paramter to ensure productivity and residual orthogonality of the required fixed point iterations. This method has been found to be particularly effective in enhancing the convergence rate as well as iterative stability of partitioned FSI simulations involving very strong added-mass effects.***

---