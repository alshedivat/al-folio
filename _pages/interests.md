---
layout: page
title: interests
permalink: /interests/
description: an eclectic, ever-growing list of interests.
nav: true
nav_order: 1
display_categories: [academic, casual]
horizontal: false
---

<!-- pages/interests.md -->
<div class="interests">
{%- if site.enable_interest_categories and page.display_categories %}
  <!-- Display categorized interests -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_interests = site.interests | where: "category", category -%}
  {%- assign sorted_interests = categorized_interests | sort: "importance" %}
  <!-- Generate cards for each interest -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for interest in sorted_interests -%}
      {% include interests_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for interest in sorted_interests -%}
      {% include interests.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display interests without categories -->
  {%- assign sorted_interests = site.interests | sort: "importance" -%}
  <!-- Generate cards for each interest -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for interest in sorted_interests -%}
      {% include interests_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for interest in sorted_interests -%}
      {% include interests.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>
