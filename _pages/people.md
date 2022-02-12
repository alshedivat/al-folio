---
layout: page
title: people
permalink: /people/
description: Lab Members
nav: true
display_categories: [Lab Director, PhD Students, MSc Students]
horizontal: false
---

<!-- pages/people.md -->
<div class="people">
  <!-- Display categorized people -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_people = site.people | where: "category", category -%}
  {%- assign sorted_people = categorized_people | sort: "lastname" %}
  <!-- Generate cards for each person -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for person in sorted_people -%}
      {% include people_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for person in sorted_people -%}
      {% include people.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}
</div>
