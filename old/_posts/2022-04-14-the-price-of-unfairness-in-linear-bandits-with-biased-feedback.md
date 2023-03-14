---
layout: post
title: The price of unfairness in linear bandits with biased feedback
speaker: Christophe Giraud
speaker_url:
speaker_institution:
date: 2022-04-14
---

Artificial intelligence is increasingly used in a wide range of decision making scenarios with higher and higher stakes. At the same time, recent work has highlighted that these algorithms can be dangerously biased, and that their results often need to be corrected to avoid leading to unfair decisions. In this paper, we study the problem of sequential decision making with biased linear bandit feedback. At each round, a player selects an action described by a covariate and by a sensitive attribute. She receives a reward corresponding to the covariates of the action that she has chosen, but only observe a biased evaluation of this reward, where the bias depends on the sensitive attribute. We design a Fair Phased Elimination algorithm which is shown to be optimal both in a gap dependent setting and in worst case (up to possible log terms). The worst case regret is shown to be much larger than in classical linear bandit problems. It is specified in terms of an explicit geometrical constant, which characterizes the difficulty of bias estimation. The gap-depend rate reveals the importance of the between group gap for the difficulty of the problem. Interestingly, there exists non-trivial instances where the problem is no more difficult than its unbiased counterpart.
