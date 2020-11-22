---
layout: page
permalink: /publications/
title: publications
description: my academic output
years: [2021, 2020, 2019, 2018, 2017, 2016]
nav: true
---

<div class="publications">
<h2>Peer-Reviewed Publications</h2>
{% for y in page.years %}
    {% if y!= 2018 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
    {% endif %}
{% endfor %}
</div>

<br><br>


<div class="publications">
<h2>Peer-Reviewed Conference Proceedings</h2>
{% for y in page.years %}
     {% if y!= 2016 and y!=2021 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f proceedings -q @*[year={{y}}]* %}
     {% endif %}
{% endfor %}
</div>
