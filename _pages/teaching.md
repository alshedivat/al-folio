---
layout: page
permalink: /teaching/
nav_title: teaching
# description: Materials for courses you taught. Replace this text with your description.
nav: true
horizontal: false
display_categories: [21/22Z]
---

<!-- For now, this page is assumed to be a static description of your courses. You can convert it to a collection similar to `_projects/` so that you can have a dedicated page for each course.

Organize your courses by years, topics, or universities, however you like! -->

<div class="projects">
 {% for category in page.display_categories %}
      <h2 class="category">{{category}}</h2>
      {% assign categorized_projects = site.teaching | where: "category", category %}
      {% assign sorted_projects = categorized_projects | sort: "importance" %}
      <!-- Generate cards for each project -->
        <div class="container">
          <div class="row row-cols-1">
          {% for project in sorted_projects %}
            {% if project.show%}
                {% include teaching.html %}
            {%endif%}
          {% endfor %}
          </div>
        </div>
    {% endfor %}
</div>