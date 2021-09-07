---
layout: page
permalink: /people/
title: people
roles: [Director, Ph.D., Master, Undergraduate]
nav: false
---

TBD

<div class="people">

{% for y in page.roles %}
  <h2 class="roles">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

