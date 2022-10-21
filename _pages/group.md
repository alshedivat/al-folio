---
layout: page
permalink: /group/
title: 成员
description: MEET OUR TEAM
nav: true
nav_order: 1
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
  <div class="container">
  <div class="row">
    {%- for member in sorted_members -%}
    <div class="col-md-4">
      {% include member.html %}
    </div>
    {%- endfor %}
  </div>
  </div>
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_members = site.group | sort: "importance" -%}
  <!-- Generate cards for each project -->
  <div class="grid">
    {%- for member in sorted_members -%}
      {% include member.html %}
    {%- endfor %}
  </div>
{%- endif -%}
</div>
