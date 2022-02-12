---
layout: page
title: calgary & the rockies
permalink: /calgary/
description: An Overview of Calgary & Surrounding Area
nav: true
display_categories: [Calgary, Kananaskis, Banff]
horizontal: false
---


# Calgary & The Canadian Rockies

<img src="/assets/img/calgaryphotos/peytolakepano.jpg" class="img-responsive" width="95%" style="float: left" />
<!-- ![Peyto Lake, Banff National Park](/images/calgaryphotos/peytolakepano.jpg) -->
Canada's 3rd most diverse and 4th largest population centre, [Calgary](https://www.lifeincalgary.ca) is a uniquely livable city &mdash; ranked by [The Economist Intelligence Unit](http://www.eiu.com/topic/liveability) as the *most livable city in North America 2018-19*, and within the top-5 for most of the last decade. Set in the foothills of the [Canadian Rocky Mountains](https://en.wikipedia.org/wiki/Canadian_Rockies), recognized as [UNESCO World Heritage Area](https://whc.unesco.org/en/list/304/) for it's outstanding natural landscapes, and only an 1.5 hours drive from [Banff National Park](https://www.pc.gc.ca/en/pn-np/ab/banff), Calgarians enjoy an unrivalled hiking/skiing destination on the weekends, while enjoying the food and culture one of North America's most multi-cultural cities during the week. 

With about 30% of the city's population being born outside Canada and 140 spoken languages, no matter where you call home you are sure to find a piece of it here. The relatively low-cost of living, multi-cultural and diverse population, and quality of life are amongst the reasons Calgary is one of the [most popular destinations for new Canadians to settle in](https://canadianvisa.org/blog/cities-and-places/top-10-most-multicultural-cities-to-settle-in-canada). Alberta is famous for its big blue skies and Calgary is the sunniest major Canadian city with 333 days of sunshine on average per year, but with four distinct seasons, and [Chinook winds](https://en.wikipedia.org/wiki/Chinook_wind) raising temperatures by +30C within a few hours, the weather is never boring!
<!-- ![Calgary Skyline](/images/calgaryphotos/calgaryskyline.jpg) -->
<img src="/assets/img/calgaryphotos/images/calgaryphotos/calgaryskyline.jpg" class="img-responsive" width="95%" style="float: left" />

# Pictures
(Right-click *'view image'* to see a larger image.)

Jump to: [Calgary](#calgary), [Banff](#banff), [Kananaskis](#kananaskis)

## Calgary
## Kananaskis
(85km, ~1 Hour's Drive)
## Banff
(127km, ~1.5 Hour's Drive)
{% assign number_printed = 0 %}
{% for pic in site.data.pictures_Banff %}

{% assign even_odd = number_printed | modulo: 4 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}


<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_projects = site.projects | where: "category", category -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>