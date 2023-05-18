---
layout: about
title: about
permalink: /
subtitle: Transforming data into intelligence

profile:
  align: right
  image: pro_photo.png
  image_circular: false # crops the image to make it circular
  address: >
    

news: false  # includes a list of news items
selected_papers: false # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of the page
---

Hey! I am a Final year Electronics undergrad student at [Veermata Jijabai Technological Institute (VJTI).](https://vjti.ac.in).Throughout my undergrad I have explored many fields be it Machine Learning, Natural Language Processing, Computer Vision, Software Development, etc. The one that struck with me is Machine Learning. As a Researcher, I’m broadly interested in all aspects of machine learning, and particularly in probabilistic modeling, deep learning, robust and scalable data-driven systems, and applications to life and engineering sciences.

I'm currently a research intern at [Carnegie Mellon University]https://www.cmu.edu/) in the United States, where I work in the [Xu Lab](https://xulabs.github.io/) under the supervision of [Prof. Min Xu](https://scholar.google.com/citations?user=Y3Cqt0cAAAAJ&hl=en) and PhD RA Weichen Yu. I'm also a research intern at the Indian Institute of Technology (IIT) in Patna, where I work on Mediacal Conversation Multimodal Summarization with Prof. [Sriparna Saha](https://scholar.google.co.in/citations?user=Fj7jA_AAAAAJ&hl=en) and Jr. RF Akash Ghosh.

Previously, I was mentor at [Google Summer of Code](https://summerofcode.withgoogle.com/) at Joomla CMS!.(2022). In the summer of 2022, I had also worked as an [MITACS Globalink Research Intern](https://drive.google.com/file/d/1kpEPRG3M6pEIl2_K-ZObuCrMOYZpgypu/view) at Polytechnique Montréal, where my research was on the IDF Curve data using Machine Learning and its application. In 2021, I got selected as [Open Source Promotion Plan Fellow(OSPP)](https://drive.google.com/file/d/1JXw9SganF-JEMXSqsJLCyTMncQDemCmq/view) by [ISCAS](http://english.is.cas.cn/) & [Open-Euler](https://www.openeuler.org/en/), where I worked with [Joomla CMS!](https://www.joomla.org/). Currently, I am working on various applications of Machine Learning and Natural Language processing. Previously, I have worked a lot in LLM through internships and personal projects.

I am open for opportunities in the `Research & Development.`

# Experience

{% for experience in site.data.experience %}
<div>
    {% if experience.title %}
    <h4 class="title font-weight-bold">{{experience.title}}</h4>
    {% endif %}
    {% if experience.role %}
    <h6 class="title font-weight-bold">{{experience.role}}</h6>
    {% endif %}
    {% if experience.year %}
    <span class="badge bg-dark font-weight-bold">
        {{ experience.year }}
    </span>
    {% endif %}
    {% if experience.description %}
        <ul class="items">
            {% for item in experience.description %}
                <li>
                    {% if item.contents %}
                        <span class="item-title">{{ item.title }}</span>
                        <ul class="subitems">
                        {% for subitem in item.contents %}
                            <li><span class="subitem">{{ subitem }}</span></li>
                        {% endfor %}
                        </ul>
                    {% else %}
                        <span class="item">{{ item }}</span>
                    {% endif %}
                </li>
            {% endfor %}
        </ul>
    {% endif %}
    {% if content.items %}
        <ul class="items">
            {% for item in content.items %}
                <li>
                    {% if item.contents %}
                        <span class="item-title">{{ item.title }}</span>
                        <ul class="subitems">
                        {% for subitem in item.contents %}
                            <li><span class="subitem">{{ subitem }}</span></li>
                        {% endfor %}
                        </ul>
                    {% else %}
                        <span class="item">{{ item }}</span>
                    {% endif %}
                </li>
            {% endfor %}
        </ul>
    {% endif %}
</div>
{% endfor %}