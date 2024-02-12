---
layout: page
title: Acquisition of renewable energy sites
description: Identified renewable energy sites to pursue as part of investment portfolio
img: assets/img/renewable_energy.jpeg
importance: 2
category: work 
giscus_comments: true
---

The aim of the consultancy project was to identify which renewable energy sites to pursue out of a pool of 50 simulated sites by identifying those that could be procured based on available staffing resources. This was done, keeping in portfolio diversification and assuming similar productivity levels of employees on all projects given the project requisites. The 50 potential sites, and resulting staff hours data were provided by the client. By implementing a linear optimization approach in R, the analysis recommends the acquisition of 22 sites.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>


<h>Baseline case study/<h>

I initially identified 50 potential sites that can be acquired for renewables production, amounting to a total of 2,382 MW production of electricity by April 2032 (considering a standard of 9 years for the project to be set up). Among the sites thus identified, the largest electricity producers in terms of MW are windmills, while BESS accounts for the smallest producer segments. However, I posit the production of renewables in all these 50 sites at the same time is an unrealistic target to be achieved in this period, given both staffing and programmatic constraints.

To begin with, there is a huge gap between staff required and present staff numbers to meet the demands of all these sites in the next 9 years. While this could be a factor toward initiating recruitment drives, I find myself less inclined to ask of the company that it hires more people immediately to meet the demands of the staffing requirements of all 50 sites. This is evident since the staff expansion required is to degrees much higher than the present staff numbers. Especially in the case of managerial roles the staffing hours deficit is about three times if we were to pursue all 50 sites at the same time.

Thus, my focus shifted toward looking at an optimal solution first based on present staff numbers and using that as a baseline for future development of projects. Furthermore, I believe out optimization methodology can be used company wide, to account for project feasibility, for staffing resource optimization, and in choosing long term projects.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>


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
