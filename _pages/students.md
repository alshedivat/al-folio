---
layout: page
permalink: /students/
title: talks
description: talks by categories in reversed chronological order.
years: [2021, 2020]
nav: true
---
<!-- _pages/talks.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f students -q @*[year={{y}}]* %}
{% endfor %}

</div>
