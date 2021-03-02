---
layout: page
permalink: /publications/
title: publications
years: [2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
