---
layout: page
permalink: /publications/
title: Publications
description:
pre_years: [2024]
pub_years: [2024]
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->

<h2>Preprints</h2>
<div class="publications">

{%- for y in page.pre_years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f preprints -q @*[year={{y}}]* %}
{% endfor %}

<hr />

<h2>Publications</h2>
<div class="publications">

{%- for y in page.pub_years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
