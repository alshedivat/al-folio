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
  <h2>news</h2>
  {% if site.news != blank -%} 
  {%- assign news_size = site.news | size -%}
  <div class="table-responsive">
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
  <h2>activities</h2>
  <div class="table-responsive">
    <table class="table table-sm table-borderless">
      <tbody>
        <tr>
          <td>volunteer</td>
          <td><a href="https://www.jmlr.org/tmlr/">TMLR</a>, <a href="https://iclr.cc/Conferences/2021/Volunteers">ICLR (2020, 2021)</a>, <a href="https://icml.cc/">ICML (2020, 2021)</a>, <a href="https://nips.cc/">NeurIPS (2020)</a>, <a href="https://github.com/acl-org/emnlp-2020-virtual-conference/blob/master/static/pdf/volunteers.pdf">EMNLP {Sponsor Booth set-up for ByteDance} (2020)</a>, <a href="https://acl2020.org/">ACL (2021)</a>, <a href="https://2021.naacl.org/">NAACL (2021)</a></td>
        </tr>
        <tr>
          <td>reviewer</td>
          <td><a href="http://securedata.lol/">Workshop on Dataset Curation and Security, NeurIPS 2020</a>, <a href="https://ml4h2021.hotcrp.com/users/pc">ML4H: Machine Learning for Health, 2021 (Member of Program Committee)</a>, <a href="https://jupytercon.com/participate/#Reviewers">JupyterCon 2020</a>, <a href="https://github.com/psc-g/neurips19music#review-process">Live Music for the NeurIPS 2019 Banquet</a>, <a href="https://helloworld.calhacks.io/">hello:world Hackathon, 2020, 2021 [calhacks.io] (Judge)</a></td>
        </tr>
	    </tbody>
    </table>
  </div>
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
