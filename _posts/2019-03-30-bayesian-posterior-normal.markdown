---
layout: post
title: The Conjugate Prior for the Normal Distribution. 
date: 2019-03-30
description: on conjugate priors in bayesian inference
---

Assume we're trying to estimate a parameter that defines the distribution that our data follows. Then the basic outline of bayesian inference is the following: 

* postulate a prior distribution on the parameter, i.e. our subjective beliefs based on any past history or e.g. our domain knowledge
* collect evidenence, i.e. new data 
* update you beliefs to the posterior distribution based on Bayes' law
* analyze the posterior and use it

Mathematically, bayesian inference boils down to one defining operation

$$posterior = prior x likelihood$$

This is a very powerful paradigm. However, in practice, we find that if we choose an arbitraty prior, most of the time we have no chance of computing the posterior analytically since we tend to end up with an intractable integral. This is where conjugate priors come in. Conjugate priors are built on families of probability distribtuions: a prior is a conjugate prior if is part of a certain family of distribtuions and if all possible posterior distribtuions that can come from it are also part of that same family. The core idea is that the family of probability distribution is closed under evidence: no matter what data I observe, my posterior will remain in the same familiy of distributions as my prior was. As you can imagine, this simplifies things algebraically, allowing us to analytically compute the posterior. And this leads to a very important points: conjugate priors are an algebraic convenience, nothing more.   

Now, to get some intuition and to showcase the power of conjugate priors, let's analytically compute the posterior distribution of the mean of a normal distribution with known variance $\sigma^2$, given a set of i.i.d. data $D = \{X_1, X_2, ... X_n\}$. We start off by defining the likelihood: 

$$ p(D | \mu, \sigma^2) = p(X_1, X_2, ..., X_n | \mu, \sigma^2) = \product_{i=1}^n p(X_i | \mu, \sigma^2) = (\frac{1}{\sqrt{2 \pi \sigma^2}})^n exp(- \frac{1}{2 \sigma^2} \sum_{i=1}^N(X_i - \mu)^2)$$

Now, since the likelihood is Gaussian, the conjugate prior is also Gaussian (all possible posteriors will also be Gaussian): 

$$\pi(\mu) = \frac{1}{\sqrt{2 \pi \sigma_0^2}} exp(-\frac{1}{2 \sigma_0^2}(\mu - \mu_0)^2)$$

where $\mu_0$ and $\sigma_0$ are the mean and the variance of the prior, respectively. 

