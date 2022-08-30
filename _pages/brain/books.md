---
title: books
permalink: "/books/"
layout: page
description: “The reading of all good books is like conversation with the finest people of the past centuries.” - Descartes
nav: false
nav_order: 2
display_categories: [philosophical,scientific,development,fictional,technical]
horizontal: false
---

[Books From Bilkent University Library](https://alpsencer.com/bilkent-library )

<!-- pages/books.md -->
<div class="books">
{%- if site.enable_book_categories and page.display_categories %}
  <!-- Display categorized books -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_books = site.books | where: "category", category -%}
  {%- assign sorted_books = categorized_books | sort: "importance" %}
  <!-- Generate cards for each book -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for book in sorted_books -%}
      {% include books_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for book in sorted_books -%}
      {% include books.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display books without categories -->
  {%- assign sorted_books = site.books | sort: "importance" -%}
  <!-- Generate cards for each book -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for book in sorted_books -%}
      {% include books_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for book in sorted_books -%}
      {% include books.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>
