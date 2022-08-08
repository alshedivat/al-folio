---
layout: page
title: funding
page-title: Funding
permalink: /funding.html
nav: false
nav_rank: 6
nav_order: 6
sitetitle: true
description: We are truly grateful to our generous sponsors, without whom none of our exciting research would be possible.

---

{% assign funders = site.funding | where: "active_funding", true | sort: "name" %}
<div class="d-flex flex-wrap align-content-stretch justify-content-center m-n2 pt-4 no-gutters">
    {% for funder in funders %}
        {% assign colsMod6 = forloop.length | modulo: 4 %}
        {% assign colIdMod4 = forloop.index | modulo: 3 %}
        {% if colsMod6 == 1 and colIdMod4 == 1 %}<div class="col-md-3 w-100"></div>{% endif %}
        <div class="col-4 col-sm-1 col-md-3 mb-2">
            <a href="{{ funder.website }}" class="no-decoration">
                <div class="card hoverable h-80 w-80 m-1">
                    <img src="{{ '/assets/img/funding/' | append: funder.image | relative_url }}" class="card-img-top" alt="{{ funder.name }}" />
                  <!--  <div class="card-body pb-2 pt-2 pl-1 pr-1">
                        <div class="card-title m-0" style="height: 6rem; text-align:center; font-size: 95%;">{{ funder.name }}</div> 
                    </div> -->
                </div>
            </a>
        </div>
    {% endfor %}
</div>

