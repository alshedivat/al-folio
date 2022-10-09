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
    <div class="col-sm-2">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/Sourabh.png' | relative_url }}" alt="" title="xxxxxxx"/>
    </div>
    <div class="col-sm-3">
        Sourabh Yadav <br>
        Ph.D. student (2022 Spring) <br>
        Differential privacy, Artificial Intelligence, Machine Learning, Deep Learning, and Blockchain <br>
        sourabhyadav AT my.unt.edu
    </div>
    <div class="col-sm-5">
        Sourabh receives 
    </div>
</div>

<br clear="left"/>




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

