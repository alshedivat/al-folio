---
layout: page
permalink: /talks/
title: talks
description: talks by categories in reversed chronological order.
years: [2023, 2022, 2021, 2018]
nav: true
---
<!-- _pages/talks.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f talks -q @*[year={{y}}]* %}
{% endfor %}

</div>
