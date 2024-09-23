---
layout: page
permalink: /publications/
title: publications
description:
years_papers: [2024, 2023, 2021, 2020, 2019, 2018]
years_theses: [2022, 2016, 2012]
nav: false
nav_order: 1
---

<!-- _pages/publications.md -->

<div class="publications">

Our publications in reverse-chronological order. As of {{ "now" | date: '%B %d, %Y' }}, our academic work received {{ site.data.gscholar.total_citations }} citations by the research community.
Most up-to-date citation metrics can be found via <a href="https://gscholar.patrickkastner.de">Google Scholar</a>.

<br>
<br>

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

{%- for y in page.years_papers %}
{% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

<h2>Theses</h2>

{%- for y in page.years_theses %}
{% bibliography -f theses -q @*[year={{y}}]* %}
{% endfor %}
