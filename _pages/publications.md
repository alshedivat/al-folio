---
layout: page
permalink: /publications/
title: Publications
description: publications by categories in reversed chronological order.
years: [2021, 2020, 2019, 2013, 2012, 2011, 2010, 2009, 2008]
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
