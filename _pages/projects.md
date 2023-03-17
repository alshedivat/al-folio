---
layout: page
title: Working papers & Work in progress
permalink: /workprogres/
description:
nav: false
nav_order: 2
horizontal: false
---

<!-- pages/projects.md -->
<div class="publications">
  <h4>Working papers</h4>
  {% bibliography -f papers --template bibsimple -q @*[papercat =4]* %}
</div>

<br>
<div class="publications">
  <h4 class="category">Work in progress</h4>
  {% bibliography -f papers --template bibsimple -q @*[papercat =6]* %}
</div>
