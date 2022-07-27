---
layout: page
permalink: /publications/
title: publications
description: research publications by year
years: [2021, 2019, 2018, 2008]
years2: [2017, 2014, 2013, 2012, 2008, 2009]
nav: true
nav_order: 1
---

#### :pushpin: if you can't access a paywalled article, feel free to email <br> I can usually share a pre-print version

<!-- [**Working papers** :arrow_heading_down:](#projects) -->
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

## Policy briefs

<div class="publications">

{%- for y in page.years2 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f policy -q @*[year={{y}}]* %}
{% endfor %}

</div>
