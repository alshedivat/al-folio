---
layout: page
title: Groves et al. (2022) Cell Systems
description: Code associated with my publication in Cell Systems.
img: assets/img/cellsys_graphical_abstract.png
importance: 3
category: work
---
{% assign repo_url =  include.repository | split: '/' %}

{% if site.data.repositories.github_users contains repo_url.first %}
  {% assign show_owner = false %}
{% else %}
  {% assign show_owner = true %}
{% endif %}


<div class="repo p-2 text-center">
  <a href="https://github.com/smgroves/Groves-CellSys2021">
    <img class="repo-img-light w-100" alt="Groves-CellSys2021" src="https://github-readme-stats.vercel.app/api/pin/?username=smgroves&repo=Groves-CellSys2021&theme={{ site.repo_theme_light }}&show_owner={{ show_owner }}">
    <img class="repo-img-dark w-100" alt="Groves-CellSys2021" src="https://github-readme-stats.vercel.app/api/pin/?username=smgroves&repo=Groves-CellSys2021&theme={{ site.repo_theme_dark }}&show_owner={{ show_owner }}">
  </a>
</div>

Come back soon; this page is being updated!