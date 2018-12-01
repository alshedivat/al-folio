---
layout: page
permalink: /publications/
title: publications
description: Publications in reversed chronological order.
years: [2018]
---

{% for y in page.years %}
  <h3 class="year">{{y}}</h3>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
