---
layout: page
permalink: /awards/
title: awards
description: 
nav: true
nav_order: 4
---


<!-- pages/awards.md -->
<div class="miscellaneous">
{% if site.awards != blank -%} 
<div class="table-responsive">
    <table class="table table-sm table-borderless">
    {%- assign miscellaneous = site.miscellaneous | reverse -%} 
    {% for item in miscellaneous %} 
    <tr>
        <th scope="row">{{ item.sem }}</th>
        <td>
        {% if item.inline -%} 
            {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
        {%- else -%} 
            <a class="miscellaneous-title" href="{{ item.url | relative_url }}">{{ item.title }}</a>
        {%- endif %} 
        </td>
        <td>
        {% if item.place -%} 
            <span class="miscellaneous-place">{{ item.place }}</span>
        {%- endif %}
        </td>
    </tr>
    {%- endfor %} 
    </table>
</div>
{%- else -%} 
<p>No miscellaneous so far...</p>
{%- endif %} 
</div>