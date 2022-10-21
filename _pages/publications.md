---
layout: page
permalink: /publications/
title: 发表
description: PUBLICATIONS
nav: true
nav_order: 3
---
<!-- _pages/publications.md -->
<div class="publications">

  {%- assign sorted_publications = site.publications | sort: "year" | reverse -%}
  <!-- Generate cards for each project -->
  {%- for project in sorted_publications -%}
  <h2 class="bibliography">
    {{ project.year }}
  </h2>
  {{ project.content }}
  {%- endfor -%}
    
</div>
