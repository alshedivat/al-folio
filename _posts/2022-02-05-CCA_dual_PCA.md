---
layout: post
title: It's not CCA, it's an extension of PCA.
date: 2021-01-20 23:00
description:
tags: blog, single cell
categories: blog
---

## Introduction

The canonical correlation analysis(CCA) of Seurat is one of the most popular batch effects removing methods. However, the method part of the original paper<a href="https://doi.org/10.1016/j.cell.2019.05.031"> Comprehensive Integration of Single-Cell Data</a> is quiet confused. After careful reading and some experiments, My friend(Ziyu Chen) and I found that the theory behind the method might not be based on canonical correlation analysis. It's an extension of dual PCA.

**The key idea is finding two low-dimension embeddings to conserve the cross-batch cell similarity.**

Besides, there is an intrinsic connection between MNN and "CCA"(an extension of dual PCA).
In this blog, I will first introduce the PCA and then go to dual PCA method. With a simple extension of Dual PCA, we can get a better version of Seurat "CCA" without more assumptions.

## Principal Components Analysis

Principal Components Analysis(PCA) is a very popular method for dimension reduction.

### Direct PCA

PCA aims to project the data points $$x \in R^{g}$$ into a linear subspace $$R^k$$ which maintain the most of the variability of the data.

For a given data: $$X\in R^{n \times g}$$(In single cell data, $$n$$ is the number of cells, $$g$$ is the number of genes.).
The $$k$$ principle axes are orthogonal axes.

PCA want to find a linear embedding $$Z= XV \in R^{k \times n}$$, where $$X\in R^{n\times g}, V\in R^{g \times k} $$ to represent the data $X$ and preserve variation as much as possible. (_Another common definition of PCA is that, the projection onto the subspace minimize the squared reconstruction error._)

The solution for $$V$$ can be expressed as singular value decomposition (SVD) of $$X$$ clearly.

$$
X = U\Sigma V^T, X^TX=V \Sigma^2 V^{T}
$$

And $$Z = XV_{1:g,1:k} =U\Sigma V^T V_{1:g,1:k} = U_{1:n, 1:k}\Sigma_{1:k} $$ will be the solution.

### Dual PCA

It turns out that the singular value decomposition allows us to formulate the principle components algorithm entirely in terms of dot products between data points. Based on that, there is another formulation of PCA - dual PCA.

The computation process of PCA is applying SVD to $$X^TX\in R^{g \times g}$$. But consider another form of this process - applying SVD to $$XX^T \in R^{n\times n}$$. The principle behind dual PCA is to consider the similarity matrix between samples(The dot product is also a similarity metric after normalization). And dual PCA want to find a low dimension embedding to preserve this similarity matrix as much as possible.

$$
X = U\Sigma V^T, XX^T=U\Sigma^2 U^{T}
$$

And $$Z = U_{1:n, 1:k}\Sigma_{1:k} $$ will be the solution. We can also check the solution.

$$
|XX^T - ZZ^T| = |U\Sigma^2 U^{T} - U_{1:n, 1:k}\Sigma_{1:k}^2 (U_{1:n,1:k})^T|
$$

The $$U_{1:n, 1:k}\Sigma_{1:k}^2 (U_{1:n,1:k})^T$$ is the best low rank approximate of $$U\Sigma^2 U^{T}$$ based on the property of SVD.

# "CCA", an extension of dual PCA

In this section, we will get the extension of dual PCA and show it's almost the same with the "CCA" method in Seurat.

The dual PCA want to find a low dimension while preserve the similarity between samples of one dataset. We can easily extend this into two datasets.

Given two datasets(from two batch), $$X\in R^{n\times g}, Y\in R^{m\times g}$$, where $$n,m$$ means the number of cells, $$g$$ means number of genes. We want to do a similar thing. But in this setting, we want to find the low dimension linear embedding of these two data sets $$Z_1\in R^{n\times k},Z_2\in R^{m \times k}$$ to preserve the similarity matrix between cells from different datasets rather than the similarity matrix of a single dataset. Then we want to minimize the difference between real similarity matrix and the similarity of the embedding $$\|Z_1^TZ_2 - XY^T\|$$ which is also means finding a low rank approximate of $$XY^T$$.

It's quite obvious to solve this problem by a small modification of Dual PCA.
In Dual PCA, we apply the SVD to the $$XX^T$$, and in this case, just apply the SVD to $$XY^T$$. Because **in Dual PCA, the embedding preserve the sample similarity within one dataset, in this case, these embedding will preserve the cross-batch sample similarity**.

We can get $$XY^T = U\Sigma V^T$$, and the best embeddings can be $$Z_1 = U_{1:n,1:k}\Sigma_{1:k}^\frac{1}{2}, Z_2 = V_{1:n, 1:k}\Sigma_{1:k}^\frac{1}{2}$$.

We can also check the approximate

$$
|XY^T  - Z_1Z_2^T| = | U\Sigma V^T - U_{1:n,1:k}\Sigma_{1:k}^\frac{1}{2} (V_{1:n, 1:k}\Sigma_{1:k}^\frac{1}{2})^T| \\
= | U\Sigma V^T - U_{1:n,1:k}\Sigma_{1:k} (V_{1:n, 1:k})^T|
$$

Based on SVD, the $$U_{1:n,1:k}\Sigma_{1:k} (V_{1:n, 1:k})^T$$ is the best low rank approximate of $$U\Sigma V^T$$

## Summary

### PCA and Dual PCA

**Data**: $$X\in R^{n\times g}$$, $$n$$ is the number of cells, $$g$$ is the number of genes.

**Task**: Find a low dimension embedding $$Z \in R^{n\times k}$$ to represent the data $$X$$.

**Object**: Minimize $$\|Z^TZ - X^TX\|$$ .

**Direct PCA**: Apply SVD to $$X^TX$$ , $$X^TX = V \Sigma^2V^T$$, $$V$$ is the loading matrix so $$Z = XV_{1:g,1:k} = U\Sigma VV_{1:g,1:k} = U_{1:n,1:g}\Sigma_{1:k}$$ is the low dimension embedding.

**Dual PCA**: Apply SVD to $$XX^T $$,  $$XX^T= U\Sigma^2U^T$$, So the low dimension embedding is $$Z = U_{1:n,1:g}\Sigma_{1:k} $$

### Dual PCA: Extension to two datasets

**Data**: $$X\in R^{n\times g}, Y\in R^{m \times g}$$, $$n，m$$ is the number of cells, $$g$$ is the number of genes

**Task**: Find two low dimension embedding matrix $$Z_1\in R^{n\times k},Z_2\in R^{m \times k} $$ to represent the two datasets

**Object**: Minimize $$\|Z_1Z_2^T - XY^T\|$$ .

**Solution**: Apply SVD to $$XY^T$$, $$XY^T = U\Sigma V$$，Then $$Z_1 = U\Sigma^\frac{1}{2}, Z_2 = V \Sigma^\frac{1}{2}$$ is the solution.

## Back to the "CCA" paper

In the method section of the "CCA" paper, authors use some assumptions to get the final result of cell embeddings. An important assumption is "Treat the covariance matrix within each data set as diagonal." in the method part of the CCA paper to simplify the original CCA problem into a SVD problem.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-02-05-20-46-37.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    But it's not necessary and inconsistent with the biology.
</div>

From our view, applying SVD to $$XY^T$$ is very easy to understand - just capture the cell similarity across batches and don't need any other assumptions.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-02-05-19-49-11.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Futhermore, in the original method, the cell embeddings of two datasets is $$Z_1 = U, Z_2 = V $$ missing the singular value compared to our derivation.

To compare the difference, we implement these two methods to check if there is any difference.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-02-05-19-57-14.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    It seems contain more biological variation if we add the single values.
</div>

### Difference between "CCA" and CCA

The CCA in seurat is taking the project vector from the traditional CCA directly as embedding(with some assumptions).

But in fact, **the traditional CCA project genes into a common space rather than cells.**

## Connection with the Mutual nearest neighbor (MNN) method.

There is an intrinsic connection between MNN and "CCA"(an extension of dual PCA). The shared assumption is that **the similar cells from different batch have a higher similarity(smaller distance in MNN) compared to different cells.**

We can plot a heatmap of the similarity matrix of two different batches.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-02-05-20-15-37.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The similarity between cells from same cell types is higher than others.
</div>

## Conclusion

Based on our understanding, we think the theory behind the seurat "CCA" algorithm is not CCA. It is more like an extension of dual PCA. Besides, the assumption in the methods part of the original paper, the covariance matrix of gene expression is diagonal, is not necessary.

Furthermore, considering the formulation to preserve the similarity, the low dimension embedding should multiply the singular value first and then do the L2 normalization. And there is an intrinsic connection between MNN and "CCA"(an extension of dual PCA).
