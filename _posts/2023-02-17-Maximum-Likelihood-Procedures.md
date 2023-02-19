---
layout: post
title: Maximum Likelihood Procedures
date: 2023-02-16 11:12:00-0400
description: multivariate-analysis
tags: LinearAlgebra DataScience
categories: 
---

## Maximum Likelihood and Multivariate Normal Distribution

### Model, Parameter, Objective Function, and Optimization
Any procedure is underlain by a model that can be expressed as

$$
\tag{1}
Data \cong \phi(\Theta)+Errors
$$

where $$\Theta$$ denotes the parameters to be estimated. For instance, in KMC cluster analysis $\Theta$ is [$$\mathbb{G, C}$$]. In regression analysis, the $$\Theta=[\vec{b},c]$$ and $$\phi(\vec{b},c)=\mathbb{X}\vec{b}+c\vec{1}$$. 

An analysis procedure modeled as (1) estimates parameter $$\Theta$$ values. This is formulated as-Obtaining $$\Theta$$ that optimizes an objective function obj($$\Theta$$) subject to a constraint on $$\Theta$$. 

Here, the term "optimizes" refers to either "minimizes" or "maximizes", and some function can be used as obj($$\Theta$$). In *least squares method*, the least squares are used as obj($$\Theta$$), which are generally expressed as $$\lVert\mathbb{X}-\phi(\Theta)\rVert^2$$, with "optimizes" referring to "minimizes" and $$\Theta=[\vec{b},c]$$ is not constrained.


### Maximum Likelihood Method
A maximum likelihood (ML) method can be formulated by rephrasing“optimizing” and “an objective function” as "maximizing" and "probability", respectively. To note, ML uses notion of probabilities, which is not used in the LS method. 

An simple example illustrating ML: suppose a black box contains black and white balls, where the total number of balls is known to be 100, but the number of black or white balls is unknown. We use $$\theta$$ for the number of black ones. In order to estimate $$\theta$$, a ball was drawn from the box and returned back to the box five times, which produces the following data set

$$
\vec{d}=[1,0,0,1,0]^T
$$

Here, $$d_i=1, d_i=0$$ indicate black and white balls drawn, respectively, with $$d_i$$ denotes the ith element of $$\vec{d}$$.

The probability of $$d_i = 1$$ observed (i.e., a black ball chosen) and that of $$d_i = 0$$ are expressed as

$$
P(d_i=1|\theta)=\frac{\theta}{100} \\
P(d_i=0|\theta)=1-\frac{\theta}{100} 
$$

Further, we suppose the balls were chosen mutually independently. Then, the probability of the data set $$\vec{d}$$ is

$$
P(\vec{d}|\theta)=(\frac{\theta}{100})^2(1-\frac{\theta}{100})^3
$$

For estimation of the value of $$\theta$$, the ML method can be used. The idea of the method can be stated as “Obtaining the parameter value such that the occurrence of an event is the most likely”. Here, the “event” refers to the observation of a data set, i.e., observing $$\vec{d}$$ and “how likely it is that the event will occur” is measured by its *probability*. 

Note that $$P(\vec{d}\mid\theta)$$ is treated as a function of parameter $$\theta$$ for a fixed $$\vec{d}$$ in the ML method. The probability, if it is treated as a function of parameters, is rephrased as likelihood, from which the name maximum likelihood method originates. A solution in the ML method is called a maximum likelihood estimate (MLE).


### Probability Density Function
**Clarification**: in general, probability mass function (PMF) is used in the context of discrete random variables, while the probability density function (PDF) is used in the context of continuous random variables.

The PDF is used to specify the probability of the random variable falling within a particular range of values, as opposed to taking on any one value.This probability is given by the integral of this variable's PDF over that range (area). The probability density function is nonnegative everywhere, and the area under the entire curve is equal to 1.

In the example above, we have a variable that can take on discrete values as 1 and 0. The probability of a genuinely continuous variable being a specific value cannot reasonably be defined. However, the probability can be defined for the intervals of a continuous variable by denoting the probability of x taking values within the interval of $$(a, b)$$ as $$P(x \pm \delta)$$. The density of the probability is given as

$$
Pr(a \le x \le b)=\int_{a}^{b}f_X(x)dx
$$

where $$f_X(x)$$ denotes the probability density function of X. If $$F_X$$ is the cumulative distribution function of X, then

$$
f_X(x)=\frac{d}{dx}F_X(x)
$$

Intuitively, one can think of $$f_{X}(x)dx$$ as being the probability of X falling within the infinitesimal interval $$[x,x+dx]$$.

### Multivariate Normal Distribution
For multivariate analysis, a PDF for multiple variables is needed. For example, in order to express how likely a person's height, weight, and waist circumference are $$[170.6, 65.3,  80.7]$$, we need to define the distribution of $$\mathbf{x}=\begin{bmatrix}
    \vec{h} & \vec{w} & \vec{wc}
\end{bmatrix}$$.

A commonly used PDF for multiple variables is
$$
\begin{equation}
\tag{2}
\mathcal{P}  (\mathbf{x}|\vec{\mu}, \mathbb{\Sigma}) = \frac{1}{(2\pi)^{(p/2)} |\mathbb{\Sigma}|^{1/2}} \exp \left\{- \frac{1}{2} \left(\mathbf{x}-\vec{\mu}\right)^{T} \mathbb{\Sigma}^{-1} \left(\mathbf{x}-\vec{\mu} \right)  \right\}   
\end{equation}
$$

where 
- design matrix represented by $$\mathbf{x}=[\vec{x_1}, \cdots, \vec{x_p}]_{(n \times p)}$$ 
- mean vector $$\vec{\mu}_{(p \times 1)}$$
- covariance matrix  $$\mathbb{\Sigma}_(p \times p)$$, and $$\mid\Sigma\mid$$ denotes the determinant of $$\Sigma$$.


We denote a multivariate normal (MVN) distribution of p variables as
$$
\vec{x} \sim N_p(\vec{\mu}, \mathbb{\Sigma})
$$

where $$\vec{\mu}$$ denotes the vector of means and $$\mathbb{\Sigma}$$ denotes the covariance matrix. If p=2, i.e., $$\mathbb{X}=[x_1, x_2]$$, the probability density function (bivariate normal distribution) of X is resembling a bell in 3-dimensional space.


### Maximum Likelihood Method for Normal Variables
In (2), the PDF for MVN distribution is based on the assumption that $$(\vec{\mu}, \mathbb{\Sigma})$$ are known. But in practise, they are often unknown and what we have is observed $$\mathbf{X}$$. We therefore consider estimating parameters $$(\vec{\mu}, \mathbb{\Sigma})$$ based on an $$n \times p$$ data matrix $$\mathbf{X}$$ on the assumption that  their row vectors jointly follow the MVN distribution

$$
\vec{x_i} \sim N_p(\vec{\mu}, \mathbb{\Sigma}) (i=1,\dots, n)
$$

Use ML method for continuous variables to obtain the parameter value that maximizes the probability density of the data being observed. It is because both a probability density and probability stand for how likely it is that a value will be observed. For example, the probability density of $$\vec{x_i} = \vec{x_1}$$ is 

$$
\begin{equation}
\tag{3}
\mathcal{P}  (\mathbf{x_1}|\vec{\mu}, \mathbb{\Sigma}) = \frac{1}{(2\pi)^{(p/2)} |\mathbb{\Sigma}|^{1/2}} \exp \left\{- \frac{1}{2} \left(\mathbf{[80,77,68]^T}-\vec{\mu}\right)^{T} \mathbb{\Sigma}^{-1} \left(\mathbf{[80,77,68]^T}-\vec{\mu} \right)  \right\}   
\end{equation}
$$

On the supposition that the rows of $$\mathbb{X} = [x_1,…,x_n]^T$$ are observed mutually independently, the probability density of the n rows in $$\mathbb{X}$$ being jointly observed is given by the product of (2)

$$
\begin{equation}
\tag{4}
\mathcal{P}  (\mathbb{X}|\vec{\mu}, \mathbb{\Sigma}) = \frac{1}{(2\pi)^{(np/2)} |\mathbb{\Sigma}|^{n/2}} \exp \left\{- \frac{1}{2}\sum_{i=1}^{n}(\vec{x_i}-\vec{\mu})^{T} \mathbb{\Sigma}^{-1} \left(\vec{x_i}-\vec{\mu} \right)  \right\}   
\end{equation}
$$

### Maximum Likelihood Estimates of Means and Covariances
The $$(\vec{\mu}, \mathbb{\Sigma})$$ values are obtained in the ML method, such that the data matrix $$\mathbb{X}$$ is the most likely to be observed. That is, the maximum likelihood estimates (MLE) of $$(\vec{\mu}, \mathbb{\Sigma})$$ are estimated that maximizes (4) or its logarithm.

$$
\tag{5}
\begin{equation}
    log \mathcal{P}(\mathbb{X}|\vec{\mu},\mathbb{\Sigma})=-\frac{np}{2}log2\pi-\frac{n}{2}log|\mathbb{\Sigma}|-\frac{n}{2}\sum_{i=1}^{n}(\vec{x_i}-\vec{\mu})^T\Sigma^T(\vec{x_i}-\vec{\mu})
\end{equation}
$$

the MLE of $$(\vec{\mu}, \mathbb{\Sigma})$$ is given by

$$
\overset{\wedge}{\vec{\mu}}=\bar{\vec{x}}=\frac{1}{n}\sum_{i=1}^{n}\vec{x_i}, \overset{\wedge}{\mathbb{\Sigma}}=\frac{1}{n}\sum_{i=1}^{n}(\vec{x_i}-\bar{\vec{x}})(\vec{x_i}-\bar{\vec{x}})^T=\mathbb{V}
$$

where MLEs of $$(\vec{\mu}, \mathbb{\Sigma})$$ are found to be the mean vector and covariance matrix of the data set, respectively.

Substituting MLEs into the log likelihood, the maximum likelihood is 

$$
\begin{equation}
\tag{6}
    \mathcal{l}(\overset{\wedge}{\vec{\mu}}, \overset{\wedge}{\mathbb{\Sigma}})=-\frac{n}{2}log(\mid\mathbb{V}\mid)-\frac{np}{2}
\end{equation}
$$

### Model Selection
Model selection refers to comparing models and selecting the model best fitted to a data set. An advantage of the ML method is its MLE can be used for model selection with statistics called **information criteria**.

- Akaike's information criterion (AIC): $$AIC=-2\mathcal{l}(\overset{\wedge}{\mathbb{\Theta}})+2\eta$$ 
- Bayesian information criterion (BIC): $$BIC=-2\mathcal{l}(\overset{\wedge}{\mathbb{\Theta}})+\eta log(n)$$

where $$\mathcal{l}(\overset{\wedge}{\mathbb{\Theta}})$$ expresses the value of the log likelihood and $$\eta$$ is the number of parameters to be estimated.Both AIC and BIC penalize a model for having more parameters. 

- Information Criteria and Philosophy:
  - how well it explains a phenomenon (maximum log likelihood)
  - how simple it is (smallness of number of parameters)