---
layout: page
title: projects
permalink: /projects/
description: Research is the backbone of an academic scientist's portfolio. My research is focused on understanding patterns of genomic and phenotypic variation and how they ulimately related to fitness. The work is sometimes carried out in model ecological systems (see *Populus* research), domesticated plants and their wild relatives, or species of conservation concern. I use genomic methods to identify, categorize, and summarize variation at the levels of a chromosome, families of genes, single genes, and variation at single sites in the genome. Understanding the patterns of phenotypic trait variation among organisms related by common descent is best suited to quantitative genetic models. Quantitative genetic models are a flexible, robust framework for decomposing variation into different components, representing the genotypic, environmental, and error sources of variation. Analyzing phenotypes from genotyped or pedigreed individuals enables the genetic component to be further decomposed into additive, dominance, and other categories of structured genetic variation. I develop quantiative genetic models to understand disease dynamics, correlation of traits to the enironment, and broadly, the evolutionary process.
nav: true
nav_order: 1
display_categories: [work, fun]
horizontal: false
---
<!-- pages/projects.md -->

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
