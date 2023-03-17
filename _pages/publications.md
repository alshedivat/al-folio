---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2022,2021,2020,2018,2014]
nav: false
nav_order: 
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
 # <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q  @*[papercat =1]*  %}
{% endfor %}

</div>


