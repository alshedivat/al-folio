---
layout: page
title: Retro
description: A reverse table event reconstruction for IceCube
img: assets/img/retro.png
importance: 1
category: work
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/numucc_TeV_crop.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/NuMuCC_with_neutrino_2_shorter_cmap_range_crop.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/NuECC_with_neutrino_2_crop.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example event displays of a high energy (290 TeV) and two low energy (25 GeV) events in IceCube/DeepCore
</div>

The so-called reconstruction of events, meaning the estimation of a neutrino interaction's energy, place and time in the detector, or direction of the incoming neutrino, is key to almost all physics analyses.

For low energy events, important for example for oscillation physics or dark matter searches, events contain much sparser information, as illustrated in the example event displays above.
The challenge to reconstruct low energy events is the not only this sparsity of pulse-level information, but also the irregular detector geometry, the varying optical properties of the deep glacial South Pole ice, and the sheer amount of events that need to be reconstructed (computational cost).

With retro, the reverse table reconstruction, we were able to improve on several frontiers, making reconstructions more accurate and faster at the same time.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/retro.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Retro model predictions (solid lines) compared to a repeated re-simulation of an event (dashed lines)
</div>

## Further Information

Collaborators: Justin Lanfranchi (PSU), Prof. Dr. Doug Cowen (PSU)

Preprint available [here](https://arxiv.org/abs/2203.02303).
