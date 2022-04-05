---
layout: page
title: transparency in graph ML
description: Interpreting graph neural networks
img: assets/img/Interpret.pdf
importance: 3
category: Graph ML
---

Learning complex neighborhood aggregations and latent feature extraction has enabled GNNs to achieve state-of-the-art performance on node and graph
classification tasks. This complexity, on the other hand, leads
to a more opaque and non-interpretable model. There have been numerous approaches proposed in the literature for the general
interpretability of machine learning models; however, models learned over graph-structured data have
some unique challenges. Specifically, predictions on graphs are induced by a complex combination
of nodes and paths of edges between them in addition to the node features. This makes applying
directly existing interpretability methods on graph models infeasible. 

Moreover, suitable notions of what
constitutes an explanation in a graph model and its evaluation are missing. Due to the abstract nature of graphs human evaluation is usually impossible. 

Besides developing methods for explaining or interpreting the rationale underlying a given prediction for a GNN we also focus on effective evaluation strategies for measuring the goodness of an explanation.

* Funke, Thorben, Khosla, Megha, Rathee, Mandeep and Anand, Avishek. [Zorro: Valid, Sparse, and Stable Explanations in Graph Neural Networks](https://arxiv.org/abs/2105.08621). arxiv 2021.




