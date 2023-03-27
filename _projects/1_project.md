---
layout: page
title: Project 1
description: Detection of identity documents captured by smartphones 
img: assets/img/project1_5.jpg
importance: 1
category: work
---

Smartphones have became an easy and convenient mean to acquire documents. In this paper, we focus on the automatic segmentation of identity documents in smartphone photos or videos using visual saliency (VS). VS-based approacheswhich pertain to computer vision, have not be considered yet for this particular task. Here we compare different VS methods, and we propose a new VS scheme, based on a recent distance belonging to the scope of mathematical morphology. We show that the saliency maps we obtain are competitive with state-of-the-art visual saliency methods and, that such approaches are very promising for use in identity document detection and segmentation, even without taking into account any prior knowledge about document contents. In particular they can work in real-time on smartphones.

We also provide the LRDE Identity Document Image Database (LRDE IDID).
This dataset is composed of 98 images of identity documents with their detection ground truth.

Identity card: Specimen Sweden, China (2 persons), Vietnam, Germany, Benin.

Passport: China (2 persons), France (3 persons), Vietnam, Romania, Algeria, Specimen UTO.

Visa: Japan, France (4 persons), India (2 persons), United kingdom, USA (3 persons), Russia, Specimen etats Shengen.

Titre de sejour: France

OFII: France

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project1_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project1_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project1_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Sample Images
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project1_4.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Comparison of our saliency maps with other classical or state-of-the-art methods.
</div>


Copyright Notice:
LRDE is the copyright holder of all the images included in the dataset

You are allowed to use these images for research purpose for evaluation and illustration. If so, please specify the following copyright: "Copyright (c) 2018. EPITA Research and Development Laboratory (LRDE)". You are not allowed to redistribute this dataset.

Publication:
If this dataset is used in the context of a scientific publication, please cite:
* <b id="DAS_2018">[DAS 2018]</b> <b>Minh On Vu Ngoc</b>, Jonathan Fabrizio and Thierry Geraud. [  Saliency-based Detection Of Identity Documents Captured By Smartphones](). In [Document Analysis Systems](), 2018.
