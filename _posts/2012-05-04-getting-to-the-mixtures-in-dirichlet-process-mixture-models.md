---
layout: post
title:  Getting to the Mixtures in Dirichlet Process Mixture Models
date:   2012-05-04
description: Starting with mixture models
tags: bayesian
---

The [Dirichlet Process](https://en.wikipedia.org/wiki/Dirichlet_process) is pretty sweet as [Edwin Chen](http://blog.echen.me/2012/03/20/infinite-mixture-models-with-nonparametric-bayes-and-the-dirichlet-process/) and numerous others have
pointed out. When combined with a mixture of Bayesian models, it’s really
effective for finding an accurate number of models needed to represent your
bundle of data, especially useful when you have no idea how many bundles of
related words you may have. Edwin Chen does a really great job of explaining
how the Dirichlet Process works, how to implement it, and how it can break down
the McDonald’s menu, but he leaves out details on how to combine it with
mixture models, which is by far the coolest part.

The short description for how to merge the Dirichlet Process with
[Nonparametric Mixture Modeling](https://en.wikipedia.org/wiki/Mixture_model)
(and infer the model) looks like this:

1.    Define probability distributions for your mixture model
1.    Rewrite your distributions with Bayes rule so that parameters depend on
      data and hyper parameters
1.    Repeat step 2 for hyper parameters as desired (it’s turtles all the way
      down, as Kevin Knight said)
1.    For each data point
    1.  Forget about the current data point
    1.  Compute the likelihood that each mixture made this data point
    1.  Sampling a new label for this data point using these likelihoods
    1.  Jot down this new label
    1.  Remember this data point
1.   After seeing all the data, re-estimate all your parameters based on the
     new assignments
1.   Repeat steps 4 and 5 ad nausea.

In short, this is the Gibbs Sampling approach. If you already know what your distributions look like, and this paltry description made perfect sense, Hurray! Please go bake a cake for everyone that feels a little underwhelmed with this description.

In short, this is the Gibbs Sampling approach. If you already know what your
distributions look like, and this paltry description made perfect sense,
Hurray! Please go bake a cake for everyone that feels a little underwhelmed
with this description.

Now that someone is off baking us cake, let’s dive down into what the
distributions look like. Taking a look at a number of papers describing
variations of the Dirichlet Process Mixture Model, like The [Infinite Gaussian
Mixture Model](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.45.9111)
and [Variational Inference for Dirichlet Process Mixture
Models](https://projecteuclid.org/journals/bayesian-analysis/volume-1/issue-1/Variational-inference-for-Dirichlet-process-mixtures/10.1214/06-BA104.full),
they first make things seem pretty straightforward. To start, they generally
throw down this simple equation:

Simple, no? If you want mixtures of Gaussian models, then has a mean and a
variance, we’ll call these and . The next step is then to rewrite this equation
in a couple of ways so that you define the parameters, i.e. in terms of the
data and other parameters. One example: looks like this:

Not too bad after reading through the definition for all the parameters; the
first bundle describes the mean of the mixture and the second bundle describes
the variance of the mixture. You may have noticed that our means for each
mixture come from a Gaussian distribution themselves (I did say it was turtles
all the way down). If you’re using a nice math coding environment, like
[Scalala](https://github.com/scalala/Scalala) and
[Scalanlp](http://www.scalanlp.org/), you can easily sample from this
distribution like this

```scala
val theta_j = new Gamma((y_mean*n_j*s_j + lambda*r)/(n_j*s_j+r), 1d/(n_j*s_j +r)).sample
```

This goes on for most of the parameters for the model until you get to one of
the core tear inducing rewrites. This lovely gem describes the probably
distribution function for one of the hyper parameters in the Infinite Gaussian
Mixture Model:

This is not easy to sample from especially if you’re new to sophisticated
sampling methods. And sadly, just about every academic publication describing
these kinds of models gets to a point where they assume you know what they’re
talking about and can throw down Monte Carlo Markov Chain sampling procedures
like they’re rice at a wedding.

So what’s a lowly non-statistician data modeller to do? Start with a well
written description of a similar, but significantly simpler model. In this
case, [Gibbs Sampling for the
Uninitiated](http://users.umiacs.umd.edu/~resnik/pubs/gibbs.pdf), which
describes how to apply Gibbs to the Naive Bayes model. I’ll summarize this
awesome paper in the next part of this series and then tweak it a little to
make a [Finite Gaussian Mixture
Model](https://en.wikipedia.org/wiki/Mixture_model#Gaussian_mixture_model).
After that’s said and done, I’ll show how to extend the finite version into the
Dirichlet Process Mixture Model (with some simplifications).
