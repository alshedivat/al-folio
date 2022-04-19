---
layout: page
title: EARLY DETECTION OF PARKINSON’S DISEASE USING MACHINE LEARNING
description: The goal of this project was to develop an image classification algorithm to detect Parkinson's disease using images of spirals/waves/handwriting obtained during clinical exams. Although pen pressure plays an important role in determining the presence and the extent of the disease, this project aims to find out whether images alone can be useful in detecting Parkinson’s disease.
img: assets/img/11.png
importance: 5
---

Millions of people worldwide have been affected by Parkinson's disease (PD), which is
characterized by a loss of mobility and, as a result, the inability to work and move. Early
detection of Parkinson's disease can help to cure it in time. A test that involves drawing
a spiral on a sheet of paper could be used to detect Parkinson's disease in its early
stages. Speed of writing and pen pressure while sketching are lower among Parkinson's
patients, particularly those with a severe form of the disease. The goal of this project
was to develop an image classification algorithm to detect Parkinson's disease using
images of spirals/waves/handwriting obtained during clinical exams. Although pen
pressure plays an important role in determining the presence and the extent of the
disease, this project aims to find out whether images alone can be useful in detecting
Parkinson’s disease. <BR><BR>

### Dataset
For this project, a publicly available dataset from Brain Disease Analysis Laboratory has
been used. The subjects were asked to draw a spiral on a piece of paper placed on a
digitizing tablet. Digitized signals were obtained using the tablet when pen pressure was
exerted on its surface. The tablet captured the x-coordinate; y-coordinate; timestamp;
pressure; tilt; and elevation.
Using the x and y coordinates, images were generated as shown below:
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/12.png" title="Healthy" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Spiral Obtained from a healthy person
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/13.png" title="PD" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Spiral Obtained from a person with Parkinson's disease
</div>
Only 40 samples were available in this dataset which is a very less number of samples
to train any deep learning or machine learning model. To tackle this problem, data
augmentation was used. It is a technique that can be used to artificially expand the size
of a training dataset by creating modified versions of images in the dataset. Image data
augmentation is a technique that can be used to artificially expand the size of a training
dataset by creating modified versions of images in the dataset. Using this, the dataset
was increased to 900 images.<BR>
## Methods
Two Deep learning and machine learning algorithms were used to classify the images
as “Parkinson” and “Healthy”.
#### 1. Convolutional Neural Networks (CNN):
A CNN is a deep learning algorithm that can take an image as input, assign
learnable weights and biases to multiple features of the image, and distinguish
them from another. For this task, a number of pre-trained models like VGGs,
ResNets, Inception, etc. were used using transfer learning however, the accuracy
obtained was insignificant (>40%).
#### 2. Random Forest Classifier
It is one of the most commonly used supervised learning algorithms which is
used in classification problems. Random Forest algorithm consists of several
“trees” which predict the class of the input. The prediction made by each
individual tree is taken into consideration and the class with the most votes is the
algorithm’s final prediction.
To classify images using such algorithms, the images need to be quantified first.
In this project, Histogram of Oriented Gradients (HOG) has been used for image
quantification. HOG quantifies changes in local gradient in the input image. It
has been used to quantify how the directions of the spirals change.
In other words, it will be able to identify the degree of shakiness in the images
obtained from people with PD as compared to those obtained from healthy
people.
## Results
The approach where random forest classifier was used showed an accuracy of 96% and the one with convolutional neural networks showed an accuracy of 66%. Thus, the random forest classifier showed more promising results which is counter intuitive as CNNs tradiotionally perform better on image datasets.
