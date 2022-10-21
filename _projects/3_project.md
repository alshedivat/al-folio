---
layout: page
<<<<<<< HEAD
<<<<<<< HEAD
title: Load Modulated Balanced Amplifier (LMBA)
description:A new MMIC LMBA design
=======
title: LMBA Design
description: a project that redirects to another website
>>>>>>> parent of bc472c9 (p4)
img: assets/img/LMBA.png
=======
title: LMBA Design
description: a project that redirects to another website
img: assets/img/7.jpg
>>>>>>> parent of 1858503 (update p2/3)
#redirect: https://unsplash.com
importance: 3
category: work
---

Load modulated balanced amplifiers (LMBAs) are a balanced amplifier architecture that addresses efficiency issues at back-off operation power levels. Many modern communication standards have large peak-to-average power ratios (PAPR), which require amplifiers to operate at a wide range of power levels. Additionally, there has been a push for devices that are wideband in bandwidth and that meet high linearity requirements. Typical single amplifier designs or other amplifier architectures like the Doherty design cannot handle backoff power levels well or are narrowband.

The LMBA architecture consists of a balanced amplifier structure along with an additional control amplifier that injects a signal into one of the output ports of the balanced amplifier. The signal of the control amplifier is varied in magnitude and phase to load modulate the output of the balanced amplifiers to maintain output power or efficiency at a wide range of power levels or frequencies. 

Our work explored a MMIC LMBA design in the WIN Semiconductor .15 micrometer GaN HEMT process designed for X-band. An emphasis was given to high efficiency performance at a variety of conditions and an analysis was performed on operation at different frequencies, power levels, and for different device sizes. Further testing and performance metrics will be examined in future work.   

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
You describe how you toiled, sweated, *bled* for your project, and then... you reveal its glory in the next row of images.


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
