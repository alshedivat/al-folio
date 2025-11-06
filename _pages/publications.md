---
layout: page
permalink: /publications/
title: Dissemination
description:
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

<h1>Publications</h1>
{% bibliography %}

<h1> Talks </h1>
{% for talk in site.talks %}
<h2 class="bibliography"> {{ talk.date.year }} </h2>
<ol class="bibliography">
    <li> 
        <div class="row"> 
            {% if talk.preview %}
            <div class="col-sm-2 preview"> 
                <figure> <picture> <source class="responsive-img-srcset" srcset="/al-folio/assets/img/publication_preview/{{ talk.preview }}-480.webp 480w,/al-folio/assets/img/publication_preview/{{ talk.preview }}-800.webp 800w,/al-folio/assets/img/publication_preview/{{ talk.preview }}-1400.webp 1400w," sizes="200px" type="image/webp"> 
                    <img src="/al-folio/assets/img/publication_preview/{{ talk.preview }}" class="preview z-depth-1 rounded" width="100%" height="auto" alt="/al-folio/assets/img/publication_preview/{{ talk.preview }}" loading="eager" onerror="this.onerror=null; $('.responsive-img-srcset').remove();"> 
                </picture> </figure> 
            </div>
            {% endif %}
            <div id="article" class="col-sm-8">
                <div class="title"> {{ talk.title }} </div>
                {% if talk.location != blank %}
                    <span><i class="fa-solid fa-location-dot"></i><p> {{ talk.location }}</p></span>
                {% endif %}
                {% if talk.is_remote %}
                    <span><i class="fa-solid fa-web"></i><p>remote</p></span>
                {% endif %}
            </div>
        </div>
    </li>
</ol>
{% endfor %}

</div>
