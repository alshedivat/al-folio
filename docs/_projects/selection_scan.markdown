---
layout: page
title: genome-wide scans for variants under selection
description: applying machine learning and computer vision methods to images of genetic data
img: /assets/img/objectdetect_1.jpg
importance: 2
---

**This is an ongoing project as part of my dissertation thesis**

Building on our work [leveraging ancestry patterns to detect and characterize signatures of rapid adaptation in admixed populations](https://imanhamid.github.io/projects/admixture_stats), I am currently working on developing methods to improve our ability to study the evolutionary history of admixed populations.

I am applying machine learning and computer vision methods to images of admixed chromosomes painted by genetic ancestry. Typical population genetics methods rely on one or more summary statistics. This image-based appraoch allows us to leverage all the information provided by genetic ancestry.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/cnn_methods-01.png' | relative_url }}" alt="" title="cnn methods"/>
    </div>
</div>
<div class="caption">
    Simulated admixed chromosomes are painted by ancestry. We apply computer vision methods like object detection or image segmentation to localize variants of interest along the chromosome.
</div>

In addition to optimizing these methods for this type of data, I am also identifying the timescales, genomic features, and demographic/selective histories that are best suited for this ancestry-based detection of genetic variants of interest through simulations.