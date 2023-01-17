---
layout: page
permalink: /publications/
title: publications
description: 
years: [2023, 2019]
nav: true
nav_order: 1

---
##### __<sup>*</sup> indicates co-first authors__

<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
