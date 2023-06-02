---
layout: page
title: projects
permalink: /projects/
description: 
nav: true
nav_order: 1
display_categories: [work, fun]
horizontal: false
---

<!-- pages/projects.md -->

Research is the back-bone of an academic scientist's work.  My research program is focused around the principles of popualtion biology, quantiative genetics, and ecology. I use various tools and methods from the fields of statistics, molecular biology, and chemistry to investigate evolutionary and ecological questions, most of which are in a conservation context.

For years, I've been intriqued by chemical ecology and the genomic architectures of genes, transcripts, and proteins which translate information into phentypes that perform work in a plant. At a basic level, I apply the methods of evolution, ecology, and molecular biology to understand biological change.

Currently, my portfolio is focused on the conservation of Hemlocks (*Tsuga*), Walnuts (*Juglans*) and I'm developing projects in orchid conservation focused on *Isotria*. I work on the development of genome annotation tools (EASEL), meta-analyses, and any project that combines plants, data, and good statistical modelling. 


<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_projects = site.projects | where: "category", category -%}
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
