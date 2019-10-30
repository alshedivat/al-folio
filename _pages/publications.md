---
layout: page
permalink: /publications/
title: Publications
description: My publication list.
years: [2019,2018,2016]
---

{% for y in page.years %}
  <h3 class="year">{{y}}</h3>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
