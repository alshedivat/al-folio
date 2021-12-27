---
layout: post
title: re to save atmospheric chemists
date: 2017-03-22 19:12:00
tags: python
---

It has been a long time since my last update here… Could not say that I have obtained some outstanding results in my PhD, but I surely discovered a rather convenient way of working with various chemical schemes. Just to get you on the same page, I am trying to develop a new chemical scheme for the [UM-UKCA global climate-chemistry model](https://www.ukca.ac.uk/wiki/index.php/UKCA), and as any new scheme, it needs to be tested against the ‘gold standard’, the [Master Chemical Mechanism](http://mcm.york.ac.uk/home.htt).

There are lots of ways to compare one mechanism with another, yet it is always interesting to see which reactions contribute the most to the change in concentration of whatever chemical species you are interested in. Calculating fluxes through each individual reaction provides you with this information, though the process is not that trivial when you have thousands of reactions and hundreds of species in a mechanism. [Here](https://ueapy.github.io/regular-expressions-and-how-to-use-them.html) I share a part of my solution to this problem, which involves Python, [re](https://docs.python.org/3.5/library/re.html) module and extensive use of dictionaries.
