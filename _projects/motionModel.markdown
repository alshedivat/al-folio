---
layout: page
title: Stochastic Motion Model
description: Probabilistic Character Motion Synthesis using a Hierarchical Deep Latent Variable Model
img: /assets/img/motion.jpeg
importance: 1
---

We present a probabilistic framework to generate character animations based on weak control signals, such that the synthesized motions are realistic while retaining the stochastic nature of human movement. The proposed architecture, which is designed as a hierarchical recurrent model, maps each sub-sequence of motions into a stochastic latent code using a variational autoencoder extended over the temporal domain. We also propose an objective function which respects the impact of each joint on the pose and compares the joint angles based on angular distance. We use two novel quantitative protocols and human qualitative assessment to demonstrate the ability of our model to generate convincing and diverse periodic and non-periodic motion sequences without the need for strong control signals.


<div class="row justify-content-sm-center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/r9F74LcGC0A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## Publication
**Probabilistic Character Motion Synthesis using a Hierarchical Deep Latent Variable Model**, Ghorbani, Saeed, Wloka, Calden, Etemad, Ali, Brubaker, Marcus A., and Troje, Nikolaus F. *Computer Graphics Forum 2020*. [Link](http://diglib.eg.org/handle/10.1111/cgf14116)

---

## Code
Will be available soon!

---

### Referencing the MoVi Dataset
```bibtex
@article {ghorbani2020b,
journal = {Computer Graphics Forum},
title = {{Probabilistic Character Motion Synthesis using a Hierarchical Deep Latent Variable Model}},
author = {Ghorbani, Saeed and Wloka, Calden and Etemad, Ali and Brubaker, Marcus A. and Troje, Nikolaus F.},
year = {2020},
publisher = {The Eurographics Association and John Wiley & Sons Ltd.},
ISSN = {1467-8659},
DOI = {10.1111/cgf.14116}
}
```