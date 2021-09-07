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
  <h2 class="roles">{{role}}</h2>
  {% bibliography -f papers -q @*[roles={{y}}]* %}
{% endfor %}

</div>

