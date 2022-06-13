---
layout: page
permalink: /publications/
title: Publication
description: Publication list in reversed chronological order; I also attach some presentation slides for conference papers.
years: [2022, 2021, 2020, 2019, 2018]
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
