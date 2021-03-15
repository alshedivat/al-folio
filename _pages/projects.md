---
layout: page
title: projects
permalink: /projects/
description: 
nav: true
---
<!--
<div class="projects grid">

  {% assign sorted_projects = site.projects | sort: "importance" %}
  {% for project in sorted_projects %}
  <div class="grid-item">
    {% if project.redirect %}
    <a href="{{ project.redirect }}" target="_blank">
    {% else %}
    <a href="{{ project.url | relative_url }}">
    {% endif %}
      <div class="card hoverable">
        {% if project.img %}
        <img src="{{ project.img | relative_url }}" alt="project thumbnail">
        {% endif %}
        <div class="card-body">
          <h2 class="card-title text-lowercase">{{ project.title }}</h2>
          <p class="card-text">{{ project.description }}</p>
          <div class="row ml-1 mr-1 p-0">
            {% if project.github %}
            <div class="github-icon">
              <div class="icon" data-toggle="tooltip" title="Code Repository">
                <a href="{{ project.github }}" target="_blank"><i class="fab fa-github gh-icon"></i></a>
              </div>
              {% if project.github_stars %}
              <span class="stars" data-toggle="tooltip" title="GitHub Stars">
                <i class="fas fa-star"></i>
                <span id="{{ project.github_stars }}-stars"></span>
              </span>
              {% endif %}
            </div>
            {% endif %}
          </div>
        </div>
      </div>
    </a>
  </div>
{% endfor %}

</div>

-->

• Jun/2016 - Dec/2016 LSD - OpenStack (Professional)

• Jan/2016 - May/2016 LIEC - Petrobrás (Professional)

• Jul/2012 – Jul/2013 Percomp-AOC (Undergraduate)

• Apr/2011 – Jun/2012 Percomp - Positivo (Undergraduate)

• Jan/2011 – Mar/2011 Percomp - Samsung (Undergraduate)

• May/2010 – Dec/2010 Percomp - Signove (Undergraduate)
