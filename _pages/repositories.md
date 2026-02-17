---
layout: page
permalink: /repositories/
title: Repositories
description: A curated selection of my open-source and academic repositories in scientific computing, CFD, and numerical methods.
nav: true
nav_order: 4
---

## Featured Repositories

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>

<div class="text-center mt-3">
  <a class="btn btn-outline-primary btn-sm"
     href="https://github.com/{{ site.data.repositories.github_users[0] }}"
     target="_blank"
     rel="noopener">
    View all repositories on GitHub →
  </a>
</div>