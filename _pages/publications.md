---
layout: page
permalink: /Publications/
title: Publications
description: 
years: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]
nav: true
---

Journal and conference rankings are based on CORE (The Computing Research and Education Association of Australasia).
For journals, A∗: top 7%, A: top 17%; For conferences, A∗: top 4%, A: top 14%


<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
