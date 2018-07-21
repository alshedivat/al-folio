---
layout: page
title: Image Analysis
description: Estimating Uncollected Garbage using Image Analysis
img: /assets/img/bg-9.jpg

---
<p>
<a target="_blank" href="/assets/papers/image-analysis.pdf"><strong>paper</strong></a> | <a target="_blank" href="/assets/slides/3d_ppt.pdf"><strong>slides</strong></a> | <a target="_blank" href="/assets/slides/3d_poster.pdf"><strong>poster</strong></a> | <a target="_blank" href="https://github.com/susheels/swachh_bharat"><strong>code</strong></a> 
</p>
<strong>Abstract</strong>

<p align="justify">
    Civic authorities in many Indian cities have a tough time in garbage collection and as a result there is a pile up of garbage in the cities. In order to manage the situation, it is first required to be able to quantify the issue. In this paper, we address the problem of quantification of garbage in a dump using a two step approach. In the first step, we build a mobile application that allows citizens to capture images of garbage and upload them to a server. In the second step, back-end performs analysis on these images to estimate the amount of garbage using computer vision techniques. Our approach to volume estimation uses multiple images of the same dump (provided by the mobile application) from different perspectives, segments the dump from the background, reconstructs a three dimensional view of the dump and then estimates its volume. Using our novel pipeline, our experiments indicate that with 8 different perspectives, we are able to achieve an accuracy of about 85 % for estimating the volume.

</p>
<div class="img_row">
    <img class="col three" src="{{ site.baseurl }}/assets/img/3d.png" alt="" title="Pipeline"/>
</div>
<div class="col three caption">
    The entire garbage volume estimation pipeline.
</div>


<div class="img_row">
    <img class="col one" src="{{ site.baseurl }}/assets/img/3d_seg.png" alt="" title="example image"/>
    <img class="col two" src="{{ site.baseurl }}/assets/img/3d_seg2.png" alt="" title="example image"/>
</div>
<div class="col three caption">
    Segmentation of garbage (left image), Bounding Box using Transfer Learning (AlexNet Architecture)
</div>



<div class="img_row">
    <img class="col two" src="{{ site.baseurl }}/assets/img/3d_seg3.png" alt="" title="example image"/>
</div>
<div class="col two caption">Final water tight 3D model</div>