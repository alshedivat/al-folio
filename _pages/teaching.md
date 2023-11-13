---
layout: page
permalink: /students/
title: students
description:
nav: true
years: [2023, 2022, 2021, 2020, 2019]
nav_order: 4
---


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

* LLVM resources: [general](https://gist.github.com/MattPD/00573ee14bf85ccac6bed3c0678ddbef#llvm), [introductions](https://gist.github.com/MattPD/00573ee14bf85ccac6bed3c0678ddbef#introduction-llvm-ir), [compiler passes](https://gist.github.com/MattPD/00573ee14bf85ccac6bed3c0678ddbef#introduction).

