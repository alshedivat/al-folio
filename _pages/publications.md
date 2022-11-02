---
layout: page
permalink: /publications/
title: publications
description: a list of my publications.
years: [2022]
nav_num: 1
nav: true
---

## Preprints
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f preprints -q @*[year={{y}}]* %}
{% endfor %}

</div>
