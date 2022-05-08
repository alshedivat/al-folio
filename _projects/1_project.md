---
layout: page
title: Analyzing and predicting global terrorism network
description: This project was inspired by the course CS224W, which is a simple application of graph networks.
img: assets/img/project1cover.png
importance: 1
category: work
---

In this project, I used the open-source <a href="https://ccjs.umd.edu/sites/ccjs.umd.edu/files/pubs/FTPV_A_224594.pdf"> Global Terrorism Database</a>


<h1>Dataset description</h1>

    ---
    Database: Global Terrorism Database
    Description: Open-source database that includes interesting information on terrorist events around the world between 1970 and 2016.
    Dimensions: 170350*135
    Relevant features: related events, attack type, target type, exact date, location, group, weapon, casualty ...
    ---

<h1>Problem definition</h1>

We define two important variables for the dataset analysis:

$$
Severity(event) = \alpha*N^{death}(event) + N^{injured}(event)
$$
