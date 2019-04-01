---
layout: page
permalink: /publications/
title: publications
order: 3
description: Publications by categories in reversed chronological order.
years: [2018, 2013, 2012, 2010, 2008, 2007, 2005]
---

{% for y in page.years %}
  <h3 class="year">{{y}}</h3>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
