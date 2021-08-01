---
layout: page
permalink: /publications/
title: Publications
description: publications by google scholar. Check CV for more info.
years: [2021, 2020, 2019, 2018, 2015]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
