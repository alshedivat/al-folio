---
layout: page
permalink: /awards/
title: Awards and Experience
description: 
nav: true
nav_order: 4
---


<!-- pages/awards.md -->
<div class="awards">
{% if site.awards != blank -%} 
<div class="table-responsive">
    <table class="table table-sm table-borderless">
    {%- assign awards = site.awards | reverse -%} 
    {% for item in awards %} 
    <tr>
        <th scope="row">{{ item.date | date: "%b %-d, %Y" }}</th>
        <td>
        {% if item.inline -%} 
            {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
        {%- else -%} 
            <a class="awards-title" href="{{ item.url | relative_url }}">{{ item.title }}</a>
        {%- endif %} 
        </td>
        <td>
        {% if item.place -%} 
            <span class="awards-place">{{ item.place }}</span>
        {%- endif %}
        </td>
    </tr>
    {%- endfor %} 
    </table>
</div>
{%- else -%} 
<p>No awards or experiences so far...</p>
{%- endif %} 
</div>