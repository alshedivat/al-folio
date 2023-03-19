---
layout: page
permalink: /publications/
title: Publications
description: publications by categories in reversed chronological order.
years: [1967, 1956, 1950, 1935, 1905]
nav: false
nav_order: 3
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
