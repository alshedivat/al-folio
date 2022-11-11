---
layout: page
title: Area of Interest(AOI) Region Detection
description: Object detection model(yolov5) to detect multiple area of interest region of a product.
img: /assets/img/code_det.png
importance: 2
category: work
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/logo_det.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/code_det.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hardware_det.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Different area of interest regions detected. a) Logo, b) Code c)External hardware
</div>

For the classification of product as real or counterfeit the images of specific area of interest regions were being used. Hence the task was to first identify the area of interest from the zoomed out image of bags. Yolov5 model was trained to detect different aoi regions. For higher precision multiple models were trained in different scenarios and for detection of particular aoi prediction of three different models were combined together. The prediction from three different models need to be in agreement else the predictions were rejected. This technique did rejected some of correct predictions but decreased the false positives increasing precision which was the requirement.
