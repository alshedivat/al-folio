---
layout: post
title: a post with Google Charts
date: 2025-04-19 13:29:00
description: this is what included Google Charts code could look like
tags: formatting charts
categories: sample-posts
chart:
  google_charts: true
---

This is an example post with some [Google Charts](https://developers.google.com/chart) code. You should use JSON literal notation to include the code in your post. The code should be wrapped in a code block with the `google_charts` tag.
The code should look like this:

````markdown
```google_charts
{
  "chartType": "LineChart",
  "dataSourceUrl": "http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&pub=1",
  "query": "SELECT A,D WHERE D > 100 ORDER BY D",
  "options": {"title":"Population Density (people/km^2)", "legend":"none"}
}
```
````

Which generates:

```google_charts
{
  "chartType": "LineChart",
  "dataSourceUrl": "http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&pub=1",
  "containerId": "visualization",
  "query": "SELECT A,D WHERE D > 100 ORDER BY D",
  "options": {"title":"Population Density (people/km^2)", "legend":"none"}
}
```
