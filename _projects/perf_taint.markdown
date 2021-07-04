---
layout: page
title: perf-taint
description: taint-based
img:
importance: 1
category: program analysis
---

Performance modeling has had a huge impact on the world of scientific and high-performance computing.
It gave us tools to discover scalability bugs, validate performance expectations, and design new systems.
In particular, empirical modeling tools made it much easier for users to derive parametric performance
models. After the long modeling process, users obtain parametric models estimating the behavior
of each functions in the program.

<div class="img-magnifier-container" style="vertical-align:middle; text-align:center">
    <a href="/assets/img/perf_taint/modeling_framework.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/perf_taint/modeling_framework.png' | relative_url }}" alt="" title="Performance modeling framework."/>
    </a>
</div>
<div class="caption">
  The Extra-P performance modeling toolchain, including first two manual steps (click to zoom).
</div>

Unfortunately, those tools are not a perfect solution - they are not always easy to use and the
not each model is perfect.
Widentified five major issues:
(1) modeling is expensive, its cost increases exponentially with the number of parameters. 
and users can usually afford to create model with only difficulty in 

poster
presentation

sppexa

paper
talk
slides
artifact

