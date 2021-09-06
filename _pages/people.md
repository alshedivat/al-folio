---
layout: page
permalink: /people/
title: people
students: [Ph.D., Master, Undergraduate]
nav: false
---

TBD

<div class="people">

{% for y in page.years %}
  <h2 class="students">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

