---
layout: page
title: 3D Heat Transfer Analysis in Architectural Modeling
description: Maryam Almaian
img: assets/img/theses/thesis_1.png
importance: 1
category: MS
---



{% capture remote_content %}{% remote_include https://raw.githubusercontent.com/kastnerp/MT-3D-Heat-Transfer-Analysis-in-Architectural-Modeling/main/README.md %}{% endcapture %}
{% assign lines = remote_content | split: '
' %}
{% for line in lines offset:2 %}
{{ line }}
{% endfor %}