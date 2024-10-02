---
layout: page
title: Handwritten Arabic Word Recognition ✍️
description: Applying OCR for Handwritten Arabic Words recognition.
img: assets/img/ocr_logo.png
importance: 1
category: work
giscus_comments: false
---

#### **Overview 📄**

Optical Character Recognition (OCR) is the process of converting an image of text into a format that computers can read and manipulate. For example, when we scan a form or a receipt, the result is an image file that cannot be edited, searched, or analyzed using a text editor. However, by applying OCR, we can convert this image into a text document and the content will be stored and utilized as text data.


The goal of this project was to build an Optical Character Recognition (OCR) model based on **Convolutional Neural Networks (CNNs)** and **Long Short-Term Memory (LSTM)** networks to recognize handwritten Arabic words.

#### **Dataset 📁**

In this project, we used the **IFN/ENIT** ([link](http://www.ifnenit.com/download.htm)), which contains more than 2200 binary images of handwriting sample forms from 411 writers. A ground truth file for each word in the database has been compiled. This file contains information about the word such as the position of the words base line, and information on the individual used characters in the word.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/tfnit.png" title="IFN/ENIT dataset" class="img-fluid rounded z-depth-1" style="max-height: 200px; height: auto;"%}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ae07_001.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ae07_002.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 1 : Dataset Overview 
</div>

#### **Model Architecture 📐**

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cnn.png" title="CNN" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lstm1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ctc.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 2: Convolutional Neural Networks, Long Shot-Term Memory, Connectionist Temporal Classification Loss
</div>

##### **Convolutional Neural Network 🧠**
The convolutional Neural Network was used an image feature extractor. The input to the CNN is the raw image, which undergoes a series of convolutional operations to detect spatial features such as edges, shapes, and textures.These extracted features are then passed to the LSTM for sequential analysis. We adopted two approaches.
1. Using a pretrained architecture (VGG19) backbone as a feature extractor by removing the classification had and freezing the other layers.
2. Implementing a custom CNN architecture.

##### **Long Short-Term Memory 🧠**
The LSTM network is known for its capability to handle sequences. In this task, each character in an arabic word can be treated as a step in the sequence. LSTM processes the sequence of features extracted by the previous CNN. The LSTM then can predict the most likely next characters.

##### **Output Decoding**
The CTC loss is used to allow the model to output a probability distribution over characters at each time step, making it easier to train it on unaligned data (where the timing of character appearances is not explicitly labeled).

At inference time, a Beam Search decoding is used to find the most probable sequence of characters based on the LSTM's output probabilities.

##### **Evaluation**
- Character Error Rate (CER) : The proportion of characters that have been transcribed incorrectly.
- Word Error Rate (WER) : The proportion of incorrectly recognized words relative to the reference text.

#### **Technical Stack** 🛠️

**TensorFlow-Keras :** Coding framework.

**Keras Applications:** For pretrained CNN.

**TensorBoard :** Monitoring training progress.

**OpenCV :** Handling images.

**Google Colab :** Free access to GPU and TPU.
