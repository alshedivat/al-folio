---
layout: page
title: students
permalink: /students/
description: 
nav: true
---

<div class="flex-container people image-container">
{% for person in site.data.students %}
  {% include person_image image=person.image caption=person.name link=person.website title=person.name %}
{% endfor %}
</div>