---
layout: page
title: FSI Interface Tracking
description: An interface tracking algorithm for FSI time-step initialization
img: assets/img/fsi_interface.png
importance: 3
category: work
---

***This page is currently a `WORK IN PROGRESS`. Here I will be posting my research results for a novel interfcae tracking stratgey to enhance the convergence rate of moderately challenging FSI simulations. This scheme for the time-being is restricted to applications in which the interface of the multi-physical problem will adopt a state (maybe many states) of oscillatory motion (distributed or otherwise). This "trick" may prove itself incredibly useful as a simple means to significantly reduce the costs of high-fidelity mixing simulations (for example) where the deformable structure will adopt SOME type of predictable periodic coupled motion (a posteriori). In these types of problems where we are more interested in the unknown physics of the bigger fluid domain (mixing efficiency, heat transfer, reaction physics) that is perturbed by a dynamic structure; by making assumptions on the `class` of motion the structure will eventually abopt we can considerably reduce the number of fixed point iterations required for solution convergence. The effect of this, as such, is that studying bigger (/more complex) fluid domains that have a deformable structural component (maybe many) becomes more econmoical.***

---