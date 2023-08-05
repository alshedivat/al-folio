---
layout: page
permalink: /publications/
title: publications
description: Distributional Semantics and more.
years: [2023, 2019, 2018, 2016, 2012, 2011, 2010]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
