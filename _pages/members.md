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
    {% assign current_members = site.members | where: "state", "current" | sort: "start-date" %}
    {% if current_members.size > 0 %}
    <h3 class="badge badge-dark">Current Members</h3>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {% for member in current_members %}
            {% include member-card.html %}
        {% endfor %}
    </div>
    {% endif %}
</div>
<div class="mt-4">
    {% assign master_members = site.members | where: "state", "master" | sort: "start-date" %}
    {% if master_members.size > 0 %}
    <h3 class="badge badge-dark">Masters</h3>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {% for member in master_members %}
            {% include member-card.html %}
        {% endfor %}
    </div>
    {% endif %}
</div>
<div class="mt-4">
    {% assign alumni_members = site.members | where: "state", "alumni" | sort: "start-date" %}
    {% if alumni_members.size > 0 %}
    <h3 class="badge badge-dark">Alumni</h3>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">    
        {% for member in alumni_members %}
            {% include member-card.html %}
        {% endfor %}
    </div>
    {% endif %}
</div>
</div>
