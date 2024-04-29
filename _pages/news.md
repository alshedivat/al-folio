---
layout: page
permalink: /news/
title: news
description: Updates
nav: true
nav_order: 3
horizontal: true
---

<!-- pages/news.md -->
<div class="projects">

<!-- Display projects without categories -->
  {%- assign sorted_projects = site.news | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include news.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include news.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
</div>
