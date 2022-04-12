---
layout: page
title: PISA
description: IceCube oscillation analysis suite
img: assets/img/pisa4.png
importance: 2
category: work
---

<img src="/assets/img/pisa4.png" width="250">


PISA is a software written to analyze the results (or expected results) of an experiment based on Monte Carlo simulation.

In particular, PISA was written by and for the IceCube Collaboration for analyses employing the [IceCube Neutrino Observatory](https://icecube.wisc.edu/), including the [DeepCore](https://arxiv.org/abs/1109.6096) and the proposed [PINGU](https://arxiv.org/abs/1401.2046) low-energy in-fill arrays.
However, any such experiment—or any experiment at all—can make use of PISA for analyzing expected and actual results.

PISA was originally developed to cope with low-statistics Monte Carlo (MC) for PINGU when iterating on multiple proposed geometries by using parameterizations of the MC and operate on histograms of the data rather than directly re-weighting the MC (as is traditionally done in high-energy Physics experiments).
However, PISA's methods apply equally well to high-MC situations, and PISA also performs traditional re-weighted MC analysis as well.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/pisa_osc.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example oscillograms obtained with PISA4
</div>


## Further Information

PISA is open source, and developed by and for the IceCube collaboration

GitHub repository: https://github.com/icecube/pisa

Paper published in NIM A available [here](https://arxiv.org/abs/1803.05390).
