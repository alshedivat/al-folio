---
layout: page
permalink: /publications/
title: publications
description: Here you can find some of my publications. Go to my [Google Scholar Profile](https://scholar.google.com/citations?user=fMTXxG8AAAAJ) if you want to find the most updated list.
years: [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,2012, 2011,2010,2009]
nav: true
---
<!-- _pages/publications.md -->
Here you can find some of my publications. Go to my [Google Scholar Profile](https://scholar.google.com/citations?user=fMTXxG8AAAAJ) if you want to find the most updated list.
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
