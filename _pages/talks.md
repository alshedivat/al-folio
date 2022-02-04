---
layout: page
permalink: /talks/
title: talks
description: talks by categories in reversed chronological order.
years: [2021, 2019, 2018, 2016]
nav: true
---
<!-- _pages/publications.md -->
<div class="talks">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f talks -q @*[year={{y}}]* %}
{% endfor %}

</div>
