---
layout: page
permalink: /publications/
title: publications
description:
years: [2022, 2021]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->

Check <a href="https://scholar.google.com/citations?hl=en&user=E0sOorcAAAAJ">Google Scholar</a> for the most updated list. * denotes co-first authorship.

<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
