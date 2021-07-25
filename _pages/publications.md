---
layout: page
permalink: /publications/
title: Publications
description: ✉️ represents corresponding author.
years: [2021, 2020, 2019, 2018,2017,2015,2012,2010]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* --sort_by year --order descending %}
{% endfor %}

</div>
