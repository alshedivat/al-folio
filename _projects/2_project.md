---
layout: page
title: project 2
description: Document detection in videos captured by smartphones using a saliency-based method
img: assets/img/project2_1.png
importance: 2
category: work
---

Smartphones are now widely used to digitize 
paper documents. Document detection is the first important
step of the digitization process. Whereas many methods extract
lines from contours as candidates for the document boundary,
we present in this paper a region-based approach. A key feature
of our method is that it relies on visual saliency, using a recent
distance existing in mathematical morphology. We show that
the performance of our method is competitive with state-ofthe-art methods on the ICDAR Smartdoc 2015 Competition
dataset.

Keywords: Document detection, Visual saliency, Mathematical morphology, Smartphone-based acquisition, Dahu pseudodistance, Image segmentation.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project2_2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     On the left: A scheme for document detection. A visual saliency map is computed with considering that mostly boundary pixels are the
background. In parallel, an algorithm for image segmentation is adopted by using the Dahu distance and histogram of colors of pixels on superpixels. A max-tree of the visual saliency map is constructed. Then a candidate document is segmented from the max-tree. On the right: Document detection from the max-tree. A candidate document tends to have a quadrilateral shape, also the top line is parallel with the bottom line (respectively with the left line and the right line). On another hand, the document region is brighter in the saliency map.
</div>




<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project2_1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Some qualitative results of our method. These images show the robustness of our method to illumination, blur and curled document.
</div>


More details of the project are explained in our [ICDAR workshop paper](https://www.lrde.epita.fr/dload/papers/movn.19.icdarw.pdf).
* <b id="ICDAR_2019">[ICDAR 2019]</b> <b>Minh On Vu Ngoc</b>, Jonathan Fabrizio and Thierry Geraud. [Document detection in videos captured by smartphones using a saliency-based method](https://www.lrde.epita.fr/dload/papers/movn.19.icdarw.pdf). In [International Conference on Document Analysis and Recognition Workshop](), 2019.