---
layout: page
permalink: /publications/
title: publications
description: Published manuscripts and pre-prints
years: [2023,2022,2021,2019,2017,2014]
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
