---
layout: page
permalink: /publications/
title: Publications
description: Authors are in alphabetical order
years: [2022,2021,2020,2019,2018,2017]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">


<h3 class="year">Preprints</h3>
{% bibliography -f preprint %}



{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f journal -q @*[year={{y}}]* %}
{% endfor %}


<h3 class="year">Thesis</h3>
{% bibliography -f thesis %}

</div>
