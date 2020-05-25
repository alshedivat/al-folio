---
layout: page
title: projects
permalink: /projects/
description: Quick overview of things I am working or have worked on

social: true
---

{% for project in site.projects %}

{{ project.title }}: {{ project.description }}

{% if project.collaborators %}
* Collaborators:
{% for collab in project.collaborators %}
    * [{{ collab.name }}]({{ collab.site }})
{% endfor %}
{% endif %}

{% endfor %}
