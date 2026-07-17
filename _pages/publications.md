---
layout: page
permalink: /publications/
title: Research
description: Journal articles, conference papers, and working papers, most recent first.
years: [2026, 2025, 2024, 2022, 2021, 2020, 2018]
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<p class="pub-desc">
  My research sits at the intersection of AI, industrial organization, and competition policy —
  digital markets, market design, energy platforms, and AI regulation, studied with game theory,
  empirical methods, and machine learning.
</p>

<div class="publications">

{% for y in page.years %}

  <h2 class="year">{{ y }}</h2>
  {% bibliography -f publications -q @*[year={{ y }}]* %}
{% endfor %}

</div>

<style>
  .pub-desc {
    color: var(--global-text-color-light);
    margin-bottom: 1.5rem;
  }
</style>
