---
layout: page
permalink: /publications/
title: Publications
description: #publications in reversed chronological order </br> * denotes equal contribution # by categories </br>
years: [2023, 2022, 2021, 2019]
nav: true
sort: 2
---

<div class="publications">

<!-- <h1> preprints </h1> -->

<p>An up-to-date list is available on <a href="https://scholar.google.com/citations?user=vnLK_FwAAAAJ&hl" target="_blank">Google Scholar</a>.</p>

* denotes equal contribution

<h1> Journals & Conferences  </h1>
{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}},category=conference]* %}
{% endfor %}

<h1> Presentations </h1> 
{% bibliography -f papers -q @*[category=presentations]* %}

<!-- <h1> theses </h1>
{% bibliography -f papers -q @*[category=thesis]* %}  -->

</div>
