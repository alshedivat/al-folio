---
layout: page
permalink: /Publications/
title: Publications
description: 
years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]
nav: true
---

Journal and conference rankings are based on CORE (The Computing Research and Education Association of Australasia).

Journal: A+: top 7%, A: top 17%; 

Conferences: A+: top 4%, A: top 14%

Authors with * are the students in our lab. 

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
