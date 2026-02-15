---
layout: single
title: Education
permalink: /education/
author_profile: true
---

{% assign items = site.education | sort: "path" | reverse %}
{% for item in items %}
### {{ item.degree }} | {{ item.institution }}
{{ item.from }} - {{ item.to }}  
{{ item.major }}  
{{ item.location }}
{% if item.cpi %}CPI: {{ item.cpi }}{% endif %}
{% if item.percentage %}Percentage: {{ item.percentage }}{% endif %}

{% endfor %}
