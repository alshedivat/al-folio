---
layout: page
permalink: /publications/
title: publications
description: List of my publications. For an updated list, please view my google scholar. 
years: []
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

{% if site.search_enabled %}
<input type="text" id="bibsearch" spellcheck="false" autocomplete="off" class="search bibsearch-form-input" placeholder="Type to filter">
{% endif %}

<div class="publications">

{% bibliography %}

</div>
