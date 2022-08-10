---
layout: page
permalink: /publications/
title: Publications
description: By categories (preprints; journals and conferences; and thesis and reports) in reversed chronological order.
years: [2022, 2021, 2020, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]
nav: true
nav_order: 1
---
Interestingly, [Google Scholar](https://scholar.google.com/citations?hl=en&user=GH4f3-sAAAAJ&view_op=list_works&sortby=pubdate) attaches some whole numbers (yes, zero is included!) to my papers

<!-- _pages/publications.md -->
<!-- <div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div> -->

## preprints

<div class="publications">

{% bibliography --file raj-preprints %}

</div>

## journal and conference papers

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f raj-papers -q @*[year={{y}}]* %}
{% endfor %}


</div>

## thesis and reports

<div class="publications">

{% bibliography --file raj-thesis %}

</div>
