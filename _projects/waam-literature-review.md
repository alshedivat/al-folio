---
layout: page
title: Wire Arc Additive Manufacturing Literature Review
description: A deep dive into residual stress mitigation and thermal cycling effects on WAAM'ed builds
img: assets/img/waam1.png
importance: 5
category: recent
giscus_comments: false
---

### The Scope:

Wire Arc Additive Manufacturing is an emerging additive manufacturing method involving stacking welds in sculpted layers, and then machining down the excess to produce high-strength components. This method provides similar characteristics to forging or milling, but is cheaper, faster, and less material-intensive. The largest markets for this method include naval, aerospace, mining, and the oil and gas industries. ESAB customers want to use this new method to create cheap components using already-existing ESAB products.

### The Problems:

1. Thermal cycling.
    WAAM'ed builds face issues with reheating the previous pass when new layers are stacked, changing the material properties and weakening components. Specifically, this reheating leads to changes in grain sizes and phase changes, both of which ultimately distort the build and create weaker designs.

2. Residual Stresses in the through-thickness direction.
    The layers of a WAAM component cool unevenly, which almost always lead to residual stress through the build. This again weakens the component and can lead to failure even under normal usage.

### My Findings

I found that heat treatment of all builds post-build signifigantly improves thermal cycling issues. This heat treatment allows for grain size refinement, and ensure that any unwanted phase changes are dealt with before machining. I was also able to show that the addition of scandium into aluminum WAAM builds allows for proper heat treatment, increasing the UTS of components by almost 30%. Not only that, but I was able to determine ranges for core material interpass temps, heat inputs, and cooling rates.

This document was used as important background knowledge as ESAB moves into the experimental phase for this new technology. My overall reccomendations involved specific testing guidelines and experimental analysis of the core materials when subjected to heat treatments and scandium addition.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/waam2.png" title="Aluminum WAAM vs. Al-Mg-Sc WAAM" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/waam1.png" title="Residual Stress FEA in a WAAM Build" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
