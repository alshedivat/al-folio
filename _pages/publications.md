---
layout: page
permalink: /publications/
title: publications
description: Publications by year in reverse chronological order.
years: [2022, 2021, 2020, 2018, 2017, 2016, 2014, 2012]
nav: true
nav-order: 4
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
