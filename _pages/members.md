---
layout: members
title: Members
permalink: /members
nav: true
nav_order: 1
---

<div class="container">
<h1 class="mt-5">Members</h1>

<div class="mt-4">
    <h3>CURRENT</h3>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {% for member in site.members %}
            {% if member.state == "current" %}
                {% include member-card.html %}
            {% endif %}
        {% endfor %}
    </div>
</div>
<div class="mt-4">
    <h3>MASTER</h3>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {% for member in site.members %}
            {% if member.state == "master" %}
                {% include member-card.html %}
            {% endif %}
        {% endfor %}
    </div>
</div>
<div class="mt-4">
    <h3>ALUMNI</h3>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {% for member in site.members %}
            {% if member.state == "alumni" %}
                {% include member-card.html %}
            {% endif %}
        {% endfor %}
    </div>
</div>
</div>
