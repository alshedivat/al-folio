---
layout: page
permalink: /publications/
title: Publications
description: Publications (thesis, papers and open source projects) in reversed chronological order.
years: [2021, 2020, 2019, 2018, 2017, 2015, 2014, 2012]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
