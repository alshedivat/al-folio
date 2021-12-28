---
layout: page
permalink: /publications/
title: publications
description: publications in reversed chronological order.
years: [2021, 2020, 2019, 2014]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
