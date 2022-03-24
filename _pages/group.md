---
layout: page
permalink: /group/
title: 成员
description: MEET OUR TEAM
nav: true
display_categories: [Professor, PhD Students, Master Students]
---


<!-- pages/pages.md -->
<div class="projects">
{%- if site.enable_group_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  {%- assign categorized_members = site.group | where: "category", category -%}
  {%- assign sorted_members = categorized_members | sort: "importance" %}
  {%- if sorted_members.size != 0 %} <h2 class="category">{{ category }}</h2> {%- endif -%}

  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for member in sorted_members -%}
      {% include member_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="container">
  <div class="card-columns">
    {%- for member in sorted_members -%}
      {% include member.html %}
    {%- endfor %}
  </div>
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_members = site.group | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for member in sorted_members -%}
      {% include member_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for member in sorted_members -%}
      {% include member.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>
