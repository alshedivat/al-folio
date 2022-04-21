---
layout: page
permalink: /talks/
title: talks
order: 4
description:
talk_titles: [The Learnt Geometry of Collider Events,Anomaly Detection: CWoLa Hunting]
nav: true
---

<div class="talks">

{% for y in page.talk_titles %}
  <h2 class="talk_topic">{{y}}</h2>
      {% bibliography -T talks -f talks -q @*[title={{y}}]* %}
          {% endfor %}

</div>