---
layout: page
permalink: /publications/
title: Publications
description:
years: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2003]
selected_papers: true # includes a list of papers marked as "selected={true}"
nav: true
---
<style>
.publications{
margin-top: 5rem;
}
</style>


<div class="publications">
<h2>Highlights</h2>
<hr>
  {% bibliography -f selectedPublications %}


</div>

<div class="publications">
<h2>All Publications</h2>
{% for y in page.years %}

<h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
