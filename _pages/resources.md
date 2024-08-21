---
layout: page
permalink: /resources/
title: resources
description: odds and ends
nav: true
nav_order: 5
---

<!-- pages/resources.md -->
<div class="projects">
<!-- Display projects without categories -->
  {%- assign sorted_resources = site.resources | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_resources -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_resources -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
</div>


<!-- For now, this page is assumed to be a static description of your courses. You can convert it to a collection similar to `_projects/` so that you can have a dedicated page for each course. -->

<!-- Organize your courses by years, topics, or universities, however you like! -->

