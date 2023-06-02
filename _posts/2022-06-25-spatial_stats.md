---
layout: post
title: Accounting for landscape-level spatial variaiton trait-environment analyses.
date: 2022-06-25 11:12:00-0400
description: How do you account for spatial effects among populations sampled across a landscape?
tags: spatial-statistics quantitative-genetics trait-environment
categories: sample-posts
---
Studies in evolutionary biology frequently sample individuals across different levels of structure, which can include differernt families, populations, genetic demes, or species. The sampling effects imposed at different levels introduces shared covariance among levels of the groupand can potentially mask effects or alter the conclusions of a study. It is important to account for genetic effects among samples as a result of common descent or relatedness and there are numerous examples in the [evolutionary](https://doi.org/10.1111/evo.14227) or [quantitative genetic](https://doi.org/10.1111/mec.12827) literature for how to do so.

Sampling individuals from structured populations across a large geographic landscape can introduce special problems for analysis. This is particularly true in trait-environment analyses where longtidue and latitude are often strongly correlated to abiotic variables of interest. Accounting for the spatial effects of sampling across a landscape and the correlation of abiotic traits is a major problem, for which there is no clear solution.

I'm using this blog post to define a problem I've encountered in my work, and to outline some potential solutions. This post aims to lift the veil on some of the problem solving approaches scientests use during the manuscript writitng stage that are often no included in a publication.

insert the table of contents here.
1. Header
2. heder


This theme supports rendering beautiful math in inline and display modes using [MathJax 3](https://www.mathjax.org/) engine. You just need to surround your math expression with `$$`, like `$$ E = mc^2 $$`. If you leave it inside a paragraph, it will produce an inline expression, just like

$$
E = mc^2
$$

To use display mode, again surround your expression with `$$` and place it as a separate paragraph. Here is an example:

$$
\sum_{k=1}^\infty |\langle x, e_k \rangle|^2 \leq \|x\|^2
$$

You can also use `\begin{equation}...\end{equation}` instead of `$$` for display mode math.
MathJax will automatically number equations:

\begin{equation}
\label{eq:cauchy-schwarz}
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
\end{equation}

and by adding `\label{...}` inside the equation environment, we can now refer to the equation using `\eqref`.

Note that MathJax 3 is [a major re-write of MathJax](https://docs.mathjax.org/en/latest/upgrading/whats-new-3.0.html) that brought a significant improvement to the loading and rendering speed, which is now [on par with KaTeX](http://www.intmath.com/cg5/katex-mathjax-comparison.php).
