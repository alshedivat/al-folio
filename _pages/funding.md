---
layout: page
title: funding
permalink: /funding/
description: Our Supporters
nav: true
nav-order: 6
horizontal: false
---

<div class="funding">
  <!-- Generate cards for each person -->
  <div class="grid">
    {%- for funder in site.data.funding -%}
      <div class="grid-item">
        <div class="card">
          <a href="{{ funder.url }}">
            <img src="{{ funder.logo }}" alt="{{ funder.name }}"/>
          </a>
        </div>
      </div>
    {%- endfor %}
  </div>
</div>
