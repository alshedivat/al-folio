---
layout: page
permalink: /research/
title: Research
align: center
description: 
years: [2023,2022,2019]
nav: true
nav_order: 1
---

You can find my academic and non-academic writing below. All publications are sorted in reverse chronological order. 

<ul id="markdown-toc">
  <li><a href="#journal-articles" id="markdown-toc-journal-articles">Journal Articles</a></li>
  <li><a href="#work-in-progress" id="markdown-toc-wip">Work in Progress</a></li>
  <li><a href="#other-writing" id="markdown-toc-other">Other Writing</a></li>
</ul>

In case a downloadable PDF is not available on the site, please contact me via email and I will be happy to send you a copy!

## Journal Articles


<!-- _pages/research.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

## Work in Progress

<hr>

<div class="publications">
 {% bibliography -f wip %}
</div>

## Other Writing

<hr>

<div class="publications">
 {% bibliography -f other writing %}
</div>
