---
layout: page
title: Deep neural networks for measurement error model
description: from nonparametric methods to deep neural networks
img: /assets/img/nn1.png
importance: 3
category: work
---
The success of deep learning has inspired a lot of recent interests in exploiting neural network structures for statistical inference and learning. Although neural network has been successfully applied in computer vision, natural language processing etc., we still lack understanding of the estimation performance of neural network in nonparametric regression especially when covariates have measurement errors. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/gen_models_diag_2.svg' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
<div class="caption">
  A neural network structure for NNME.
</div>

In this project, we use deep neural networks for nonparametric statistical modeling, and investigate their extensions for nonparametric regression with measurement errors (or error-in-variables models). We construct a new framework, called Neural Network methods for Measurement Error models (NNME), to use a fully connected feed-forward neural network to approximate the regression function f(X), a normalizing flow to approximate the prior distribution of covariates X, and maximize the marginal likelihood function of observed data using an inferential network to approximate the posterior distribution of X. We develop an inference procedure based upon recent advances in variational inference for deep neural networks, such as the importance weighted autoencoder, doubly reparametrized gradient estimator, and non-linear independent components estimation, which is much more effective than vanilla variational autoencoder. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/nn1.png' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
<div class="caption">
  A neural network structure for NNME.
</div>

We conduct an extensive numerical study to compare the neural network approach with classical nonparametric methods and observe that the neural network approach is more flexible in accommodating different classes of regression functions and can readily accommodate multiple covariates. It performs superior or comparable to the best available method in nearly all settings and robust to the tuning parameters. NNME can be applied to many latent variable models, which are used for many real data sets. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/nn2.png' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
<div class="caption">
A simulation of measurement error model. The true function is generated from Gaussian processes. Compare NNME with different priors and GP method (KALE). 
</div>
