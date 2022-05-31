---
layout: page
permalink: /publications/
title: Publications
description:
years: [2021, 2020, 2019, 2017, 2016, 2015, 2014, 2013, 2012, 2010, 2005, 2003]
nav: true
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
