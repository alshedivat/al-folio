---
layout: page
permalink: /publications/
title: publications
description: List of selected scientific publications.
types: [Peer-reviewed journals, Theses]
years1: [2022, 2021]
years2: [2022, 2019, 2016]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">


<h3 class="type" align="left">Peer-reviewed journals</h3>

  {%- for y in page.years1 %}
    <h2 class="year">{{y}}</h2>
    {% bibliography -f papers -q @*[year={{y}}, type=Peer-reviewed journals]* %}
  {% endfor %}

<h3 class="type" align="left">Theses</h3>

  {%- for y in page.years2 %}
    <h2 class="year">{{y}}</h2>
    {% bibliography -f papers -q @*[year={{y}}, type=Theses]* %}
  {% endfor %}

</div>
