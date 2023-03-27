---
layout: page
title: project 5
description: Topology-aware method to segment 3D plant tissues images
img: assets/img/project5_1.png
importance: 3
category: work
---


<b> Abstract </b>

The study of genetic and molecular mechanisms underlying tissue morphogenesis
has received a lot of attention in biology. Especially, accurate segmentation of
tissues into individual cells plays an important role for quantitative analyzing the
development of the growing organs. However, instance cell segmentation is still
a challenging task due to the quality of the image and the fine-scale structure.
Any small leakage in the boundary prediction can merge different cells together,
thereby damaging the global structure of the image. In this paper, we propose an
end-to-end topology-aware 3D segmentation method for plant tissues. The strength
of the method is that it takes care of the 3D topology of segmented structures. The
keystone is a training phase and a new topology-aware loss - the CavityLoss - that
are able to help the network to focus on the topological errors to fix them during
the learning phase. The evaluation of our method on both fixed and live plant organ
datasets shows that our method outperforms state-of-the-art methods (and contrary
to state-of-the-art methods, does not require any post-processing stage). The code
of CavityLoss is freely available at https://github.com/onvungocminh/CavityLoss.


<b> Method </b>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project5_2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    An overview of our proposed method. The boundary prediction which is the output of the
network still generates a lot of broken connections (red zones). The topological errors are detected
and our CavityLoss is computed to enforce the network correcting the leakage. 
</div>


<b> Results </b>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project5_1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     3D reconstruction of the ovule primordia. The middle images show the front and inside
views of the individual label of the ovule primordia.
</div>