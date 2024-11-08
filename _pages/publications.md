---
layout: page
permalink: /publications/
title: publications
description: 
years: [2022, 2024]
nav: true
nav_order: 0
---
<!-- _pages/publications.md -->

<div class="publications">

{%- for y in page.years %}

<h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
