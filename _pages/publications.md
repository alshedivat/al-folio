---
layout: page
permalink: /papers/
title: papers
description: publications by categories in reversed chronological order.
years: [2023, 2020]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

<h1>submitted articles &amp; preprints</h1>

{% bibliography -f preprint %}

<h1>journal articles</h1>
{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f journal -q @*[year={{y}}]* %}
{% endfor %}

<h1>technical reports &amp; theses</h1>

{% bibliography -f technical %}

</div>
