---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2023,2022,2019]
nav: true
---

A more up-to-date list is also available on [google scholar](https://scholar.google.com/citations?user=IaFEAbsAAAAJ)

<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
