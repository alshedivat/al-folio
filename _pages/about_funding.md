---
layout: page
title: funding
permalink: /about/funding/
description: Funding and support for the Electronic Visualization Laboratory
nav: false
---

EVL's work continues to be supported by various organizations, including the [National Science Foundation (NSF)](https://www.nsf.gov), [National Institutes of Health (NIH)](https://www.nih.gov), [Department of Energy (DOE)](https://www.energy.gov), [Argonne National Laboratory](https://www.anl.gov), The Joseph and Bessie Feinberg Foundation, [Shirley Ryan AbilityLab](https://www.sralab.org), [Procter & Gamble](https://us.pg.com), the State of Illinois, and [UIC](https://www.uic.edu).

EVL remains committed to its mission of advancing scientific discovery through the creation of cutting-edge visualization and virtual-reality tools, techniques, and infrastructure, while expanding its research into artificial intelligence, data analytics, and high-performance computing to support the next generation of scientific collaboration and innovation.

## Current Funding

{% assign grants = site.data.grants %}
{% assign funders = grants | map: "Funder" | uniq %}
{% for funder in funders %}
<p><strong>{{ funder }}</strong></p>
<ul>
  {% assign byFunder = grants | where: "Funder", funder %}
  {% for g in byFunder %}
    <li>
      {% comment %} Choose display title: prefer ShortTitle, else LongTitle {% endcomment %}
      {% assign displayTitle = g.ShortTitle | default: g.LongTitle %}
      <em>
        {% if g.Link %}
          <a href="{{ g.Link }}">{{ displayTitle }}</a>
        {% else %}
          {{ displayTitle }}
        {% endif %}
      </em>

      {% assign details = "" %}
      {% if g.PI %}
        {% assign details = details | append: "PI: " | append: g.PI | strip %}
      {% endif %}
      {% if g.SubawardFrom and g.SubawardFrom != "" %}
        {% if details != "" %}
          {% assign details = details | append: ", subaward from " | append: g.SubawardFrom | strip %}
        {% else %}
          {% assign details = details | append: "subaward from " | append: g.SubawardFrom | strip %}
        {% endif %}
      {% endif %}

      {% if g.StartDate and g.EndDate %}
        {% comment %} Format dates from YYYY-MM-DD {% endcomment %}
        {% assign startDate = g.StartDate | date: "%B %Y" %}
        {% assign endDate = g.EndDate | date: "%B %Y" %}
        {% assign formattedDate = startDate | append: " - " | append: endDate %}

        {% if details != "" %}
          {% assign details = details | append: ", " | append: formattedDate %}
        {% else %}
          {% assign details = details | append: formattedDate %}
        {% endif %}
      {% endif %}

      {% if g.UICAward and g.UICAward != "" %}
        {% if details != "" %}
          {% assign details = details | append: ", " | append: g.UICAward | strip %}
        {% else %}
          {% assign details = details | append: g.UICAward | strip %}
        {% endif %}
      {% endif %}

      {% if details != "" %}
        ({{ details | strip }})
      {% endif %}
    </li>
  {% endfor %}
</ul>
{% endfor %}
