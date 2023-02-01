---
layout: page
permalink: /publications/
title: Publications
description: Up-to-date publication list can be found on <a href='https://scholar.google.com/citations?user=nxGwojoAAAAJ'>Google Scholar</a>.
years: [2023, 2022, 2021]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
