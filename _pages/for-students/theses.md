---
layout: page
permalink: /for-students/theses/
title: Theses
description:
nav: false
nav_order: 1
display_categories: [open]
horizontal: false
---

<div class="theses">
    {% for thesis in site.student_theses %}
    {% include student_theses.html %}
    {% endfor %}
</div>
