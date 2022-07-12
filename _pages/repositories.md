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
  {% for user in site.data.repositories.usernames %}
    {% include repository/repo_user.html username=user %}
  {% endfor %}
</div>
{% endif %}

---

## Repositories

{% if site.data.repositories.repositories %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.repositories %}
    {% include repository/repo.html repository=repo %}
  {% endfor %}
</div>
{% endif %}
