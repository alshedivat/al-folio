---
layout: post
title: The Perron-Frobenius Theorem
date: 2023-12-08
description: a detailed proof of the PF theorem and an application
tags: matrix eigenvalue spectral-radius
categories: mathematics
featured: true
toc:
  sidebar: left

---
The [Perron-Frobenius Theorem](https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem) establishes powerful assertions about the eigenvalues and eigenvectors of certain types of matrices that are non-negative, which are incredibly insightful when dealing with dynamical systems, economics, demography, and beyond. This post offers an accessible proof of the theorem, which is carefully curated from lecture contents of CIE6002 Matrix Analysis.


## Notations

- $$\boldsymbol{A} \in \mathbb{R}^{m \times m}$$: an $$m$$ by $$m$$ matrix.
- $$\Vert \cdot \Vert$$: in most cases it refers to matrix norm.
- $$\displaystyle \Vert \boldsymbol{A} \Vert_1 = \max_{j=1,2,\ldots,m} \sum_{i=1}^{m} \boldsymbol{A}_{ij}$$: the maximum absolute column sum of the matrix.
- $$\displaystyle \Vert \boldsymbol{A} \Vert_\infty = \max_{i=1,2,\ldots,m} \sum_{j=1}^{m} \boldsymbol{A}_{ij}$$: the maximum absolute row sum of the matrix.

## The theorem

Let $$\boldsymbol{A} \in \mathbb{R}^{n \times n}$$ be positive. That is, $$\boldsymbol{A}_{ij} > 0, \forall 1 \le i,j \le m$$. The *spectral radius* is defined as

$$\rho(\boldsymbol{A}) = \max_{i} |\lambda_i|$$

where $$\lambda_i$$ is the $$i$$-th eigenvalue of $$\boldsymbol{A}$$. Then

1. $$\rho(\boldsymbol{A}) > 0$$, and $$\rho(\boldsymbol{A})$$ is an eigenvalue of $$\boldsymbol{A}$$;
2. The corresponding eigenvector of $$\rho(\boldsymbol{A})$$ is positive (or negative);
3. $$\lvert \lambda \rvert < \rho(\boldsymbol{A})$$ for any $$\boldsymbol{A}$$'s eigenvalue $$\lambda \ne \rho(\boldsymbol{A})$$;
4. $$\operatorname{dim}(\operatorname{Null}(\boldsymbol{A} - \rho(\boldsymbol{A})\boldsymbol{I})) = 1$$.

## Some lemmas

**Lemma 1:** $$\rho(\boldsymbol{A}) \le \Vert \boldsymbol{A} \Vert$$ for any matrix norm $$\Vert\cdot\Vert.$$

**Proof:** Let $$\boldsymbol{Av} = \lambda \boldsymbol{v}$$ with $$\lvert\lambda\rvert = \rho(\boldsymbol{A})$$. Let $$\boldsymbol{V} = \boldsymbol{v} \boldsymbol{1}^\top \in \mathbb{R}^{m \times m}$$. Then

$$\begin{align*}
    &\boldsymbol{AV} = \lambda \boldsymbol{V} \\
    \Rightarrow &\Vert\boldsymbol{AV}\Vert = \lvert \lambda \rvert \cdot \Vert\boldsymbol{V}\Vert \le \Vert\boldsymbol{A}\Vert \cdot \Vert\boldsymbol{V}\Vert \\
    \Rightarrow & \lvert \lambda \rvert = \rho(\boldsymbol{A}) \le \Vert\boldsymbol{A}\Vert.
\end{align*}$$

---

**Lemma 2:** Given $$\varepsilon > 0$$. There exists a matrix norm $$\Vert\cdot\Vert$$ s.t. $$\rho(\boldsymbol{A}) \le \Vert\boldsymbol{A}\Vert \le \rho(\boldsymbol{A}) + \varepsilon \Rightarrow \rho(\boldsymbol{A}) = \inf_{\Vert\cdot\Vert} \Vert\boldsymbol{A}\Vert$$.

**Proof:** The Schur triangularization of $$\boldsymbol{A}$$ is $$\boldsymbol{A} = \boldsymbol{UTU}^\top$$, where $$\boldsymbol{U}$$ is unitary and diagonals $$\lambda_1, \ldots, \lambda_m$$ of $$\boldsymbol{T}$$ are eigenvalues of $$\boldsymbol{A}$$. Define

$$\begin{align*}
    \Vert\boldsymbol{A}\Vert
    &\triangleq \Vert(\boldsymbol{UD}_t^{-1})^{-1}\boldsymbol{A}(\boldsymbol{UD}_t^{-1})\Vert_1 \\
    &= \Vert\boldsymbol{D}_t \boldsymbol{U}^\top \boldsymbol{AUD}_t^{-1}\Vert_1 \\
    &= \Vert\boldsymbol{D}_t \boldsymbol{T} \boldsymbol{D}_t^{-1}\Vert_1 \\
    &= \Vert\begin{bmatrix}
        \lambda_1 & t^{-1}T_{12} & t^{-2}T_{13} & \cdots & t^{-m+1}T_{1m}\\
         & \lambda_2 & t^{-1}T_{13} & \cdots & t^{-m+2}T_{2m}\\
         &  & \lambda_3 & \cdots & t^{-m+3}T_{3m} \\
         &  &   & \ddots & \vdots \\
         &  &  &  & \lambda_m
    \end{bmatrix}\Vert_1 \\
    &\le \rho(\boldsymbol{A}) + \varepsilon \quad \text{for large}\ t
\end{align*}$$

where $$\boldsymbol{D}_t = \begin{bmatrix}
   t^1 &  &  & \\
   & t^2 &  & \\
   &  &  \ddots & \\
   &  &   & t^m
 \end{bmatrix}.$$

---

**Lemma 3:** $$\lim_{k \to \infty} \boldsymbol{A}^k = \boldsymbol{0} \iff \rho(\boldsymbol{A}) < 1.$$

**Proof:** The "$$\Rightarrow$$" part. Let $$\boldsymbol{Av} = \lambda \boldsymbol{v}$$ for any eigenvalue $$\lambda$$ of $$\boldsymbol{A}$$. Then

$$\boldsymbol{A}^k\boldsymbol{v} = \lambda^k \boldsymbol{v} \Rightarrow \lambda^k \to 0 \Rightarrow |\lambda| < 1 \Rightarrow \rho(\boldsymbol{A}) < 1.$$

The "$$\Leftarrow$$" part. By Lemma 2, $$\exists\ \Vert\cdot\Vert$$ s.t. $$\Vert\boldsymbol{A}\Vert < 1.$$ Then

$$0 \le \lim_{k \to \infty} \Vert\boldsymbol{A}^k\Vert \le \lim_{k \to \infty} \Vert\boldsymbol{A}\Vert^k = 0 \Rightarrow \lim_{k \to \infty} \boldsymbol{A}^k = \boldsymbol{0}.$$

---

**Lemma 4:** Let $$\boldsymbol{A}, \boldsymbol{B} \in \mathbb{R}^{m \times m}$$ and $$\vert \boldsymbol{A} \vert \le \boldsymbol{B}$$ element-wise. Then

$$\rho(\boldsymbol{A}) \le \rho(\boldsymbol{\vert A \vert}) \le \rho(\boldsymbol{B}).$$

**Proof:**

$$\begin{align*}
  &\boldsymbol{A} \le \boldsymbol{\vert A \vert} \le \boldsymbol{B} \\ \Rightarrow& \boldsymbol{A}^k \le \boldsymbol{\vert A \vert}^k \le \boldsymbol{B}^k \\
  \Rightarrow& \Vert \boldsymbol{A}^k \Vert_F \le \Vert \boldsymbol{\vert A \vert}^k \Vert_F \le \Vert \boldsymbol{B}^k \Vert_F \\
  \Rightarrow& \Vert \boldsymbol{A}^k \Vert_F^{1/k} \le \Vert \boldsymbol{\vert A \vert}^k \Vert_F^{1/k} \le \Vert \boldsymbol{B}^k \Vert_F^{1/k} \\
  \Rightarrow& \rho(\boldsymbol{A}) \le \rho(\boldsymbol{\vert A \vert}) \le \rho(\boldsymbol{B}).
\end{align*}$$

The last step is given by Theorem 1.

**Corollary 4.1:** Let $$\boldsymbol{A} \ge \boldsymbol{0}$$  element-wise. Then for any principal submatrix of $$\boldsymbol{A}$$, denoted as $$\tilde{\boldsymbol{A}}$$, we have $$\rho(\tilde{\boldsymbol{A}}) \le \rho(\boldsymbol{A}) \Rightarrow \max_{i} \boldsymbol{A}_{ii} \le \rho(\boldsymbol{A})$$.

---

**Lemma 5:** Let $$\boldsymbol{A} \ge \boldsymbol{0}$$  element-wise. If row (column) sums of $$\boldsymbol{A}$$ are constant, then $$\rho(\boldsymbol{A}) = \Vert \boldsymbol{A} \Vert_\infty$$ ($\rho(\boldsymbol{A}) = \Vert \boldsymbol{A} \Vert_1$).

**Proof:** Suppose $$\boldsymbol{A1} = \alpha \boldsymbol{1}$$ where $$\alpha \ge 0$$ is the row sum, and thus is an eigenvalue of $$\boldsymbol{A}$$. So $$\alpha \le \rho(\boldsymbol{A})$$. But $$\alpha = \Vert \boldsymbol{A} \Vert_\infty \ge \rho(\boldsymbol{A})$$, so $$\rho(\boldsymbol{A}) = \Vert \boldsymbol{A} \Vert_\infty.$$ The column sum case is similar.

---

**Lemma 6:** Let $$\boldsymbol{A} \ge \boldsymbol{0}$$ element-wise. Then

$$\min_{i = 1, \ldots, m} \sum_{j = 1}^m \boldsymbol{A}_{ij} \le \rho(\boldsymbol{A}) \le \Vert \boldsymbol{A} \Vert_\infty,\ \min_{j = 1, \ldots, m} \sum_{i = 1}^m \boldsymbol{A}_{ij} \le \rho(\boldsymbol{A}) \le \Vert \boldsymbol{A} \Vert_1$$

**Proof:** Let

$$\alpha = \min_{i = 1, \ldots, m} \sum_{j = 1}^m \boldsymbol{A}_{ij} \ne 0.$$

$$\alpha = 0$$ is a trivial case, so assume $$\alpha \ne 0$$. Construct a new matrix $$\boldsymbol{B}$$ by multiplying $$\alpha / \sum_{j=1}^m \boldsymbol{A}_{ij}$$ to each $$i$$-th row of $$\boldsymbol{A}$$.

So $$\boldsymbol{0} \le \boldsymbol{B} \le \boldsymbol{A}$$ element-wise, and $$\boldsymbol{B}$$ has a constant row sum equal to $$\alpha \Rightarrow \alpha = \rho(\boldsymbol{B}) \le \rho(\boldsymbol{A})$$ by Lemma 4 and 5. $$\rho(\boldsymbol{A}) \le \Vert \boldsymbol{A} \Vert_\infty$$ by Lemma 1. The column sum case is similar.

---

**Lemma 7:** Let $$\boldsymbol{A} > \boldsymbol{0}$$ element-wise. Suppose $$\boldsymbol{Ax} = \lambda \boldsymbol{x}$$, and $$\vert \lambda \vert = \rho(\boldsymbol{A})$$. Then $$\exists\ \theta \in \mathbb{R}$$ s.t. $$e^{-j\theta} \boldsymbol{x} = \vert \boldsymbol{x} \vert > \boldsymbol{0}$$ element-wise. Here $$j = \sqrt{-1}$$.

<!-- $$$\boldsymbol{x} = \begin{pmatrix}
  \boldsymbol{x}_1 \\ \boldsymbol{x}_2 \\ \vdots \\ \boldsymbol{x}_m
\end{pmatrix} = \begin{pmatrix}
  e^{-j\theta} \vert \boldsymbol{x}_1 \vert \\ e^{-j\theta} \vert \boldsymbol{x}_2 \vert \\ \vdots \\ e^{-j\theta} \vert \boldsymbol{x}_m \vert
\end{pmatrix}$$$ -->

**Proof:** $$\vert \boldsymbol{Ax} \vert = \vert \lambda \vert \vert \boldsymbol{x} \vert = \rho(\boldsymbol{A})  \vert \boldsymbol{x} \vert$$. By Theorem 3, $$\boldsymbol{A} \vert \boldsymbol{x} \vert = \rho(\boldsymbol{A}) \vert \boldsymbol{x} \vert$$. So $$\vert \boldsymbol{Ax} \vert = \boldsymbol{A} \vert \boldsymbol{x} \vert$$ and $$\vert \boldsymbol{x} \vert > \boldsymbol{0}$$. For any $$1 \le i \le m$$,

$$[\vert \boldsymbol{Ax} \vert]_i = \left\vert \sum_{j=1}^m \boldsymbol{A}_{ik} \boldsymbol{x}_k \right\vert = \sum_{k=1}^m \boldsymbol{A}_{ik} \vert \boldsymbol{x}_k \vert$$

For any $$\boldsymbol{x}_k \in \mathbb{C}, \boldsymbol{x}_k = \vert \boldsymbol{x}_k \vert e^{j\theta_k} = \vert \boldsymbol{x}_k \vert \cos(\theta_k) + \vert \boldsymbol{x}_k \vert \sin(\theta_k) \cdot j$$. So

$$\begin{align*}
  &\left\vert \sum_{j=1}^m \boldsymbol{A}_{ik} \boldsymbol{x}_k \right\vert = \sum_{k=1}^m \boldsymbol{A}_{ik} \vert \boldsymbol{x}_k \vert \\
  \Rightarrow& \left(\sum_{j=1}^m \boldsymbol{A}_{ik} \boldsymbol{x}_k\right) e^{-j\theta} = \sum_{k=1}^m \boldsymbol{A}_{ik} \boldsymbol{x}_k e^{-j\theta_k} \\
  \Rightarrow& \sum_{j=1}^m \boldsymbol{A}_{ik} \boldsymbol{x}_k e^{-j\theta} = \sum_{k=1}^m \boldsymbol{A}_{ik} \boldsymbol{x}_k e^{-j\theta_k} \\
  \Rightarrow& \theta_k = \theta, k=1, \ldots, m.
\end{align*}$$

## Some theorems
**Theorem 1:** $$\rho(\boldsymbol{A}) = \lim_{k \to \infty} \Vert \boldsymbol{A}^k \Vert^{1/k}$$ for any matrix norm.

**Proof:** The aim is to show $$0 \le \Vert \boldsymbol{A}^k \Vert^{1/k} - \rho(\boldsymbol{A}) \le \varepsilon$$ for large $$k$$.

To see this, $$\rho^k(\boldsymbol{A}) = \rho(\boldsymbol{A^k}) \le \Vert \boldsymbol{A}^k \Vert$$ by Lemma 2. Thus $$\rho(\boldsymbol{A}) \le \Vert \boldsymbol{A}^k \Vert^{1/k} \Rightarrow 0 \le \Vert \boldsymbol{A}^k \Vert^{1/k} - \rho(\boldsymbol{A})$$.

Let $$\tilde{\boldsymbol{A}} = \frac{1}{\varepsilon + \rho(\boldsymbol{A})} \boldsymbol{A}$$. It's easy to see $$\rho(\tilde{\boldsymbol{A}}) < 1$$. Then for $$k$$ large enough $$\Vert \tilde{\boldsymbol{A}}^k \Vert \le 1 \Leftrightarrow \frac{1}{(\varepsilon + \rho(\boldsymbol{A}))^k} \Vert \boldsymbol{A}^k \Vert \le 1 \Leftrightarrow \Vert \boldsymbol{A}^k \Vert^{1/k} \le \varepsilon + \rho(\boldsymbol{A}).$$

---

**Theorem 2:** For any $$\boldsymbol{A} \ge \boldsymbol{0}$$ element-wise and $$\boldsymbol{x} > \boldsymbol{0}$$ element-wise,

$$\min_{i = 1, \ldots, m} \frac{1}{\boldsymbol{x}_i}\sum_{j=1}^m \boldsymbol{A}_{ij} \boldsymbol{x}_j \le \rho(\boldsymbol{A}) \le \max_{i = 1, \ldots, m} \frac{1}{\boldsymbol{x}_i}\sum_{j=1}^m \boldsymbol{A}_{ij} \boldsymbol{x}_j$$

**Proof:** Define $$\bar{\boldsymbol{A}} \triangleq \boldsymbol{S}^{-1}\boldsymbol{A}\boldsymbol{S}$$, where

$$\boldsymbol{S} = \begin{bmatrix}
   \boldsymbol{x}_1 &  &  & \\
   & \boldsymbol{x}_2 &  & \\
   &  &  \ddots & \\
   &  &   & \boldsymbol{x}_m
 \end{bmatrix},\ \boldsymbol{S}^{-1} = \begin{bmatrix}
   \frac{1}{\boldsymbol{x}_1} &  &  & \\
   & \frac{1}{\boldsymbol{x}_2} &  & \\
   &  &  \ddots & \\
   &  &   & \frac{1}{\boldsymbol{x}_m}
 \end{bmatrix}.$$

$$\rho(\bar{\boldsymbol{A}}) = \rho(\boldsymbol{A})$$ as $$\bar{\boldsymbol{A}}$$ and $$\boldsymbol{A}$$ have same eigenvalues. Apply Lemma 6 to $$\bar{\boldsymbol{A}}$$.

**Corollary 2.1:** For any $$\boldsymbol{A} \ge \boldsymbol{0}$$ element-wise and $$\boldsymbol{x} > \boldsymbol{0}$$ element-wise, if

 $$$\alpha \boldsymbol{x} \le \boldsymbol{Ax} \le \beta \boldsymbol{x}$$

 where $$\alpha, \beta \ge 0$$. Then $$\alpha \le \rho(\boldsymbol{A}) \le \beta$$. If the inequality is strict, $$\alpha < \rho(\boldsymbol{A}) < \beta$$.

**Proof:**

$$\begin{align*}
  \alpha \boldsymbol{x}_i \le \sum_{j=1}^m \boldsymbol{A}_{ij}\boldsymbol{x}_j \Rightarrow \alpha \le \frac{1}{\boldsymbol{x}_i} \sum_{j=1}^m \boldsymbol{A}_{ij}\boldsymbol{x}_j \Rightarrow \alpha \le \min_{i = 1, \ldots, m} \frac{1}{\boldsymbol{x}_i}\sum_{j=1}^m \boldsymbol{A}_{ij} \boldsymbol{x}_j \le \rho(\boldsymbol{A}).
\end{align*}$$

$$\rho(\boldsymbol{A}) \le \beta$$ is similar.

**Corollary 2.2:** If $$\boldsymbol{A} \ge \boldsymbol{0}$$ element-wise and has a eigenvector $$\boldsymbol{x} > \boldsymbol{0}$$ element-wise. Then the associated eigenvalue must be $$\rho(\boldsymbol{A})$$.

**Proof:** $$\lambda \boldsymbol{x} \le \boldsymbol{Ax} \le \lambda \boldsymbol{x} \Rightarrow \lambda \le \rho(\boldsymbol{A}) \le \lambda \Rightarrow \rho(\boldsymbol{A}) = \lambda.$$

---

**Theorem 3:** Let $$\boldsymbol{A} > \boldsymbol{0}$$ element-wise. Suppose $$\boldsymbol{Ax} = \lambda \boldsymbol{x}$$ for some $$\lambda \in \mathbb{R}, \boldsymbol{x} \in \mathbb{R}^{m}$$, and $$\vert \lambda \vert = \rho(\boldsymbol{A})$$. Then $$\boldsymbol{A} \vert \boldsymbol{x} \vert = \rho(\boldsymbol{A}) \vert \boldsymbol{x} \vert$$ and $$\vert \boldsymbol{x} \vert > \boldsymbol{0}$$.

**Proof:** By Corollary 4.1, $$0 < \max_i \boldsymbol{A}_{ii} \le \rho(\boldsymbol{A})$$. $$\boldsymbol{Ax} = \lambda\boldsymbol{x} \Rightarrow \vert \boldsymbol{Ax} \vert = \vert \lambda \vert \vert \boldsymbol{x} \vert = \rho(\boldsymbol{A}) \vert \boldsymbol{x} \vert \le \boldsymbol{A} \vert \boldsymbol{x} \vert.$$ Define $$\boldsymbol{y} \triangleq \boldsymbol{A} \vert \boldsymbol{x} \vert - \rho(\boldsymbol{A}) \vert \boldsymbol{x} \vert \ge \boldsymbol{0}$$ element-wise.

- If $$\boldsymbol{y} \equiv \boldsymbol{0}$$, i.e., $$\rho(\boldsymbol{A}) \vert \boldsymbol{x} \vert = \boldsymbol{A} \vert \boldsymbol{x} \vert$$ element-wise: since $$\boldsymbol{A} \vert \boldsymbol{x} \vert > \boldsymbol{0}$$ element-wise and $$0 < \rho(\boldsymbol{A})$$, $$\vert \boldsymbol{x} \vert > \boldsymbol{0}$$ element-wise.
- If $$\boldsymbol{y}_i > 0$$ for some $$i$$, let $$\boldsymbol{z} \triangleq \boldsymbol{A} \vert \boldsymbol{x} \vert > \boldsymbol{0}$$ element-wise. Then
  
$$\begin{align*}
  &\boldsymbol{0} < \boldsymbol{Ay} = \boldsymbol{A}(\boldsymbol{A} \vert \boldsymbol{x} \vert - \rho(\boldsymbol{A}) \vert \boldsymbol{x} \vert)
  = \boldsymbol{Az} - \rho(\boldsymbol{A}) \boldsymbol{z} \\
  \Rightarrow& \rho(\boldsymbol{A}) \boldsymbol{z} < \boldsymbol{Az} \\
  \Rightarrow& \rho(\boldsymbol{A}) < \rho(\boldsymbol{A})\qquad \text{by Corollary 2.1}
\end{align*}$$

which is a contradiction. So $$\boldsymbol{y} \equiv \boldsymbol{0}$$.

---

**Theorem 4:** Let $$\boldsymbol{A} > \boldsymbol{0}$$ element-wise. Then $$\forall\ \lambda \ne \rho(\boldsymbol{A}), \vert \lambda \vert < \rho(\boldsymbol{A})$$.

**Proof:** Suppose $$\exists\ \lambda \ne \rho(\boldsymbol{A})$$ but $$\vert \lambda \vert = \rho(\boldsymbol{A})$$ and $$\boldsymbol{Ax} = \lambda \boldsymbol{x}$$. By Lemma 7, $$\exists\ \theta \in \mathbb{R}$$ s.t. $$\vert \boldsymbol{x} \vert = e^{-j\theta} \boldsymbol{x} > \boldsymbol{0}$$. $$\boldsymbol{Ax} = \lambda \boldsymbol{x} \Rightarrow \boldsymbol{A} \vert \boldsymbol{x} \vert = \lambda \vert \boldsymbol{x} \vert$$. By Corollary 2.2 $$\lambda = \rho(\boldsymbol{A})$$, which is a contradiction.

---

**Theorem 5:** Let $$\boldsymbol{A} > \boldsymbol{0}$$ element-wise. Suppose for two vectors $$\boldsymbol{w}, \boldsymbol{z}$$ s.t. $$\boldsymbol{Aw} = \rho(\boldsymbol{A})\boldsymbol{w}, \boldsymbol{Az} = \rho(\boldsymbol{A})\boldsymbol{z}$$. Then $$\exists\ \alpha \in \mathbb{C}$$ s.t. $$\boldsymbol{w} = \alpha \boldsymbol{z}$$, i.e., $$\operatorname{dim}(\operatorname{Null}(\boldsymbol{A} - \rho(\boldsymbol{A})\boldsymbol{I})) = 1$$.

**Proof:** By Lemma 7, $$\exists\ \theta_1, \theta_2$$ s.t. $$\boldsymbol{q} = \vert \boldsymbol{w} \vert = e^{-j\theta_1} \boldsymbol{w} > \boldsymbol{0}, \boldsymbol{p} = \vert \boldsymbol{z} \vert = e^{-j\theta_2} \boldsymbol{z} > \boldsymbol{0}$$. By Theorem 3 $$\boldsymbol{Aq} = \rho(\boldsymbol{A})\boldsymbol{q}, \boldsymbol{Ap} = \rho(\boldsymbol{A})\boldsymbol{p}$$. Let $$\beta = \min_{i=1,\ldots, m} \frac{\boldsymbol{q}_i}{\boldsymbol{p}_i}$$ and $$\boldsymbol{r} = \boldsymbol{q} - \beta \boldsymbol{p} \ge \boldsymbol{0}$$ with $$\boldsymbol{r}_j = 0$$ for some $$j$$. Then

$$\begin{align*}
  \boldsymbol{Ar} &= \boldsymbol{Aq} - \beta \boldsymbol{Ap}\\
  &= \rho(\boldsymbol{A})\boldsymbol{q} - \beta \rho(\boldsymbol{A})\boldsymbol{p}\\
  &= \rho(\boldsymbol{A})\boldsymbol{r}
\end{align*}$$

- If $$\boldsymbol{r} \equiv \boldsymbol{0}$$, then $$\boldsymbol{q} = \beta \boldsymbol{p}$$.
- If $$\boldsymbol{r}_k > 0$$ for some $$k$$, then $$\boldsymbol{Ar} = \rho(\boldsymbol{A})\boldsymbol{r}>\boldsymbol{0} \Rightarrow \boldsymbol{r} > \boldsymbol{0}$$ which is a contradiction.

So $$\boldsymbol{r} = \boldsymbol{0} \Rightarrow \boldsymbol{q} = \beta \boldsymbol{p} \Rightarrow \boldsymbol{w} = \alpha \boldsymbol{z}$$.

## An application
**Irreducible matrix:** Let $$\boldsymbol{A} \in \mathbb{R}^{m \times m}, \boldsymbol{A} \ge \boldsymbol{0}$$ element-wise. $$\boldsymbol{A}$$ is *irreducible* if for each index $$(i, j), \exists\ k \in \mathbb{N}^+$$ s.t. $$[\boldsymbol{A}^k]_{ij} > 0$$.

**Subinvariance Theorem:** Let $$\boldsymbol{A} \ge \boldsymbol{0}$$ be irreducible. Suppose for some $$\boldsymbol{y} \ge \boldsymbol{0}, \boldsymbol{y} \ne \boldsymbol{0}$$ and $$s > 0$$, we have $$\boldsymbol{Ay} \le s\boldsymbol{y}$$. Then

1. $$\boldsymbol{y} > \boldsymbol{0}$$;
2. $$\rho(\boldsymbol{A}) \le s$$;
3. $$\rho(\boldsymbol{A}) = s \iff \boldsymbol{Ay} = s\boldsymbol{y}$$.

**Proof:**
1. Suppose $$\boldsymbol{y}_i = 0$$ for some $$i$$, then $$0 \le [\boldsymbol{Ay}]_i \le s \cdot 0 = 0 \Rightarrow [\boldsymbol{Ay}]_i = 0$$. Let $$\boldsymbol{z} \triangleq \boldsymbol{Ay}$$, then $$\boldsymbol{Az} \le s \boldsymbol{Ay} = s \boldsymbol{z}$$. As $$\boldsymbol{z}_i = [\boldsymbol{Ay}]_i = 0, [\boldsymbol{Az}]_i = 0$$. Repeat this and we get $$[\boldsymbol{A}^k\boldsymbol{y}]_i = 0$$ for any $$k$$. But for $$k$$ large enough $$\boldsymbol{A}^k > \boldsymbol{0}$$ which is a contradiction.
2. Corollary 2.1.
3. The "$\Leftarrow$" part is from Corollary 2.1 so we only need to prove the "$\Rightarrow$" part. Suppose $$[\boldsymbol{Ay}]_i < s \boldsymbol{y}_i$$ for some $$i$$. Define $$\boldsymbol{z} = s \boldsymbol{y} - \boldsymbol{Ay} \ge \boldsymbol{0}$$ and $$\boldsymbol{z} \ne \boldsymbol{0}$$. For $$k$$ large enough, $$\boldsymbol{A}^k \boldsymbol{z} = s \boldsymbol{A}^k\boldsymbol{y} - \boldsymbol{A}^k\boldsymbol{Ay} = s \boldsymbol{x} - \boldsymbol{Ax} > \boldsymbol{0}$$ where $$\boldsymbol{x} = \boldsymbol{A}^k \boldsymbol{y} > \boldsymbol{0}$$. So $$\boldsymbol{Ax} < s \boldsymbol{x} \Rightarrow \rho(\boldsymbol{A}) < s = \rho(\boldsymbol{A})$$ by Corollary 2.1, which is a contradiction.

**Power control in wireless network:** $$\boldsymbol{A} \ge \boldsymbol{0}$$  and is irreducible. $$\boldsymbol{p}, \boldsymbol{b} \in \mathbb{R}^m$$ and $$\boldsymbol{b} \ge \boldsymbol{0}$$. Suppose $$\boldsymbol{A}, \boldsymbol{b}$$ are known, then

$$\begin{cases}
  \boldsymbol{Ap} + \boldsymbol{b} \le \boldsymbol{p}  \\
  \boldsymbol{p} \ge \boldsymbol{0}
\end{cases}$$

is feasible w.r.t $$\boldsymbol{p} \iff \rho(\boldsymbol{A}) < 1$$.

**Proof:** The "$$\Leftarrow$$" part. We show $$(\boldsymbol{I} - \boldsymbol{A})^{-1}$$ exists and $$(\boldsymbol{I} - \boldsymbol{A})^{-1} > \boldsymbol{0}$$ element-wise, so $$\boldsymbol{p} = (\boldsymbol{I} - \boldsymbol{A})^{-1}\boldsymbol{b}$$ is a feasible point.

$$(\boldsymbol{I} - \boldsymbol{A}) \lim_{k \to \infty} \sum_{i=0}^k \boldsymbol{A}^k = \lim_{k \to \infty} (\boldsymbol{I} - \boldsymbol{A}^{k+1}) = \boldsymbol{I}.$$

$$\lim_{k \to \infty} \boldsymbol{A}^{k+1} = \boldsymbol{0}$$ by Lemma 3. So $$(\boldsymbol{I} - \boldsymbol{A})^{-1} = \lim_{k \to \infty} \sum_{i=0}^k \boldsymbol{A}^k > \boldsymbol{0}$$ since $$\boldsymbol{A}$$ is irreducible.

The "$$\Rightarrow$$" part. As $$\boldsymbol{b} \ge \boldsymbol{0}$$, we have $$\boldsymbol{Ap} \le \boldsymbol{p}, \boldsymbol{p} \ge \boldsymbol{0}$$. By Subinvariance Theorem, $$\boldsymbol{p} > \boldsymbol{0}$$ and $$\rho(\boldsymbol{A}) \le 1$$. If $$\rho(\boldsymbol{A}) = 1$$, then $$\boldsymbol{Ap} = \boldsymbol{p}$$ which is a contradiction as $$\boldsymbol{b} \ne \boldsymbol{0}$$. So $$\rho(\boldsymbol{A}) < 1$$.
