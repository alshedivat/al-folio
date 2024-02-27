---
layout: page
title: project 2
description: a project with a background image and giscus comments
img: assets/img/3.jpg
importance: 2
category: Python
giscus_comments: true
---

{% raw %}

```liquid
{::nomarkdown}
{% assign jupyter_path = 'assets/jupyter/blog.ipynb' | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/blog.ipynb %}{% endcapture %}
{% if notebook_exists == 'true' %}
  {% jupyter_notebook jupyter_path %}
{% else %}
  <p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}
```

{% endraw %}
