---
layout: page
permalink: /talks/
title: Talks
description: 
years_talk: [2022,2021,2019,2018,2017,2016]
nav: true
nav_order: 5
---


<p markdown="1"> 
All my invited seminars
</p>





<div class="publications">


{%- for y in page.years %}    
    <h2 class="year">{{ y }}</h2>
        {% bibliography -f talk -q @*[year={{y}}]* %}
{% endfor %}



</div>