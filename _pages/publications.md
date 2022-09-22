---
layout: page
title: Publications
hide_header: true
permalink: /publications/
years: [2022, 2021, 2020, 2019]
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->
<!-- Forthcoming publications are displayed first i.e. forthcorming=true in bibtex -->
<!-- <header class="post-header"> -->
<!--     <h1 class="post-title">Forthcoming</h1> -->
<!-- </header>  -->

<div class="publications">
  <h2 class="year" style="margin-bottom: 0px;"></h2>
  {% bibliography -f papers -q @*[forthcoming=true]* %}
</div>

<!-- All other publications (forthcorming!=true) are displayed in descending year order -->
<!-- <header class="post-header" style="margin-top: 50px"> -->
<!--     <h1 class="post-title">Publications</h1> -->
<!-- </header> -->

<div class="publications">
{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}} && forthcoming!=true]* %}
{% endfor %}
</div>
