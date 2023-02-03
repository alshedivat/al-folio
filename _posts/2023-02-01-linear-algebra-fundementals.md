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
<br>
$$
\begin{equation}
\vec{a} \cdot \vec{b}=a_1b_1+\cdots+a_nb_n=\sum_{i=1}^{n}a_ib_i
\end{equation}
$$
and the **geometric** definition is given by:
<br>
$$
\begin{equation}
\vec{a} \cdot \vec{b}=||\vec{a}||||\vec{b}||\cos\theta
\end{equation}
$$
<br>

Importantly, when $$\vec{b}=1$$, the dot product above equals $$||\vec{a}||\cos\theta $$.


### Vector Projection🅱️
Consider two vectors $$\vec{a}$$ and $$\vec{b}$$. We are projecting $$\vec{a}$$ onto $$\vec{b}$$, and we can scale $$\vec{b}$$ with a scalar $$c$$. $$c\vec{v}$$ defines a infinite line. We’re going to find the projection of $$\vec{a}$$ onto $$\vec{b}$$, written as:
<br>
$$
proj_{\vec{a}}\vec{cb}
$$

The vector connecting $$\vec{a}$$ and $$c\vec{b}$$ is $$\vec{a} −c\vec{b}$$. We want to find c such that $$\vec{a} −c\vec{b}$$ is perpendicular to $$c\vec{b}$$. Two perpendicular vectors have zero dot product:
<br>
$$
(\vec{a} −c\vec{b}) \cdot \vec{b} = 0 \Rightarrow 
c=\frac{\vec{a}\vec{b}}{\vec{b}\vec{b}}
$$

Because $$||\vec{b}||=\sqrt{\vec{b} \cdot \vec{b}}$$:

$$
c=\frac{\vec{a}\vec{b}}{||\vec{b}||^2}
$$

So:
<br>
$$
\begin{equation}
    proj_{\vec{a}}\vec{b}=\frac{\vec{a}\vec{b}}{||\vec{b}||^2}\vec{b}
\end{equation}
$$
\\
where:
- $$\vec{u}=\frac{\vec{b}}{||\vec{b}||}$$ is called unit vector defined by $$\vec{b}$$

Rewrite the projection in terms of the unit vector:
<br>
$$
\begin{equation}
    proj_{\vec{a}}\vec{b}=\frac{\vec{a}\vec{b}}{||\vec{b}||}\vec{u}
\end{equation}
$$
\\
$$\frac{\vec{a}\vec{b}}{||\vec{b}||}$$ is called the scalar projection of $$\vec{a}$$ onto $$\vec{b}$$.


### Eigenvalue & Eigenvector 🆎
