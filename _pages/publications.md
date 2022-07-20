---
layout: page
permalink: /publications/
title: Publications
description:
years:
nav: true
nav_order: 1
---

I do not have any publications so far. But I am working on it as you are reading this!

<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
