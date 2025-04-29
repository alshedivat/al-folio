---
layout: page
title: Software Verification
description: Work done for the Golem CHC solver.
img: assets/img/golem-graph.png
#redirect: dddfdfd
importance: 3
category: work
---

During my internship, I delved into the rapidly evolving field of SMT solving, an important branch of software verification. While SMT solvers have made remarkable progress in recent decades, the challenge of determining the satisfiability of complex boolean expressions remains as an extremely challenging task. In response to this, the model checking community has embraced various proof formats and certificates to ensure the correctness of solver outputs. My work revolved around the development of an extension for the CHC solver named "Golem", where I approached the unexplored idea of generating independently verifiable proofs for this class of expressions. 

CHCs play an important role in mapping essential programming constructs, such as loops and recursion, so Golem's successful generation of Alethe proofs is what I consider a critical step in enhancing the reliability and trustworthiness of software verification processes.

The code I worked on can be found [here](https://github.com/mbaranr/alethe-golem).