---
layout: page
title: talks
permalink: /presentations/
description: A growing collection of the presentations that I presented.
nav: true
nav_order: 6
display_categories: [2025]
horizontal: false
---

<!-- pages/talks.md -->
<div class="projects">
    {% if site.enable_project_categories and page.display_categories %}
        <!-- Display categorized talks -->
        {% for category in page.display_categories %}
            <a id="{{ category }}" href=".#{{ category }}">
                <h2 class="category">{{ category }}</h2>
            </a>
            {% assign categorized_talks = site.talks | where: "category", category %}
            {% assign sorted_talks = categorized_talks | sort: "importance" %}
            <!-- Generate cards for each talk -->
            {% if page.horizontal %}
                <div class="container">
                    <div class="row row-cols-1 row-cols-md-2">
                        {% for talk in sorted_talks %}
                            {% include talks_horizontal.liquid %}
                        {% endfor %}
                    </div>
                </div>
            {% else %}
                <div class="row row-cols-1 row-cols-md-3">
                    {% for talk in sorted_talks %}
                        {% include talks.liquid %}
                    {% endfor %}
                </div>
            {% endif %}
        {% endfor %}
    {% else %}
        <!-- Display talks without categories -->
        {% assign sorted_talks = site.talks | sort: "importance" %}
        <!-- Generate cards for each talk -->
        {% if page.horizontal %}
            <div class="container">
                <div class="row row-cols-1 row-cols-md-2">
                    {% for talk in sorted_talks %}
                        {% include talks_horizontal.liquid %}
                    {% endfor %}
                </div>
            </div>
        {% else %}
            <div class="row row-cols-1 row-cols-md-3">
                {% for talk in sorted_talks %}
                    {% include talks.liquid %}
                {% endfor %}
            </div>
        {% endif %}
    {% endif %}
</div>