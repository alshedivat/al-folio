---
layout: post
title: Linear Algebra Fundamentals
date: 2023-02-01 11:12:00-0400
description: statistical-learning
tags: LinearAlgebra DataScience 
categories: 
---
### Matrix Algebra :art:

#### Overview

- matrix operations: omitted
- properties of matrix operations: omitted
- matrix characteristics
  - rank: the maximum number of linearly independent rows/coulmns; linear independent set- no row in this set of rows can be expressed as a linear combination of the rest of rows
  - trace: sum of the diagonal elemetns of a matrix: **tr(A)**
  - determinant: how much the matrix stratches the vector
  - transpose
  - inverse: if the determinant of sqaure matrix A is not equal to 0, its inverse exists

- G-inverse: $$\mathbb{A^{-1}}$$ satisfies $$\mathbb{AA^{-1}A}=\mathbb{A}$$ is called G-inverse
- Eigenvalues & Eigenvectors: defined only for square matrices, only stratches the vector but does not change the direction during liner transformation
- trace-determinant from eigenvalues: $$tr(\mathbb{A})=\sum_{m}^{i=1}\lambda_i, \mid \mathbb{A} \mid=\Pi\lambda_i$$
- properties of matric characteristics
  - trace: $$tr(\mathbb{A+B})=tr(A)+tr(B)$$
  - etc

summary

- the determinant $$\mid \mathbb{A} \mid$$ is the product of the eigenvalues of A
- the inverse of a matrix exists if $$\mid \mathbb{A} \mid \ne 0$$
- the trace of A $$tr(\mathbb{A})$$ is the sum of the eigenvalues of A
- the sum of the traces of two matrices equals the trace of the sum of the two matrices
- the trace $$tr(\mathbb{AB})$$ equals $$tr(\mathbb{BA})$$
- the rank $$rank(\mathbb{A})$$ is the maximal number of linearly independent rows/columns of A

#### Spectral decomposition & singular values decomposition

- the Jordan decomposition gives a representation of a symmetric matric in terms of eigenvalues and eigenvectors
- the eigenvectors corresponding to the largest eigenvalues indicate the "main direction" of the data
- the SVD is a generalization of the Jordan decomposition to non-square matrices


#### Quadratic Forms

A quadrati cform $$\mathcal{Q(x)}$$ is defined for a symmetric matrix **A(pxp)** and a vector x

$$
\mathcal{Q(x)}=\mathcal{x^TAx}=\sum_{i=1}^{p}\sum_{j=1}^{p}a_{ij}x_ix_j
$$

Defineteness of Quadratic Forms and Matrices

$$
\left\{
\begin{array}\\
        Q(x) > 0 & \mbox{for all} \ x \ne 0 \  \mbox{positive definite}\\
        Q(x) \ge 0 & \mbox{for all} \ x \ne 0 \  \mbox{positive semidefinite} \\
\end{array}
\right.
$$

summary

- A quadratic form can be described by a symmetric matrix **A**
- Quadratic forms can always be diagonalized
- Positive definiteness of a quadratic form is equivalent to positiveness of the eigenvalues of the matrix **A**
- The maximum and minimum of a quadratic form given some constraints can be expressed in terms of eigenvalues.


#### Block/Partitioned Matrices

Very often we will have to consider certain groups of rows and columns of a matrix **A(n×p)**.

$$
\mathbb{A}=\begin{bmatrix}
  \mathcal{A_11} & \mathcal{A_12} \\
  \mathcal{A_21} & \mathcal{A_22}
\end{bmatrix}
$$

where $$A_{ij}(n_i \times p_j), i,j=1,2, n_1+n_2=n, p_1+p_2=p$$.

### Dot Product🅰️

The dot product is an operation for multiplying two vectors to get a scalar value. Suppose we have two vectors $$\vec{a}=[a_1,\cdots,a_n]^T$$ and $$\vec{b}=[b_1,\cdots,b_n]^T$$, their dot product is denoted as $$\vec{a}\cdot\vec{b}$$, which has both **algebraic** and **geometric** definition. The **algebraic** formula is defined as:

$$
\begin{equation}
\vec{a} \cdot \vec{b}=a_1b_1+\cdots+a_nb_n=\sum_{i=1}^{n}a_ib_i
\end{equation}
$$

and the **geometric** definition is given by:

$$
\begin{equation}
\vec{a} \cdot \vec{b}=\lVert \vec{a} \rVert \lVert \vec{b} \rVert\cos\theta
\end{equation}
$$


Importantly, when $$\vec{b}=1$$, the dot product above equals $$\lVert \vec{a} \rVert \cos\theta $$.


### Vector Projection🅱️

Consider two vectors $$\vec{a}$$ and $$\vec{b}$$. We are projecting $$\vec{a}$$ onto $$\vec{b}$$, and we can scale $$\vec{b}$$ with a scalar $$c$$. $$c\vec{v}$$ defines a infinite line. We’re going to find the projection of $$\vec{a}$$ onto $$\vec{b}$$, written as:


$$
proj_{\vec{a}}\vec{cb}
$$


The vector connecting $$\vec{a}$$ and $$c\vec{b}$$ is $$\vec{a} −c\vec{b}$$. We want to find c such that $$\vec{a} −c\vec{b}$$ is perpendicular to $$c\vec{b}$$. Two perpendicular vectors have zero dot product:  

$$
(\vec{a} −c\vec{b}) \cdot \vec{b} = 0 \Rightarrow 
c=\frac{\vec{a}\vec{b}}{\vec{b}\vec{b}}
$$

Because $$\lVert \vec{b} \rVert=\sqrt{\vec{b} \cdot \vec{b}} \Rightarrow c=\frac{\vec{a}\vec{b}}{\lVert \vec{b} \rVert^2}$$

So:

$$
\begin{equation}
    proj_{\vec{a}}\vec{b}=\frac{\vec{a}\vec{b}}{\lVert \vec{b} \rVert^2}\vec{b}
\end{equation}
$$

where: $$\vec{u}=\frac{\vec{b}}{\lVert \vec{b} \rVert} $$ is called unit vector defined by $$ \vec{b} $$

Rewrite the projection in terms of the unit vector:

$$
\begin{equation}
    proj_{\vec{a}}\vec{b}=\frac{\vec{a}\vec{b}}{\lVert \vec{b} \rVert}\vec{u}
\end{equation}
$$ $$ \frac{\vec{a}\vec{b}}{\lVert \vec{b} \rVert} $$ is called the scalar projection of $$ \vec{a} $$ onto $$ \vec{b} $$.


### Eigenvalue & Eigenvector 🆎

Eigendecomposition is a pearl of linear algebra. Eigendecomposition (as wellas SVD) is among the most important contributions of lenear algebra to data science. <br>

Eigendecomposition can be seen via difference lens and it has different interpretations:

-  geometric interpretation (axes of rotational invariance)
-  statistical interpetation (directions of maximal covariance)
-  graph-theoretic interpretation (the impact of a node on its network)
-  financial-market interpretation (identifying stocks that covary), 
-  etc.

Eigendecomposition is defined only for square matrices. Non-square matrices can be decomposed using SVD. Every sqaure matrix (MxM $$ \mathbb{A} $$) has M eigenvalue-eigenvector pairs. The goal of eigendecomposition is to reveal these vector-scalar pairs. <br>

#### Inpterpretation of Eigenvalues and Eigenvectors

- Geometry
  - a special combination of a matrix and a vector such that the matrix stretched—but did not rotate—that vector.

the matrix eigenvalue equation:  
$$
\begin{equation}
  \mathbb{A}\vec{v}=\lambda\vec{v}
\end{equation}
$$

General form of the matrix eigenvalue equation
$$
\begin{equation}
  \mathbb{AV}=\mathbb{V \Lambda} \Rightarrow \\
  \mathbb{A}= \mathbb{V \Lambda V^{-1}}
\end{equation}
$$

- Statistics
- 
  -  multivariate data analysis requires the global pattern
  -  typical question: 
     - whether the entirety of the cryptospace operates as a single system? If so, one large eigenvalue accounts for the majority of the variance
     - whether there are independent subcategories within that space. If so, several large eigenvalues exist.

- more...
  

#### Finding Eigenvalues

$$
\mathbb{A}\vec{v}=\lambda\vec{v} \Rightarrow 
\mathbb{A}\vec{v}-\lambda\vec{v} = \vec{0} \Rightarrow 
(\mathbb{A}-\lambda\vec{I})\vec{v}=\vec{0}
$$

The eigenvector is in the null space of the matrix shifted by its eigenvalue. That mean the matrix shifted by its eigenvalue is singular and has a determinant $$ \det(\mathbb{A}-\lambda\vec{I})=0 $$ <br>
Use a $$2\times2$$ matrix as an example: 

$$
\det (\mathbb{A}-\lambda\vec{I}) =
\begin{pmatrix}
a & b \\
c & d 
\end{pmatrix}-
\lambda
\begin{pmatrix}
1 & 0 \\
0 & 1 
\end{pmatrix} = 0 \\
\Rightarrow
\lambda^2-(a+d)\lambda+(ad-bc)=0
$$

The determinant of an eigenvalue-shifted matrix set to zero is called the **characteristic polynomial** of the matrix.


#### Finding Eigenvectors

Each eigenvalue corresponds to one eigenvector. Finding the eigenvectors is relatively easy. Use the example above, we can find one eigenvector [1 1]. But is [1 1] the only possible basis vector for the null space? Not even close, but any scaled version of vector [1 1] is a basis for that null space. In other words, if $$\vec{v}$$ is an eigenvector of a matrix, then so is $$\alpha\vec{v}$$ for any real-valued $$\alpha$$ except zero. The reason for this is, eigenvector is important because of its **direction**, not its *magnitude*.

- There is no best basis vector
- There is no correct sign of an eigenvector


### Symmetric Matrices

- Symmetric matrices have orthogonal eigenvectors.
- Symmetric matrices have real-valued eigenvalues (and therefore real-valued eigenvectors).

### Quadratic Form, Definiteness, and Eigenvalues

- The Quadratic form of a matrix: pre- and postmultiply a square matrix by the same vector w and get a scalar:
  - quadratic form: $$\vec{w}^T\mathbb{A}\vec{w}=\alpha$$
  - which matrix and which vector do we use?
- Definiteness:  a characteristic of a square matrix and is defined by the signs of the eigenvalues of the matrix, which is identical as the sign of $$\alpha$$
- Diagonalization: diagonalizing a matric means to represent a matrix as $$\mathbb{V}^{-1}\Lambda\mathbb{V}$$
  - where $$\mathbb{V}$$ is a matrix with eigenvectors in the columns
  - and $$\mathbb{\Lambda}$$ is a diagonal matrix with eigenvalues in the diagonal elements


### Singular Value Decomposition (SVD) :cake:

The purpose of SVD is to decompose a matric into the product of three matrices, called the left singular vectors ($$\mathbb{U}$$), the singular values ($$\mathbb{\Sigma}$$), and the right singular vectors ($$\mathbb{V}$$):

$$
\mathbb{A}=\mathbb{U} \mathbb{\Sigma} \mathbb{V}
$$

This looks similar to eigendecomposition, and in fact SVD is the generalization of eigendecomposition to nonsquare matrices. The singular values in the diagonal elements of $$\mathbb{\Sigma}$$ are compatible to eigenvalues, and the singular vetors matrices are comparable to eigenvectors.

#### SVD from EIG

SVD simply comes from computing the eigendecomposition of the matrix times
its transpose:

$$
\begin{equation}
    \mathbb{AA^T}=(\mathbb{U \Sigma V^T})(\mathbb{U \Sigma V^T})^T \\
                 =\mathbb{U \Sigma V^T}\mathbb{V\Sigma^T U^T} \\
                 = \mathbb{U \Sigma^2 U^T}
\end{equation}
$$

The eigenvectors of $$\mathbb{AA^T}$$ are the left-singular vectors($$\mathbb{U}$$) of $$\mathbb{A}$$, and the squared eigenvalues of $$\mathbb{AA^T}$$ are the singular values($$\Sigma$$) of $$\mathbb{A}$$:
- singular values are nonnegative because squared numbrets cannot be negative
- singular values are real numbers
- singular vectors are orthogonal because the eigenvectors of a symmetric matrix are orthogonal (linear independent)

#### Singular Values and Variance (Explained)

The sum of the singular values is the total amount of “variance” in the matrix. Tt is often useful to convert the singular values to percent total variance explained:

$$
\overline{\sigma_i} = \frac{100\sigma_i}{\sum\sigma}
$$