---
layout: page
permalink: /repositories/
title: Data
description: This page consists of datasets and other public goods.
nav: true
nav_order: 3
---



{% if site.data.repositories.github_repos %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.html repository=repo %}
  {% endfor %}
</div>
{% endif %}