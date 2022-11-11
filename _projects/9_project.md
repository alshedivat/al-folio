---
layout: page
title: Conversion of Slides and script to video
description: conversion of Slides and Scripts into the Videos
img: /assets/img/tts.jpg
importance: 2
category: work
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/studio.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Slides and Script for generating video
</div>

The aim of this project was to generate video from the presentation slides designed in the Google Slides. While designing the content creator is responsible to write a script for each slides. For easement the content create write the script for particular slide in the speaker notes of the google slide. Proper Guidelines was needed to be followed by content creator while writing scripts such as using proper tags, proper way for abbreviations etc. The guidelines were provided with reference to the text to speech model used and the pipeline of project as well and features of google slides such as animations.

Once the content is completed the script file is generated from the speaker notes which was later converted into audio using text to speech model. On basis of audio length the images frames of slides were repeated to generate video and finally was synced with the audio. The project not only handled static slides but also incorporated the animations and dynamic entites such as video and gif. 

Below is a simple demo video generated with two slides only. 

<iframe src="https://drive.google.com/file/d/1rUSmDilB3KlHff95mfS6uSL5lVmWtm0a/preview" width="720" height="512" allow="autoplay"></iframe>

There are certain limitation to this project. The quality of audio depends upon the performance of TTS model. Also the script needs to be written proper in accordance to guideline for proper synchonisation between audio and dynamic entities and animations.