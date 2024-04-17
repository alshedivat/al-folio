---
layout: page
title: projects
permalink: /projects/
description: A growing collection of my cool projects.
nav: true
nav_order: 2
year_categories: [2023-2024,2022,2019-2020] # Projects show in project page
horizontal: true
---

<!-- pages/projects.md -->
<div class="projects">
{%- if site.enable_project_categories and page.year_categories %}
  <!-- Display categorized projects -->
  {%- for year in page.year_categories %}
  <h2 class="category">{{ year }}</h2>
  {%- assign categorized_projects = site.projects | where: "year", year -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>
