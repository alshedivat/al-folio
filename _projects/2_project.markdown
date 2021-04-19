---
layout: page
title: catecophony
description: real-time pointillist sound collage
img: /assets/img/catecophony.png
importance: 2
category: work
---

<p style="text-align: center;">
<a href="https://github.com/ben-hayes/catecophony/releases/tag/v0.0.1-alpha">download</a> |
<a href="https://github.com/ben-hayes/catecophony/">code</a> |
<a href="https://vimeo.com/415074832">video</a></p>

_Catecophony_ is a VST3/AU plugin that performs real-time corpus-based concatenative synthesis. Given some source audio (the corpus) which is split into thousands of grains and analysed, it attempts to recreate an incoming audio stream (the target) using the corpus grains. The result is pointillist sound shapes that are often chaotic and sometimes lovely.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/catecophony.png' | relative_url }}" alt="" title="Catecophony interface"/>
    </div>
</div>
<div class="caption">
    The GUI of Catecophony
</div>

Catecophony is implemented using <a href="https://juce.com/">JUCE</a> augmented with <a href="https://essentia.upf.edu/">Essentia</a> for feature extraction. It searches the grain space quickly in real-time using a <a href="https://en.wikipedia.org/wiki/K-d_tree">k-d tree</a>.


<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/415074832?title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
