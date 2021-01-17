---
layout: page
title: research
permalink: /research/
description: My research focuses on quantum optimization algorithms but I am generally interested in full-stack quantum computation. The interdisciplinary nature of the subject is what drew me in and I have taken quantum courses in computer science, physics, engineering, and chemistry to build a well-rounded understanding of the subject.

social: false
---

{% for project in site.research %}

{{ project.title }}: {{ project.description }} 

{% if project.collaborators %}
* Collaborators:
{% for collab in project.collaborators %}
    * [{{ collab.name }}]({{ collab.site }})
{% endfor %}
{% endif %}

{% if project.link %}
* [{{ project.link.title }}]({{ site.url }}{{ site.baseurl }}/assets/pdf/{{ project.link.filename }})
{% endif %}

{% endfor %}
