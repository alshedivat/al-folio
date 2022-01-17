---
layout: page
permalink: /publications/
title: publications
description:
years: [2021, 1956, 1950, 1935, 1905]
types: [Data, AI / Algorithm, Inclusion / Health]
nav: true
order: 3
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for t in page.types %}
  <h2 class="type">{{t}}</h2>
  {% bibliography -f papers -q @*[type={{t}}]* %}
{% endfor %}

</div>
