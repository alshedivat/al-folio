---
layout: page
permalink: /students/
title: students
sort_key: 4
description:
nav: true
years: [2021, 2020, 2019]
year: [2021]
---

Coming soon! Students, thesses ideas, active theses.

{:.no_toc}

* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

-----------

### Open Thesis Topics

For open thesis topics, [see our SPCL website](https://spcl.inf.ethz.ch/SeMa/) (available only
in the ETH network).

### Active Theses

<div class="publications">

{% bibliography -f active_theses %}

</div>

### Finished Theses

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f theses -q @*[year={{y}}]* %}
{% endfor %}

</div>

### Resources

