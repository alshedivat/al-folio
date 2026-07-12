---
layout: page
title: ESAB Projects
description: Various projects throughout my internship with the ESAB R&D department
img: assets/img/esab2.png
importance: 1
category: recent
giscus_comments: false
---

### About the Project

My time with ESAB gave me a valuable experience on the product design cycle. I started with the product engineers, helping with the chemical formulations behind new coated electrode prototypes. I walked through the various classifications and requirements new products need to pass, and learned about the materials science applications of each design.

I then spent time with Engineering Technicians, actually fabricating the different prototypes I had helped design. I was able to make both electrodes and flux-cored wire.

Finally, I worked with test welders to see how the prototypes held up in field-like conditions. While the potential product failed some tests, the addition of new raw materials increased the electrode performance when welding vertically (a problem area for the customer). I then graded the welds and the overall product, and brought that criteria back to the product engineers to begin the cycle again.

Attached below are pictures and videos of my test welding, as well as a picture of the team on my last day.

<style>
  .esab-gallery figure,
  .esab-gallery picture {
    display: block;
    width: 100%;
  }
  .esab-media {
    display: block;
    height: 260px;
    width: 100%;
    object-fit: cover;
  }
</style>

<div class="row row-cols-2 row-cols-md-3 justify-content-center esab-gallery">
    <div class="col d-flex justify-content-center mb-3">
        {% include figure.liquid loading="eager" path="assets/img/esab1.png" title="Welding a new product" class="esab-media rounded z-depth-1" %}
    </div>
    <div class="col d-flex justify-content-center mb-3">
        {% include figure.liquid loading="eager" path="assets/img/esab4.png" title="TIG weld" class="esab-media rounded z-depth-1" %}
    </div>
    <div class="col d-flex justify-content-center mb-3">
        <video class="esab-media rounded z-depth-1" controls autoplay muted loop playsinline preload="auto">
            <source src="{{ '/assets/video/esab3.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div class="col d-flex justify-content-center mb-3">
        <video class="esab-media rounded z-depth-1" controls autoplay muted loop playsinline preload="auto">
            <source src="{{ '/assets/video/esab5.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div class="col d-flex justify-content-center mb-3">
        {% include figure.liquid loading="eager" path="assets/img/esab2.png" title="The team on my last day" class="esab-media rounded z-depth-1" %}
    </div>
</div>
