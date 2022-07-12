---
layout: page
permalink: /repo/
title: repositories
nav: true
description: GitHub repo cards.
---

## GitHub users

{% if site.data.repositories.usernames %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for users in site.data.repositories.usernames %}
    <div class="repo p-2 text-center">
      <a href="https://github.com/{{ users }}">
        <img class="repo-img-light" alt="{{ users }}" src="https://github-readme-stats.vercel.app/api/?username={{ users }}&theme={{ site.repo_theme_light }}">
        <img class="repo-img-dark" alt="{{ users }}" src="https://github-readme-stats.vercel.app/api/?username={{ users }}&theme={{ site.repo_theme_dark }}">
      </a>
    </div>
  {% endfor %}
</div>
{% endif %}

---

## Repositories

{% if site.data.repositories.repositories %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.repositories %}
  {% assign repo_url =  repo | split: '/' %}
  {% if site.data.repositories.usernames contains repo_url.first %}
  {% assign show_owner = false %}
  {% else %}
  {% assign show_owner = true %}
  {% endif %}
    <div class="repo p-2 text-center">
      <a href="https://github.com/{{ repo }}">
        <img class="repo-img-light" alt="{{ repo }}" src="https://github-readme-stats.vercel.app/api/pin/?username={{ repo_url.first }}&repo={{ repo_url.last }}&theme={{ site.repo_theme_light }}&show_owner={{ show_owner }}">
        <img class="repo-img-dark" alt="{{ repo }}" src="https://github-readme-stats.vercel.app/api/pin/?username={{ repo_url.first }}&repo={{ repo_url.last }}&theme={{ site.repo_theme_dark }}&show_owner={{ show_owner }}">
      </a>
    </div>
  {% endfor %}
</div>
{% endif %}
