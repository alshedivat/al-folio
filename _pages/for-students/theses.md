---
layout: page
permalink: /for-students/theses/
title: Theses
description:
nav: false
nav_order: 1
display_categories: [open]
horizontal: false
---

<div>
    {% for thesis in site.student_theses %}
    <div class="card" style="margin:16px">
        <a href="{{ thesis.url }}">
            <div style="display: flex; flex-direction: row;">
                <div style="flex: 0 0 20%; padding-right: 1em">
                    {%- if thesis.thumbnail %}
                    <img src="{{ thesis.thumbnail }}" style="display: block; float: left; width: 100%; border-radius: .25rem 0 0 .25rem;"/>
                    {%- endif %}
                </div>
                <div style="padding: 0.5em;">
                    <b>{{ thesis.title }}</b><br/>
                    {{ thesis.description }}
                </div>
            </div>
        </a>
    </div>
    {% endfor %}
</div>


### Clustering of Immune Data

The objective of this project is to automatically find interesting relationships within immunological data with regard to three axes: horizontal (between features), vertical (between subjects/groups of subjects), and temporal (over time).
For example, a possible result in the biomedical domain would be a temporal pattern of decreasing coordination of a particular sub-module of the immune system for a specific patient subgroup (e.g., male patients older than 65) which, in turn, may distinguish particularly severe cases of COVID-19.

### Spatial Recommendation in Virtual Reality

Motivated by the "method of loci", i.e., also known as the "mind palace technique", virtual reality can be a great tool to organize information (see for example [Noda](https://www.youtube.com/@noda_tech), or [Softspace](https://soft.space/)).
However, placing new content can be challenging.
This thesis (bachelor or master) aims to build a novel type of recommender that allows to efficiently place novel content within a virtual reality environment based on existing material.
The thesis will allow you to gain experience with virtual reality headsets like the Meta Quest Pro or the Apple Vision Pro.


### Extraction of Traditional Flow/Mass Cytometry Gates from Machine Learning Models

Flow cytometry and mass cytometry (CyTOF) allow the measurement of multiple biological markers across thousands of cells within each sample. The traditional analysis of single-cell data includes a process referred to as gating, where a domain expert draws a sequence of bounding boxes around cell clusters of interest in 2d plots. Since this procedure is time-consuming and depends on the expert's experience, automatic computation methods have been proposed. However, many machine learning models are hard to interpret, especially for non-domain experts. Therefore, the objective of this project is to extract the traditional gates (bounding boxes) from a trained machine learning model.

### Qualitative Comparison of Attention Maps and Feature Attribution Maps

Since complex Deep Learning models are hard to interpret and regarded as a black box even by domain experts, multiple post-hoc interpretation methods have been proposed.
For vision-based models, those methods are often generally referred to as Saliency Maps, which compute a heatmap of importance over the pixel space. Transformer-based models utilize the attention mechanism, where the model learns the relevance of the input features during training.
This project aims to compare attribution maps of post-hoc interpretation maps with attention maps from transformer-based models and investigate their theoretical relationship.

