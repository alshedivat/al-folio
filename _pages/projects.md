---
layout: page
title: projects
permalink: /projects/
description: AI - Brain - Epistemology - Resilience
---
My research interests pivot around three axis: __AI__, the __Brain__, __Epistemology__ and __Resilience__. The central theme is naturally __Epistemology__ or _What do we know_. _How do we know_ is where Brain science comes in, the __Brain__ as the receptacle but also generator of knowledge. And finally, resilience, or __How to build systems that endure__.
There are also transversal themes that go along and across these three dimensions such as _Causality_ or _Consciousness (subjective experience)_.

If this looks overly generic is because it is, and its is so intentionally.
A more granular description is provided in the respective core themes and Theories, Tools and Problems are described with the relevant context.
{% for project in site.projects %}

{% if project.redirect %}
<div class="project">
    <div class="thumbnail">
        <a href="{{ project.redirect }}" target="_blank">
        {% if project.img %}
        <img class="thumbnail" src="{{ project.img | prepend: site.baseurl | prepend: site.url }}"/>
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        <span>
            <h1>{{ project.title }}</h1>
            <br/>
            <p>{{ project.description }}</p>
        </span>
        </a>
    </div>
</div>
{% else %}

<div class="project ">
    <div class="thumbnail">
        <a href="{{ project.url | prepend: site.baseurl | prepend: site.url }}">
        {% if project.img %}
        <img class="thumbnail" src="{{ project.img | prepend: site.baseurl | prepend: site.url }}"/>
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        <span>
            <h1>{{ project.title }}</h1>
            <br/>
            <p>{{ project.description }}</p>
        </span>
        </a>
    </div>
</div>

{% endif %}

{% endfor %}
