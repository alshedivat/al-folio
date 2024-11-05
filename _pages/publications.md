---
layout: page
permalink: /publications/
title: publications
description:
nav: true
nav_order: 3
years: [2025,2024,2023,2022, 2021, 2020, 2019, 2018, 2017, 2016, 2014]
---

<!-- _pages/publications.md -->

<!--Allow to jump to a specific publication and display it a little below top of page, allowing for a headerr-->
<style>
html {
  scroll-padding-top: 100px;
}
</style>

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>
