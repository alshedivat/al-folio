---
layout: about
title: about
permalink: /
subtitle:

profile:
  align: right
  image: prof_pic.jpeg
display_categories: [work]
news: true  # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of the page
---
I'm Joe Bak-Coleman, an associate research scientist at the [Craig Newmark Center for Journalism Ethics and Secuirty](https://journalism.columbia.edu/craig-newmark-center) within the [Columbia School of Journalism](https://journalism.columbia.edu/). My research focuses on understanding how collectives make decisions in the face of uncertainty. I'm particularly interested in understanding what makes collective decision-making work and how it can go awry. Over the past decade, I've worked on collective decision-making in a range of contexts from animal groups and social media to metascience.

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
