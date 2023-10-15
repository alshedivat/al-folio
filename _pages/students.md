---
layout: page
permalink: /students/
title: students
description: Amazing work of the students I supervised. Some there are some joint dissertations done by more than one student.
years: [2023, 2022, 2021, 2020]
nav: true
---
<!-- _pages/students.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f students -q @*[year={{y}}]* %}
{% endfor %}

</div>
