---
layout: page
permalink: /publications/
title: Publications
description: A more updated list can be found at <a href="https://scholar.google.com/citations?user=_agi4pMAAAAJ&hl=en">Google Scholar. </a> 
years: [2020,2019,2018]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
