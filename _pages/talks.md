---
layout: page
permalink: /talks/
title: Talks
description: Conferences
years: [2023, 2022]
nav: true
nav_order: 4
---
<!-- _pages/publications.md -->

<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f talks -q @*[year={{y}}]* %}
{% endfor %}

</div>
