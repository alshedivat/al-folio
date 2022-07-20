---
layout: page
permalink: /publications/
title: publications
description: For the most up to date list of publications, see my papers on <a href='https://arxiv.org/search/cs?searchtype=author&query=Hartford%2C+J'>arXiv</a> or <a href='https://scholar.google.com/citations?hl=en&user=eBNK7SsAAAAJ&view_op=list_works&sortby=pubdate'>Google Scholar</a>.
years: [2022, 2021, 2020, 2018, 2017, 2016]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
