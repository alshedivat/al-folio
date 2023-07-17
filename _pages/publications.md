---
layout: page
permalink: /publications/
title: publications 
description: By categories (Preprint, Journal, Book chapters, Theses) in reversed chronological order 
years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2006]
nav: true
nav_order: 1
---

An alternative is to check my [Google scholar page](https://scholar.google.fr/citations?user=FM2gRsYAAAAJ&hl=en).

## preprint

<div class="publications">

{% bibliography --file chiquet_preprint %}

</div>

## journal papers

<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f chiquet_journal -q @*[year={{y}}]* %}
{% endfor %}


</div>

## book chapters

<div class="publications">

{% bibliography --file chiquet_inbook %}

</div>

## theses

<div class="publications">

{% bibliography --file chiquet_thesis %}

</div>

