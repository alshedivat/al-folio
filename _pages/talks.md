---
layout: page
permalink: /talks/
title: presentations
description:
nav: true
---

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid" src="{{ site.baseurl }}/assets/img/about3.JPG" alt="" title=""/>
    </div>
</div>
<div class="caption">
    Presenting at the 23rd Symposium of the Hellenic Nuclear Physics Society in Thessaloniki, Greece (2014). 
</div>

<div class="publications">  
   <h2>talks</h2>
  <hr>  
    <div class="table-responsive">
      <table class="table table-hover table-borderless">
        {% assign talks = site.data.talks  %}
      {% for item in talks %}
        <tr>
          <td>
           {{ item.title }}
          </td>
          <td>
           <a href="{{ item.page }}" target="_blank">{{ item.event }}</a>
          </td>
          <td  style="width: 15%"><strong>{{ item.date | date: "%m/ %Y" }}</strong></td>
        </tr>
      {% endfor %}
      </table>
    </div>
</div>


<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid" src="{{ site.baseurl }}/assets/img/poster.jpg" alt="" title=""/>
    </div>
</div>
<div class="caption">
    Presenting at the 24th Symposium of the Hellenic Nuclear Physics Society in Ioannina, Greece (2015). 
</div>

<div class="publications">  
   <h2>posters</h2>
  <hr>  
    <div class="table-responsive">
      <table class="table table-hover table-borderless">
        {% assign posters = site.data.posters  %}
      {% for item in posters %}
        <tr>
          <td>
           {{ item.title }}
          </td>
          <td>
           <a href="{{ item.page }}" target="_blank">{{ item.event }}</a>
          </td>
          <td  style="width: 15%"><strong>{{ item.date | date: "%m/ %Y" }}</strong></td>
        </tr>
      {% endfor %}
      </table>
    </div>
</div>
