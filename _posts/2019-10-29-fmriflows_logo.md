---
layout: post
title:  The fMRIflows logo
date:   2019-10-29 12:00:00
description: The story behind the beautiful flow.
---

## The parcellation

While working on my [parcellation fragmenter toolbox](https://github.com/miykael/parcellation_fragmenter), I realized that this type of surface mesh on the human brain looks rather appealing. As a quick recap, the parcellation fragmenter allows you to take the cortical surface mesh (usually acquired with Freesurfer's `recon-all` routine) and subdivide it into N-equal sized tiles.

The trick behind this is rather smooth, using the surface mesh inflated to a sphere, we use K-mean clustering to equally tile the surface of the spheres into N regions. These regional labels can then be preserved when the surface mesh is brought back onto the cortex.

The following figure shows how this parcellation is done with increasing N (from left to right: 16, 64, 256, 1024, 4096) and from top to bottom, how it looks like on the sphere, inflated cortical and actual cortical surface mesh.

<img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo_collage.png" data-zoomable width=600px style="padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; background-color: #fff">

<br>

Beautiful, isn't it? I had to share it!

<br>

{% twitter https://twitter.com/miyka_el/status/1028027334245285889 %}

## The exploration

After these appealing figures, I realized that I could use something like this as a logo for my newly developed neuroimaging toolbox, called <a href="https://github.com/miykael/fmriflows">fMRIflows</a>. I therefore went ahead and created multiple different visualizations.

First, I explored different starting points for the color gradient.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo_gradient1.png" data-zoomable style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; background-color: #fff">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo_gradient2.png" data-zoomable style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; background-color: #fff">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo_gradient3.png" data-zoomable>
    </div>
</div>

<br>

I then wrote a little script that slowly shifts the gradient coloring to give the impression of a constant flow. To better explore which colormap to use, I created a few examples.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo_color1.gif" data-zoomable style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; background-color: #fff">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo_color2.gif" data-zoomable style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; background-color: #fff">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo_color3.gif" data-zoomable style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; background-color: #fff">
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo_color4.gif" data-zoomable style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; background-color: #fff">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo_color5.gif" data-zoomable style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; background-color: #fff">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo_color6.gif" data-zoomable style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; background-color: #fff">
    </div>
</div>

<br>

Personally, I prefer the `Spectral` colormap, and so I decided to use the last animation.

## The logo

And so, together with the help of my friend [Faruk](https://github.com/ofgulban), we created the fMRIflows logo...

<img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo.png" data-zoomable width=600px style="padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px">

.. and the corresponding animation!

<img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_fmriflows_logo.gif" data-zoomable style="padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; background-color: #fff">
