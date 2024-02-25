---
layout: page
permalink: /teaching/
title: Teaching
img: 
years: [2024, 2023, 2022]
description: Master level signal processing and machine learning courses.
nav: true
---

<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f teaching -q @*[year={{y}}]* %}
{% endfor %}
