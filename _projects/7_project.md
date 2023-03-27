---
layout: page
title: project 7
description: Efficient Topology-Preserving Road Segmentation In Remote Sensing Imagery
img: assets/img/project7_1.PNG
importance: 3
category: work
---


<b> Abstract </b>

Roads are the backbone of transportation and
human civilization. Remote sensing images with large-scale and
reliable observations have been used to accurately extract these
roads. However, such a task from the remote sensing images
is still a challenging problem due to its fine-scale, curvilinear
structures, occlusion problems by vegetation, infrastructures, etc.
and/or their shadows projected over the roads. As a result,
most of the existing road segmentation methods do not correctly
preserve the initial topology of the input images. They usually
have issues retrieving the correct topology of these structures and
thus exhibit discontinuities in their results. Any breaks in the road
prediction may lead to the complete failure of the global topology,
consequently, the foreground and background connected com-
ponents can be completely different. In this paper, we propose
a topology-preserving road segmentation method based on two
new topological loss functions to improve the deep learning-based
approaches. Our losses are able to localize so-called leakages on
the prediction maps, leading to a penalization term which helps
to fill the gaps and significantly enhance the final results. To
demonstrate the efficiency of the proposed loss functions, we
evaluate our method on many widely used remote sensing image
datasets. Our method improves the segmentation for topological
metrics such as ARI and VOI compared to the state-of-the-Art of
topology-preserving methods.


<b> Method </b>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project7_3.PNG" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Overview of the proposed method. A boundary prediction image is the output of the CNN network. By locating the
broken connections on the likelihood image, the topological loss can be computed. 
</div>


<b> Results </b>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project7_2.PNG" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Qualitative results of the proposed method compared to state-of-the-art methods. (a-b) The original RS images and
their ground truths. (c-f) The segmentation results of BCE [4], TopoLoss [15], BALoss [17] and our methods on the U-Net[4]
respectively. Topological errors are highlighted with the red rectangles.
</div>

