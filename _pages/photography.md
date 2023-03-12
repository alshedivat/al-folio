---
layout: gallery-default
permalink: /photography/
title: photography
description: My photos. A gallery of nature photos and AI, including landscapes, wildlife, and plant life.
nav: true
nav_order: 5
---

Fotografie - strona, gdzie można odkryć piękno i różnorodność natury poprzez obiektyw AI. Znajdziesz tu galerię wspaniałych zdjęć przyrody, w tym krajobrazów, dzikiej przyrody i roślinności, które zostały ulepszone, edytowane lub wygenerowane przez algorytmy AI. Dowiesz się również, jak SI może pomóc Ci w doskonaleniu umiejętności fotograficznych, tworzeniu realistycznych i artystycznych efektów oraz odkrywaniu nowych perspektyw i możliwości. Niezależnie od tego, czy jesteś fotografem, miłośnikiem przyrody, czy entuzjastą AI, znajdziesz tu coś, co Cię zadziwi i zainspiruje. Enjoy the view!

<p>Below are two example galleries. The first gallery illustrates basic usage. The second gallery illustrate how to include several image galleries into one entry to create more complex structures and tell better stories.</p>

{% assign count = 0 %}
{% assign align = "left" %}
{% for gallery in site.data.galleries.overview %}
{% if count == 0 %}<div class="row">{% endif %}
  <div class="half-width gallery-preview {{ align }}">
    <h1>{{ gallery.title }}</h1>
    <a href="{{ site.url }}{{ site.baseurl }}/photography/{{ gallery.directory }}.html">
      <img alt="{{ gallery.title }}" src="{{ site.url }}{{ site.baseurl }}/assets/photography/{% if gallery.picture_path %}{{ gallery.picture_path }}{% else %}{{ gallery.directory }}{% endif %}/{{ gallery.preview.thumbnail }}" />
    </a>
  </div>
{% if count == 1 %}</div>{% endif %}
{% assign count = count | plus: 1 %}
{% assign align = "right" %}
{% if count >= 2 %}
{% assign align = "left" %}
{% assign count = 0 %}
{% endif %}
{% endfor %}

{% if count != 1 %}
</div>
{% endif %}