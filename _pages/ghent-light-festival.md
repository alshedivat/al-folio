---
layout: gallery
permalink: /ghent-light-festival/
description: My photos. A gallery of nature photos and AI, including landscapes, wildlife, and plant life.
title: A More Complex Example
no_menu_item: true # required only for this example website because of menu construction
support: [jquery, gallery]
nav: true
nav_order: 5
---

This example shows how to include several galleries into one page. Also notice that some captions have been set.

{% include gallery-layout.html gallery=site.data.galleries.ghent-light-festival-1 id_number=1 %}

The pictures from part two:

{% include gallery-layout.html gallery=site.data.galleries.ghent-light-festival-2 id_number=2 %}

This is an example gallery. All images licensed under [CC-BY-NC-SA license][license]. Check the [Git Repo][repo] for a copy of this license.

[license]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[repo]: https://github.com/opieters/jekyll-gallery-example