---
layout: post
title: Principal Component Analysis
date: 2023-02-02 11:12:00-0400
description: statistical-learning
tags: LinearAlgebra DataScience
categories: 
---

### Principal Component Analysis (PCA)
According to <a href="https://en.wikipedia.org/wiki/Principal_component_analysis#:~:text=Principal%20component%20analysis%20(PCA)%20is,the%20visualization%20of%20multidimensional%20data.">wikipedia</a>: 

PCA is a statistical multivariate analysis technique for reducing the dimensionality of a dataset by linearly transforming the data into a new coordinate system where (most of) the variation in the data can be described with fewer dimensions.

To achieve the linear transfomation, we are about to find a new set of basis vectors such that the linear relationships across the variables are maximally aligned with the basis vectors (preserving maximum variance). 

#### Mathematics of PCA
PCA combines the statistical concept of **variance** with the linear algebra concept of **linear weighted combination**. Variance is a measure of the dispersion of a dataset around its mean. PCA assumes that variance is relevance (information) and the directions in the data space that have more variance are more important. 

Let $$\mathbb{X}$$ denote the data matrix, and $$\vec{w}$$ denote the vector of weights for linear combination. Objective function is defined as:  

$$
\tag{1.0}
\lambda=||\mathbb{X}\vec{w}||^2 \Rightarrow \lambda=\frac{||\mathbb{X}\vec{w}||^2}{||\vec{w}||^2} \Rightarrow \lambda=\frac{\vec{w}^T\mathbb{X}^T\mathbb{X}\vec{w}}{\vec{w}^T\vec{w}}
$$

By definition, $$\mathbb{X^T}\mathbb{X}=C_{XX}$$:

$$
\tag{1.1}
\lambda=\frac{\vec{w}^TC\vec{w}}{\vec{w}^T\vec{w}}
$$

The linear algebra approach here is to consider not just a single vector solution but an entire set of solutions. We rewrite the equation using vector matrix $$\mathbb{W}$$:

$$
\tag{1.2}
\Lambda=(\mathbb{w}^T\mathbb{W})^{-1}\mathbb{W}^T\mathbb{C}\mathbb{W} \Rightarrow \Lambda=\mathbb{W}^{-1}\mathbb{C}\mathbb{W} \Rightarrow \mathbb{W}\Lambda=\mathbb{C}\mathbb{W}
$$

What the equation tells us is the solution to PCA is to perform an eigendecomposition on the data covariance matrix. The eigenvalues are the weights for the linear combination of the variables, and their corresponding eigenvalues are the variances of the data along the direction defined by the combination.

#### Proportion of Variance Explained
PCA reduces the dimensionality while explaining most of the variability. The proportion is defined by:

$$
\tag{2}
PVE=100*E_i/\sum_{i=1}^{n}E_i
$$

where

$$E_i$$ denotes the eigenvalue of the ith eigenvector or component $$n=1,\cdots,N$$, number of variables 

