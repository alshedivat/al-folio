---
layout: page
permalink: /research/
title: Research
description: 
nav: true
nav_order: 4
---

## Working Papers

### State Authority and Its Limits (under review)

I show how the existence of deep disagreement among citizens (e.g., about democracy itself) creates issues for influential contemporary accounts of state legitimacy of Kantian and Hobbesian origin. I argue that they cannot consistently impose _limits_ (e.g. justice-based requirements) on state activity. I contend, instead, that the right to coerce arises from the autonomy of citizens to self-organize as they wish (not on the rejection of anarchy, contra Kant and Hobbes).

### State Legitimacy and Exit

I show that a typical approach to state legitimacy - premised on maintaining the autonomy of citizens - fails to explain why citizens that _dissent_ from majorities retain autonomy. I argue that the right to coerce dissenters only arises when they have robust exit options (e.g., subsidized emigration). Additionally, I contend that states might have duties to enter multilateral free-movement agreements in order to guarantee the autonomy of their own citizens. This connects my research to existing work on _polycentricity._

### Further work

In the remaining chapters of my dissertation, I explore how political systems can be _stable_ despite the existence of antidemocratic, or “unreasonable,” citizens. I am interested in how polycentric systems like the above can achieve that goal.

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
