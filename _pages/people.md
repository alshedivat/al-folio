---
layout: page
title: people
description: Meet the amazing people working in the lab
nav: true
nav_order: 1
---

{% for p in site.data.people %}
  {% include person.html person=p %}
{% endfor %}
