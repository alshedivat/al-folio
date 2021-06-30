---
layout: page
permalink: /publications/
title: publications
description:
nav: true
years: [2021, 2020, 2018, 2017, 2016, 2014]
---


<!--Allow to jump to a specific publication and display it a little below top of page, allowing for a headerr-->
<style>
html {
  scroll-padding-top: 100px;
}
</style>

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
