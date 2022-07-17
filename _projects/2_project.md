---
layout: page
title: Text Summarizer
description: Text Summarizer with Flask, HuggingFace pipeline
img: assets/img/text-summarizer-logo.jpeg
importance: 2
category: NLP
---
It's a simple web app that I created from scratch to practice my Flask and NLP skills. The app receives a text input and returns maximum length of 64 character summary.
I made use of HuggingFace pipeline by downloading the checkpoint, DistillBart which is a distilled version of BART. BART is a sequence-to-sequence model trained as a denoising autoencoder.
Distilled BART is a distilled version of BART that keeps up 97% of BART performance while reducing the model size by 40%.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/text-summarizer.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example of prompt for summarization
</div>
