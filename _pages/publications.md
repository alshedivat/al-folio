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

<div class="pub-legend">
  <span class="pub-legend-item"><span class="pub-dot" style="background-color:#2e7d32"></span>Peer-reviewed</span>
  <span class="pub-legend-item"><span class="pub-dot" style="background-color:#b7791f"></span>Working paper / preprint</span>
</div>

<div class="publications">

{% for y in page.years %}

  <h2 class="year">{{ y }}</h2>
  {% bibliography -f publications -q @*[year={{ y }}]* %}
{% endfor %}

</div>

<style>
  .pub-desc {
    color: var(--global-text-color-light);
    margin-bottom: 1rem;
  }
  .pub-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
    font-size: 0.85rem;
    color: var(--global-text-color-light);
  }
  .pub-legend-item {
    display: inline-flex;
    align-items: center;
  }
  .pub-dot {
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    margin-right: 0.4rem;
  }
</style>
