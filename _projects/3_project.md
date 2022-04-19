---
layout: page
title: Vision-based Object Classification using Deep Learning
description: In this project, a Deep Neural Network Framework (YOLO) and the PR2 robot has been used. Using this framework, the PR2 robot can detect objects and classify them. The robot can detect objects in both 2D and 3D space.
img: assets/img/3.png
importance: 3
---

Robot vision involves the use of a combination of camera hardware and computer algorithms to enable robots to analyse visual data from the environment. In this project, a Deep Neural Network Framework (YOLO) and the PR2 robot has been used. Using this framework, the PR2 robot can detect objects and classify them. The robot can detect objects in both 2D and 3D space. For 2D detections, the robot takes input images (from an RGB camera mounted on it) and detects and classifies the objects in the images. For 3D object detection, i.e, classifying the objects and getting the location of the objects in 3D space, the input images are used in conjunction with the point cloud data obtained from the sensors of the PR2 robot. <BR><BR>

### PR2 Robot
In this project, the PR2 robot simulation has been used. It is a mobile manipulation platform built by Willow Garage and its software system is written entirely in ROS. The PR2 is one of the most technologically advanced research robots ever made. It can clean tables, fold towels, and get drinks from the fridge thanks to its strong hardware and software capabilities. <BR>
### YOLO 
The YOLO framework detects objects by looking only once at the input image. Hence, the name You Only Look Once(YOLO) was coined. The YOLO framework takes the entire image at once for object detection. Thus, reframing object detection into a single regression problem rather than a classification problem, predicting bounding box coordinates and class probabilities. It takes an input image and then divides it into an SxS grid and then predicts the bounding boxes and the confidence score of those boxes. The YOLO framework has four versions: YOLOv1,YOLOv2, YOLOv3 and YOLOv4.
The network architecture of YOLOv1 is inspired by the GoogLenet model for classification YOLOv1 has 24 convolutional layers and 2 fully connected layers. Later, YOLOv2 was proposed as an improved version of YOLOv1 in terms of speed and accuracy. A new classification
network was proposed, Darknet-19, which is used as the base for YOLOv2. It uses batch normalisation to speed up to stabilize training and regularise the model. Darknet-19 has 19 convolutional layers and 5 max-pooling layers. This network is trained on the standard
ImageNet 1000 class classification dataset. YOLOv2 outperforms its predecessor, YOLOv1.YOLOv1 and YOLOv2, both use softmax. In contrast, YOLOv3 uses logistic classifiers and performs multilabel classification. For YOLOv3, another neural network was proposed which is
significantly larger, having 53 convolutional layers. It is therefore called Darknet-53. It is much more powerful than Darknet-19, which was used in YOLOv2. There is also another improved version of YOLO called YOLOv4.
In this project, I’ve used YOLOv2-tiny (a faster version of YOLOv2) for 2D and 3D object
detection. An implementation of Darknet for ROS has been used in this project.<BR><BR>

## SIMULATION ENVIRONMENT AND EXPERIMENT
The simulation environment consists of a Gazebo world with an elephant, two humans and the PR2 robot. The robot can be moved around the world so that it can receive different image inputs. In this experiment, it was measured how accurately the robot can identify the entities of the world.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/3.png" title="robot vision DL" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The simulation environment
</div>
## RESULTS
For 2D object detection, i.e, without considering the point cloud, the following results were obtained. The robot could detect the elephant and the person in view with 66% and 82% accuracy respectively.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.png" title="robot vision DL" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
	The environment as analysed by PR2
</div>

For 3D object detection, YOLO has been used along with pointcloud data to match the detections
to 3D space, and therefore locate where the detected object lies in the 3D space. The persons were
detected with an accuracy of 77% (and 85% once) and the elephant was detected with an accuracy
of 68%.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.png" title="robot vision DL" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
	3D bounding boxes visualised using RVIZ
</div>

