---
layout: page
title: projects
permalink: /projects/
description: ongoing and planned projects, along with past projects and their post-mortems.
nav_num: 1
nav: true
display_categories: [computer-assisted mathematics, machine learning/data analysis]
horizontal: false
---
## What am I doing these days?
* Working in [Prof. Ambuj Tewari's lab](https://ambujtewari.github.io/).
* Working on projects on offline RL in confounded tabular MDPs and learning mixtures of latent MDPs.
* Thinking about minimax optimal algorithms for offline policy evaluation and the role of the geometry of action sets.
* Working on double descent in denoising under the guidance of [Rishi Sonthalia](https://sites.google.com/umich.edu/rsonthal/home?authuser=0). Work continued from [MREG 2022](https://sites.google.com/umich.edu/mreg-2022/home).
* Continuing work on our project from [LOGML 2022](https://www.logml.ai/)! I was a participant in Dr. Eli Meirom's group, planning to work on using RL for graph rewiring in GNNs to prevent oversquashing for long range problems.
* Mentoring a project on using machine learning to enhance mdoel predictive control.
* Fleshing out ideas for more academic communities like Monsoon Math.

## What do I want to learn about/do in the future?
### More Palatable Goals
* Work on learning other mixtures of time series with control input.
* Work on generating synthetic data privately for time series, starting with MDPs and Markov Chains.
* Learn about differential privacy and its intersection with sequential decision-making.
* Start maintaining my progress [log](log) again.
* Learn about safe RL and think about techniques beyond primal-dual ones, perhaps using model-based RL with uncertain models.
* Watch lectures from the Data Driven Decision Processes program at the Simons Institute this semester.
* Gain a comprehensive view of techniques that go into minimax lower bounds in RL.

### Loftier Learning Goals
* The theory behind GNNs and deep learning in general.
* Causality and its interaction with sequential decision making and RL.
* Algorithmic fairness.
* Geometric and topological insights for data analysis and machine learning (for example, non-positive curvature representation learning).
* Natural Language Processing.
* Using insights from machine learning for biology. In a specific example, learning a hierarchical or causal structure from genomics 

## What have I done in the past?
<!-- pages/projects.md -->
<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_projects = site.projects | where: "category", category -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>
