---
layout: post
title: Cluster Analysis
date: 2023-02-16 11:12:00-0400
description: multivariate-analysis
tags: LinearAlgebra DataScience
categories: 
---

## Cluster Analysis
The term "cluster" is synonymous with both "group" and "classify". Cluster analysis is generally referred to the procedures for computationally classifying individuals into groups such that similar individuals are classified into the same group and dissimilar ones are allocated into different groups.

## Membership Matrices
In general, a membership matrix $$\mathbb{G} = (g_{ik})$$ is defined as the matrix of n individuals $$\times$$ k-clusters satisfying

$$
\tag{1}
g_{ik}=
\begin{cases}
      1 & \text{if individual i belongs to cluster k} \\
      0, & \text{otherwise}
    \end{cases} \\
$$

$$
\mathbb{G}=\begin{bmatrix}
    0 & 1 & 0 \\
    1 & 0 & 0 \\
    0 & 0 & 1 \\
    0 & 1 & 0 \\
    0 & 0 & 1 \\
\end{bmatrix} \\
$$

$$
\tag{2}
\begin{equation}
\mathbb{G1_k}=\mathbb{1_n}
\end{equation}
$$

These equations imply that each row of $$\mathbb{G}$$ has only one element taking 1, i.e.,each individual belongs to only one cluster. Such a matrix is also called an *indicator matrix* or a *design matrix*.

A major goal of clustering analysis is to obtain $$\mathbb{G}$$ from an n-individuals $$\times$$ p-variables data matrix $$\mathbb{X}$$. For example, k-means clustering (KMC)  provides a membership matrix $$\mathbb{G}$$ together with a k-cluster $\times$ p-variable cluster feature matrix $$\mathbb{C}$$, which describes how each cluster is characterized by variables.

## Formulation
KMC is defined as
$$
\tag{3}
\mathbb{X=GC+E}
$$

the sum of squared errors is
$$
\tag{4}
f(\mathbb{G,C})=||\mathbb{E}||^2=||\mathbb{X-GC}||^2
$$

which is minimized over $$\mathbb{G, C}$$ subject to $$\mathbb{G1_k=1_n}$$ and (1) and the solution is given by a least sqaures method. 

Plotting out $$\mathbb{C}$$ matrix and $$\mathbb{X}$$ matrix, we can find that $$c_k$$ (the kth row of $$\mathbb{C}$$) expresses the representative point of cluster k that is located at the center of the individuals belonging to that cluster. For this reason, $$\mathbb{C}$$ is also called a *cluster center matrix*.

The lines connecting individuals to their centers in each cluster indicate the row vectors of error matrix. Restate the objective function: minimizing the sum of the squared lengths of the lines, which implies making each individual vector close to the center of the cluster including the individual.

## Iterative Algorithm
In general, statistical analysis procedures can be classified into the following two types:
-  those with explicit solutions (as regression analysis and PCA)
-  those without explicit solutions as KMC

The solution to KMC is given by iterative algorithms. Detailed solution is omitted, but general steps are present here:
- step1: Set $$\mathbb{G}$$ and $$\mathbb{C}$$ to specified matrices $$\mathbb{G_t}$$ and $$\mathbb{C_t}$$, respectively, with \\(t=0\\).
- Step 2: Obtain $$\mathbb{C}$$ with $$\mathbb{G}$$ being fixed at $$\mathbb{G_t}$$, and express the resulting $$\mathbb{C}$$ as $$\mathbb{C_{t+1}}$$
- Step 3: Obtain $$\mathbb{G}$$ with $$\mathbb{C}$$ being fixed at $$\mathbb{C_t}$$, and express the resulting $$\mathbb{G}$$ as $$\mathbb{G_{t+1}}$$
- Step 4: Finish if convergence is reached; otherwise, go back to Step2 with $t$ increased by 1.