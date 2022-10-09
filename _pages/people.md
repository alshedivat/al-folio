---
layout: page
permalink: /People/
title: People
roles: [Director, Ph.D., Master, Undergraduate]
nav: false
---

I am fortunate to work with several bright students:


<div class="Ph.D.">
**Ph.D. Students**
    <div class="row justify-content-md-center">
        <div class="col-sm-3">
            <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/Sourabh.png' | relative_url }}" alt="" title="xxxxxxx"/>
        </div>
        <div class="col-sm-4">
            Sourabh Yadav <br>
            Ph.D. student (2022 Spring) <br><br>
            Data privacy, Machine Learning, Deep Learning, and Blockchain <br><br>
            Email: sourabhyadav AT my.unt.edu <br>
            <a href="https://scholar.google.com/citations?user=Luc18E4AAAAJ&hl=en">Google scholar</a>
        </div>
        <div class="col-sm-4">
            Sourabh receives his BS degree in xxx and MS degree in xxx. Currently, he is working on xxx. 
        </div>
    </div>
</div>    

<br clear="left"/>


<div class="Master">
**Master Students**

    Harshitha Gorrepati (2022 Spring --) 

    Bharath Datta Chary Vadla (2022 Fall --)
</div>  

**Alumni**

Tanuja Polineni (M.S., 2022) Current employment: Tricentis

<div class="people">

{% for y in page.roles %}
  <h2 class="roles">{{role}}</h2>
  {% bibliography -f papers -q @*[roles={{y}}]* %}
{% endfor %}

</div>

