---
layout: page
title: scala_knots
description: Knot algorithms in Scala, 2020.
img: assets/img/scala_knots.png
importance: 2
category: undergraduate
---

Implemented the generalized Seifert matrix algorithm from my summer research in Scala.

[Link](https://github.com/Chinmaya-Kausik/scala_knots) to the Github Repository.

**Positives:** It was great to see my algorithm in action! Scala's static-typing makes a lot of errors very easy to spot. A certain number of things are far more intuitive with tail recursion and functional programming.

**Negatives:** Some parts of the algorithm are far more natural to implement as for loops, so using things like map and flatmap constantly in Scala can get annoying for them. I was obsessed with reducing the number of lines I wrote, so I often had monstrous looking lines which were occasionally hard to read, even for me! It was super hard to find good Hermitian eigenvalue implementations. I didn't create a good debugging setup, when it would have been much more convenient later on, had I put in the effort to climb that potential well and do it.

**Technical takeaways:** Functional programming for a moderate scale project. The importance of commenting. Looking for and implementing efficient algorithms on my own, like the Bareiss algorithm that vastly sped up symbolic determinants.

**Meta takeaways:** Another data point for my 2022 conclusion that for long-term commitments, I like working on more tangible things, like an actual program implementing my algorithm. Or a constructive proof. It seems like I enjoy the abstract more as a means to a tangible end. 
