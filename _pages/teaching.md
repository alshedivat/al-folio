---
layout: page
permalink: /teaching/
title: teaching
description: courses I have taught, or TA'd for (more likely).
years: [2020,2019,2018]
nav: true
---

For now, this page is assumed to be a static description of your courses. You can convert it to a collection similar to `_projects/` so that you can have a dedicated page for each course.

Organize your courses by years, topics, or universities, however you like!

<div class="courses">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
