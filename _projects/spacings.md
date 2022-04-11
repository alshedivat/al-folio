---
layout: page
title: spacings
description: Goodness-of-fit tests based on the spacings between ordered samples
img: assets/img/spacings.png
importance: 1
category: work
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/spacings.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Samples drawn from a uniform (left) and a non-uniform (right) distribution
</div>

The figure above shows two examples of a set of samples drawn from a uniform and a non-uniform distribution, respectively. The aim here is to construct a sensitive test to decide if samples are compatible with the hypothesis of a uniform distibution.

Some standard tests to assess this goodness-of-fit are, for example, the Kolmogorov-Simirnov, or the Anderson-Darling tests. In our work, we inverstigated test statistics based on the spacings between ordered samples, i.e. the distance between consecutive samples.
Under a uniform distribution, the expectation value for such a spacing is 1/n. If the samples are, however, drawn for example from a distribution featuring narrow "peaks", we expect much smaller spacings. Our new test statistic "Recursive Prodcut of Spacings" (RPS), can be very sensitive to such non-uniformities, and outperform other tests, as show in the figure below.

Such tests find applications in in many areas, ranging from the natural and social sciences over engineering to quality control.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/rps.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Performance comparison of RPS (ours) vs. a few widely used test statistics. The p-value distributions pile up much more towards 0 for ns > 0 in the case of RPS, while the one for ns = 0 remains flat.
</div>

## Further Information

Collaborators: Lolian Shtembari (MPP)

Preprint available [here](https://arxiv.org/abs/2111.02252)

PyPI project page: <https://pypi.org/project/spacings/>
