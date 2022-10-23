---
layout: page
permalink: /publications/sensor
title: Publications
description: <sup>*</sup>authors contributed equally. <br> <br>
  <a href=dynamical>#Dynamical systems</a>
  <a href=uncertainty>#Uncertainty estimation</a>
  <a href=graph>#Graph learning</a>
  <a href=latent>#LVMs</a>
  <a href=sensor style="color:var(--global-theme-color)">#Sensors</a>
years: [2018, 2017, 2016]
nav: false
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}, sensor=true]*%}
{% endfor %}

</div>
