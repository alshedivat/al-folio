---
layout: page
permalink: /publications/
title: Publications
description: <sup>❋</sup>authors contributed equally
years: [2021, 2020, 2019, 2018, 2017]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}, selected!=true]*%}
{% endfor %}

</div>
