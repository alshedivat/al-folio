---
layout: page
title: project 4
description: Neuron Image Segmentation
img: assets/img/project4_2.png
importance: 3
category: work
---

<b> Abstract </b>

Most contemporary supervised image segmentation methods do not preserve the initial topology of the given input (like the closeness of the contours). One can generally remark that edge points have been inserted or removed when the binary prediction and
the ground truth are compared. This can be critical when accurate localization of multiple
interconnected objects is required. In this paper, we present a new loss function, called,
Boundary-Aware loss (BALoss), based on the Minimum Barrier Distance (MBD) cut algorithm. It is able to locate what we call the leakage pixels and to encode the boundary information coming from the given ground truth. Thanks to this adapted loss, we are able to
significantly refine the quality of the predicted boundaries during the learning procedure.
Furthermore, our loss function is differentiable and can be applied to any kind of neural
network used in image processing. We apply this loss function on the standard U-Net and
DC U-Net on Electron Microscopy datasets. They are well-known to be challenging due
to their high noise level and to the close or even connected objects covering the image
space. Our segmentation performance, in terms of Variation of Information (VOI) and
Adapted Rank Index (ARI), are very promising and lead to ∼15% better scores of VOI
and ∼5% better scores of ARI than the state-of-the-art. The code of boundary-awareness
loss is freely available at https://github.com/onvungocminh/MBD_BAL



<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project4_1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Importance of broken connection restoration for image segmentation and the topological correction of our method. (a) Neuron image. (b) U-Net boundary prediction [48]. (c) Resulting segmentation [48]. A leakage position leads to a confusion between regions. (d)
Boundary prediction with our topological correction method. (e) Final segmentation. 
</div>