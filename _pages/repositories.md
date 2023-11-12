---
layout: page
permalink: /repositories/
title: repositories
description: Research software and open source projects.
nav: true
nav_order: 3
---

{% if site.data.repositories.github_users %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.html username=user %}
  {% endfor %}
</div>
{% endif %}

---

## Major Research Software

{% if site.repo_trophies.enabled %}
{% if site.data.repositories.research_github_repos %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.research_github_repos %}
    {% include repository/repo.html repository=repo %}
  {% endfor %}
</div>
{% endif %}
{% endif %}

---

## Open Source Software

Benchmarking tools, PIN and LLVM passes, and all other minor tools that help with daily programming tasks.

{% if site.data.repositories.tools_github_repos %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.tools_github_repos %}
    {% include repository/repo.html repository=repo %}
  {% endfor %}
</div>
{% endif %}
