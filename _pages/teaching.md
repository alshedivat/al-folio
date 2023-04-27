---
layout: page
permalink: /teaching/
title: Teaching
description: 
years: [2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013]
nav: true
nav_order: 7
---

<p> 
Teaching ordered by year. 
Page under construction
</p>



<div class="teaching">

<h3 style="bottom-marging= 2rem;">Tutor</h3>
 {%- for y in page.years %}
   <h2 class="year">{{y}}</h2>
  {% bibliography -f teaching_tutor -q @*[year={{y}}]* %}
 {% endfor %}

</div>




<div class="teaching">

<a id="journal"><h3 style="margin-top: 3.3rem; margin-bottom: 0.3rem;">Tutor test</h3></a>
<hr style="color: var(--global-text-color); height: 1px; margin-bottom: 2rem;">
{% bibliography -f teaching_tutor %}

</div>


<h3 style="margin-top: 4rem; margin-bottom: 0.3rem;"><a id="tutor">Tutor</a></h3>
<hr style="color: var(--global-text-color); height: 1px; margin-bottom: 2rem;">


<p style ='font-weight: bold'>Ordinary Differential Equations</p> 
<p style = 'font-size: 0.95rem;'>Sapienza University, Italy</p>
<p>
Authored lecture notes &thinsp; <a href="/assets/pdf/teaching/2013/Appunti_EDO.pdf"><i class="fas fa-file-pdf"></i></a>
with Annalisa Malusa &thinsp;<a href = "https://scholar.google.com/citations?user=8_h1W8kAAAAJ"><i class="fas fa-globe"></i></a>
</p>
