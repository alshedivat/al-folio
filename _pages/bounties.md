---
layout: page
title: bounties
permalink: /bounties/
description: All of my bug bounties that I found.
nav: true
nav_order: 4
display_categories: [HackerOne, BugCrowd, rvd, other]
horizontal: false
---

<!-- pages/bounties.md -->
<div class="projects">
    {% if site.enable_project_categories and page.display_categories %}
        <!-- Display categorized bounties -->
        {% for category in page.display_categories %}
            <a id="{{ category }}" href=".#{{ category }}">
                <h2 class="category">{{ category }}</h2>
            </a>
            {% assign categorized_bounties = site.bounties | where: "category", category %}
            {% assign sorted_bounties = categorized_bounties | sort: "importance" %}
            {% if page.horizontal %}
                <div class="container">
                    <div class="row row-cols-1 row-cols-md-2">
                        {% for bounty in sorted_bounties %}
                            {% include bounties_horizontal.liquid %}
                        {% endfor %}
                    </div>
                </div>
            {% else %}
                <div class="row row-cols-1 row-cols-md-3">
                    {% for bounty in sorted_bounties %}
                        {% include bounties.liquid %}
                    {% endfor %}
                </div>
            {% endif %}
        {% endfor %}
    {% else %}
        <!-- Display bounties without categories -->
        {% assign sorted_bounties = site.bounties | sort: "importance" %}
        <!-- Generate cards for each bounties -->
        {% if page.horizontal %}
            <div class="container">
                <div class="row row-cols-1 row-cols-md-2">
                    {% for bounty in sorted_bounties %}
                        {% include bounties_horizontal.liquid %}
                    {% endfor %}
                </div>
            </div>
        {% else %}
            <div class="row row-cols-1 row-cols-md-3">
                {% for bounty in sorted_bounties %}
                    {% include bounties.liquid %}
                {% endfor %}
            </div>
        {% endif %}
    {% endif %}
</div>