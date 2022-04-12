---
layout: page
title: MCMC
description: New methods for Markov chain Monte Carlo sampling
img: assets/img/space_partitionaing.png
importance: 1
category: work
---

Sampling from arbitrary distributions, that are often not analytically available, is often a difficult but important task.
For exampe in the context of Bayesian inference, drawing samples from the posterior distribution is the go-to method to characterize the posterior. But also calculating integral values of unnnormalized distributions, as for example the bayesian "evidence" (or marginla likelihood) is a key ingredient to model comparison.

In our paper "Integration with an Adaptive Harmonic Mean Algorithm" we introdcue a technique that can reliably estomate integrals and uncertainties over a set of avialbale samples, without any need to generate new samples.

In our more recent work "Parallelizing MCMC Sampling via Space Partitioning" we use the above technique together with a space-partitioning scheme to parallelize the otherwise inhernetly serie Markov chain process. By doing so we can achievesuper-linear scaling with the number of workers.

## Further Information

Collaborators: Prof. Dr. Allen Caldwell (MPP), Dr. Vasyl Hafytch (MPP), Dr. Oliver Schulz (MPP)

Paper on the adaptive harmonic integration: <https://arxiv.org/abs/1808.08051>

Preprint on the parallel MCMC via space partitioning: <https://arxiv.org/abs/2008.03098>
