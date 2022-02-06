---
layout: post
title: It's not CCA, it's just an extension of Dual PCA.
date: 2021-01-20 23:00
description:
tags: blog, single cell
categories: blog
---

## Introduction

The canonical correlation analysis(CCA) of Seurat is one of the most popular batch effects removing methods. However, the method part of the original paper (https://doi.org/10.1016/j.cell.2019.05.031)[dad] is quiet confused. After careful reading and some experiments, My friend(Ziyu Chen) and I found that the theory behind the method might not be based on canonical correlation analysis. It's an extension of dual PCA.

**The key idea is finding two low-dimension embeddings to conserve the cross-batch cell similarity.**

In this blog, I will first introduce the PCA and then dual PCA method.

## Principal Components Analysis

Principal Components Analysis(PCA) is a very popular method for dimension reduction. PCA aims to project the data points $$x \in R^{m}$$ into a linear subspace $R^d$ which maintain the most of the variability of the data.

## Direct PCA

For a given Data: $$X\in R^{g,n}$$(In single cell data, $$n$$ is the number of cells, $$g$$ is the number of genes.).
The $$d$$ principle axes are orthogonal axes.

PCA want to find a linear embedding $$Z= U^TX \in R^{k,n} $$ to represent the data $X$ and preserve variation as much as possible.

Another common definition of PCA is that, the projection onto the subspace minimize the squared reconstruction error, $$\sum_{i=1}^{t}\left\|x_{i}-\hat{x}_{i}\right\|^{2}$$.

$$
\min _{U_{d}} \sum_{i}^{t}\left\|x_{i}-U_{d} U_{d}^{T} x\_{i}\right\|^{2}
$$

The solution for $$U$$ can be expressed as singular value decomposition (SVD) of $$X$$ clearly.

$$
SVD(XX^T)=U \Sigma^2 U^{T}
$$

## Dual PCA

It turns out that the singular value decomposition allows us to formulate the principle components algorithm entirely in terms of dot products between data points. Based on that, there is another formulation of PCA - dual PCA.

The computation process of PCA is applying SVD to $$XX^T\in R^{g \times g}$$. But consider another form of this process - applying SVD to $$X^TX \in R^{n\times n}$$. The principle behind dual PCA is to consider the similarity matrix between samples. And dual PCA want to find a low dimension embedding to preserve this similarity matrix as much as possible.

$$
SVD(X^TX)=V \Sigma^2 V^{T}
$$

# "CCA", an extension of dual PCA

In this section, we will get the extension of dual PCA and show it's the same with Seurat CCA.

The dual PCA want to find a low dimension while preserve the similarity between samples of one dataset. We can easily extend this into two datasets.

Given two datasets, $$X\in R^{g,n}, Y\in R^{g,m}$$,in where $$n,m$$ means the number of cells, $$g$$ means number of genes. We want to do a similar thing. But in this setting, we want to find the low dimension linear embedding of these two data sets $$Z_1\in R^{k,n},Z_2\in R^{k, m}$$ to preserve the similarity matrix between cells from different datasets rather than the similarity matrix of a single dataset. Then we want to minimize the difference between real similarity matrix and the similarity of the embedding $$|Z_1Z_2^T - XY^T|$$.

It's quite obvious to solve this problem by a small modification of Dual PCA.
In dual PCA, the PCA apply the SVD to the $$X^TX$$, and in this case, apply the SVD to $$X^TY$$

therefore, we can get $$XY^T = U\Lambda V$$, and the embedding are $$Z_1 = U\Lambda^\frac{1}{2}, Z_2 = V \Lambda^\frac{1}{2}$$

## Summary

### PCA and Dual PCA

**Data**: $$X\in R^{n,m}$$, $$n$$ is the number of cells, $$m$$ is the number of genes.

**Task**: Find a low dimension embedding $$Z \in R^{n,k}$$ to represent the data $$X$$.

**Object**: Minimize $$ |ZZ^T - XX^T|\_F$$ .

**Direct PCA**: Apply SVD to $$XX^T$$ , $$XX^T = U \Lambda^2U^T$$, so $$Z = U_{1:n,1:k}\Lambda_{1:k}$$ is the low dimension embedding. ($$U$$ is the loading matrix)

**Dual PCA**: Apply SVD to $$X^TX $$,  $$X^TX = V\Lambda^2V^T$$, the loading matrix is $$V$$, So the low dimension embedding is $$Z =  XV_{1:m,1:k}  = U_{1:n,1:k}\Lambda_{1:k}$$

### Dual PCA: Extension to two datasets

**Data**: $$X\in R^{n,m}, Y\in R^{k,m}$$, $$n，k$$ is the number of cells, $$m$$ is the number of genes

**Task**: Find two low dimension embedding matrix $$Z_1\in R^{n,k},Z_2\in R^{m,k} $$ to represent the two datasets

**Object**: Minimize $$|Z_1Z_2^T - XY^T|_2$$ .

**Solution**: Apply SVD to $$XY^T$$, $$XY^T = U\Lambda V$$，Then $$Z_1 = U\Lambda^\frac{1}{2}, Z_2 = V \Lambda^\frac{1}{2}$$ is the solution.

## Result

Almost the same, except missing the singular value in the original paper.

<!-- TODO --> finish later

There is an assumption: "Treat the covariance matrix within each data set as diagonal." in the method part of the CCA paper. But it's not necessary and inconsistent with the data.

## Conclusion

Based on our understanding, we think the theory behind the seurat "CCA" algorithm is not CCA. It is more like an extension of dual PCA. Besides, the assumption in the methods part of the original paper, the covariance matrix of gene expression is diagonal, is not necessary. Furthermore, considering the formulation to preserve the similarity, the low dimension embedding should multiply the singular value first and then do the L2 normalization.
