---
layout: page
permalink: /talks/
title: talks
order: 3
description:
talk_cats: [EMD_VAE]
nav: true
---

<div class="publications">

{% for y in page.talk_cats %}
  <div class="title">{{y}}</div>
      {% bibliography -f talks -q @*[year={{y}}]* %}
          {% endfor %}

</div>

