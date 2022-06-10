---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2022, 2020, 2019, 2018, 2014]
nav: true
nav_order: 2
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
