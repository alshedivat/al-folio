---
layout: page
permalink: /publications/
title: Publications
description: Publications by me.
years: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2003]
selectedYear: [2021, 2020, 2019, 2018]
selected_papers: true # includes a list of papers marked as "selected={true}"
nav: true
---

<div class="publications">
<h2>Selected Publications</h2>
{% for y in page.selectedYear %}

<h2 class="year">{{y}}</h2>
  {% bibliography -f selectedPublications -q @*[year={{y}}]* %}
{% endfor %}

</div>

<div class="publications">
<h2>Publications</h2>
{% for y in page.years %}

<h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
