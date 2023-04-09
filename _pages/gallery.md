---
layout: page
permalink: /photography/
title: Photography
description: Personnal Photography
nav: true
nav_order: 3
---

<div style="width:100%;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px, 1fr));justify-content:center;padding:4px;">
    {% assign sorted = site.static_files | sort: 'date'  | where: "image", true  %}
    {% for file in sorted %}
      {% assign filenameparts = file.path | split: "/" %}
        {% assign filename = filenameparts | last | replace: file.extname,"" %}
         <div style="flex-basis:25%;width:100%;padding:10px;margin:2px;">
            <a href="{{site.imagesurl | relative_url}}{{file.name}}" title="{{ filename }}">
           <img src="{{ file.path | relative_url }}" alt="{{ file.path | relative_url }}"  style="width:100%;height:200px;object-fit:cover;transform:scale(1);transition:all 0.3s ease-in-out;" />
         </a></div>
    {% endfor %}
   </div>
