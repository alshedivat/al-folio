---
layout: page
permalink: /People/
title: People
roles: [Director, Ph.D., Master, Undergraduate]
nav: false
---

I am fortunate to work with several bright students:


**Ph.D. Students**

<div class="row justify-content-md-center">
    <div class="col-sm-4">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/Sourabh.png' | relative_url }}" alt="" title="xxxxxxx"/>
    </div>
    <div class="col-sm-8">
        xxxxxx some text floating around the image 
    </div>
</div>

<div class="col-sm-9">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/Sourabh.png' | relative_url }}" alt="" title="xxxxxxx"/>
    some text floating around the image xxxxx
</div>


<img class="img-fluid rounded z-depth-1" src="{{./img/Sourabh.png | relative_url}}" align="left" width="200px"/>
xxxxxx some text floating around the image 

<br clear="left"/>


Sourabh Yadav (2022 Spring --) 

**Master Students**

Harshitha Gorrepati (2022 Spring --) 

Bharath Datta Chary Vadla (2022 Fall --)


**Alumni**

Tanuja Polineni (M.S., 2022) Current employment: Tricentis

<div class="people">

{% for y in page.roles %}
  <h2 class="roles">{{role}}</h2>
  {% bibliography -f papers -q @*[roles={{y}}]* %}
{% endfor %}

</div>

