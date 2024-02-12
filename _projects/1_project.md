---
layout: page
title: Digital media on store footfall
description: Exploring the effects of digital media on footfall in R
img: assets/img/footfall.jpeg
importance: 1
category: work
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
</div>

More on the project with codes and visualizations in a R markdown file can be found on my <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Github repository!</a>