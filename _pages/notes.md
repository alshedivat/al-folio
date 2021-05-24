---
layout: page
title: notes
permalink: /notes/
description: University Notes.
nav: true
social: true
---

<div class="notes grid">

  {% assign sorted_notes = site.notes | sort: "importance" %}
  {% for note in sorted_notes %}
  <div class="grid-item">
    {% if note.redirect %}
    <a href="{{ note.redirect }}" target="_blank">
    {% else %}
    <a href="{{ note.url | relative_url }}">
    {% endif %}
      <div class="card hoverable">
        {% if note.img %}
        <img src="{{ note.img | relative_url }}" alt="note thumbnail">
        {% endif %}
        <div class="card-body">
          <h2 class="card-text">{{ note.title }}</h2>
          <p class="card-text">{{ note.description }}</p>
          <div class="row ml-1 mr-1 p-0">
            {% if note.github %}
            <div class="github-icon">
              <div class="icon" data-toggle="tooltip" title="Code Repository">
                <a href="{{ note.github }}" target="_blank"><i class="fab fa-github gh-icon"></i></a>
              </div>
              {% if note.github_stars %}
              <span class="stars" data-toggle="tooltip" title="GitHub Stars">
                <i class="fas fa-star"></i>
                <span id="{{ note.github_stars }}-stars"></span>
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
