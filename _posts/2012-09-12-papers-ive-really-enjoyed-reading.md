---
layout: post
title:  Papers I've Really Enjoyed Reading
date:   2012-09-12
description: Summary of 2012 research papers
tags: research
---

As any good grad student would, I’ve read a lot of research papers. And my reading interest have swayed far and wide across the Natural Language Processing spectrum and even expanded into more general Machine Learning methods and Bayesian modelling. Now that i’m transitioning from a full time grad student focused on research to being a full time software developer at Google, I want to just briefly jot down a list of papers that have stuck out the most for me this last week as I transition. So in no particular order, and in no way totally inclusive, here they are:

-  [Hierarchical Dirichlet
   Processes](https://people.eecs.berkeley.edu/~jordan/papers/hdp.pdf): This
paper really helped me figure out both how Dirichlet Processes worked, the
multiple interpretations of these models, and inference procedures. On top of
that, it introduced an even cooler hierarchical extension to Dirichlet
Processes. A must read for non-parametric Bayesian models.
-  [Particle Learning for General
   Mixtures](https://projecteuclid.org/journals/bayesian-analysis/volume-5/issue-4/Particle-learning-for-general-mixtures/10.1214/10-BA525.full):
I still don’t fully understand how to design good particle filters, but this
paper pushed my mind in a lot of ways and got me excited about Sequential
Markov Models quite a while ago. It’s event got a cool surprise: It’s written
by people in Business schools!
-  [The Curious Case of Behavioral
   Backlash](https://www.researchgate.net/publication/227630765_The_Curious_Case_of_Behavioral_Backlash_Why_Brands_Produce_Priming_Effects_and_Slogans_Produce_Reverse_Priming_Effects):
Why Brands Produce Priming Effects and Slogans Produce Reverse Priming Effects:
I in generally love anything to do with psychical priming, so this paper caught
my attention when I came across it. And the horribly long title says what it’s
all about. They go through a battery of experiments testing the impact upon
people created by both branding and slogans. Their results are kinda surprising
between
-  [Cross-Cutting Models of Lexical
   Semantics](https://aclanthology.org/D11-1130): This paper is both really
simple and really complicated at the same time. They glue together two really
great ideas: Latent Dirichlet Allocation and Dirichlet Process Mixture Models
to build a nicely thought out Cross Cutting, or multiple clustering under
multiple views, model for processing text documents. I only wish I’d thought of
this idea first.
-  [An Introduction to MCMC for Machine
   Learning](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.13.7133):
If you love topic models, Dirichlet Process Mixture Models, or any other
sophisticated Bayesian model, then this paper is a must read. Written by some
of the big hitters in MCMC learning, they cover all the major Monte Carlo
Markov Chain approaches in sweet sweet detail.
-  [The Infinite Gaussian Mixture
   Model](http://www.gatsby.ucl.ac.uk/~edward/pub/inf.mix.nips.99.pdf): Yet
another paper based on Dirichlet Process Mixture Models. It’s a totally
non-parametric Bayesian clustering model with deep layers of hierarchy to
smooth out the mixtures nicely.
-  [A Nonparametric Bayesian Model for Multiple Clusterings with Overlapping
   Feature Views](http://www.gatsby.ucl.ac.uk/~edward/pub/inf.mix.nips.99.pdf):
This was my first introduction to cross cutting clustering models. They take a
totally different approach than the original multi-clustering approach and but
as complicated as it looks at first, it makes a nice amount of sense after a
while.
-  [Semantic Taxonomy Induction from Heterogeneous
   Evidence](https://ai.stanford.edu/~rion/papers/semtax_acl06.pdf): Yet
another paper I wish I’d though of first. How do you extend an ontology
automatically? You just use the knowledge you already have encoded to train a
classifier for the kind of relationships you want to add and let it fly over
new data. Final product? A bigger and better taxonomy with oodles of new
information.
-  [Personalizing PageRank for Word Sense
   Disambiguation](https://aclanthology.org/E09-1005.pdf): This is one of the
earlier really great graph based and fully unsupervised Word Sense
Disambiguation papers. It glues together the magic of PageRank and intuitions
about word senses to get a general model that’s pretty hard to beat event
today.
-  [An Experimental Study of Graph Connectivity for Unsupervised Word Sense
   Disambiguation](https://homepages.inf.ed.ac.uk/mlap/Papers/PAMI_2010_Navigli_Lapata-1.pdf):
Another really good paper covering all the ways you can build fully
unsupervised Word Sense Disambiguation models using graphs of word senses. The
best of the models used still get used pretty often in WSD.
-  [Improving Word Representations via Global Context and Multiple Word
   Prototypes](https://aclanthology.org/P12-1092.pdf): Andrew Socher is a
badass. Simple as that. I never though I’d see a totally legitimate and awesome
lexical semantics model use a neural network, but hey made it work beautifully.
It’s a good competitor to the Cross-Cutting model of semantics too.
-  [A probabilistic model of
   cross-categorization](https://pubmed.ncbi.nlm.nih.gov/21377146/): Probably
the best starting point for learning about cross categorization (cross-cutting)
models. It gives a good bit of theory of how they work, how to build them, and
a huge swath of examples of how they can be applied to approximate human
decision making. Really impressive stuff.
