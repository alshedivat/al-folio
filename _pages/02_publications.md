---
layout: page
permalink: /publications/
title: publications
description: Publications by categories in reversed chronological order
yearsarticles: [2019]
yearsconf: [2019, 2018, 2017, 2016, 2015]
---

### PhD Thesis
{% bibliography -f papers -q @phdthesis %}

### Peer-reviewed Journal Articles

{% for y in page.yearsarticles %}
  <h3 class="year">{{y}}</h3>
  {% bibliography -f papers -q @article[year={{y}}]* %}
{% endfor %}

### Conference Proceedings

{% for y in page.yearsconf %}
  <h3 class="year">{{y}}</h3>
  {% bibliography -f papers -q @inproceedings[year={{y}}]* %}
{% endfor %}