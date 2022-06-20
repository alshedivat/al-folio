---
layout: page-i18n
title: links.projects

namespace: projects

permalink: /projek
permalink_en: /projects

description: pages.projects.description
nav: true
horizontal: false
---

<!-- pages/projects.md -->
<div class="projects">
{%- if site.enable_project_categories and site.translations[site.lang].pages.projects.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in site.translations[site.lang].pages.projects.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {% if site.lang == "id" %}
  {%- assign categorized_projects =  site.projects | where: "category_id", category -%}
  {% elsif site.lang == "en" %}
  {%- assign categorized_projects =  site.projects | where: "category_en", category -%}
  {% endif %}
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
