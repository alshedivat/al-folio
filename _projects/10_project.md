---
layout: page
title: project 10
description: a project with lightbox images 🎉
img: assets/img/7.jpg
importance: 5
category: fun
---

To use lightbox images, include the `lightbox.liquid` snippet and specify the group ID.

{% raw %}

```html
<div class="row align-items-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include lightbox.liquid lightbox-groupid="group1" loading="eager" path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include lightbox.liquid lightbox-groupid="group1" loading="eager" path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include lightbox.liquid lightbox-groupid="group1" loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
```

{% endraw %}

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include lightbox.liquid lightbox-groupid="group1" loading="eager" path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include lightbox.liquid lightbox-groupid="group1" loading="eager" path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include lightbox.liquid lightbox-groupid="group1" loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>

If you don't want to group images together, you can use the `lightbox.liquid` snippet alone, not specifying a group ID.

{% raw %}

```html

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include lightbox.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The enlarged image is smaller on my screen than the embedded one. It's like magic.
</div>
    
```
    
{% endraw %}

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include lightbox.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The enlarged image is smaller on my screen than the embedded one. It's like magic.
</div>

Just make sure you set the `lightbox.enabled` option to true in the `_config.yml` file.

{% raw %}

```yaml
lightbox.enabled: true
```
    
{% endraw %}