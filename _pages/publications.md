---
layout: page
permalink: /publications/
title: publications
page-title: Publications
description: Publications from the Epidiagnostics Group.
years: [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013]
nav: true
nav_order: 4
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
