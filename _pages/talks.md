---
layout: page
permalink: /talks/
title: talks
order: 3
description:
talk_titles: [A,B]
nav: true
---

<div class="publications">

{% for y in page.talk_titles %}
  <h2 class="title">{{y}}</h2>
      {% bibliography -T talks -f talks -q @*[year={{y}}]* %}
          {% endfor %}

</div>