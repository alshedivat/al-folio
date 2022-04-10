---
layout: page
permalink: /publications/
title: Publications
order: 2
description:
years: [2021, 2020, 2019]
nav: true
---

<style>
.myDiv {
    margin: 30px 0px 30px 0px;
}
</style>

<div class="publications">

<!--
{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}} & abbr={{"Working paper"}}]* %}
{% endfor %}
-->

<!--
{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}} & abbr={{"Math handout"}}]* %}
{% endfor %}
-->
  
<div class="myDiv">
<h2> Working Papers </h2>
{% bibliography -f papers -q @*[type=Working paper]* %}
</div>

<div class="myDiv">
<h2> Mathematical Handouts </h2>
{% bibliography -f papers -q @*[type=Math handout]* %}
</div>

</div>
