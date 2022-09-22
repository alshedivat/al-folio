---
layout: page
title: People
permalink: /people/
description:
nav: true
nav_order: 1
display_categories: [people]
horizontal: false
---

<!-- pages/projects.md -->
<div class="people">

<!-- Display projects without categories -->
  <!-- Generate cards for each project -->
  <div>
    {%- assign sorted_people = site.people | sort: "order" %}
    {%- for person in sorted_people -%}
      {% include person.html %}
    {%- endfor %}
  </div>
</div>
