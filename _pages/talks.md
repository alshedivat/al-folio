---
layout: page
title: talks
permalink: /talks/
description: a list of previous presentations
nav: false
nav_order: 4
horizontal: true
---

<div class="students">
        {%- assign sorted_talks = site.data.talks | sort: "date.year" | reverse -%}
        {%- for project in sorted_talks -%}
                <div class="project">
                    <div class="row">
                        <div class="col-sm-12">
                                <!-- <a href="{{project.pdf}}"> -->
                                    <div class="title">{{project.title}}</div>
                                <!-- </a> -->
                                {%- if project.location.contact -%}
                                    @{{project.location.contact}},&nbsp;
                                {%- endif -%}
                                <a href="{{project.location.link}}">{{project.location.name}}</a>, 
                                {{project.date.year}}.
                        </div>
                    </div>
                </div>

        {%- endfor -%}

</div>
