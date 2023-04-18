---
layout: post
title:  Three funny proofs of the existence of incomparable Turing degrees
date: 2023-04-17
description: Nuking incomparable mosquitoes with forcing, measure and category, and absoluteness
tags: math logic
related_posts: false
---

> "People would usually spend a whole class in computability theory proving this. What they are doing is they are very carefully proving the Baire category theorem without explicitly saying it."

I've recently learned of a pretty neat proof of the existence of incomparable Turing degrees. And this reminds me that I've actually seen quite a few funny (nuking-the-mosquito-type) proofs of this statement, so I decided to record them here.

The first proof was shown to me today by Andrew Marks. You can do this with either measure or category:

Consider the relation $$R(x,y)\Leftrightarrow x\leq_T y$$. First notice that this is a Borel subset of $$\mathbb{R}\times \mathbb{R}$$ (take your favorite interpretation of what $$\mathbb{R}$$ is). So it is measurable/has the Baire property. Second, observe that each section $$R_y$$ is countable, and so it is a null/meager subset of $$\mathbb{R}$$. By Fubini's theorem/Kuratowski-Ulam theorem, $$R$$ is a null/meager subset of $$\mathbb{R}^2$$. The analogous argument works to show that $$R^{-1}$$ is also null/meager.

Hence, $$R\cup R^{-1}$$, the set containing all pairs that are Turing comparable, is null/meager. Therefore the set of pairs $$(x,y)$$ such that $$x,y$$ are Turing-incomparable is measure one/comeager.

The second proof I saw on the internet (for example [here](https://homepages.ecs.vuw.ac.nz/~greenberg/incomparable_degrees.pdf)). It uses the observation that the continuum hypothesis follows from total comparability of the Turing degrees: each real computes countably many reals, so the reals ordered by $$\leq_T$$ will form an uncountable linear order in which every proper initial segment is countable. This implies there are at most $$\omega_1$$ many reals, so CH holds.

Now just force to negate CH. In the extension, $$\leq_T$$ is not a linear order. But the sentence "there exists two reals that are incomparable" is $$\Sigma^1_1$$, and hence by Mostowski absoluteness this alread holds in the ground model. 

The third proof is somewhat similar to the second. I came up with it when I was thinking about the question "if a real is computable from a comeager set of reals, is it computable?" The measure analogue of this is true, and this was the first interaction between computability theory and measure theory. That result was indepdently obtained by Sacks, and De Leeuw-Moore-Shannon-Shapiro.  The answer to my question is also yes, and the argument I came up with had already appeared in Andreas Blass's *Needed reals and recursion in generic reals* 20 years ago.

The proof goes like this: force to add two Cohen reals, then neither computes the other. But again it's $$\Sigma^1_1$$ to say there exists two incomparable reals, and so this already holds true in the ground model.

The key fact used in the proof is that Cohen reals hold no computation power. I think this is an independently interesting fact, so I'll end this post with a properly written proof.

**Theorem.** Let $$M$$ be a countable transitive model of enough of ZFC, and let $$x$$ be a real in $$M$$ and $$c$$ a Cohen real over $$M$$. If $$x$$ is computable relative to $$c$$, then $$x$$ is computable.

*Proof.* If $$x$$ is computed by the Turing program $$\Phi^c_e$$, then this fact also holds true in $$M[c]$$, and so by the forcing theorem this is forced by some condition $$p$$. That is, 

$$
p\Vdash \text{ the } \check e\text{th Turing program in the oracle }\dot c \text{ computes } \check x
$$

For any $$i\in\omega$$ we compute $$x(i)$$ as follows: run $$\Phi^s_e(i)$$ for all the $$s$$ extending $$p$$. 

As soon as any of these computations halt, the output will be the correct value of $$x(i)$$. This is because: if $$s_0,s_1$$ are two different nodes extending $$p$$ and $$\Phi^{s_0}_e(i)=0\neq 1=\Phi^{s_1}_e(i)$$, then we can build two different filters $$G_0$$ and $$G_1$$ containing $$s_0,s_1$$ respectively. Now $$M[G_0]$$ and $$M[G_1]$$ will both think $$x$$ is computed by $$\Phi_e^a$$ (since both filters contain $$p$$. Note that they will interpret $$a$$ differently; but that doesn't matter). So $$M[G_0]$$ thinks that $$x(i)=0$$ and $$M[G_1]$$ thinks $$x(i)=1$$. But whatever $$x(i)$$ is, this is an absolute fact about $$x\in M$$, so it should be answered in the same way by all transitive models extending $$M$$. Contradiction! $$\square$$
