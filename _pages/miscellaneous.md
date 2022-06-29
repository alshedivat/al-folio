---
layout: page
permalink: /miscellaneous/
title: miscellaneous
description: a list of my miscellaneous activities.
nav: true
importance: 2
---

<html>

          
<div class="news">
  <h2>events</h2>
  {% if site.news != blank -%} 
  {%- assign news_size = site.news | size -%}
  <div class="table-responsive" {% if site.news_scrollable and news_size > 3 %}style="max-height: 25vw"{% endif %}>
    <table class="table table-sm table-borderless">
    {%- assign news = site.news | reverse -%}
    {% if site.news_limit %}
    {% assign news_limit = 500 %}
    {% else %}
    {% assign news_limit = news_size %}
    {% endif %}
    {% for item in news limit: news_limit %}
      <tr>
        <th scope="row">{{ item.date | date: "%b %-d, %Y" }}</th>
        <td>
          {% if item.inline -%} 
            {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
          {%- else -%} 
          <a class="news-title" href="{{ item.url | relative_url }}">{{ item.title }}</a>
          {%- endif %} 
        </td>
      </tr>
      {%- endfor %} 
      </table>
  </div>
  {%- else -%} 
    <p>No news so far...</p>
  {%- endif %} 
</div>


<!-- <h3 id="activities">activities</h3>

<ul>
  <li>Volunteering
    <ul>
        <li>Transactions on Machine Learning Research [TMLR]</li>
        <li>International Conference on Learning Representations [ICLR 2020][ICLR 2021]</li>
        <li>Annual Conference of the North American Chapter of the Association for Computational Linguistics [NAACL-HLT 2021]</li>
        <li>Thirty-seventh International Conference on Machine Learning [ICML 2020][ICML 2021]</li>
        <li>the 59th annual meeting of the Association for Computational Linguistics [ACL 2021]</li>
        <li>Thirty-fourth Conference on Neural Information Processing Systems [NeurIPS 2020]</li>
        <li>The 2020 Conference on Empirical Methods in Natural Language Processing [EMNLP 2020](Sponsor Booth set-up for ByteDance)</li>
    </ul>
   </li>
</ul>

<ul>
  <li>Reviewing
    <ul>
        <li>Workshop on Dataset Curation and Security, NeurIPS 2020</li>
        <li>ML4H: Machine Learning for Health, 2021 (Member of Program Committee)</li>
        <li>JupyterCon 2020</li>
        <li>Live Music for the NeurIPS 2019 Banquet</li>
        <li>hello:world Hackathon, 2020, 2021 [calhacks.io] (Judge)</li>
        <li>SciMLCon, 2022</li>
    </ul>
   </li>
</ul> -->

</html>
