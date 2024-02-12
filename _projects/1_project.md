---
layout: page
title: Digital media on store footfall
description: Exploring the effects of digital media on footfall in R
img: assets/img/footfall.jpeg
importance: 1
category: work
related_publications: Media campaign strategy
---

A client had given me footfall data for a period they ran media in 2022-2023. They wanted to understand how media effects footfall, the KPI that they have identified that drives their business forward.

I have all of my analysis in the R mardown file. Leveraging the ggplot libraries, along with tidyverse and dplyr among others, I have tried to study some general trends, best and worst performing stores. I have also spatially mapped the stores across UK to see the spread and visibility, as well as to see if there are any regional level differences.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/footfall2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/footfall3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="caption">
Rather than looking at absolute footfall numbers, since that is a product of the demographic population of the neighbhourhood the stores are in, the size of the store, and other external factors, there is a need to see the change in average weekly footfall to identify stores attracting most increases in footfall. As for Ad Spend, they were discrete investments, thus causal effects are conjectural, and based on hypothesis testing. 
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/footfall5.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/footfall4.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="caption">
    Differences in conversion rates captured by different media
</div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/footfall5.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Differences in conversion rates captured by different media
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, *bled* for your project, and then... you reveal its glory in the next row of images.

More of the project with codes and visualizations in R markdown file can be found on my <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Github repository!</a>


The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}
```html
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
```
{% endraw %}
