---
layout: page
title: Object Detection and Classification in Dental Radiographs (OPGs)
description:
img: assets/img/12.jpg
redirect: https://github.com/dr-vish/Object-Detection-and-Classification-in-Dental-Radiographs
importance: 1
category: work
related_publications: true
---

Throughout the last several decades, the use of computed tomography (CT) and X-ray imaging based technologies to detect, diagnose, and treat various dental illnesses has increased exponentially due to the need for precise imaging and diagnostic tools. However, manual X-ray film interpretation and analysis may take large amounts of crucial clinical hours. They may lead to misdiagnosis or underdiagnosis, owing to personal factors such as stress, fatigue, and experience levels. If intelligent dental X-ray film interpretation tools are created to aid dentists in enhancing dental treatment, these flaws can be reduced. This viewpoint elevates dental informatics, such as automatic teeth identification, dental abnormality identification, and annotation, to a crucial component of competent health care.[1]

One way of ensuring that an oral cavity is diseased or healthy would be to utilize machinelearning techniques for object detection. For segmenting teeth, traditional Machine Learning (ML) methods including mathematical morphology [2], active contour [3], and level set [4] have been applied. In addition, hand-crafted features extracted using Fourier descriptors [5], contours, and textures [4] have been combined with Bayesian approaches [5], linear models [6], and support vector machines to achieve classification. Unfortunately, most of these techniques require rigorous feature extractor engineering to convert the raw data into an acceptable representation for the algorithms to recognize or categorize the input photos.
These X-rays can be utilized to create a binary classifier that accurately determines whether an X-ray is of a diseased mouth. A machine learning algorithm is trained to recognize patterns and features in the X-rays that are linked with diseased teeth by using a large dataset of dental X-rays. A binary classifier that can categorize new X-rays as either unhealthy or healthy can be created using these patterns. This strategy could greatly increase the precision and effectiveness of dental diagnostics and support the creation of patient-specific treatment strategies.
The dataset being used is from The Tufts Dental Database and consists of 1000 panoramic dental radiography images with expert labeling of abnormalities and teeth. The classification of radiography images was performed based on five different levels: anatomical location, peripheral characteristics, radiodensity, effects on the surrounding structure, and the abnormality category.

To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images, even citations {% cite einstein1950meaning %}.
Say you wanted to write a bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}
