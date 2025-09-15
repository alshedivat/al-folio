---
layout: page
title: 3D-Reconstruction in Challenging Sparse View Setup
description: As a part of ETH Summer Research Fellowship 2025 at ETH Zürich I was involved in this research project
img: assets/img/3d_cloud.png
importance: 2
category: academics
---


<a href="/assets/pdf/Nischal_Maharjan_ETH_SSRF_Project_Slides.pdf">Get Presentation Slides of Project here</a> <br>
<a href="/assets/pdf/Nischal_Maharjan_ETH_SSRF_Project_Report.pdf">Get Project Report here</a>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/vggt+ba.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pipeline of VGGT+BA
</div>

Structure from Motion paradigm has been widely used for the task of 3d reconstruction however fails in challenging scenes especially with sparse set of views. Recent deep learning model VGGT can jointly predict camera parameters, depth maps, point maps, and feature tracks, but their predictions typically lack global alignment even though the local structure is correctlty predicted. In this project, we use VGGT predictions as priors for Bundle Adjustment (BA) optimization, referred to as VGGT+BA. Since VGGT provides highly accurate predictions, they serve as an excellent initialization for the BA process, leading to more reliable and efficient optimization.VGGT+BA performs better than VGGT standalone and we experiment with different methods to improve over given baseline, which can be done by either improving the inputs to BA such as tracks or BA paramters itself.