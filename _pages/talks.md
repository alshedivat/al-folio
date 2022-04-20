---
layout: page
permalink: /talks/
title: talks
order: 3
description:
talk_cats: [The Learnt Geometry of Collider Events]
nav: true
---

<div class="publications">

{% for y in page.talk_cats %}
  <div class="title">{{y}}</div>
      {% bibliography -f talks -q @*[title={{y}}]* %}
          {% endfor %}

</div>

