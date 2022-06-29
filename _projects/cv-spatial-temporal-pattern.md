---
layout: page
title: Pattern Recognition
description: Python, PyTorch, OpenCV, MediaPipe
img: assets/img/spatial_temporal_pattern_recognition/thumbnail.png
importance: cv-93
category: Computer Vision
github: 
---

### General Info
This project is still in the works. The objective is to detect hand movement patterns by building a skeleton graph and giving the model spatial and temporal attention. This repository holds the Pytorch implementation of [Construct Dynamic Graphs for Hand Gesture Recognition via Spatial-Temporal Attention](https://arxiv.org/abs/1907.08871) by Yuxiao Chen, Long Zhao, Xi Peng, Jianbo Yuan, and Dimitris N. Metaxas. The essential concept is to first create a fully-connected graph from a hand skeleton, and then automatically learn the node properties and edges using a self-attention method that works in both spatial and temporal domains.

### Output
*Note: Media can be played if your browser resolution is high enough.*

Below are some examples of the result using my custom dataset.
<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/spatial_temporal_pattern_recognition/grab.gif" title="Sliding Window" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/spatial_temporal_pattern_recognition/release.gif" title="Polyfit Tracking" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Grab movement (left), Release movement (right)
</div>
<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/spatial_temporal_pattern_recognition/left.gif" title="Sliding Window" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/spatial_temporal_pattern_recognition/right.gif" title="Polyfit Tracking" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Swipe left movement (left), Swipe right movement (right)
</div>