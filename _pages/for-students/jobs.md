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

<div>
    {% for job in site.student_jobs %}
    <div class="card" style="margin:16px">
        <a href="{{ job.url }}">
            <div style="display: flex; flex-direction: row;">
                <div style="flex: 0 0 20%; padding-right: 1em">
                    {%- if job.thumbnail %}
                    <img src="{{ job.thumbnail }}" style="display: block; float: left; width: 100%; border-radius: .25rem 0 0 .25rem;"/>
                    {%- endif %}
                </div>
                <div style="padding: 0.5em;">
                    <b>{{ job.title }}</b><br/>
                    {{ job.description_short }}
                </div>
            </div>
        </a>
    </div>
    {% endfor %}
</div>
