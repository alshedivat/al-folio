---
layout: page
permalink: /publications/
title: publications
description:
article_years: [2023, 2022, 2021, 2020, 2019, 2012, 2011]
review_years: [2022, 2017, 2016]
chapter_years: [2022, 2021, 2020, 2019, 2018]
working_paper_year: [2023, 2024]
in_list: 3
nav: true
nav_order: 3
---
<!-- _pages/publications.md -->

<div class="publications">

<h2 class="pbtypes">Articles in peer reviewed journals</h2>

{% for y in page.article_years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @article[year={{y}}]* %}
{% endfor %}

<h2 class="pbtypes">Working papers online</h2>

{% for y in page.working_paper_year %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @report[year={{y}}]* %}
{% endfor %}

<h2 class="pbtypes">Chapters in edited volumes</h2>

{% for x in page.chapter_years %}
  <h2 class="year">{{x}}</h2>
  {% bibliography -f papers -q @incollection[year={{x}}]* %}
{% endfor %}

<h2 class="pbtypes">Book reviews</h2>

{% for z in page.review_years %}
  <h2 class="year">{{z}}</h2>
  {% bibliography -f papers -q @misc[year={{z}}]* %}
{% endfor %}

</div>
