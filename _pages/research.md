---
layout: page
permalink: /research/
title: Research
description:
nav: true
nav_order: 3
---

## Working papers

---

{% for paper in site.data.research %}
<details>
  <summary>
    <strong>{{ paper.title }}</strong>
    {% if paper.authors %}
      with 
      {% for author in paper.authors %}
        <a href="{{ author.url }}" target="_blank">{{ author.name }}</a>{% if forloop.last == false %}, {% endif %}
      {% endfor %}
    {% endif %}
  </summary>
  <p><em>{{ paper.abstract }}</em></p>

  {% if paper.link %}
    <p><a href="{{ paper.link }}" target="_blank">Download PDF</a></p>
  {% endif %}

  {% if paper.pdf %}
    <p><a href="{{ paper.pdf }}" target="_blank">Download PDF</a></p>
  {% endif %}
</details>
---
{% endfor %}

## Work in Progress

{% for project in site.data.work_in_progress %}
- **{{ project.title }}**{% if project.authors %} with {% for author in project.authors %}<a href="{{ author.url }}" target="_blank">{{ author.name }}</a>{% if forloop.last == false %}, {% endif %}{% endfor %}{% endif %}. <em>{{ project.description }}</em>
{% endfor %}








