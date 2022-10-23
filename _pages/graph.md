---
layout: page
permalink: /publications/graph
title: Publications
description: <sup>*</sup>authors contributed equally. <br> <br>
  <a href=dynamical>#Dynamical systems</a>
  <a href=uncertainty>#Uncertainty estimation</a>
  <a href=graph style="color:var(--global-theme-color)">#Graph learning</a>
  <a href=latent>#LVMs</a>
  <a href=sensor>#Sensors</a>
years: [2021, 2020, 2019]
nav: false
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}, graph=true]*%}
{% endfor %}

</div>
