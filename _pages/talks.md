---
layout: page
permalink: /talks/
title: Talks
description: talks by categories in reversed chronological order.
years: [2021, 2020, 2019, 2018, 2016]
nav: true
---


<div class="talks">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f talks -q @*[year={{y}}]* %}
{% endfor %}

</div>
