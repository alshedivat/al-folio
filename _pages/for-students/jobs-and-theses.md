---
layout: page
permalink: /for-students/jobs-and-theses/
title: Jobs & Theses
description: 
nav: false
nav_order: 1
display_categories: [open]
horizontal: false
---


## Students Jobs

> **We are hiring!** 👩‍🎓🧑‍🏫👩‍⚕️🙋‍♂️ We are currently looking for **several student assistants** with an interest in machine learning.

{% for content in site.students_jobs %}
<div>
    <a href="{{ content.url }}">
        <div style="display: flex; margin-bottom: 1em; padding: 0.5em; border: 1px solid grey">
            {%- if content.img %}
                <img src="{{ content.img }}" style="display: block; float: left; width:15%; padding-right: 1em"/>
            {%- endif %}
            <p>
                <b>{{ content.title }}</b><br/>
                {{ content.description_short }}
            </p>
        </div>
    </a>
</div>
{% endfor %}
<div style="margin-bottom: 2em"></div>


## Theses

At the moment, we offer the following topics for bachelor's and master's thesis.

<div style="display: flex; margin-bottom: 1em; padding: 0.5em; border: 1px solid grey">
    <img src="/assets/img/idea.png" style="display: block; float: left; width:10%; padding-right: 1em"/>
    <p>
        <b>Come talk to us!</b> If you have <b>your own project ideas</b>, don't hesitate to contact us - if you are motivated, we will support you as best as we can!
    </p>
</div>
<div style="margin-bottom: 2em"></div>

<!-- pages/people.md -->
<div class="people">
{%- assign elements = site.students_theses -%}
{%- if page.display_categories %}
  <!-- Display categorized people -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_elements = elements | where: "category", category -%}
  {%- assign sorted_elements = categorized_elements | sort: "importance" %}
  <!-- Generate cards for each person -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for element in sorted_elements -%}
      {% include element_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for element in sorted_elements -%}
      {% include element.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display people without categories -->
  {%- assign sorted_elements = elements | sort: "importance" -%}
  <!-- Generate cards for each person -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for element in sorted_elements -%}
      {% include people_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for element in sorted_elements -%}
      {% include element.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>



### Integration and Extraction of Background Knowledge with Large Language Models

At least since ChatGPT, everyone has heard of transformer-based Large Language Models (LLM). 
The question is whether the knowledge compressed in LLMs can be utilized to improve machine learning models.
This may either refer to integrating LMMs to make predictions more accurate.
Or, in an eXplainable Artificial Intelligence (XAI) context, to allow for an intuitive understanding of a problem setting by a human expert. 
One suitable approach may use Knowledge Graphs, which excel at storing structured information.
We offer a range of bachelor's and master theses in this context with application ranging from biomedicine to environmental modeling.

### Subgroup Discovery in Medical Data

In data mining, subgroup discovery refers to finding interesting subsets of data or a population with an interesting property. 
In a medical context, a simple (but interpretable) disease prediction model might for example perform mediocre on the overall population, but achieve excellent accuracy on a patient subgroup such as female patients with an age below 50. 
Discovering such subgroups would enable the exploitation of simple models for subsets of the population. 
Subgroup discovery is also related to fairness since a disease prediction model is expected to perform equally well for each patient.
We offer a range of bachelor's and master theses in this context with application ranging from biomedicine to environmental modeling.

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
