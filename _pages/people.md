---
layout: page
title: People
hide_header: false
permalink: /people/
nav: true
nav_order: 1
groups: [Members, Associate members, Master's Students, Visitors]
---

<!-- pages/projects.md -->
<div class="projects">

{%- for group in page.groups -%}
    {%- assign sorted_members = site.people | sort: "order" | where: "group", group %}
    {%- unless sorted_members == empty -%}
      <h3 class="post-title"><b>{{ group }}</b></h3>
      <div class="row align-items-stretch">
        {%- for person in sorted_members -%}
          {% include person_project_layout.html %}
        {%- endfor %}
      </div>
    {%- endunless -%}
{%- endfor -%}

</div>



<h3 class="post-title"><b>Former project students</b></h3>

<!-- 2021-22 -->
* <b>Samuel Morgan</b> (QMUL MSc project 2022)
* <b>Daniel Hard</b> (QMUL MSc project 2022)
* <b>Suvi Häärä</b> (QMUL UG project 2022; EECS Final Year Prize)
* <b>Gavriel Neuman</b> (QMUL UG project 2022)
<!-- 2020-21 -->
* <b>Russell Sammut Bonnici</b> (QMUL MSc project 2021)
* <b>Joseph Cook</b> (QMUL MSc project 2021; EECS Postgraduate Prize for Outstanding Achievement)
* <b>Remi Falowo</b> (QMUL MSc project 2021)
* <b>Krisian Chhatralia</b> (QMUL MSc project 2021)
* <b>Safa Abbas</b> (QMUL UG project 2021)
* <b>Alex Starosolsky</b> (QMUL UG project 2021)
<!-- 2019-20 -->
* <b>Joshua Ryan Lam</b> (QMUL MSc project 2020)
* <b>Ben Hayes</b> (QMUL MSc project 2020)
* <b>Luke Brosnahan</b> (QMUL MSc project 2020)
* <b>Spyros Roumpis</b> (QMUL MSc project 2020)
* <b>George Brufton</b> (QMUL MSc project 2020)
* <b>Maximilian Weber</b> (TU Berlin MSc project 2020)