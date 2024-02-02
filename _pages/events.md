---
layout: default
title: Events
permalink: /events
nav: true
nav_order: 2
---

<div class="contrainer mb-4">
    <p class="text-justify">Welcome to our Events Page at <strong>NLP@DSAI</strong>, where we bring together minds passionate about Natural Language Processing and related fields. Dive into our diverse array of gatherings, including the intellectually stimulating <em>Reading Group</em>, the casual yet insightful <em>NLP Fika</em> sessions, dynamic and thought-provoking <em>Talks</em> and in-depth <em>Seminars</em> that delve deep into the latest NLP research and industry advancements. Whether you're a seasoned expert or just starting out, there's something here for everyone. Plus, stay connected and actively participate by subscribing through our form—your gateway to being part of a vibrant community dedicated to exploring and shaping the future of NLP.</p> <div data-tf-live="01HH1W0ZC0FZEK862Q4CQCVKNE"></div><script src="//embed.typeform.com/next/embed.js"></script>
    <hr>
</div>

<div class="container mt-4">
    <h2 class="mb-4">Upcoming Events</h2>
    {% assign sorted = site.data.upcoming_events | sort: 'start' %}

    {% if sorted.size == 0 %}
    <div class="callout callout-default">Sorry, but there are currently no events scheduled at this time. Please check back later for updates or explore our past events for inspiration.</div>
    {% endif %}

    {% for event in sorted %}
    <div id="{{event.speaker}}" class="row align-items-center callout callout-green" style="border-right: 0; border-top: 0; border-bottom: 0;">
        <div class="col-md-3 text-center mb-3 mb-md-0">
            <img class="img-fluid" src="{%- if event.image %}{{ event.image | relative_url }}{% else %}{{ 'assets/event/placeholder.png' | relative_url }}{% endif %}" height="400px">
        </div>
        <div class="col-md-9">
            <!-- Badge indicating the event type with specific styles -->
            {% case event.layout %}
                {% when 'reading-group' %}
                    <span class="badge badge-dark">{{event.layout | capitalize}}</span>
                {% when 'fika' %}
                    <span class="badge badge-warning">{{event.layout | capitalize}}</span>
                {% when 'talk' %}
                    <span class="badge badge-success">{{event.layout | capitalize}}</span>
                {% when 'seminar' %}
                    <span class="badge badge-primary">{{event.layout | capitalize}}</span>
                {% else %}
                    <span class="badge badge-secondary">{{event.layout | capitalize}}</span>
            {% endcase %}
            <h3 class="mt-2">{{event.title}}</h3>
            <p><strong>Date and Time:</strong> {{event.start | date: "%e %B, %Y %H:%M"}} (local Swedish time)</p>
            <!-- Conditional Speaker or Curator label -->
            {% if event.layout == "reading-group" %}
                <p><strong>Curator:</strong> {{event.speaker}}</p>
            {% else %}
                <p><strong>Speaker:</strong> {{event.speaker}}</p>
            {% endif %}
            <p><strong>Abstract:</strong> {{event.abstract | markdownify}}</p>
            <p>{{event.bio | markdownify}}</p>

            {% if event.zoomroom %}
            <a class="btn btn-primary" href="https://chalmers.zoom.us/j/{{event.zoomroom}}" role="button">Connect via Zoom</a>
            {% endif %}
            {% if event.zoompassword %}
            <span class="badge bg-secondary">Password: {{event.zoompassword}}</span>
            {% endif %}
        </div>
    </div>
    <hr>
    {% endfor %}

</div>

<!-- Previous Events Section -->
<div class="container mt-5">
    <h2 class="mb-4">Previous Talks</h2>
    {% assign sorted_previous = site.data.previous_events | sort: 'start' | reverse %}
    {% for event in sorted_previous %}
    <div id="{{event.speaker}}" class="row align-items-center" style="padding-top: 60px; margin-top: -60px;">
        <div class="col-md-3 text-center mb-3 mb-md-0">
            <img class="img-fluid" src="{%- if event.image %}{{ event.image | relative_url }}{% else %}{{ 'assets/event/placeholder.png' | relative_url }}{% endif %}" height="400px">
        </div>
        <div class="col-md-9">
            <!-- Badge indicating the event type with specific styles -->
            {% case event.layout %}
                {% when 'reading-group' %}
                    <span class="badge badge-dark">{{event.layout | capitalize}}</span>
                {% when 'fika' %}
                    <span class="badge badge-warning">{{event.layout | capitalize}}</span>
                {% when 'talk' %}
                    <span class="badge badge-success">{{event.layout | capitalize}}</span>
                {% when 'seminar' %}
                    <span class="badge badge-primary">{{event.layout | capitalize}}</span>
                {% else %}
                    <span class="badge badge-secondary">{{event.layout | capitalize}}</span>
            {% endcase %}
            <h3 class="mt-2">{{event.title}}</h3>
            <p><strong>Date and Time:</strong> {{event.start | date: "%e %B, %Y %H:%M"}} (local Swedish time)</p>
            <!-- Conditional Speaker or Curator label -->
            {% if event.layout == "reading-group" %}
                <p><strong>Curator:</strong> {{event.speaker}}</p>
            {% else %}
                <p><strong>Speaker:</strong> {{event.speaker}}</p>
            {% endif %}
            <p><strong>Abstract:</strong> {{event.abstract | markdownify}}</p>
            <p>{{event.bio | markdownify}}</p>
            <!-- Links for video recording and slides if available -->
            {% if event.youtube %}
            <a class="btn btn-link" href="{{event.youtube}}" role="button">Video Recording (YouTube)</a>
            {% endif %}
            {% if event.slides %}
            <a class="btn btn-link" href="{{event.slides}}" role="button">Download Slides</a>
            {% endif %}
        </div>
    </div>
    <hr>
    {% endfor %}
</div>
