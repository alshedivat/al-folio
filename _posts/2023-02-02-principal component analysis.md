---
layout: post
title: Principal Component Analysis
date: 2023-02-02 11:12:00-0400
description: statistical-learning
tags: LinearAlgebra DataScience
categories: 
---

### Principal Component Analysis
Each principal component vector defines a direction in feature space. 


If we project the n data points $x_1,...,x_n$ onto the first eigenvector, the projected values are called the principal component scores for each observation.

**Important**  
the algebraic definition of dot product (see previous blog) is:
$$
\begin{equation}
\tag{1}
\vec{a} \cdot \vec{b}=a_1b_1+\cdots+a_nb_n=\sum_{i=1}^{n}a_ib_i 
\end{equation}
$$

#### Proportion of Variance Explained
PCA reduces the dimensionality while explaining most of the variability. The proportion is defined by:

$$
\tag{2}
PVE=100*E_i/\sum_{i=1}^{n}E_i
$$

where

$$E_i$$ denotes the eigenvalue of the ith eigenvector or component $$n=1,\cdots,N$$, number of variables 

More to come!