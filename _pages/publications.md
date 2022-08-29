---
layout: page
permalink: /publications/
title: Publications
description: By categories (preprints; journals and conferences; and thesis and reports) in reversed chronological order. I use [J] and [C] in front of the identification tab to distinguish between conference and journal papers.
years: [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2014, 2013, 2012, 2011]
nav: true
nav_order: 1
---
Interestingly, [Google Scholar](https://scholar.google.com/citations?hl=en&user=GH4f3-sAAAAJ&view_op=list_works&sortby=pubdate) attaches some whole numbers (yes, zero is included!) to my papers.  

<!-- _pages/publications.md -->
## Preprints

<div class="publications">

{% bibliography -f raj-preprints %}

</div>

## Journal and conference papers

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}


</div>

## Thesis and reports

<div class="publications">

{% bibliography -f raj-thesis %}

</div>
