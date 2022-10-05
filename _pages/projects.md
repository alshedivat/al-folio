---
layout: page
title: projects
permalink: /projects/
description: Some things I'm working on
nav: true
nav_order: 2
display_categories:
  - econ
horizontal: false
---

<!-- pages/projects.md -->

<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_projects = site.projects | where: "category", category -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}

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
<_comment> Display projects without categories </_comment>
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <_comment> Generate cards for each project </_comment>
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
