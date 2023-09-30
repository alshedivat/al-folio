---
layout: page
permalink: /publications/
title: Publications
description: This is Shikai's publications by categories in reversed chronological order. * denotes equal contribution
years: [2023, 2022, 2021, 2020, 2019]
nav: true
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
