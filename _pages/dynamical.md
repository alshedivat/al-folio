---
layout: page
permalink: /publications/dynamical
title: Publications
description: <sup>*</sup>authors contributed equally. <br> <br>
  <a href=dynamical style="color:var(--global-theme-color)">#Dynamical systems </a>
  <a href=uncertainty>#Uncertainty estimation</a>
  <a href=graph>#Graph learning</a>
  <a href=latent>#LVMs</a>
  <a href=sensor>#Sensors</a>
years: [2022, 2021, 2020, 2019, 2018]
nav: false
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}, dynamical=true]*%}
{% endfor %}

</div>
