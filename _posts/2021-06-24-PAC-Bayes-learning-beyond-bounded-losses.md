---
layout: post
title: "PAC-Bayes learning beyond bounded losses"
speaker: "Maxime Haddouche"
speaker_url: https://maximehaddouche.github.io/
speaker_institution: INRIA Lille
date: 2022-06-24
---

PAC-Bayesian theory has emerged in the late 90s and has been since widely developed given its high adaptability to many learning situations. It provides theoretical guarantees for existing learning algorithms as well as new PAC-Bayesian procedures? Those procedures recently left the theoretical as part of the training of recursive neural networks for instance. However, PAC-Bayesian learning is classically valid with restrictive assumptions: i.i.d data, data-free prior, bounded or sub-gaussians losses. This talk is structured around two axes:
First, a general overview of celebrated PAC-Bayes results and a brief overview of the state of the art
Second, an exposure of one specific work dedicated to overcome the classical assumption of bounded losses, by introducing a new condition named HYPE for HYPothesis dependent rangE. We then show how one can adapt classical PAC-Bayes route of proofs to this less restrictive condition and also instantiate our bound in the case of Gaussian measures.
