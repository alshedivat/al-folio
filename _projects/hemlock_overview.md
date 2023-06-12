---
layout: page
title: Hemlock Conservation
description: Creating the infrastructure for Hemlock conservation.
img: assets/img/canadensis_project_thumbnail.jpeg
importance: 1
category: overview
---

Hemlocks (_Tsuga_) are a geuns of temperate forest trees critically important in their ecosystems. In eastern North American forests, the Eastern Hemlock (_T. canadensis_) is a keystone species, providing numerous services like carbon cycling, water quality stabilization, and habitat for organisms (plant, animal, and fungi alike). Unfortunately, both the Eastern Hemlock and the Carolina Hemlock (_T. caroliniana_) are imperiled by an invasive pest.

In the early 20<sup>th</sup> century the [hemlock woolly adelgid](https://en.wikipedia.org/wiki/Hemlock_woolly_adelgid) (HWA) was introduced into Richmond, Virginia, an event which would have devastating consequences for eastern forests. The HWA is a sap-feeding insect that can kill hemlocks in as few as four years. Millions of acres of hemlock have been lost in recent decades, leading the IUCN to list the Eastern Hemlock as [near threatened](https://www.iucnredlist.org/species/42431/2979676).

Despite the sustained threats of population collapse from the adelgid and climate change, there is hope for the recovery of the species. Working with scientists from the University of Michigan, USDA Forest Service, Natural Resources Canada, the Holden Arobretum, and others, we are developing a conservation program for the Eastern Hemlock. Using princpiles of genomics, plant breeding, and ecology, we are creating the genomic and germ plasm resources to create solutions for the complex problems the species faces.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/IMG_2110_v1.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/IMG_9289.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Hemlock wooly adelgid (HWA) infesting a sapling in the Chattaho0chee National Forest (left). Happy conifer hands (center). HWA-resistant 'Bulletproof' trees from URI (right).
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/pcg_hemlock_program.png"
        title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Current research underway in the Plant Computational Genomics Lab for Eastern Hemlock conservation. These aims encompass multiple students and funding agencies. 
</div>

In the [PCG](http://plantcompgenomics.com/), we are starting from first principles of conservation genomics: a reference genome, then population surveys. Using funding from the Nature Conservancy and the USDA, we are sequencing the genome of an eastern hemlock accession from the [Arnold Arboretum](https://arboretum.harvard.edu/explorer/?id=1509-1*A) (Aim 1). Using comparative genomic methods, we are investigating patterns of evolution on terpenoid synthase (TPS) genes which biosynthesize terpenoids, an important class of molecules invovled in numerous ecological interactions. Again, our sample is dervied from collaborations with the Arnold Arboretum and with the USDA Forest Service Northern Research Station (Aim 2). With our partners from the [Cernak Lab](https://cernaklab.com/) we are investigating terpeonid metabolism in hemlocks across seasonal vartion and among _Tsuga_ (Aim 3). 


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/IMG_2014_v1.jpeg" title="Arnold Hemlock" class="img-fluid rounded z-depth-1" %}
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
        {% include figure.html path="assets/img/IMG_2014_v1.jpeg" title="Arnold Hemlock" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
```
{% endraw %}
