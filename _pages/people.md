---
layout: page
permalink: /people/
title: people
description:
nav: true
person_types: ["Principal Investigator","Collaborators","PhD","PhD Rotation Students","Medical Students","Master's","Undergraduates","High School Summer"]
lab_types: ["Current","Former"]
---
{% assign rand_img = 100 %}
{% for lab_type in page.lab_types%}
<h2>{{lab_type}} Lab Members</h2>
{% for person_type in page.person_types%}
    {% assign run_continue = true %}
    {% for person in site.people %}
        {% if person.type==person_type and person.lab_type==lab_type %}
            {% assign run_continue = false %}    
        {% endif %}
    {% endfor %}
    {% if run_continue %}
        {% continue %}
    {% endif %}
<h3>{{person_type}}</h3>
{% for person in site.people %}
{% if person.type==person_type and person.lab_type==lab_type %}
{% assign rand_img = rand_img | plus:1 %}
<div class="person">
    <div class="thumbnail">
        <a href="{{ person.url | prepend: site.baseurl | prepend: site.url }}">
        {% if person.img %}
        {% if person.img=="placeholder" %}
        <img class="thumbnail" src="https://picsum.photos/seed/{{rand_img}}/250"/>
        {% else %}
        <img class="thumbnail" src="{{ person.img | prepend: site.baseurl | prepend: site.url }}"/>
        {% endif %}
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
