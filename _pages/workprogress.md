---
layout: page
title: Working papers & Work in progress
permalink: /workprogress/
description:
nav: false
nav_order: 2
horizontal: false
---

<!-- pages/workprogress.md -->
<div class="publications">
  <h4>Working papers</h4>
  {% bibliography -f papers --template bibsimple -q @*[papercat =2]* %}
</div>

<br>
<div class="publications">
  <h4 class="category">Work in progress</h4>
  {% bibliography -f papers --template bibsimple -q @*[papercat =3]* %}
</div>
