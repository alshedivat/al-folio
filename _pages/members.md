---
layout: page
permalink: /members/
title: titles.members
description:
nav: true
nav_order: 1
---

{% if site.data.members %}
<ul class="post-list">
{% for member in site.data.members %}
<li>
<div class="card mb-3">
  <div class="row no-gutters">
    <div class="col-md-4 pl-3 align-self-center">
      <img class="rounded-circle" src="/assets/img/{{ member.img }}">
    </div>
    <div class="col-md-8 p-3">
        <h3 class="card-title font-weight-medium">{% t member.name %}</h3>
        <h5 class="card-text">{% t member.position %}</h5>
        <p class="card-text">
          <a href="mailto:{{ member.email | encode_email }}" title="email"><i class="fas fa-envelope"></i></a> &nbsp;
          {% if member.mastodon %}
          <a href="{{ member.mastodon }}" title="Mastodon"><i class="fab fa-mastodon"></i></a> &nbsp;
          {% endif %}
          {% if member.twitter_username %}
          <a href="https://twitter.com/{{ member.twitter_username }}" title="Twitter"><i class="fab fa-twitter"></i></a> &nbsp;
          {% endif %}
          <a href="{{ member.website }}"><i class="fas fa-home"></i></a>
        </p>
        <p class="card-text">{% t member.description %}</p>
    </div>
  </div>
</div>
</li>
{% endfor %}
</ul>
{% endif %}
