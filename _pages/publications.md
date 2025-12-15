---
layout: page
permalink: /publications/
title: publications
description:
years: [2018, 2021, 2024, 2025]
# yearswp: [2021, 2018]
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->
<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f workingpapers -q @*[year={{y}}]* %}
{% endfor %}

</div>

<!-- <h1> Working Papers </h1>

<div class="publications">

{% for y in page.yearswp %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f workingpapers -q @*[year={{y}}]* %}
{% endfor %}

</div> -->
