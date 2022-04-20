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
  <h2 class="talk_topic">{{y}}</h2>
      {% bibliography -f talks -q @*[year={{y}}]* %}
          {% endfor %}

</div>

