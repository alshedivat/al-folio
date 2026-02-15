---
layout: archive
title: Projects
permalink: /projects/
author_profile: true
published: false
---

{% assign projects_sorted = site.projects | sort: "importance" %}
{% for post in projects_sorted %}
  {% include archive-single.html %}
{% endfor %}
