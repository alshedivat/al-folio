---
layout: page
permalink: /talks/
title: talks
order: 3
description:
years: [2021,2019,2018,2017,2016,2015, 2014,2012,2010]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="talk_topic">{{y}}</h2>
      {% bibliography -T talks -f talks -q @*[year={{y}}]* %}
          {% endfor %}

</div>