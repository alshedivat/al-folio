---
layout: page
permalink: /publications/
title: publications
categories: [Data, AI / Algorithm, Inclusion / Health]
nav: true
order: 3
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for c in page.categories %}
  <h2 class="category">{{c}}</h2>
  {% bibliography -f papers -q @*[category={{c}}]* %}
{% endfor %}

</div>
