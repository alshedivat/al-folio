---
layout: page
title: people
permalink: /people/
description: Find out more about the members of COMMA Lab.
nav: true
nav_order: 2
display_categories: [people]
horizontal: true
---

<!-- pages/projects.md -->
<div class="projects">

<!-- Display projects without categories -->
  <!-- Generate cards for each project -->
  <div class="grid">
    {%- assign sorted_people = site.people | sort: "order" %}
    {%- for person in sorted_people -%}
      {% include person.html %}
    {%- endfor %}
  </div>
</div>
