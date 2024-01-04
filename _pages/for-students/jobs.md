---
layout: page
permalink: /for-students/jobs/
title: Jobs
description:
nav: false
nav_order: 1
display_categories: [open]
horizontal: false
---

> **We are hiring!** 👩‍🎓🧑‍🏫👩‍⚕️🙋‍♂️ We are currently looking for **several student assistants** with an interest in machine learning.


<div class="jobs">
    {% for job in site.student_jobs %}
    {% include student_jobs.html %}
    {% endfor %}
</div>
