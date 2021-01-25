---
layout: page
title: admixture and ancient DNA
description: uncovering population history from ancient human remains
img: /assets/img/Kopila.JPG
importance: 3
---

**This is an ongoing project as part of my dissertation thesis**

</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/kopila_site.jpg' | relative_url }}" alt="" title="Kopila Site"/>
    </div>
</div>
<div class="caption">
    Kopila Arhaeological Site, Korčula, Croatia. Photo Credit: Vela Luka Centre for Culture.
</div>

Croatian archaeologists uncovered a mass grave at the Kopila Archaeological Site on the island of Korčula. The grave dating from 300 to 100 B.C. (>2000 yrs old), with more than 100 babies in Kopila (on th)

 conducted excavations in Kopila (on the island of ), I am working on analyzing DNA extracted from 

 
Illyrians are thought to be autochthonous to this region, this is traditionally what we are taught, whatever that means (since Bronze Age at least). The term Illyrian is considered for the whole Balkan region, but there are separations (that we know from ancient sources) into different tribes of Illyrian. They are here before Greek colonists, and Romans, these come much later into play, at least at this island example. Kopila (on Korčula) is close to the Greek colonies on other islands in vicinity, and during the age of necropolis, Romans fight them as well. So culturally, they use Greek import goods, and other luxury goods from around Europe, but biologically, do they mix with the colonizing populations/Romans - we were usually taught they are not, but we do not know. 
Based on that, we'd like to merge with other ancient samples from the region to look at ancestry and potential admixture. Only 5 samples have reasonable (still low) coverage, so we will see what we can say. It would also be good to redo and maybe extend the kinship/mtDNA analyses.

I suggest starting to read through some aDNA papers to get a sense of the methods. Papers by David Reich are less applicable because they use a SNP capture approach; this was low coverage whole genome sequencing, and will be analyzed using genotype likelihoods instead of calling genotypes. Papers by Eske Willerslev, Mattias Jakobsson, Daniel Wegmann are probably mostly helpful for methods. Reich lab has published some Grek aDNA that may be part of the analyses though.

Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
Make your photos 1/3, 2/3, or full width.

To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/1.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/3.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/5.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/5.jpg' | relative_url }}" alt="" title="example image"/>
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
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/6.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/11.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>


The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/" target="_blank">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

```html
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/6.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/11.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
```
