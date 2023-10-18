---
layout: page
# permalink: /supervision/
title: Student Supervision
description: list of supervised student projects
years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
img: assets/img/sta_zentrum_hauptgebaeude_044.jpg
importance: 2
category: academic
---

Throughout my academic career I've had the pleasure of supervising a number of student projects. A compiled list follows below.

<div class="students">
    {%- for y in page.years -%}
        <h2 class="year">{{ y }}</h2>
        {%- for project in site.data.supervision -%}
            {%- if project.year == y -%}                    
                <div class="project">
                    <div class="row">
                        <div class="col-sm-2">
                            {%- assign type = project.type | split: " " -%}
                            <div class="title">{{type[0]}}</div>{{type[1]}}
                        </div>
                        <div class="col-sm-9">
                            {%- if project.link -%}
                                <a href="{{project.link}}">
                                    <div class="title">{{project.title}}</div>
                                </a>
                            {%- else -%}
                                <div class="title">{{project.title}}</div>
                            {%- endif -%}
                            <div class="author">
                            {%- if project.students.size > 1 -%}
                                Students:&nbsp;
                            {%- else -%}
                                Student:&nbsp;
                            {%- endif -%}
                            {%- for author in project.students -%}
                                {%- if forloop.length == 1 -%}
                                    {{author.first}} {{author.last}}
                                {%- else -%}
                                    {%- unless forloop.last -%}
                                        {{author.first}} {{author.last}},&nbsp;
                                    {%- else -%}
                                        and {{author.first}} {{author.last}}
                                    {%- endunless -%}
                                {%- endif -%}
                            {%- endfor -%}
                            </div>
                            <!-- <div class="type">
                                Type: {{project.type}}
                            </div> -->
                            <div class="supervisors">
                            {%- if project.supervisors.size > 1 -%}
                                Supervisors:&nbsp;
                            {%- else -%}
                                Supervisor:&nbsp;
                            {%- endif -%}
                            {%- for author in project.supervisors -%}
                                {%- if forloop.length == 1 -%}
                                    {{author.first}} {{author.last}}
                                {%- else -%}
                                    {%- unless forloop.last -%}
                                        {{author.first}} {{author.last}},&nbsp;
                                    {%- else -%}
                                        and {{author.first}} {{author.last}}
                                    {%- endunless -%}
                                {%- endif -%}
                            {%- endfor -%}
                            </div>
                            <!-- <div class="professor">
                            Professor:&nbsp;
                            Prof. {{project.professor.first}} {{project.professor.last}}
                            </div> -->
                        </div>
                    </div>
                </div>
            {%- endif -%}
        {%- endfor -%}
    {%- endfor -%}        
</div>
