---
layout: distill
title: Atrial Fibrillation Prediction
description: This page describes the work achieved in the project.
img: assets/img/AF-Episode.png
importance: 1
category: Technion
date: 2022-03-23

authors:
  - name: Idan Levy
    url: "https://idanlevy.com"
    affiliations:
      name: Technion
  - name: Assaf Schuster
    url: "https://assaf.net.technion.ac.il/"
    affiliations:
      name: Technion

# Optionally, you can add a table of contents to your post.
# NOTES:
#   $$ E = mc^2 $$
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Background
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2
  - name: Research Objective
  - name: Motivation
  - name: Data
  - name: Model
  - name: Results
  - name: Discussion

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }

---

## Background

Atrial fibrillation (AF) is an abnormal heart rhythm that affects more than 30 million
people worldwide. It is characterized by irregular and often very rapid rhythm.
AF is associated with an increased risk of death, stroke, and heart failure, and is
assumed to generate economic, clinical and societal challenges in the next decades.
Episodes of AF may come and go which can make it hard to diagnose. Treatment
options for AF are medications, cardioversion and surgery.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/AF-Episode.png" title="ECG Signal of AF Episode" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    ECG Signal of an AF Episode.
</div>

## Research Objective

Successfully predict if a patient is going to have an atrial fibrillation episode in the
next 30 minutes, only by looking at the patient's raw ECG signal.
To date, no research has managed to successfully predict future AF episodes before
they occur with high accuracy (more than 80%).

***

## Motivation

Predicting future AF episodes will allow enrichment of trials of interventions to
prevent AF and better prepare for upcoming episodes. These interventions will help
to minimize the total length of an AF episode.
Such advancements may mitigate the patient’s risk for ischemic stroke and
potentially save many lives. They will also allow preparing for episodes during
surgery and reducing the number of medications patients with AF must take, thus
reducing the risk of side-effects.

## Data

We used the MIT-BIH atrial database which contains 25 long-term ECG recordings of
human subjects with atrial fibrillation. Each recording is 10 hours in duration and
contains two ECG signals sampled at 250 Hz.
Data pre-processing:
    • Butterworth filter which effectively removes noise from the ECG signal.
    • Down-sampling from 250 Hz to 50Hz to prepare for utilizing multiple data-sets
    that have different frequencies.
    • Normalization of signals to values between 0 and 1 as different recordings have
    variations in their signals.
We created non-overlapping segments of 30-second ECG recordings using both ECG
channels. Each segment was tied to a variable that indicates if AF begins in the 30
minutes following the recording.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/Preprocessing.png" title="Processing the ECG Signal" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Processing the ECG Signal.
</div>

## Model

A convolutional neural network (CNN) model designed for reading a 30-second ECG
recording and predicting if an AF event will occur in the following 30 minutes.
The model consists of the following major layers:
• A one-dimensional convolutional layer which generates feature maps from the
input signal.
• A pooling layer which reduces the size of the feature maps and creates a
summarized version of them.
• Fully connected layers which learn possible nonlinear functions of the feature
space.
The final layer consists of a SoftMax activation function that outputs the probability
that AF will occur in the next 30 minutes.

## Results

The data (30 second non-overlapping ECG segments) was split randomly: 80% of it
was used for training the model and 20% was used for testing the model.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/Confusion-Matrix.png" title="Confusion Matrix" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Successfully predicted 927 AF episodes.
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/AUC-Graph.png" title="AUC Graph" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    AUC is the measure of the ability of a classifier to distinguish between results.
    Higher AUC indicates better performance of the model to distinguish between the
    positive and negative results.
</div>

Evaluation methods:

$$𝑨𝒄𝒄𝒖𝒓𝒂𝒄𝒚 = ((𝑻𝑷 + 𝑻𝑵) / (𝑻𝑷 + 𝑻𝑵 + 𝑭𝑷 + 𝑭𝑵)) = 87.9\% $$

$$Recall = ((TP) / (TP + FN)) = 74.4\% $$

$$Precision = ((𝑻𝑷) / (TP + FP)) = 72.1\% $$

$$Specifity = ((TN) / (TN + FP)) = 91.8\% $$

$$F1 Score = ((2*Precision*Recall) / (Precision + Recall))) = 73.2\% $$

Recall is the most important evaluation method as it indicates the ability of the
model to correctly predict future AF episodes.

## Discussion

We created a convolutional neural network that predicts if an AF will occur in the 30
minutes after a 30 second ECG recording with 87.9% accuracy. The results are
preliminary and further research must be completed to advance our findings and
produce better results.
For this purpose, we plan to utilize more data-sets, research different models, find
the most appropriate time frames for the prediction and the recording, and create a
patient-personalized model that performs better on predicting future AF episodes
for the same patient.
Future work should also include the use of data from wearable technologies such as
smartwatches that allow ECG recording.

