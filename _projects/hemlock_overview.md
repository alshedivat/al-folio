---
layout: page
title: Hemlock Conservation
description: Creating the infrastructure for Hemlock conservation.
img: assets/img/canadensis_project_thumbnail.jpeg
importance: 1
category: overview
---

Hemlocks (_Tsuga_) are a temperate genus of trees that are critically important in their ecosystems. In eastern North America, two species of hemlocks are keystone species, providing numerous services such as carbon cycling, habitat for organisms (plants, animals, and fungi alike), and timber for industry. Unfortunately, both the Eastern Hemlock (_T. canadensis_) and the Carolina Hemlock (_T. caroliniana_) are imperiled by an invasive pest.

In the early 20<sup>th</sup> century the [hemlock woolly adelgid](https://en.wikipedia.org/wiki/Hemlock_woolly_adelgid) (HWA) was introduced into Richmond, Virginia. HWA is a sap-feeding insect that will kill hemlock trees in as little as four years. Millions of acres of hemlock have been lost in recent decades, leading the IUCN to [list](https://www.iucnredlist.org/species/42431/2979676) the Eastern Hemlock as near threatened.

Despite the sustained threat of population collapse from the adelgid and climate change, there is hope for the recovery of the species. Working with scientists from the University of Michigan, USDA Forest Service, Natural Resources Canada, the Holden Arobretum, and others, we are developing a conservation program for the Eastern Hemlock. Using princpiles of genomics, plant breeding, and ecology, we are investigating multiple aspects of the biology of hemlocks and their evolution. 




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

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, *bled* for your project, and then... you reveal it's glory in the next row of images.


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
