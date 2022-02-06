---
layout: post
title: Seurat CCA? It's just a simple extension of PCA!
date: 2022-02-05 23:00
description:
tags: blog, single-cell
categories: blog
---

## Introduction

The canonical correlation analysis(CCA) of Seurat is one of the most popular batch effects removing methods. However, the _Method_ part of the original paper<a href="https://doi.org/10.1016/j.cell.2019.05.031"> Comprehensive Integration of Single-Cell Data</a> is quiet confusing. After careful reading and some experiments, my friend(Ziyu Chen) and I found that the math behind the so-called CCA method might not be based on canonical correlation analysis. In fact, it's just a simple extension of (dual) PCA!

In this blog,

- I will first introduce PCA and dual PCA. While PCA/dual PCA computes the self-similarity in one dataset ($$XX^T$$), we can extend them to compute the similarity across two datasets ($$XY^T$$), and the latter is exactly what "Seurat CCA" does!

- Therefore, it's not difficult to realize that there is an intrinsic connection between the two most popular batch-effect removing methods, "Seurat CCA" and MNN (full name) <link>.

- Finally, with these understandings, it's obvious that the current "Seurat CCA" is missing the singular value in the embedding process of dual PCA. We demonstrated by experiments that if the singular value is added to the algorithm, more biological variation will be preserved.

## Principal Components Analysis (PCA)

PCA is a very popular method for dimension reduction.

### Direct PCA

PCA aims to project data points $$x \in R^{g}$$ into a linear subspace $$R^k$$ while preserving as much as possible the variability.

For a given dataset $$X\in R^{n \times g}$$ (In single cell RNAseq data, $$n$$ is the number of cells, $$g$$ is the number of genes), PCA wants to find a linear embedding $$Z= XV \in R^{k \times n}$$, where $$X\in R^{n\times g}, V\in R^{g \times k} $$, to represent $$X$$ while preserving as much as possible the variability in $$X$$. (_Note: An equivalent and another common definition of PCA is the projection onto a subspace minimizing the squared reconstruction error._)

The solution $$V$$ can be calculated from the singular value decomposition (SVD) of $$X$$:

$$
X = U\Sigma V^T, X^TX=V \Sigma^2 V^{T}.
$$

And the embedding we are looking for in PCA will be

$$
Z = XV_{1:g, 1:k} =U\Sigma V^T V_{1:g,1:k} = U_{1:n, 1:k}\Sigma_{1:k}.
$$

### Dual PCA

SVD allows us to formulate the PCA entirely in terms of dot products between data point pairs $$(x_i,x_j)$$. Based on that, there is another formulation of PCA -- dual PCA.

The computation process of PCA is applying SVD to $$X^TX\in R^{g \times g}$$. But consider another form of this process -- applying SVD to $$XX^T \in R^{n\times n}$$. (Note that $$R^{g \times g}$$ and $$R^{n\times n}$$ have the same rank, so they contain the same amount of information.) The principle behind dual PCA is to consider the similarity matrix between samples(The dot product is also a similarity metric after normalization). And dual PCA want to find a low dimension embedding to preserve this similarity matrix as much as possible. Same as for PCA, we have

$$
X = U\Sigma V^T, XX^T=U\Sigma^2 U^{T}
$$

And $$Z = U_{1:n, 1:k}\Sigma_{1:k} $$ will be the embedding, which is the same as what we derived in PCA. We can check it by

$$
|XX^T - ZZ^T| = |U\Sigma^2 U^{T} - U_{1:n, 1:k}\Sigma_{1:k}^2 (U_{1:n,1:k})^T|.
$$

Here, the eigenvalues in the diagonal matrix $$\Sigma$$ is monotonically decreasing, meaning that $$U_{1:n, 1:k}\Sigma_{1:k}^2 (U_{1:n,1:k})^T$$ is the best low-rank approximation of $$U\Sigma^2 U^{T}$$.

## "Seurat CCA" -- an Extension of Dual PCA

In this section, we will get an extension of dual PCA and show that it's almost the same as the "Seurat CCA" method.

The dual PCA wants to find a low-dimensional embedding while preserving the similarity between samples in one dataset. We can easily extend it to two datasets.

Given two datasets(from two batches), $$X\in R^{n\times g}$$ and $$Y\in R^{m\times g}$$, where $$n$$ and $$m$$ means the number of cells, $$g$$ means the number of genes. We want to do a similar thing, but in this setting, we want to find two low-dimensional linear embeddings for both datasets $$Z_1\in R^{n\times k},Z_2\in R^{m \times k}$$ to **preserve the similarity matrix between cells from different datasets rather than in a single dataset**. Then we want to minimize the difference between real similarity matrix and the similarity of the embedding, $$\|Z_1^TZ_2 - XY^T\|$$, which also means finding a low rank approximation of $$XY^T$$.

It's quite obvious that we can solve the above problem with a small modification of Dual PCA -- In dual PCA, we apply SVD to $$XX^T$$, but now we can apply the SVD to $$XY^T$$. As **in Dual PCA, the embedding preserves the sample similarity within one dataset, in this new case, the embeddings will preserve the cross-batch sample similarity**.

We can get $$XY^T = U\Sigma V^T$$, and the best embeddings will be $$Z_1 = U_{1:n,1:k}(\Sigma_{1:k})^\frac{1}{2}, Z_2 = V_{1:n, 1:k}(\Sigma_{1:k})^\frac{1}{2}$$.

We can also check this approximation:

$$
|XY^T  - Z_1Z_2^T| = | U\Sigma V^T - U_{1:n,1:k}\Sigma_{1:k}^\frac{1}{2} (V_{1:n, 1:k}\Sigma_{1:k}^\frac{1}{2})^T| \\
= | U\Sigma V^T - U_{1:n,1:k}\Sigma_{1:k} (V_{1:n, 1:k})^T|
$$

Based on SVD, $$U_{1:n,1:k}\Sigma_{1:k} (V_{1:n, 1:k})^T$$ is the best low-rank approximation of $$U\Sigma V^T$$.

## Summary of Math

### PCA and Dual PCA

**Data**: $$X\in R^{n\times g}$$, $$n$$ is the number of cells, $$g$$ is the number of genes.

**Task**: Find a low-dimensional embedding $$Z \in R^{n\times k}$$ to represent the data $$X$$.

**Object**: Minimize $$\|Z^TZ - X^TX\|$$ .

**Direct PCA Solution**: Apply SVD to $$X^TX$$: $$X^TX = V \Sigma^2V^T$$. $$V$$ is the loading matrix, so $$Z = XV_{1:g,1:k} = U\Sigma VV_{1:g,1:k} = U_{1:n,1:g}\Sigma_{1:k}$$ is the low-dimensional embedding.

**Dual PCA Solution**: Apply SVD to $$XX^T $$:  $$XX^T= U\Sigma^2U^T$$. So the low-dimensional embedding is also $$Z = U_{1:n,1:g}\Sigma_{1:k} $$.

### Dual PCA Extended to Two Datasets

**Data**: $$X\in R^{n\times g}, Y\in R^{m \times g}$$, $$n$$ and $$m$$ are the number of cells, $$g$$ is the number of genes

**Task**: Find low-dimensional embedding matrices $$Z_1\in R^{n\times k}$$ and $$Z_2\in R^{m \times k} $$ to represent the two datasets $$X$$ ane $$Y$$.

**Object**: Minimize $$\|Z_1Z_2^T - XY^T\|$$ .

**Solution**: Apply SVD to $$XY^T$$: $$XY^T = U\Sigma V$$. Then $$Z_1 = U\Sigma^\frac{1}{2}, Z_2 = V \Sigma^\frac{1}{2}$$ are the embeddings.

## Back to the "Seurat CCA" paper

In the _Method_ section of the "Seurat CCA" paper, authors had several assumptions to get to the final result of cell embeddings. An important assumption is to "treat the covariance matrix within each dataset as diagonal", meaning that genes are independent to each other, which is **NOT** true.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-02-05-20-46-37.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    But it's not necessary and inconsistent with the biology.
</div>

Alternatively, applying SVD to $$XY^T$$ is intuitive and natural - it is just to capture the cell similarity across batches and does not need any assumption.

Futhermore, in the original paper, the cell embeddings of two datasets are $$Z_1 = U$$ and $$Z_2 = V $$, missing the singular value compared to our derivation above.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-02-05-19-49-11.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

To compare the difference in algorithm performance with or without the singular value, we implemented these two methods to data from PAPER (name, link). (code)

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-02-05-19-57-14.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    MORE TO DO. It seems contain more biological variation if we add the single values.
</div>

It's obvious that with the singular value, different cell types are more separated from each other in Umap visualization, meaning that more biological variation is preserved in the embedding.

### Difference between "Seurat CCA" and Real CCA

The "Seurat CCA" is taking the project vector from the traditional CCA directly as cell embeddings (with some assumptions). But in fact, **the traditional CCA projects genes into a common space rather than cells.**

## Connection with the Mutual Nearest Neighbor (MNN) method.

There is an intrinsic connection between "Seurat CCA" and MNN, another popular method in removing batch-effect.

"Seurat CCA" has the assumption that **biologically more similar** cells from different batches have a **higher mathematical similarity** (defined as dot product), while MNN has a very similar assumption that biologically more similar cells from different batches have **smaller euclidean distance** defined in the algorithm. In fact, with proper normalization, the "mathematical similarity (dot product)" in the former assumption and the "euclidean distance" in the latter are **equivalent** to each other!

The above assumptions are right in real data. We can plot a heatmap of the similarity matrix of two different batches, and what we see is a higher similarity along the diagonal.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-02-05-20-15-37.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The similarity between cells from same cell types is higher than others.
</div>

## Conclusion

- Based on our understanding, the math behind the "Seurat CCA" algorithm is actually not CCA, but an extension of dual PCA.

- In the original paper, the assumption that the covariance matrix of gene expression is diagonal, is not necessary.

- Furthermore, considering the formulation to preserve the most similarity (dual PCA), the low-dimensional cell embeddings should multiply the singular value, which is currently missing in the "Seurat CCA" algorithm.

- And finally, there is an intrinsic connection between MNN and "Seurat CCA" (extended dual PCA).
