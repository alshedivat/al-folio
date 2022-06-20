---
layout: page
title: Cup Detection
description: Python, TensorFlow, Transfer Learning
img: assets/img/cup_detection/thumbnail.png
importance: cv-98
category: Computer Vision
github: https://github.com/evanfebrianto/cup-detection
---

<!-- VIDEO LINKS
https://youtu.be/u2OZAFgCgw8 "Webcam Output"
https://youtu.be/aPVldNAGkdw "Youtube Output"
 -->

#### Goal
This project is an example of transfer learning using TensorFlow framework. I used the [TensorFlow zoo model](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md) with ResNet50 architecture.


#### Output
Below is the detection result of the model.
<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        <a href="https://youtu.be/u2OZAFgCgw8" title="Webcam Output">
            <img src="../../../assets/img/cup_detection/webcam_output.png" alt="Result on webcam" class="img-fluid rounded z-depth-1"/>
        </a>
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        <a href="https://youtu.be/aPVldNAGkdw" title="Youtube Output">
            <img src="../../../assets/img/cup_detection/youtube_output.png" alt="Result on YouTube Video" class="img-fluid rounded z-depth-1"/>
        </a>
    </div>
</div>
<div class="caption">
    The model is able to detect cups both from the webcam stream (left) and youtube video (right)
</div>