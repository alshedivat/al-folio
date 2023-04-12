---
layout: page
permalink: /publications/
title: publications
description: 
years: [2023, 2022, 2013]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
