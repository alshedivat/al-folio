---
layout: page
title: project 3
description: A minimum barrier distance for multivariate images with applications
img: assets/img/project3_1.png
importance: 3
category: work
---

<b>Abstract: </b>


Distance transforms and the saliency maps they induce are widely used in image processing, computer
vision, and pattern recognition. The minimum barrier distance (MBD) has proved to provide accurate
results in this context. Recently, Geraud ´ et al. have presented a fast-to-compute alternative definition
of this distance, called the Dahu pseudo-distance. This distance is efficient, powerful, and have many
important applications. However, it is restricted to grayscale images. In this article we revisit this pseudo-distance. First, we offer an extension to multivariate image. We call this extension the vectorial
Dahu pseudo-distance. We provide an efficient way to compute it. This new version is not only able
to deal with color images but also multi-spectral and multi-modal ones. Besides, through our benchmarks, we demonstrate how robust and competitive the vectorial Dahu pseudo-distance is, compared
to other MB-based distances. This shows that this distance is promising for salient object detection,
shortest path finding, and object segmentation. Secondly, we combine the Dahu pseudo-distance with
the geodesic distance to take into account spatial information from the image. This combination of
distances provides efficient results in many applications such as segmentation of thin elements or path
finding in images.





<b>Applications: </b>


<b>Salient Objects Detection: </b>


We consider all pixels on the boundary image as the background, and respectively compute the distance map transform for every pixels in the image.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project3_3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Comparison on color images of saliency maps deduced from our vectorial Dahu pseudo-distance on color images with saliency maps deduced from state-of-the-art methods.
</div>


<b>Shortest path finding: </b>


Our distance also used for shortest path finding application. Our method is insensitive to noise and to blurring.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project3_5.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Shortest path finding in images. The input images and the end points (depicted in red) of the path we want to find are shown on each picture. Results are given for Dahu pseudo-distance, Waterflow-MBD and MST-MBD.
</div>


<b>Dahu pseudo-distance on multimodal and multispectral images: </b>


Segmentation on multimodal medical images.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project3_6.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    White matter segmentation using the vectorial Dahu pseudo-distance. 
</div>

Segmentation on Satellite multi-spectral images.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project3_7.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Object segmentation on multispectral images. Objects are manually selected with a marker (in red in pictures). Images C1-C5 are extracted by using a principal component analysis (PCA) algorithm. 
</div>