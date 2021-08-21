---
layout: distill
title: Adversarial Vandal
description: Drawing on top of art pieces to fool a classification network.
img: /assets/img/vandal/vandal2.png
importance: 3
category: work
date: 2021-05-15

bibliography: 2021-vandal.bib

authors:
  - name: Ivan Puhachov
    url: "https://puhachov.xyz"
    affiliations:
      name: UdeM, Canada
---

Differentiable rasterizer was proposed in <d-cite key="li2020DVG"></d-cite>. It allows for optimizing for parameters of vector graphics primitives with backpropagation. For example, we can place a set of bezier curves on a canvas and oprimize for their width, color and positions such that it fits some raster image. At each step we rasterize our canvas with curves for a given resolution, then compute $L_2$ difference between two raster images (generated and ground truth) and make a gradient descent step on curves parameters. This was proposed in the original paper <d-cite key="li2020DVG"></d-cite> as `painterly rendering`.

<div class="l-page">
  <img class="img-fluid " src="{{ site.baseurl }}/assets/img/vandal/paint_iterations.png" data-zoomable>
</div>
<div class="caption">
    Painterly rendering iterations, from left to rigth: random initialization, 50, 100, 200 iterations, target (raster) image.
</div>

> **Disclaimer**: This is a project I did for [IFT 6756: Game Theory and ML](https://gauthiergidel.github.io/courses/game_theory_ML_2021.html)

Can we create adversarial examples using this approach? We fix the number of curves, initialize them at random, and then update for curve parameters using gradient from classification network (pretrained Inception-V3 in our case). The algorithm is similar: rasterize curves, compute classification score with pretrained network, make a gradient step towards maximizing the target class (`banana` in our case) in curve parameters, repeat. This is known as `adversarial example` and we use the simples `white box` attack (since we have direct access to classification system). There are other types of attacks (algorithms of creation adversarial examples), we use the simplest one.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/vandal/adversarial200.png" data-zoomable>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/vandal/adversarial200.svg" data-zoomable>
    </div>
</div>
<div class="caption">
    Adversarial examples obtained from randomly initialized curves on a canvas. Rasterized image (left) and `svg` (right).
</div>

Now what if we first do some "painterly rendering" steps on randomly initialized images, and then run adversarial examples pipeline? We hope to achieve some meaning in resulting image.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/vandal/lion2.png" data-zoomable>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/vandal/banana.png" data-zoomable>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/vandal/banana.svg" data-zoomable>
    </div>
</div>
<div class="caption">
    Adversarial examples obtained as a combination of painterly rendering (10 iterations towards image on the left), and steps maximizing classification score for targeted class (banana).
</div>

Finally, let's draw curves on top of raster image aiming to create adversarial examples. I call this `adversarial vandalism` as we destroy the original work by small colored strokes on top.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/vandal/vandal.png" data-zoomable>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/vandal/vandal_goldfish.png" data-zoomable>
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/vandal/vandal2.png" data-zoomable>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/vandal/vandal3.png" data-zoomable>
    </div>
</div>
<div class="caption">
    Adversarial examples creating by drawing 10 bezier curves on top of a raster image. After placing them at random we optimize curve parameters (positions, width, color) to maximize classification score for a target class.
</div>

> Upd: A bit of inspiration in my [blogpost](/blog/2021/adversarial-art/)