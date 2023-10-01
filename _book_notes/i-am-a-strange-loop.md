---
layout: post
title: I am a Strange Loop
date: 2023-08-09
description: Douglas Hofstadter
img: assets/books/i-am-a-strange-loop.jpg
importance: 2
category: philosophy
giscus_comments: false
related_posts: false
toc:
  sidebar: left
---

I didn't find anything particularly insightful in the exploration of the sense of self, but the part about Gödel is awesome:
- In 1931, Gödel was the first to realize that the world of natural numbers is so rich that it can mirror any pattern involving objects of any type
- He used this insight to make Bertrand Russell's Principia Mathematica, which was intended to be a sound foundation for mathematical reasoning about natural numbers based on set theory, talk about itself 
- Construct a one-to-one mapping between statements and numbers: associate every symbol with a prime number, every statement with a multiplication of primes to the power of their position in the sequence of symbols - this is the Gödel number function
- Construct a one-to-one mapping between the application of rules of inference on statements in proofs and the application of numerical operations - the set of provable statements is a set of numbers 
- Construct a self-referential statement of the form "this statement is not provable" or "the Gödel number of this statement is not part of the Gödel numbers of provable statements" using the application of the Gödel number function to avoid an infinite regress 
- What is the implication of this self-referential statement? If it's true, it's not provable; if it's false, it is provable - given we assume that only true statements are provable (otherwise, the system would be garbage), we have proved some true statements are not provable; in other words, truth and provability don't always go together, there is a gulf between the abstract concept of truth and computational ways (physical ways, see David Deutsch's work) to ascertain it
- Gödel showed we can construct an infinity of such true but not provable self-referential statements in the formalism of Principia Mathematica - in other words, he showed it to be non-complete 
- This hole in Principia Mathematica is due to its expressiveness about the richness of natural numbers; there is no way around it and it applies to any mathematical formalism at least as rich as natural numbers
