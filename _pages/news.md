---
layout: page
permalink: /news/
title: News
description: 
nav: true
---

<div class="news">
    {% for project in sorted_projects %}
      {% include news.html %}
    {% endfor %}
</div>
