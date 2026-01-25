---
layout: post
title: a post with graph linking posts
date: 2025-11-29 10:22:50
description: this is what included graph linking different posts could look like
tags: wiki-links graphs charts
categories: sample-posts
---

This example post demonstrates two key features to make your blog more interactive: 

1. the integration of wiki-links, and 
2. the powerful visualization of relationships/connections between posts through the generated graph view

Both of these features are introduced via the `post_links_graph_generator.rb` plugin, which enables wiki-link support by default, without any additional configuration.


## Wiki-links Example
To add a wiki-link to your blog post, simply enclose the filename of the target post in double square brackets. 

For example, [<span style="display:none;"></span>[2024-12-04-photo-gallery]] results into [[2024-12-04-photo-gallery]].


## Simple Graph Example
First, add the following to the main config file (`_config.yml` in our case), unless it already exists:
{% highlight yaml linenos %}
{% raw %}
enable_graph_plugin: true
graph_field: ["tags", "categories"]
graph_include_wiki_links: true
{% endraw %}
{% endhighlight %}

These three fields decide how the graph is generated and which relationships between notes are visualized:
- `enable_graph_plugin: true` Enables the generation of graph based on the specified parameters.
- `graph_field: ["tags", "categories"]` Specifies which metadata fields should be used to form graph edges. Notes sharing the same tag or category will be linked.
- `graph_include_wiki_links: true` Enables additional connections created through wiki-style internal links.


Connections between posts can be established using data from any field located in the post's metadata, such as tags, categories, or other custom variables.


Then, the following syntax:

````markdown
{% raw %}
{% include posts_graph.html %}
{% endraw %}
````

will generate:
{% include posts_graph.html graph_id="graphA" %}

Only the nodes representing individual posts are interactive. You can click on the post nodes directly; they serve as active links that immediately redirect you to the corresponding blog post.

> ##### Fun Fact
>
> You can generate the graph containing only nodes for 
> each post without any connections by commenting out 
> two lines in the main config file: `graph_field`
> and `graph_include_wiki_links`. 
{: .block-tip }


### Showing Only Linked Posts in Graph
For displaying posts only linked to the current post

````markdown
{% raw %}
  {% include posts_graph.html show_controls=false focus_post=page.title focus_depth=1 %}
{% endraw %}
````

will generate:

{% include posts_graph.html graph_id="graphB"  show_controls=false focus_post=page.title focus_depth=1 %}


Let's understand each parameter used to render this graph:
- `show_controls=false` tells not to render the controls including search bar, filter button, and reset button.
- `focus_post=page.title` passes the title of the current post into the graph script as a keyword. It focuses and filters graph by the title of this post.
- `focus_depth=1` sets the maximum degree of depth to `1` from the central focused post, i.e., the current post.


### Linked Post Graph Beside Related Posts
Additionally, we can add the focused graph with connections to the current post beside the related posts section at the bottom of each post. 
To do so, replace the code in the [`related_posts.liquid`](https://github.com/alshedivat/al-folio/blob/a66d975b6894d99584d0404d9dc6a657026d9517/_includes/related_posts.liquid) file with the following code:


{% highlight liquid linenos %}
{% raw %}
{% assign have_related_posts = false %}
{% for post in site.related_posts | limit: site.related_blog_posts.max_related %}
  {% unless have_related_posts %}
    {% assign have_related_posts = true %}
    {% if page.layout == 'post' %}
      <br> <hr> <br>
    {% endif %}
    <h2 class="text-3xl font-semibold mb-4 mt-12">Enjoy Reading This Article?</h2>
  {% endunless %}
{% endfor %}

{% if have_related_posts %}
<div style="display: grid; grid-template-columns: 43% 57%;
    gap: 1.5rem; align-items: stretch;" >
  <div>
    <p class="mb-2">Here are some more articles you might like:</p>
    <ul class="list-disc pl-8">
      {% for post in site.related_posts | limit: site.related_blog_posts.max_related %}
        <li class="my-2">
          <a class="text-pink-700 underline font-semibold hover:text-pink-800" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </div>

  <div style=" min-height: 400px; display: flex; flex-direction: column; "  >
    {% assign node_name = page.title | escape %}
    <div id="graph-wrapper" style="width: 90%; height: 100%;">
      {% include posts_graph.html graph_id="linked_posts" show_controls=false focus_post=page.title focus_depth=1 %}
    </div>
  </div>
</div>

{% else %}

{% assign node_name = page.title | escape %}
{% include posts_graph.html graph_id="linked_posts" show_controls=false focus_post=page.title focus_depth=1 %}

{% endif %}
{% endraw %}
{% endhighlight %}


Enjoy exploring the connections in your graph!
