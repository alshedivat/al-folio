---
layout: page
permalink: /People/
title: People
roles: [Director, Ph.D., Master, Undergraduate]
nav: false
---

I am fortunate to work with several bright students:


**Ph.D. Students**
<div class="col-sm-9">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/Sourabh.png' | relative_url }}" alt="" title="xxxxxxx"/>
</div>

<figure class="figure">
  <src="/img/Sourabh.png' | relative_url" class="figure-img img-fluid rounded" alt="Sourabh">
  <figcaption class="figure-caption">xxxxx</figcaption>
</figure>
    
<img class="img-fluid rounded z-depth-1" src="./img/Sourabh.png" align="left" width="200px"/>
some text floating around the image

<br clear="left"/>


Sourabh Yadav (2022 Spring --) 


**Master Students**

Harshitha Gorrepati (2022 Spring --) 


**Alumni**

Tanuja Polineni (M.S., 2022) Current employment: Tricentis

<div class="people">

{% for y in page.roles %}
  <h2 class="roles">{{role}}</h2>
  {% bibliography -f papers -q @*[roles={{y}}]* %}
{% endfor %}

</div>

