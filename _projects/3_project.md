---
layout: page
title: Micro Manipulation
description: universal dexterous micro manipulation
img: assets/img/project_img/micro_manipulation.gif
importance: 1
category: work
related_publications: true
---


## Overview

Microscopic robotic manipulation can be applied in minimally invasive surgery, drug delivery, and molecular extraction. Our research focuses on micron-scale manipulations, aiming for non-damaging, universal, and highly dexterous autonomous micro manipulation. We tackle three key challenges: modeling, control, and planning, to bridge the gap between microscopic and macroscopic robotics.

We propose a "universal and dexterous" micro-manipulation framework. First, physical fields are used to directly drive microrobots. The microrobots interact with target objects through contact or non-contact interactions, achieving "non-contact indirect" manipulation of the target via the physical field, thereby minimizing mechanical, optical, and magnetic damage. This framework, inspired by advanced macroscopic dexterous hands, offers high degrees of freedom and precision, applies to various physical fields, and does not require specially designed robot structures, ensuring universality.


## Efficient Model Learning and Adaptive Tracking Control of Magnetic Micro-Robots for Non-Contact Manipulation

{% cite jia2024efficient %}

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/project_img/magnetic_noncontact.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/project_img/icra2024_certificate.png"  class="img-fluid rounded z-depth-1" %}
    </div>
</div>


This work focuses on non-contact manipulation using magnetically driven robots. By utilizing the three-dimensional distribution of magnetic fields, magnetic microspheres are driven to roll forward, generating high-pressure and vortex areas in the fluid, which in turn propel the target object without direct contact. However, the combined effects of the magnetic field and fluid field result in challenging modeling. To address this, we propose an efficient learning and optimal control method for unknown models. Compared to current magnetic non-contact methods, this study achieves both precise manipulation and wide-range navigation.

## Hierarchical Learning and Control for In-Hand Micromanipulation Using Multiple Laser-Driven Micro-Tools

{% cite jia2022hierarchical %}

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/project_img/ots_multifinger.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

This work proposes a multi-finger dexterous micromanipulation technique based on optical tweezers. Using optical tweezers to capture reconfigurable micro-fingers, we achieve high-degree-of-freedom in-hand rotation of target objects. However, the high degree of freedom and discontinuous contact modes result in nonlinear control and hybrid planning challenges. To address this, we propose a hierarchical manipulation strategy for multi-finger dexterous micro robotic hands. Compared to existing research, this method can achieve effects similar to macroscopic robotic hands, allowing flexible configuration of the contact posture and position of the micro-fingers, with high precision and no optical damage.