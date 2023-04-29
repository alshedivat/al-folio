---
layout: page
permalink: /teaching/
title: Teaching
description: 
years_lecturer: [2023,2022,2021,2020,2019,2018]
years_tutor: [2018,2017,2016,2015,2014,2013,2012]
nav: true
nav_order: 5
---


<p markdown="1"> 
All the modules I taught as **<a href="#lecturer">Lecturer</a>** and
**<a href="#tutor">Tutor</a>**  
</p>




<div class="publications">



<a id="lecturer"><h3 style="margin-top: 3.3rem; margin-bottom: 0.3rem;">Lecturer</h3></a>
<hr style="color: var(--global-text-color); height: 1px; margin-bottom: 2rem;">
{%- for y in page.years_lecturer %}
   next=y+1 
   <h2 class="year">{{ y }}{{ "/" }}{{ next }}</h2>
  {% bibliography -f teaching_lecturer -q @*[year={{y}} && term={{Fall}}]* %}
  {% bibliography -f teaching_lecturer -q @*[year={{next}} && term={{Spring}}]* %}
{% endfor %}




<a id="tutor"><h3 style="margin-top: 3.3rem; margin-bottom: 0.3rem;">Tutor</h3></a>
<hr style="color: var(--global-text-color); height: 1px; margin-bottom: 2rem;">

{%- for y in page.years_tutor %}
  next=y+1   
   <h2 class="year">{{ y }}{{ "/" }}{{ next }}</h2>
  {% bibliography -f teaching_tutor -q @*[year={{y}} && term={{Fall}}]* %}
  {% bibliography -f teaching_tutor -q @*[year={{next}} && term={{Spring}}]* %}
{% endfor %}


</div>

