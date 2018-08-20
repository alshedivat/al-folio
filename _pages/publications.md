---
layout: page
permalink: /publications/
title: publications and reports
description: #
years: [2018, 2017, 2016]
---

<h2>publications</h2>

{% for y in page.years %}
  <h3 class="year">{{y}}</h3>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
