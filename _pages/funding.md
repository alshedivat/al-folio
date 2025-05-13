---
layout: page
title: funding
permalink: /funding/
description: 
nav: true
nav_order: 6
horizontal: false
---

<div class="funding">
  <!-- Generate cards for each person -->
  <div class="container-md  bg-white p-4">
    <div class="row align-items-center justify-content-center">
        {%- assign sorted_funding = site.data.funding | sort: "name" %}
        {%- for funder in sorted_funding -%}
        <div class="col-sm-4 height=50px p-y-5">
          <a href="{{ funder.url }}">
            <img class="img-fluid mx-auto d-block" src="{{ funder.logo }}" alt="{{ funder.name }}"/>
          </a>
        </div>
        {%- endfor %}
      </div>
  </div>
</div>
