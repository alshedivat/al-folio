---
layout: page
permalink: /teaching/
title: Teaching
description: 
years_lecturer: [2023/2024,2022/2023,2020/2021,2019/2020]
years_tutor: [2017/2018,2016/2017,2015/2016,2014/2015,2012/2013]
nav: true
nav_order: 5
---


<p markdown="1"> 
All the modules I taught as **<a href="#lecturer">Lecturer</a>** and
**<a href="#tutor">Tutor</a>**  
</p>




<div class="publications">



<a id="lecturer"><h3 style="margin-top: 3.3rem; margin-bottom: -1.0rem;">Lecturer</h3></a>

{%- for y in page.years_lecturer %}    
    <h2 class="year">{{ y }}</h2>
        {% bibliography -f teaching_lecturer -q @*[year_academic={{y}}]* %}
{% endfor %}





<a id="tutor"><h3 style="margin-top: 4rem; margin-bottom: -1.0rem;">Tutor</h3></a>

{%- for y in page.years_tutor %}    
    <h2 class="year">{{ y }}</h2>
        {% bibliography -f teaching_tutor -q @*[year_academic={{y}}]* %}
{% endfor %}


</div>

