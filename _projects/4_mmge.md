---
layout: page
title: matrix-variate graphical model
description: Simultaneous Inference in Multiple Matrix-Variate Graphs for High-Dimensional Neural Recordings
img: assets/img/mmge_project.png
importance: 2
category: methodology & application
---

This is a collaborated work with Professors Robert E. Kass (Department of Statistics & Data Sciences, CMU) and Zhao Ren (Department of Statistics, University of Pittsburgh).

As large-scale neural recordings become common, many neuroscientific investigations are focused on identifying functional connectivity from spatio-temporal measurements in two or more brain areas across multiple sessions. Spatial-temporal data in neural recording can be viewed as matrix-variate data, where the first dimension is time and second dimension is space. In this project, we exploit the multiple matrix-variate Gaussian Graphical model (MGGM) to encode the common underlying spatial functional connectivity across multiple sessions of neural recordings. By effectively integrating information across multiple graphs, we develop a novel inferential framework which allows simultaneous testing to detect meaningful connectivity for a target edge subset of arbitrary size. Our test statistics are based on a group penalized regression approach and a novel high-dimensional Gaussian approximation technique. The validity of simultaneous testing is demonstrated theoretically under very mild assumptions on sample size and non-stationary autoregressive temporal dependence. The power analysis implies that our test is optimal in achieving the testable region boundary. Our method involves only convex optimization and parametric bootstrap, making it computationally attractive. We demonstrate the efficacy of the new method through both simulations and an experimental study with multiple local field potential (LFP) recordings in Prefrontal Cortex (PFC) and visual area V4 during a memory-guided saccade task.