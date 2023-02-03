---
layout: post
title: Linear Algebra Fundamentals
date: 2023-02-01 11:12:00-0400
description: metabolomics
tags: MachineLearning DataScience
categories: 
---

### Dot Product 👍
The dot product is an operation for multiplying two vectors to get a scalar value. Suppose we have two vectors $$\vec{a}=[a_1,\cdots,a_n]^T$$ and $$\vec{b}=[b_1,\cdots,b_n]^T$$, their dot product is denoted as $$\vec{a}\cdot\vec{b}$$, which has both algebraic and geometric definition. The algebraic formula is defined as:
\\
$$
\begin{equation}
\vec{a} \cdot \vec{b}=a_1b_1+\cdots+a_nb_n=\sum_{i=1}^{n}a_ib_i
\end{equation}
$$
and the geometric definition is given by:
\\
$$
\begin{equation}
\vec{a} \cdot \vec{b}=||\vec{a}||||\vec{b}||\cos\theta
\end{equation}
$$

Importantly, when $$||\vec{b}||=1$$, the dot product above equals $$||\vec{a}||\cos\theta$$.



### Projection
