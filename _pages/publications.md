---
layout: page
permalink: /publications/
title: publications
description: publications by categories in reversed chronological order. An up-to-date list is available on <em><a href="https://scholar.google.com/citations?user=Zz2hMgcAAAAJ&hl=en" style="color:blue; font-size:15px">Google Scholar</a>.
years: [2022, 2021, 2020, 2019, 2017, 2016, 2015, 2014, 2013]
nav: true
weight: 20
---

<div class="publications">

{% for y in page.years %}
  <!-- <h2 class="pyear">{{y}}&nbsp;&nbsp;</h2> -->
  <!-- <p>&nbsp;</p> -->
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

<!-- <a href="https://scholar.google.com/citations?user=Zz2hMgcAAAAJ&hl=en">Google Scholar</a>. -->
