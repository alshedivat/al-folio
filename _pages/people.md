---
layout: page
title: People
hide_header: true
permalink: /people/
nav: true
nav_order: 1
groups: [Members]
---

<!-- pages/projects.md -->
<div class="people">

{%- for group in page.groups -%}
    {%- assign sorted_members = site.people | sort: "order" | where: "group", group %}
    {%- unless sorted_members == empty -%}
      <h1 class="post-title">{{ group }}</h1>
      <div>
        {%- for person in sorted_members -%}
          {% include person.html %}
        {%- endfor %}
      </div>
    {%- endunless -%}
{%- endfor -%}

</div>
