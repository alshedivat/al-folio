---
layout: page
permalink: /people/
title: people
description:
nav: true
person_types: ["PI","PhD","Master's","Undergraduates","High School","Rotation Students", "Medical Students", "Collaborators"]
lab_types: ["Current","Former"]
---
{% for lab_type in page.lab_types%}
<h2>{{lab_type}} Lab Members</h2>
{% for person_type in page.person_types%}
<h3>{{person_type}}</h3>
{% for person in site.people %}
{% if person.type==person_type and person.lab_type==lab_type %}
<div class="person">
    <div class="thumbnail">
        <a href="{{ person.url | prepend: site.baseurl | prepend: site.url }}">
        {% if person.img %}
        <img class="thumbnail" src="{{ person.img | prepend: site.baseurl | prepend: site.url }}"/>
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        <span>
            <p style="font-size:160%">{{ person.title }}</p>
            <br/>
            <p>{{ person.description }}</p>
        </span>
        </a>
    </div>
</div>
{% endif %}
{% endfor %}
<br clear="all" />
{% endfor %}
{% endfor %}
