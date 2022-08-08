---
layout: page
title: collaborators
page-title: Collaborators
permalink: /collaborators.html
nav: false
nav_rank: 5
nav_order: 5
sitetitle: true
description: Great science takes a great team. The Epidiagnostics Group works with an ever-expanding cadre of physicians, scientists and engineers to solve some of the most pressing challenges in cancer research. Here are some of our extraordinary collaborators.

---


{% assign collaborators = site.collaborators | where: "team_collaborator", true | sort: "lastname" %}
<div class="d-flex flex-wrap align-content-stretch justify-content-center m-n2 pt-4 no-gutters">
    {% for collaborator in collaborators %}
        {% assign colsMod6 = forloop.length | modulo: 4 %}
        {% assign colIdMod4 = forloop.index | modulo: 3 %}
        {% if colsMod6 == 1 and colIdMod4 == 1 %}<div class="col-md-2 w-100"></div>{% endif %}
        <div class="col-4 col-sm-1 col-md-3 mb-2">
            <a href="{{ collaborator.website }}" class="no-decoration">
                <div class="card hoverable h-80 w-80 m-1">
                    <img src="{{ '/assets/img/collaborators/' | append: collaborator.image | relative_url }}" class="card-img-top" alt="{{ collaborator.name }}" />
                    <div class="card-body pb-2 pt-2 pl-1 pr-1">
                        <div class="card-title m-0" style="text-align:center; font-size: 95%; font-weight: bold;">{{ collaborator.name }}</div>
                        <div class="card-affiliation m-0" style="text-align:center; font-size: 85%">{{ collaborator.affiliation }}</div>                        
                    </div>
                </div>
            </a>
        </div>
    {% endfor %}
</div>

