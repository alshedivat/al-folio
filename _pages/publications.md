---
layout: page
permalink: /publications/
title: Publications
description: Authors are in alphabetical order. Publications are divided in <a href="#preprint">Preprints</a>, <a href="#journal">Journal articles</a> and <a href="#thesis">Theses</a> 
years: [2022,2021,2020,2019,2017]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->



<div class="publications">

<a id="preprint"><h3 style="margin-top: 3rem; margin-bottom: 1rem;">Preprints</h3></a> 
<hr style="color: var(--global-text-color); height: 1px; margin-bottom: 3rem;">
{% bibliography -f preprint %}

<a id="journal"><h3 style="margin-top: 2rem; margin-bottom: 1rem;">Journal articles</h3></a>
<hr style="color: var(--global-text-color); height: 1px; margin-bottom: 3rem;">
{% bibliography -f journal %}

<a id="thesis"><h3 style="margin-top: 2rem; margin-bottom: 1rem;">Theses</h3></a>
<hr style="color: var(--global-text-color); height: 1px; margin-bottom: 3rem;">
{% bibliography -f thesis %}

</div>


