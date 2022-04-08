---
layout: page
title: oscillations
description: Results on neutrino oscillation physics with IceCube data
img: assets/img/dragon.png
importance: 1
category: work
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/katrin.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sketch of the Karlsruhe Tritium Neutrino (KATRIN) experiment
</div>

The main goal of the Karlsruhe Tritium Neutrino (KATRIN) experiment is to measure the abolute neutrino mass scale. To do so, precise predictions of the measurement spectrum as a function of the anti-electron neutrino mass, and a multitude of parameters describing systematic uncertainties, are needed.
The calculations needed to make such predictions are computatiaonlly very costly, and hence prohibitive for using sophisticated statsitcal methods for the analysis of the neutrino mass.

By pre-calculating spectra over a range of intelligently chosen points in the parameter space, and then interpolating between with a deep neural network, we manage to predict spectra to very high accuracy at a fraction of the original cost.
This does not only allow to run the same analyses much faster, but actually puts us into a position to analyze all of KATRIN data, including a full suite of syatamatic uncertainties, in a combined fit. Also techniques such as fully fledged MCMC sampling become possible.

In our recent paper that is surrently under review at the European Physics Journal C (EPJ-C), we show that we can reproduce the official results of the first two KATRIN measurement compagins with great agreement, and at a fraction of the cost.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/katrin_spectrum.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/katrin_nn_aprx.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/katrin_nn_impact.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (left) The KATRIN measurement spectrum for a few choices of the electron neutrino rest mass (middle) NN approximation of the KATRIN spectrum (right) impact of the NN approximation compared to the statistical uncertainty of the fit.
</div>

## Further Information

Collaborators: Prof. Dr. Susanne Mertens (MPP/TUM), Christian Karl (MPP)

Preprint available [https://arxiv.org/abs/2201.04523](here).

The project is currently funded by the Munich Data Science Institute (MDSI): <https://www.mdsi.tum.de/en/mdsi/research/seed-funds-2021/netrium/>
