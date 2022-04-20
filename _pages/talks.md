---
layout: page
permalink: /talks/
title: talks
order: 3
description:
talk_cats: [A]
nav: true
---

<div class="publications">

{% for y in page.talk_cats %}
  <div class="title">{{y}}</div>
      {% bibliography -T papers -f talks -q @*[title={{y}}]* %}
{% endfor %}

</div>

