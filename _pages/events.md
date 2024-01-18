---
layout: default
title: Events
permalink: /events
nav: true
---

<h1>NLP@DSAI events:</h1><br>
<p class="text-justify">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</p>
<hr>
<div data-tf-live="01HH1W0ZC0FZEK862Q4CQCVKNE"></div><script src="//embed.typeform.com/next/embed.js"></script>
<br>
<!-- The paddingtop and margin-top edits allow anchors to link properly. -->
{% assign sorted = site.data.upcoming_events | sort: 'start' %}
{% for event in sorted %}
<div id="{{event.speaker}}" class="row" style="padding-top: 60px; margin-top: -60px;">
    <div class="col-sm-3">
        <img class="img-fluid rounded-circle" src="{%- if event.image %}{{ event.image | relative_url }}{% else %}{{ 'assets/event/placeholder.png' | relative_url }}{% endif %}" width="200px" height="200px"><br>
    </div>
    <div class="col-sm-8">
        {{event.start | date: "%e %B, %Y %H:%M"}} (local Swedish time)<br>
        <h2>{{event.title}}</h2><br>
        <strong>{{event.speaker}}</strong><br>
        <p class="text-justify"><b>Abstract:</b>{{event.abstract | markdownify}}
        </p>
        <p class="text-justify">{{event.bio | markdownify}}
        </p>
        <br><a href="https://chalmers.zoom.us/j/{{event.zoomroom}}">Connect via Zoom</a> password:
        {{event.zoompassword}}
    </div>
</div>
<br>
<hr>
<br>
{% endfor %}
<hr>
<h2>Previous talks:</h2>
{% assign sorted = site.data.previous_events | sort: 'date' | reverse %}
{% for event in sorted %}
<div id="{{event.speaker}}" class="row" style="padding-top: 60px; margin-top: -60px;">
    <div class="col-sm-3">
        <img class="img-fluid rounded-circle" src="{%- if event.image %}{{ event.image | relative_url }}{% else %}{{ 'assets/event/placeholder.png' | relative_url }}{% endif %}" width="200px" height="200px"><br>
    </div>
    <div class="col-sm-8">
        {{event.start | date: "%e %B, %Y %H:%M"}} (local Swedish time)<br>
        <h2>{{event.title}}</h2><br>
        <strong>{{event.speaker}}</strong><br>
        <p class="text-justify"><b>Abstract:</b>{{event.abstract | markdownify}}
        </p>
        <p class="text-justify">{{event.bio | markdownify}}
        </p>
        <br><a href="{{event.youtube}}">Video Recording (YouTube)</a>. <a href="{{event.slides}}">Download Slides</a>
    </div>
</div>
<br>
<hr>
<br>
{% endfor %}
