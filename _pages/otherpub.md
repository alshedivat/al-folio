---
layout: page
title: Other Publications
permalink: /others/
description:
nav: false
nav_order: 2
horizontal: false
---

<!-- pages/projects.md -->
<h4 class="category">Book Chapters</h4>
<div class="publications">
  {% bibliography -f papers -q @*[papercat =2]* %}
</div>
<br>
<h4 class="category">Other Papers</h4>
<div class="publications">
  {% bibliography -f papers --template bibsimple -q @*[papercat =3]* %}
</div>
<br>
<h4 class="category">Policy Reports</h4>
<div class="publications">
  {% bibliography -f papers --template bibsimple -q @*[papercat =5]* %}
</div>
