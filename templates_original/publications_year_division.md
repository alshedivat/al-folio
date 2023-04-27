---
layout: page
permalink: 
title: Publications
description: Authors are in alphabetical order
years: [2022,2021,2020,2019,2017]
nav: false
nav_order: 1
---
<!-- _pages/publications.md -->



 

<div class="publications">

<h3 style="bottom-marging= 2rem;">Journal articles</h3>
 {%- for y in page.years %}
   <h2 class="year">{{y}}</h2>
  {% bibliography -f publications_journal -q @*[year={{y}}]* %}
 {% endfor %}

</div>


