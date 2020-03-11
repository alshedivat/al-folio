---
layout: page
permalink: /publications/
title: publications
description: Authors are listed in alphabetical order per theoretical CS norm.
years: [2020, 2019, 2018, 2017, 2016, 2015, 2013, 2012, 2011, 2010, 2008, 2006, 2002]
---

{% for y in page.years %}
  <h3 class="year">{{y}}</h3>
  {% bibliography -f my_papers -f my_patents -q @*[year={{y}}]* %}
{% endfor %}
