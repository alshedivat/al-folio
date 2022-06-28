---
layout: page
title: Mask Detection
description: Python, PyTorch, OpenCV
img: assets/img/mask_detection/mask.gif
importance: cv-94
category: Computer Vision
github: https://github.com/evanfebrianto/maskDetector
---

### General Info
This program is to detect faces and classify whether people are wearing mask properly. There is three categories:
* mask: if the person is wearing mask properly.
* incorrect_mask: if the person is not wearing mask properly.
* no_mask: if the person is not wearing mask at all.

Despite the fact that I apply deep learning, the software can operate at realtime speed. The essential components are detection and classification. However, this method has a problem because it takes longer to process when more people are spotted in a frame. When it identifies more than one individual, the FPS may decrease. Regardless of the disadvantage of the pipeline, this prototype provides a very good detection result. Please see my github repository for further information.

### Output
Below is an example of the detection result.
<div class="col-sm mt-3 mt-md-0">
    <a href="https://youtu.be/WrHdb7k9R18" title="Mask Detection Output">
        <img src="../../../assets/img/mask_detection/output.gif" alt="Mask Detection Output" class="img-fluid rounded z-depth-1"/>
    </a>
</div>
<div class="caption">
    Mask Detection Output from Webcam Source
</div>