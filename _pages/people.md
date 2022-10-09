---
layout: page
permalink: /People/
title: People
roles: [Director, Ph.D., Master, Undergraduate]
nav: false
---

I am fortunate to work with several bright students:


**Ph.D. Students**

Sourabh Yadav (2022 Spring --) 


**Master Students**

Harshitha Gorrepati (2022 Spring --) 


**Alumni**
Tanuja Polineni (M.S., 2022) First employment: Tricentis

<div class="people">

{% for y in page.roles %}
  <h2 class="roles">{{role}}</h2>
  {% bibliography -f papers -q @*[roles={{y}}]* %}
{% endfor %}

</div>

