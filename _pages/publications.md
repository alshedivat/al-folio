---
layout: page
permalink: /publications/
title: Publications
idx: 5
# description: Publications in reversed chronological order. 
years: [2020,2019,2017]
nav: true

---

[Google Scholar](https://scholar.google.com/citations?user=VrXSNzIAAAAJ&hl=en)

Publications in reversed chronological order. 
<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
