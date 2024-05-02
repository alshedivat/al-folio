---
layout: page
permalink: /publications/
title: publications
description:
years: [2024, 2023, 2022, 2021, 2020, 2018, 2016]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

{ bibliography}
# {%- for y in page.years %}
#  <h2 class="year">{{y}}</h2>
#  {% bibliography -f papers -q @*[year={{y}}]* %}
# {% endfor %}

</div>
