---
layout: page
permalink: /research/
title: Research
description: 
nav: true
nav_order: 4
---

**State Authority and Its Limits (under review)**

I show how the existence of disagreement about democracy itself creates issues for influential accounts of state legitimacy of Kantian and Hobbesian origin, which are premised on the rejection of anarchy. Instead, I contend the right to coerce arises from the autonomy of citizens to self-organize as they wish (possibly, without a state).

**State Legitimacy and Exit**

I show that a typical approach to state legitimacy - premised on maintaining the autonomy of citizens - fails to explain why citizens that dissent from majorities retain autonomy. I argue that the right to coerce dissenters only arises when they have robust exit options (e.g., subsidized emigration). I further argue that states might have a duty to enter multilateral migration agreements in order to guarantee the autonomy of their own citizens.

**Further work**

In the remaining chapters of my dissertation, I explore how political systems can be stable despite the existence of antidemocratic, or “unreasonable,” citizens. I am interested in how exit-based systems like the above can achieve that goal.

{% if site.data.research.github_users %}

## GitHub users

<div class="research d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.research.github_users %}
    {% include repository/repo_user.liquid username=user %}
  {% endfor %}
</div>

---

{% if site.repo_trophies.enabled %}
{% for user in site.data.research.github_users %}
{% if site.data.research.github_users.size > 1 %}

  <h4>{{ user }}</h4>
  {% endif %}
  <div class="research d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_trophies.liquid username=user %}
  </div>

---

{% endfor %}
{% endif %}
{% endif %}

{% if site.data.research.github_repos %}

## GitHub research

<div class="research d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.research.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
