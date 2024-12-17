---
layout: page
title: people
permalink: /people/
# description: Lab Members
nav: true
nav-order: 1
# display_categories: [Lab Director, Postdoctoral Fellows, PhD Students, MSc Students, Research Associates, Undergraduates, Collaborators, Alumni]
# display_categories: [Lab Director, PhD Students, MSc Students, Research Assistants, Undergraduates, High School, Alumni]
display_categories: [Lab Director, PhD Students, MSc Students, Alumni]
horizontal: false
---
# Lab Photos

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/labphotos/lab_schulich_april2024.jpg" title="Schulich School of Engineering, University of Calgary" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Schulich School of Engineering, University of Calgary (2024)
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/labphotos/neurips2024.jpg" title="NeurIPS 2024" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    NeurIPS 2024, Vancouver, BC, Canada (2024)
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/labphotos/peyto2023.jpg" title="Peyto Lake, Banff National Park" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Peyto Lake, Banff National Park, AB, Canada (2023)
</div>


# Lab Members

<!-- pages/people.md -->
<div class="people">
  <!-- Display categorized people -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_people = site.people | where: "category", category -%}
  {%- assign sorted_people = categorized_people | sort: "lastname" %}
  <!-- Generate cards for each person -->
  <div class="grid">
    {%- for person in sorted_people -%}
      {%- if person.show -%}
        {% include people.html %}
      {%- endif -%}
    {%- endfor %}
  </div>
  {% endfor %}
</div>
