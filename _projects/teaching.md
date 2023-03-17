---
layout: page
permalink: /teaching/
title: teaching assignments
description: list of yearly teaching assignments
years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
img: assets/img/leh_vorlesung_00289.jpg
importance: 3
category: academic
---

<div class="teaching">
        {%- assign courses = site.data.teaching | sort: "name" -%}
        {%- assign years = page.years | reverse -%}
        {%- for y in years -%}
            <h2 class="year">Fall Semester {{y}}</h2> 
            {%- for project in courses -%}        
                {%- if project.date.year == y and project.date.autumn -%}
                    <div class="project">
                        <div class="row">
                            <!-- <div class="col-sm-4">
                                <div class="title">{{project.type}}</div>
                            </div> -->
                            <div class="col-sm-12">
                                    <a href="{{project.link}}">
                                        <div class="title">{{project.name}}</div>
                                    </a>
                                    {%- if project.teacher -%}
                                        <div>
                                            Lecturer: {{project.teacher}}
                                        </div>
                                    {%- endif -%}
                                    <div>
                                    Format: {{project.type}}
                                    </div>
                                    <div>Role:&nbsp;{{project.role}}</div>
                            </div>
                        </div>
                    </div>
                {%- endif -%}
            {%- endfor -%}
            <h2 class="year">Spring Semester {{y}}</h2> 
            {%- for project in courses -%}        
                {%- if project.date.year == y and project.date.autumn == false -%}
                    <div class="project">
                        <div class="row">
                            <!-- <div class="col-sm-4">
                                <div class="title">{{project.type}}</div>
                            </div> -->
                            <div class="col-sm-12">
                                    <a href="{{project.link}}">
                                        <div class="title">{{project.name}}</div>
                                    </a>
                                    {%- if project.teacher -%}
                                        <div>
                                            Lecturer: {{project.teacher}}
                                        </div>
                                    {%- endif -%}
                                    <div>
                                    Format: {{project.type}}
                                    </div>
                                    <div>Role:&nbsp;{{project.role}}</div>
                            </div>
                        </div>
                    </div>
                {%- endif -%}
            {%- endfor -%}
        {%- endfor -%}

</div>
