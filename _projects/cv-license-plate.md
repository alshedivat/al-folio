---
layout: page
title: License Plate Recognition
description: C++, OpenCV, kNN
img: assets/img/license_plate/thumbnail.jpg
github: https://github.com/evanfebrianto/Licence-Plate-Recognition/tree/master/OpenCV_3_License_Plate_Recognition_Cpp-master
importance: cv-99
category: Computer Vision
---

#### **Description**

OpenCV in C++ is used to build a simple ANPR system for automatic license plate recognition. This procedure, known as automatic license plate recognition (ANPR/ALPR), consists of the following steps:

* Identifying and locating a license plate in an image or frame is the first step.
* Next, we need to extract the characters from the plate. 
* Optical Character Recognition (OCR) is used in this step to identify the retrieved characters.

Due of the wide variety of license plate styles seen in different states and nations, ANPR is a particularly difficult area of computer vision.

Adding to the complexity of license plate recognition systems is the fact that:

* Reflections, shadows, and blurring are all part of the dynamic lighting conditions.
* Vehicles that move quickly.
* Obstructions.

Large and reliable ANPR datasets for training and testing are also difficult to come by because of the following reasons:

* Personal and sensitive information, such as the time and location of a vehicle and its driver, are included in these records.

* This data is being guarded with great care by ANPR firms and government agencies.

To begin an ANPR project, data is typically collected and a sufficient number of sample plates are amassed under varied scenarios.

Since we don't have a dataset of license plates, let's pretend we don't have any (quality datasets are hard to come by). There is no need for deep learning object identification in this case, therefore we'll have to use our computer vision skills instead.

I agree that a trained object detection model would be ideal, but for the time being, this project only uses OpenCV for detection.

#### **Output**

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/license_plate/recognize1.png" title="Output" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/license_plate/recognize2.png" title="Output" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Final detection result. Photos were taken using a mobile phone camera.
</div>