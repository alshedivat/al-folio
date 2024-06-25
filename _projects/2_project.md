---
layout: page
title: Leetcode questions analysis
description: Insights and predict topics
img: assets/img/project_2/pro2_1.jpg
importance: 2
category: fun
giscus_comments: true
---

#### __[Code](https://github.com/manthan2305/leetcode-questions-analysis)__

### About Dataset

Leetcode is very popular among programmers. It has so many quality questions for various topics. It is crucial for content provider to understand the question quality with difficulty levels, most/less popular topics among programmers, most liked/disliked questions etc. It will be helpful to get overall trend, skill improvization pathway and which topic needs much more attention then any other to work. Each question contains similar questions title and text, which can be used to sugget similar questions.

> Dataset is available on [Kaggle](https://www.kaggle.com/datasets/manthansolanki/leetcode-questions)

Entire project is divided into three major tasks:
1. Data Scraping
2. Data Analysis
3. Topic prediction

#### Data Scraping

The data is scraped from this [webpage](https://leetcode.com/problemset/all/) using this [file](https://github.com/manthan2305/leetcode-questions-analysis/blob/main/scrape_data.py).
<br>
:warning: **Disclaimer**: *The purpose of the data scraping is solely for generating insights.*

---
#### Data Analysis

At the time of working on this project, the Leetcode website offers a grand total of **2239 questions** spanning across **72 distinct topics**.
<br>

Among these, the **'Medium'** difficulty level emerges as the category with the highest number of questions, coming in at just under 1200.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/project_2/pro2_2.jpg" title="difficulty-level" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Number of questions for each difficulty level
</div>

The graph visually represents the distribution of questions by topic, showcasing the total number of questions for each topic. The predominant topics with the highest number of questions include **'Array'**, **'String'**, **'Hash Table'**, **'Dynamic Programming'**, and **'Math'**.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/project_2/pro2_3.jpg" title="topicwise questions" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Number of questions in each topics
</div>

Upon analyzing the graph, we observe that when considering the combined factors of difficulty level and total number of questions per topic, the **'Medium'** category emerges as the one with a significant number of questions across various topics.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/project_2/pro2_4.jpg" title="top-and-difficulty" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Total questions by topic and difficulty Level
</div>

We can infer that problem solvers found **'Shell'** questions to be notably challenging and strenuous to solve, while a majority of coders were able to solve **'Database'** questions with relative ease.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/project_2/pro2_5.jpg" title="average-min-max-accuracy" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Topics with average minimum and maximum accuracy
</div>

Discover the top four most popular topics on Leetcode, highly favored by problem solvers.
1. Array
2. String
3. Hash Table
4. Dynamic Programming

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/project_2/pro2_6.jpg" title="most-likes-topics" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Top leading topics on Leetcode
</div>

---
#### Topic prediction

To predict the topic based on question and description text, a systematic approach involves data processing, which includes text cleaning, word frequency analysis, and record preparation. 
<br>
Subsequently, the data is divided into training, validation, and test sets. Utilizing either simple regression methods or advanced models like Bert, we can effectively predict the topics.

### Results

| Methods | f1-score |
|---|---|
| Logistic Regression | 0.55 |
| Bert | 0.88 |

> Both notebooks are available [here](https://github.com/manthan2305/leetcode-questions-analysis/tree/main/notebooks)