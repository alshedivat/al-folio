---
layout: page
title: project 6
description: The Dahu graph-cut for interactive segmentation on 2D/3D images
img: assets/img/project6_1.PNG
importance: 3
category: work
---


<b> Abstract </b>

Interactive image segmentation is an important application in computer vision for selecting objects of
interest in images. Several interactive segmentation methods are based on distance transform algorithms.
However, the most known distance transform, geodesic distance, is sensitive to noise in the image and to
seed placement. Recently, the Dahu pseudo-distance, a continuous version of the minimum barrier dis-
tance (MBD), is proved to be more powerful than the geodesic distance in noisy and blurred images. This
paper presents a method for combining the Dahu pseudo-distance with edge information in a graph-cut
optimization framework and leveraging each’s complementary strengths. Our method works efficiently
on both 2D/3D images and videos. Results show that our method achieves better performance than other
distance-based and graph-cut methods, thereby reducing the user’s efforts.


<b> Method </b>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project6_2.PNG" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our scheme for interactive segmentation. A probability image, computed from the markers on the image (using GMM), is combined with the color image (A). Then, the foreground/background Dahu distance maps from every pixel to the markers are computed (B). An optimized graph-cut model is used to segment object regions in the image (C). 
</div>


<b> Results </b>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project6_3.PNG" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our interactive segmentation results on Electron Microscope dataset.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project6_4.PNG" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Examples of video segmentation. The scribbles (in blue and red) are given in the frame of the video and the algorithm automatically segments the remained frame. (For interpretation of the references to colour in this figure legend, the reader is referred to the web version of this article.)
</div>