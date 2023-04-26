---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2022,2021,2020,2019,2017]
nav: true
nav_order: 4
---
<!-- _pages/publications.md -->

<p> 
Publications are divided in <a href="#journal">Journal articles</a>, <a href="#preprint">Preprints</a> and <a href="#theses">Theses</a>. 
Authors are in alphabetical order 
</p>

<div class="publications">
{% bibliography -f journal %}
</div>

<div class="publications">

<a id="journal"><h3 style="margin-top: 4rem; margin-bottom: 0.5rem;">Journal articles</h3></a>
<hr style="color: var(--global-text-color); height: 1px; margin-bottom: 2rem;">
{% bibliography -f journal %}

<a id="preprint"><h3 style="margin-top: 2rem; margin-bottom: 0.5rem;">Preprints</h3></a> 
<hr style="color: var(--global-text-color); height: 1px; margin-bottom: 2rem;">
{% bibliography -f preprint %}

<a id="theses"><h3 style="margin-top: 2rem; margin-bottom: 0.5rem;">Theses</h3></a>
<hr style="color: var(--global-text-color); height: 1px; margin-bottom: 2rem;">
{% bibliography -f theses %}

</div>


