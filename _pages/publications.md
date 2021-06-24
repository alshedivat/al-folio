---
layout: page
permalink: /publications/
title: Publications 
description: By categories (Preprint, Journal, Book chapters, Theses) in reversed chronological order 
years: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2006]
nav: true
---

An alternative is to check my [Google scholar page](https://scholar.google.fr/citations?user=FM2gRsYAAAAJ&hl=en).

## Preprint

<div class="publications">

{% bibliography --file chiquet_preprint %}

</div>

## Journal papers

<div class="publications">

{% for y in page.years %}
  <h2>{{y}}</h2>
  {% bibliography -f chiquet_journal -q @*[year={{y}}]* %}
{% endfor %}


</div>

## Book chapters

<div class="publications">

{% bibliography --file chiquet_inbook %}

</div>

## Theses

<div class="publications">

{% bibliography --file chiquet_thesis %}

</div>

