---
layout: page
permalink: /publications/
title: Publications
description:
years: [2023, 2022, 2021, 2020, 2019, 2017, 2016, 2015, 2014, 2013, 2012, 2010, 2005, 2003]
nav: true
nav_order: 1
---

A full list of publications can be found in [my C.V.](https://annakijas1.github.io/assets/pdf/2023-Kijas_CV.pdf)

<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
