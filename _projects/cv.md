---
layout: page
title: VOS
description: Video Object Segmentation - Segmenting moving objects in videos.
img: assets/img/cv/vos.gif
importance: 2
category: course
---

##### Introduction

The task of Moving Objects Segmentation also called **Motion Segmentation** (or Video Object Segmentation - VOS) aims at segmenting objects in a video that exhibit independent motion in at least one frame. The moving objects/pixels belong to foreground and the remaining pixels are the background. This task has many practical applications in understanding scenes for Autonomous driving, virtual background creation, robotics, automated surveillance, social media, augmented reality, movie production, video conferencing, etc.

##### Categories of VOS methods

This problem is dealt in many ways in the literature and broadly categorized into methods based on training and architectures used in training. Based on the training methods (i.e., how human interventions are involved), VOS methods are grouped into 4 types [[paper](https://arxiv.org/abs/2107.01153)]:
1. Unsupervised (**UVOS** or AVOS),
2. Semi-supervised (**SVOS**),
3. Interactive (**IVOS**), and
4. Referring (language guided, also called **LVOS**).

Based on the architectures, it is grouped into 3: Deep Learning Techniques( CNN’s, Transformers, Encoder-Decoder etc), Non-Deep Learning Techniques (frame differences, optical flow, MRF/CRF) and combination of both. In this project we deal with unsupervised and semi-supervised methods using Deep Learning and Non-Deep Learning based techniques.

##### Problem Formulation and Taxonomy
Formally, let $$X$$ and $$Y$$ denote the input space and output segmentation space, respectively. Deep learning-based video segmentation solutions generally seek to learn an ideal video-to-segment mapping $$f^*: X \longrightarrow Y$$.

In our project we’ll be experimenting with two deep-learning based *UVOS* methods, namely, [**MATNet**](https://arxiv.org/abs/2003.04253) and [**RTNet**](https://openaccess.thecvf.com/content/CVPR2021/papers/Ren_Reciprocal_Transformations_for_Unsupervised_Video_Object_Segmentation_CVPR_2021_paper.pdf), and one deep-learning based *SVOS* method involving Transformers ([**TransVOS**](https://arxiv.org/abs/2106.00588)).

$$\rightarrow$$ For more information on the project, please follow this [repository link](https://github.com/rodosingh/CV-IIITH/tree/main/Project).\
$$\rightarrow$$ View project report [here](https://github.com/rodosingh/CV-IIITH/blob/main/Project/49_Report.pdf).
