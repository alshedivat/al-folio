---
layout: page
title: People
hide_header: true
permalink: /people/
nav: true
nav_order: 1
groups: [Members, Associate Members, Master's Students, Visitors]
---

<!-- pages/projects.md -->
<div class="projects">

{%- for group in page.groups -%}
    {%- assign sorted_members = site.people | sort: "order" | where: "group", group %}
    {%- unless sorted_members == empty -%}
      <h1 class="post-title">{{ group }}</h1>
      <div class="row align-items-stretch">
        {%- for person in sorted_members -%}
          {% include person_old.html %}
        {%- endfor %}
      </div>
    {%- endunless -%}
{%- endfor -%}

</div>
