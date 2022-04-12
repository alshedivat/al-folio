---
layout: page
title: freedom
description: Likelihood-free reconstruction method for Cherenkov neutrino detectors
img: assets/img/freedom.png
importance: 1
category: work
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/freedom.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example likelihood contours for a toy neutrino event as a function of vertex position. Compared are the freedom NN approximations (solid lines) compared to the true lielihood (dashed lines).
</div>

While in the project [retro](/projects/retro) we built a reconstruction for IceCube DeepCore based on an event model together with pre-tabulated photon propagation values to build an approximate, fast likelihood.

In the project [graphnet](/projects/graphnet) in contrast, we are building a framework to use GNNs as regressors (and classifiers) for event reconstruction.

In this project, we explore a middle ground between the two. We use a technique of likelihood-free inference to build a NN surrogate likelihood, that can then be used in conjunction with optimizers or samplers for the inference of reconstruction quantities, such as an event's energy. 


## Further Information

Collaborators: Jan Weldert (JGU), Garrett Wendel (PSU), Dr. Aaron Fienberg (PSU), Prof. Dr. Doug Cowen (PSU)

Pepaer in preparation
