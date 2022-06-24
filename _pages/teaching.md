---
layout: page
permalink: /activities/
title: Teaching
description:
years: [2022, 2021, 2019]
nav: true
---

<div class="publications">
    {% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f courses -q @*[year={{y}}]* %}
{% endfor %}
</div>

