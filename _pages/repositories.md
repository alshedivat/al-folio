---
layout: page
permalink: /repositories/
title: repositories
description: The repository aims to provide a resource for students and researchers who want to use Python as a computational tool in solve complex problems.
nav: true
nav_order: 4
---


>All repositories and source code are available directly through the blog, we can visit [/Random Spaces](https://dindagustiayu.github.io/randomspaces.github.io/), and learn anything with interactive notebooks.
>


{% if site.data.repositories.github_users %}

## GitHub users

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.liquid username=user %}
  {% endfor %}
</div>
{% endif %}

{% if site.data.repositories.github_repos %}

## GitHub Repositories

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
