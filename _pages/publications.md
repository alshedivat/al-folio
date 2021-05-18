---
layout: page
permalink: /publications/
title: publications
description:
years: [2021, 2020, 2019, 2018]
nav: true
---

My archival publications. See also [my Semantic Scholar profile](https://www.semanticscholar.org/author/Emma-Sophia-Manning/69465819).

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
