---
layout: distill
title: Hele Shaw Cell Experiment
description: Numerically simulate 2D Lennard-Jones Fluid using Fortran
img: assets/img/hele-shaw/thumb.png
importance: 2
category: fun
---

# Hele-Shaw Cell Experiment

## 1. Experiment Setup
- Glycerin and ink mixture placed between two acrylic plates, secured with four nails.
- Air injected into the plates, observing the Hele-shaw pattern.
- Four setups with different widths between the plates:
  - No sticker: width of glycerin mixed ink
  - Plastic sheet: 0.11cm
  - One sticker: 0.16cm
  - Two stickers: 0.24cm
- Calculations include perimeter, area, length of fingers, number of fingers, and fractal dimensions.

## 2. Binary Every Frame and Reducing Noise
- Conversion of images to binary form (Figure 1 to Figure 2).
- Noise reduction using `Noise_Reduction.c` & `Circle_cut.c`.
- Edge extraction using `edge.c` (Figure 3 to Figure 4).
- Boundary determination and perimeter calculation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image016.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image018.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image020.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image022.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## 3. Calculate Area and Perimeter
- Using data from figures 3 and 4.
- Scripts used: `area.c` & `perimeter.c`.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image024.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image026.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image028.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image030.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image032.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image034.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image036.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image038.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## 4. Calculate the Length of Fingers
- Technique involving minimizing a large circle until it touches the peripheral finger.
- Diagram of finger length over time.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image040.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image042.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image044.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image046.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## 5. Calculate Injection Rate and Growth of Fingers
- Differentiation of area and radius over time.
- Analysis of viscosity and air injection rate.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image048.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image050.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image052.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image054.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image056.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image058.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image060.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image062.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## 6. Fractal Dimension
- Scalar fractal analysis for dimension calculation.
- Method involves dividing the image into squares and counting those containing the pattern.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image064.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image066.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image068.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image070.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-4 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image072.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-4 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image074.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

| Distance | Dimension |
|----------|-----------|
| 0.0      | 1.8312    |
| 0.11     | 1.8603    |
| 0.16     | 1.8746    |
| 0.24     | 1.9081    |


## 7. Another Way to Calculate Fractal Dimension
- Assumption of Hele-Shaw pattern's self-similarity.
- Radius and area used for dimensional analysis.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image076.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image078.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image080.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image082.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-5 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image084.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

| Distance | Dimension(1) | Dimension(2) |
|----------|--------------|--------------|
| 0.0      | 1.8312       | 1.87355      |
| 0.11     | 1.8603       | 2.21685      |
| 0.16     | 1.8746       | 3.01599      |
| 0.24     | 1.9081       | 1.91585      |


## 8. Hele-Shaw Cell in Polar Coordinate
- Analysis of injection rate and finger growth in polar coordinates.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image086.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image088.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image090.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image092.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image094.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image096.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image098.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hele-shaw/image142.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## 9. Number of Fingers and Difficulty
We try to use the result that we transform the experiment data to polar coordinate and calculate the number of finger with changing of time. Firstly, we try to find the slope where it is zero, but it didn’t get the accurate result from experiment.
And then we try different method also want to calculate the number of fingers, but we didn’t success. The main reason is that the data are not continuous. So I think the next thing we need to do is use cubic spline method to make the data more smooth.

## 10. Additional Resources
- Video documentation and further analysis.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="assets/img/hele-shaw/0_crop.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="assets/img/hele-shaw/11_crop.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="assets/img/hele-shaw/16_crop.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="assets/img/hele-shaw/24_crop.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
    </div>
</div>
