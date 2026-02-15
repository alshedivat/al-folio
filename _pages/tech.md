---
layout: single
title: tech
permalink: /tech/
# description: A growing collection of your cool projects.
nav: true
# display_categories: [Components, Applications]
horizontal: false
---

{% for category in site.categories %}
<h3>{{ category[0] }}</h3>
   <ol>
    {% for post in category[1] %}
      <li>
      <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </li>
    {% endfor %}
   </ol>
   ----
{% endfor %}