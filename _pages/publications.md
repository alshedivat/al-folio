---
layout: page
permalink: /publications/
title: publications
description: 
years_pub: [2020]
years_rev: [2021]
nav: true
---

<div class="publications">

{% for y in page.years_pub %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

<div class="publications">
<h2>manuscripts under review</h2>
{% for y in page.years_rev %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers_revision -q @*[year={{y}}]* %}
{% endfor %}

</div>
