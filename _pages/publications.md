---
layout: page
permalink: /publications/
title: Publications
description: My publications  in reverse-chronological order. Please find current citations on  <a href="https://gscholar.patrickkastner.de">Google Scholar</a>.
years: [ 2020, 2019, 2018, 2016, 2012, 2009]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
