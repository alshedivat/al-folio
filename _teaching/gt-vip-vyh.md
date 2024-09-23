---
layout: page
title: VIP SMUR
description: Surrogate Modeling for Urban Regeneration
img:
importance: 6
category: Georgia Tech
---

{% capture remote_content %}{% remote_include https://raw.githubusercontent.com/VIP-SMUR/wiki/main/docs/index.md %}{% endcapture %}
{% assign lines = remote_content | split: '
' %}
{% for line in lines offset:2 %}
{{ line }}
{% endfor %}

---

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/teaching/VIP-Teaser_1.jpg" title="VIP-Teaser-1" class="img-fluid z-depth-1" %}
    </div>
</div>
