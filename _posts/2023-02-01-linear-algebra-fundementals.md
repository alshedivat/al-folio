---
layout: post
title: Linear Algebra Fundamentals
date: 2023-02-01 11:12:00-0400
description: metabolomics
tags: MachineLearning DataScience
categories: 
---

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
$$$$ \frac{\vec{a}\vec{b}}{\lVert \vec{b} \rVert} $$ is called the scalar projection of $$ \vec{a} $$ onto $$ \vec{b} $$.


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
  
$$\mathbb{A}\vec{v}=\lambda\vec{v}$$

- Statistics
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

The eigenvector is in the null space of the matrix shifted by its eigenvalue. That mean the matrix shifted by its eigenvalue is singular and has a determinant $$ \det(\mathbb{A}-\lambda\vec{I})=0 $$
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
  - $$\vec{w}^T\mathbb{A}\vec{w}=\alpha$$