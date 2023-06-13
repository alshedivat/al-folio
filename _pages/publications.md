---
layout: page
permalink: /publications/
title: Publications 
description: 
years: [2023, 2022, 2021, 2020, 2019, 2016]
nav: true
---

[//]: <> <h2 class="year">{{y}}</h2>
### Peer-reviewed 
<div class="publications">
{% for y in page.years %}
  {% bibliography -f peer-reviewed-papers -q @*[year={{y}}]* %}
{% endfor %}
</div>

### Technical Reports and Proceedings
<div class="publications">
{% for y in page.years %}
  {% bibliography -f proceedings-papers -q @*[year={{y}}]* %}
{% endfor %}
</div>

