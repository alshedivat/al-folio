---
layout: page
title: calgary
permalink: /places/
description: Calgary & The Canadian Rockies
nav: true
display_categories: [Calgary, Canadian Rockies]
horizontal: false
---

<div class="places">
{%- if site.enable_place_categories and page.display_categories %}
  <!-- Display categorized places -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_places = site.places | where: "category", category -%}
  {%- assign sorted_places = categorized_places | sort: "importance" %}
  <!-- Generate cards for each project -->
  <div class="grid">
    {%- for place in sorted_places -%}
      {% include places.html %}
    {%- endfor %}
  </div>
  {% endfor %}

{%- else -%}
<!-- Display places without categories -->
  {%- assign sorted_places = site.places | sort: "importance" -%}
  <!-- Generate cards for each project -->
  <div class="grid">
    {%- for place in sorted_places -%}
      {% include places.html %}
    {%- endfor %}
  </div>
{%- endif -%}
</div>