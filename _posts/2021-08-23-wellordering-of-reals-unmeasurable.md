---
layout: post
title:  Well-ordering of the reals is not measurable
date: 2021-08-23 11:12:00-0400
description: An example of a nonmeasurable set that occurs in logic
tags: math logic
related_posts: false
---
Certain sets of real numbers occur frequently in Mathematical Logic but lack a nice geometric presentation to make it into Real Analysis textbooks. Some of them are quite fun examples to have in one's repository. I'd like to refer to these as "logical" subsets of the reals, for the boring reason that logic is where they're typically found. A particularly nice example is a well-ordering of the reals, considered as a subset of the plane. A quick proof using Fubini's Theorem demonstrates that it is not (Lebesgue) measurable, thus providing another proof that the axiom of choice implies there is a nonmeasurable set. The core idea of the proof is, to the best of my knowledge, due to Sierpiński.



The key to this proof is the following special case of Fubini's Theorem:
>**Theorem.** Let $$A$$ be a measurable subset of $$\mathbb{R}^2$$. For each $$y\in \mathbb{R}$$ we define the section of $$A$$ by $$y$$ as $$A_y:=\{x\in \mathbb{R}\mid (x,y)\in A\}$$. Then $$A$$ has measure zero iff almost no point can give $$A$$ non-measure-zero sections. That is, iff $$\{y\in\mathbb{R}\mid A_y \text{ is not measure zero}\}$$ is a measure-zero subset of $$\mathbb{R}$$.

Here, by not measure zero (or non-null), I mean either having positive measure or nonmeasurable.

The key to utilizing Fubini's Theorem along with a well-ordering of the reals is that we can now identify the first place where things start to have positive measure. In other words, we find a place on the well-ordering where all the proper initial segments are either measure zero or nonmeasurable. This will end up giving us a set which satisfies Fubini's Theorem.

Let us see this in action with a warm-up proof.

>**Theorem.** Assume the continuum hypothesis, which says there is a well-ordering $$\prec$$ of $$\mathbb{R}$$ such that every proper initial segment is countable. Then $$\prec$$ is not measurable as a subset of the plane.

Proof: For each $$x\in\mathbb{R}$$, the initial segment $$\prec_x$$ determined by $$x$$ is countable, and hence of measure zero. It is helpful to visualize $$(\mathbb{R},\prec )\times (\mathbb{R},\prec )$$ as a plane. Assume towards a contradiction that the set $$\prec =\{(x,y)\mid x\prec y\}$$ is measurable. Then it follows that it has measure zero, because each of its section is an initial segment in the well-ordering $$\prec$$ and hence countable. 

![image1](/assets/img/wellordering-of-reals-unmeasurable/202108231.svg)

But then the complement of this well-ordering $$\succ:=\{(x,y)\mid y\prec x \text{ or } y=x\}$$ would also have measure zero, by the same argument (except now we consider the sections along the other axis). This would then mean that $$\mathbb{R}^2=\prec \cup \succ$$ is null. Contradiction!

![image2](/assets/img/wellordering-of-reals-unmeasurable/202108232.svg)

So this shows that under $$\mathsf{CH}$$, a well-ordering of the reals is not measurable. we now observe that we used $$\mathsf{CH}$$ to establish that every initial segment in the well-ordering has measure zero. This can be dispensed with, because one might simply consider a similar least position, below which everything is either measure zero or nonmeasurable. This works as follows.

>**Theorem.** Let $$\prec$$ be a well-ordering of the reals. Then $$\prec$$ is not measurable.

Proof: Suppose it were measurable. Let $$a$$ be the least real such that the product $$\prec_a\times\prec_a$$ has positive measure ($$\prec_a$$ here denotes the initial segment determined by $$a$$ in this well-ordering). It could very well be that such a real doesn't exist, in which case we consider again the whole space $$(\mathbb{R},\prec)\times(\mathbb{R},\prec)$$.

Now we restrict the well-ordering to everything $$\prec$$-below $$a$$, that is, consider $$\prec\upharpoonright a :=\{(x,y)\mid x,y\prec a \text{ and }x\prec y\}$$. This set must have measure zero: if a section of it by some $$z$$ is non-null, then $$z\prec a$$ would violate the minimality of $$a$$. So Fubini's Theorem implies that $$\prec\upharpoonright a$$ has measure zero. 

But the other half of the square $$\prec_a\times\prec_a$$ has the same measure as $$\prec\upharpoonright a$$. And hence the square $$\prec_a\times\prec_a$$ is the union of two measure zero sets, which implies that it has measure zero itself, contradicting the choice of $$a$$. $$\square$$

![image3](/assets/img/wellordering-of-reals-unmeasurable/202108233.svg)