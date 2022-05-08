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
<ul>
  <li>Severity with respect to an event defined as:

  $$
  Severity(event) = \alpha*N^{death}(event) + N^{injured}(event)
  $$

  Intuitively, $\alpha$ is a parameter that makes sense of the definition; it represents the equivalent of one dead person wrt the number of injured people.</li>
  <li>Lethality with respect to a terrorist group:

  $$Lethality = \sum_{event}Severity(event)$$</li>
</ul>

We use the following notation $L_i$ to define the lethality at year $i$. and we introduce the evolution vector defined by: $E_i = L_} - L_{i-1}$, which we hope it captures the pattern of evolution of groups. We are interestd in constructing a graphical representation of terrorist groups relation network thanks to a common feature that gives information of related events. Although, one terrorist group could lead to many attacks which represent a remarkable limitation to the model in order to analyze the connection between different groups, we are only interesed in discovering the connection between different groups through an investigation of the temporal evolution patterns of those different groups in terms of their lethalities.

<h1>Attempts to solve the problem</h1>

<h3>Part 1: Summary graph construction by clustering groups</h3>

We proceed in a pairwise manner, and we evaluate the similarity score between different evolution vectors (not limited to lethality, but also by extending the definition of evolution vector to other variables including the geographic area in which the group is active). After calculating the similarity between different groups represented by the similarity matrix, we can decide if there's a connection represented by an edge between the groups based on an intuitive threshold ( too small threshold leads to a dense graph representation, and too large threshold leads to a sparse graph  representation).
<img src="/assets/img/similarity.png" title="3D representation of terrorist groups connections">

<h3>Part 2: Predicting the spread of terrorist attacks</h3>

The goal of this part is to predict the spread of terrorist groups accross the globe, we study the evolution of the graph where nodes represents the groups and the edges represent the connection between groups. A first way to approach the problem is by using particle filters: Having longitude and lattitude for all terrorist event, we discretize the earth globe to 180*90 grids, the particle filter initiate the simulation by a uniform distribution of particles (terrorist events in this case) around the globe. When a terrorist group is accumulating events, the algorithm updates the weight of all the particles representing the groups. By the end, the particle filter calculates the weighted expected particle from all particles scattered to return the predicted state of groups.

<h1>Possible ways to improve the accuracy of the model</h1>

Particle filters are known for their inaccurate results, to help increase the accuracy of the model, we choose change the way we approach the problem and include other important information (media news, other technical data representing the connection between groups, etc...), then we can study the causality between terrorist groups to help predict the direction of the spread of terrorist attacks.
