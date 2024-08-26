---
layout: page
title: causal inference in epidemiology
description: Frequentist Causal Inference for Semi-mechanistic Epidemic Models with Interventions
img: assets/img/causal_epi_project.jpg
importance: 1
category: methodology & application
---

This is a collaborated work with Professors Larry Wasserman and Valérie Ventura, in the Department of Statistics & Data Sciences, CMU.

The effect of public health interventions on an epidemic can be estimated by adding the intervention to epidemic models. During the Covid-19 epidemic, numerous papers used such methods for making scenario predictions. The majority of these papers used Bayesian methods to estimate the parameters of the model. In this paper we show how to use frequentist methods for estimating these effects. This avoids having to specify prior distributions and it provides standard errors and confidence intervals with frequency guarantees. Furthermore, by using sandwich standard errors, we obtain some robustness to model mispecification. Some epidemic models are not identified, a fact that gets hidden in a Bayesian analysis. For such cases, we propose instead a sensitivity analysis approach where inferences are examined as a function of some restriction on the parameters. We further show how to use empirical Bayes methods to improve estimation when there are many different goegraphic regions. In the case where there are several geographic regions, current methods use hierarchical models to combine information across regions. However, this requires making more modeling assumptions which riases the spectre of model misspecification. Instead, we estimate the regions separately and then we combine estimates using robust empirical Bayes methods. Throughout, we focus on semi-mechanistic models which provide a simple, tractable alternative to compartmental methods.