---
layout: post
title: Rating TV Shows Using Linear Regression
description: The M Score
tags: data, code
giscus_comments: true
date: 2024-03-09
featured: true

authors:
  - name: Roman Yefimets

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Equations
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2
  - name: Citations
  - name: Footnotes
  - name: Code Blocks
  - name: Interactive Plots
  - name: Layouts
  - name: Other Typography?

---

A few days I was browsing throw my numerous streaming services looking for a new show to start. `The Blacklist` peaked my interest, as I had seen pop up before and never really gave it a shot. But 10 seasons, now that's a commitment. Not wanting to jump into it right away, I went to see what Reddit had to say. It seemed the consensus was that the show started out well, but just was not worth finishing, as the writing declined in quality. Others suggested that `Person of Interest` would be a better watch. 

An idea began forming in my mind: What if I could use individual episode ratings to get a better picture of how a show performs over time? IMDB had just the data that I needed, but it turns out they don't like handing out API access for personal use. They did however, send me an email pointing me to their [free data set](https://datasets.imdbws.com/), which allowed me to download the needed data in `tsv` format. How neat. With a simple python conversion to `csv` I was easily able to import the data sets into my local MySQL database using `DBeaver`.  

*Using the csv files was actually sufficient as first to get charts going with `Matplotlib`, but sql became much more efficient later when aggregating.*

## Plotting the Data

Using the episode ratings, I plotted my first chart.

{% include figure.liquid loading="eager" path="assets/img/graphs/blacklist-scatter.png" class="img-fluid rounded z-depth-1" %} 

This data might be interesting to look at, but it did not help me with my ultimate goal, which was to compare these results to other tv shows. Enter linear regression.

*"Linear regression is a statistical model which estimates the linear relationship between a scalar response and one or more explanatory variables."* - [Wikipedia](https://en.wikipedia.org/wiki/Linear_regression)

{% include figure.liquid loading="eager" path="assets/img/graphs/blacklist-regression.png" class="img-fluid rounded z-depth-1" %} 
