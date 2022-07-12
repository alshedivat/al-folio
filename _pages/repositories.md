---
layout: page
permalink: /repo/
title: repositories
nav: true
description: GitHub repo cards.
---

<div class="repositories d-flex flex-wrap justify-content-between align-items-center">
  {% for repo in site.data.repositories %}
  {% assign url =  repo | split: '/' %}
    <div class="repo pr-2 pb-2">
      <a href="https://github.com/{{ repo }}">
        <img class="repo-img-light" alt="{{ repo }}" src="https://github-readme-stats.vercel.app/api/pin/?username={{ url.first }}&repo={{ url.last }}&theme={{ site.repo_theme_light }}">
        <img class="repo-img-dark" alt="{{ repo }}" src="https://github-readme-stats.vercel.app/api/pin/?username={{ url.first }}&repo={{ url.last }}&theme={{ site.repo_theme_dark }}">
      </a>
    </div>
  {% endfor %}
</div>
