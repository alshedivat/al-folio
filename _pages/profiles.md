---
layout: profiles
permalink: /people/
title: members
description: Individuals associated with EVL over the years ...
nav: true
nav_order: 7
---

{% assign people = site.data.people | sort: 'dirLastName' %}
{% assign grouped_people = people | group_by: 'dirTypes' %}

<!-- Define desired raw order and matching display names -->
{% assign group_order = "faculty,staff,affiliate,student,emeritus,friend,alumni" | split: "," %}
{% assign display_names = "faculty,staff,affiliates,students,emeritus,friends,alumni" | split: "," %}

{% assign max_index = group_order.size | minus: 1 %}
{% for i in (0..max_index) %}
  {% assign group_key = group_order[i] %}
  {% assign display_name = display_names[i] %}
  {% assign current_group = grouped_people | where: "name", group_key %}
  {% if current_group.size > 0 %}
    {% assign current_group = current_group[0] %}
    <h2>{{ display_name }}</h2>
    <!-- Create a container for the grid layout -->
    <div class="profile-grid">
      {% assign sorted_group = current_group.items | sort: 'dirLastName' %}
      {% for person in sorted_group %}
        <div class="profile-column">
          <h3>
            {{ person.title }}
            <!-- Social icons section: moved inline after name -->
            <span class="social-icons">
              {% if person.email %}
                <a href="mailto:{{ person.email }}" title="Email"><i class="fa fa-envelope"></i></a>
              {% endif %}
              {% if person.url %}
                <a href="{{ person.url }}" title="Website"><i class="fa fa-globe"></i></a>
              {% endif %}
              {% if person.linkedin %}
                <a href="{{ person.linkedin }}" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
              {% endif %}
            </span>
          </h3>
          <p><strong>Title:</strong> {{ person.title }}</p>
          <p>{{ person.department }}</p>
          <p><strong>Description:</strong> {{ person.description }}</p>
        </div>
      {% endfor %}
    </div>
  {% endif %}
{% endfor %}