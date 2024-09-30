---
layout: profiles
permalink: /people/
title: members
description: Members of the lab or group
nav: true
nav_order: 7
---

{% assign people = site.data.people | sort: 'dirLastName' %}
{% assign grouped_people = people | group_by: 'dirTypes' %}

<!-- Loop through each group by dirTypes -->
{% for group in grouped_people %}
  <h2>{{ group.name }}</h2> <!-- Display the group name (dirTypes) -->

  <!-- Create a container for the grid layout -->
  <div class="profile-grid">
    <!-- Loop through each person within the group, sorted by last name -->
    {% assign sorted_group = group.items | sort: 'dirLastName' %}
    {% for person in sorted_group %}
      <div class="profile-column">
        <h3>{{ person.dirFirstName }} {{ person.dirLastName }}</h3>
        <p><strong>Title:</strong> {{ person.title }}</p>
        <p><strong>Department:</strong> {{ person.department }}</p>
        <p><strong>Description:</strong> {{ person.description }}</p>
        <p><strong>Email:</strong> <a href="mailto:{{ person.email }}">{{ person.email }}</a></p>
      </div>
    {% endfor %}
  </div>
{% endfor %}