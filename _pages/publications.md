---
layout: page
permalink: /publications/
title: publications
description: Publications and pre-prints by year in reverse chronological order.
years: [2024, 2023, 2022, 2021]
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
