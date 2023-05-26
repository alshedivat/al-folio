---
layout: people
title: people
subtitle: former students
description: Meet the amazing people working in the lab
nav: true
nav_order: 1
---

<h1 style="padding-bottom:2.5%;">People</h1>

{% for p in site.data.people %}
{% include person.html person=p %}
{% endfor %}

<h1 style="padding-bottom:2.5%; padding-top:2.5%;">Former Members</h1>

{% for p in site.data.former-people %}
{% include person.html person=p %}
{% endfor %}
