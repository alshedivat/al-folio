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
        {% include figure.html path="assets/img/dragon.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    L/E Distribution of best-fit MC and data from one of our 3y DeepCore oscillation analyses.
</div>

Neutrinos are fundamental particles that oscillate their so-called flavor while traveling. This is a phenomenon rooted in quantum mechanics and is a consequence of the flavor eigenstates (the basis neutrinos interact in) and the mass eigenstates (Hamiltonian) not being aligned. The 3x3 matrix that defines the transformation is known as the PMNS mixing matrix, and is usually parameterized by 3 angles and one complex phase. 

Using atmospheric neutrinos observed in IceCube DeepCore, we can study the flavour transitions and measure the mixing. Based on the neutrino's energy E and arrival angle (proportional to the baseline L), we expect different oscillation amplitudes. The large figure above shows a measurement spectrum of neutrinos in DeepCore as a function of L/E together with our bestfit expectation.

Based on such data, we have made measurements of the mixing angle theta23 and the difference between the two mass eigenstates deltam32 and got results that are competitive with dedicated experiments, the left figure below shows our result based on 3 years of data.

Furthermore, by exploiting so-called matter effects (MSW) and the asymmetry between neutrinos and anti-neutrinos in the atmospheric flux, we can distinguish between the two neutrino mass orderings. We performed a first study of this, but the current data does not yet allow us to make any conclusive statement.

If we allow for one more degree of freedom in the mixing matrix by incorporating an additional parameter (scaling the tau neutrino component), we can make statements on the validity of the 3-flavour mixing paradigm. Our measurements indicate no deviations from expectations (see remaining two plots), but future measurements with higher precision will tell us more.

These measurements are all made using the [pisa](/projects/pisa) software.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/osc_contours.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/tau_neutrino_dists.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/tau_norm.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (left) 90% CL contours on the atmospheric oscillation parameters from our 3y analyses (solid lines) overlayed with constraints from other collaborations.
    (middle) Background subtracted distributions of the tau neutrinos.
    (right) Constraints on the tau neutrino normalization (1 = standard expectation, 0 = no tau neutrino appearance)
</div>


Right now we are actively working on the next-generation oscillation measurements in IceCube DeepCore with a much larger dataset and improved methods (see also [retro](/projects/retro)).

## Further Information

Recent Results:
* Standard oscillations: <https://arxiv.org/abs/1707.07081>
* Tau neutrino appearance: <https://arxiv.org/abs/1901.05366>
* Neutrino mass ordering: <https://arxiv.org/abs/1902.07771>