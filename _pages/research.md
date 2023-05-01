---
layout: page
permalink: /research/
title: research
description: ibndependent research papers completed in my final year of study at McGill University
years: [2023, 2022, 2022]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f {{ site.scholar.bibliography }} -q @*[year={{y}}]* %}
{% endfor %}

</div>
