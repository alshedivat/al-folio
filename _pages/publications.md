---
layout: page
permalink: /publications/
title: Publications
description: Publications of interest to members of the group
years: [2023, 2022, 2021, 2020]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->

<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
