---
layout: page
permalink: /publications/
title: Dissemination
description:
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

<h1>Publications</h1>
{% bibliography %}

<h1> Talks </h1>

{% for talk in site.talks %}
{% include talks.liquid %}
{% endfor %}

</div>
