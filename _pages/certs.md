---
layout: page
title: certs
permalink: /certifications/
description: All the certifications, badges, online courses, books that I have completed.
nav: true
nav_order: 3
display_categories: [certification, badge, online course, book]
horizontal: false
---

<!-- pages/certs.md -->
<div class="projects">
    {% if site.enable_project_categories and page.display_categories %}
        {% for category in page.display_categories %}
            <a id="{{ category }}" href=".#{{ category }}">
                <h2 class="category">{{ category }}</h2>
            </a>
            {% assign categorized_certs = site.certs | where: "category", category %}
            {% assign sorted_certs = categorized_certs | sort: "importance" %}
            <!-- Generate cards for each cert -->
            {% if page.horizontal %}
                <div class="container">
                    <div class="row row-cols-1 row-cols-md-2">
                        {% for cert in sorted_certs %}
                            {% include certs_horizontal.liquid %}
                        {% endfor %}
                    </div>
                </div>
            {% else %}
                <div class="row row-cols-1 row-cols-md-3">
                    {% for cert in sorted_certs %}
                        {% include certs.liquid %}
                    {% endfor %}
                </div>
            {% endif %}
        {% endfor %}
    {% else %}
        {% if page.horizontal %}
            <div class="container">
                <div class="row row-cols-1 row-cols-md-2">
                    {% for cert in sorted_certs %}
                        {% include certs_horizontal.liquid %}
                    {% endfor %}
                </div>
            </div>
        {% else %}
            <div class="row row-cols-1 row-cols-md-3">
                {% for cert in sorted_certs %}
                    {% include certs.liquid %}
                {% endfor %}
            </div>
        {% endif %}
    {% endif %}
</div>