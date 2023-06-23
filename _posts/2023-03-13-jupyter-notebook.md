---
layout: post
title: a post with jupyter notebook
date: 2023-03-13 08:57:00-0400
description: an example of a blog post with jupyter notebook
categories: sample-posts jupyter-notebook
giscus_comments: true
related_posts: false
---

{::nomarkdown}
{% assign jupyter_path = "/assets/jupyter/blog.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists /assets/jupyter/blog.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
    {% jupyter_notebook jupyter_path %}
{% else %}
    <p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}
