---
layout: post
title: a post with marimo snippets
date: 2025-04-28 12:00:00
description: running Python in the browser with marimo
tags: code formatting
categories: sample-posts
marimo: true
---

[marimo](https://marimo.io) notebooks can run Python directly in the reader's browser. Opt a page in from its front matter:

```yaml
---
layout: post
title: a post with marimo snippets
marimo: true
---
```

Nothing is loaded on pages without that flag, so bundling the plugin costs nothing site-wide.

## Runnable snippets

Wrap fenced Python blocks in a container and the runtime turns them into an interactive notebook after the page loads:

<div class="al-marimo-inline" markdown="1">

```python
import marimo as mo

slider = mo.ui.slider(1, 20, value=5, label="n")
slider
```

```python
mo.md(f"The first {slider.value} squares: {[i**2 for i in range(1, slider.value + 1)]}")
```

</div>

Until the runtime has moved those blocks into place the container stays hidden, so readers never see the raw source flash before it becomes a notebook.

## Embedding a hosted notebook

If you already publish a notebook — on `marimo.app` or your own WASM host — embed it instead:

```liquid
{% raw %}{% al_marimo_embed src="https://marimo.app/l/your-notebook" height="700px" caption="Sampling demo" %}{% endraw %}
```

The frame is sandboxed **without** `allow-same-origin`, so the embedded notebook cannot reach this page's storage or cookies.

## A note on what this loads

The `marimo-snippets` runtime is vendored into the plugin at a pinned version and served from your own site, rather than pulled from a CDN — so no third-party origin executes script in your readers' pages. Running a notebook does contact marimo's host, which is worth knowing before you opt a page in.
