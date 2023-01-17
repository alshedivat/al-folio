---
layout: page
title: Quadruped Morphology Design Study
description: Research Assistant @ Upenn
img: assets/img/QuadMorph/preview.png
importance: 1
category: lab
---
#### __Twisting Spine or Rigid Torso: Exploring Quadrupedal Morphology via Trajectory Optimization__

---
In this project, we developed a pipeline to generate trajectories for several steady-state and transitional behaviors, either in sagittal plane or 3D space, using large-scale nonlinear optimization. By analyzing the data, we investigated the effect of an axially twisting spinal joint for a quadrupedal robot. This work is accepted by ICRA 2023. Please check out the manuscript below

<a href="{{ assets/pdf/Quadruped_Morphology_Design_Study_ICRA_2023.pdf | prepend: '/assets/pdf/Quadruped_Morphology_Design_Study_ICRA_2023.pdf' | relative_url }}" class="btn btn-sm z-depth-0" role="button">PDF</a>

The [optimization code](https://github.com/KodlabPenn/dairlib/tree/new-code-zf) is built on [MIT DRAKE](https://drake.mit.edu/).

##### __Some Cool Bevaviors (x0.25)__ 
__Bounding turn__
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/QuadMorph/bounding_turn3_twisting_ss_p5 00_00_00-00_00_30.gif" title="example image" class="img-fluid rounded z-depth-1" width="600" %}
    </div>
</div>

__Trot__
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/QuadMorph/trot4 00_00_00-00_00_10.gif" title="example image" class="img-fluid rounded z-depth-1" width="600" %}
    </div>
</div>

__Parkour wall jump__
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/QuadMorph/parkour9_p17_s3 00_00_00-00_00_30.gif" title="example image" class="img-fluid rounded z-depth-1" width="600" %}
    </div>
</div>

__Parkour bound__
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/QuadMorph/wall_run 00_00_00-00_00_30.gif" title="example image" class="img-fluid rounded z-depth-1" width="600" %}
    </div>
</div>
