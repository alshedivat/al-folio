---
layout: single
title: Experience
permalink: /experience/
author_profile: true
---

{% assign items = site.experience | sort: "path" | reverse %}
{% for item in items %}
### {{ item.position }} | {{ item.name }}
{{ item.from }} - {{ item.to }}  
{{ item.location }}

{% endfor %}
