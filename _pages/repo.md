---
layout: page
permalink: /repo/
title: repo
nav: true
description: GitHub repo cards.
---

<!-- STYLE -->
{% assign themes = "light_theme" %}
{% assign title_color = site.data.github_style.theme[themes].title_color %}
{% assign text_color = site.data.github_style.theme[themes].text_color %}
{% assign icon_color = site.data.github_style.theme[themes].icon_color %}
{% assign bg_color = site.data.github_style.theme[themes].bg_color %}
{% assign border_color = site.data.github_style.theme[themes].border_color %}
{% assign style = '&title_color=' | append: title_color | append: '&text_color=' | append: text_color | append: '&icon_color=' | append: icon_color | append: '&bg_color=' | append: bg_color | append: '&border_color=' | append: border_color %}

<div class="repositories d-flex flex-wrap justify-content-between align-items-center">
  {% for repo in site.data.repo.repositories %}
  {% assign url =  repo | split: '/' %}
    <div class="repo pr-2 pb-2">
      <a href="https://github.com/{{ repo }}">
        <img class="repo-img-light" alt="{{ repo }}" src="https://github-readme-stats.vercel.app/api/pin/?username={{ url.first }}&repo={{ url.last }}&theme={{ site.repo_theme_light }}">
        <img class="repo-img-dark" alt="{{ repo }}" src="https://github-readme-stats.vercel.app/api/pin/?username={{ url.first }}&repo={{ url.last }}&theme={{ site.repo_theme_dark }}">
      </a>
    </div>
  {% endfor %}
</div>
