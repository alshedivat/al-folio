---
layout: page
permalink: /talks/
title: Talks
description: 
years_talk: [2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013]
years_poster: [2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013]
nav: true
nav_order: 5
---


<p markdown="1"> 
All my invited **<a href="#talk">Talks</a>** and **<a href="#poster">Poster</a>** presentations. **PAGE UNDER CONSTRUCTION**
</p>





<div class="publications">


<a id="talk"><h3 style="margin-top: 3.3rem; margin-bottom: -1.0rem;">Talks</h3></a>

{%- for y in page.years_talk %}    
    <h2 class="year">{{ y }}</h2>
        {% bibliography -f seminars_talk -q @*[year={{y}}]* %}
{% endfor %}




<a id="poster"><h3 style="margin-top: 5rem; margin-bottom: -1.0rem;">Posters</h3></a>

{%- for y in page.years_poster %}    
    <h2 class="year">{{ y }}</h2>
        {% bibliography -f seminars_poster -q @*[year={{y}}]* %}
{% endfor %}


</div>