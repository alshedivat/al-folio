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


<h3>Preprints</h3>
{% bibliography -f preprint %}



<h3>Journal articles</h3>
{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f journal -q @*[year={{y}}]* %}
{% endfor %}


<h3>Thesis</h3>
{% bibliography -f thesis %}

</div>
