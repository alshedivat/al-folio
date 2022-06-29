---
layout: page
permalink: /publications/
title: selected publications
description: A few selected publications & preprints, in reverse chronological order.
years: [2022, 2021, 2020, 2019, 2018, 2017, 2015, 2014, 2013, 2011]
nav: true
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
