---
layout: page
permalink: /talks/
title: talks
order: 4
description:
talk_titles: [The Learnt Geometry of Collider Events,CWoLa Hunting]
nav: true
---

<div class="publications">

{% for y in page.talk_titles %}
  <h2 class="title">{{y}}</h2>
      {% bibliography -T talks -f talks -q @*[title={{y}}]* %}
          {% endfor %}

</div>