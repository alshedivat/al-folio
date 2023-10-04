---
layout: page
title: Explainable and privacy preserving graph ML
description: Explainability and privacy preserving techniques for GraphML and their interplay
img: assets/img/privacy.pdf
importance: 2
category: Graph ML
---
**Explainable GraphML:** Learning complex neighborhood aggregations and latent feature extraction has enabled GNNs to achieve state-of-the-art performance on node and graph classification tasks. This complexity, on the other hand, leads to a more opaque and non-interpretable model. There have been numerous approaches proposed in the literature for the general interpretability of machine learning models; however, models learned over graph-structured data have some unique challenges. Specifically, predictions on graphs are induced by a complex combination of nodes and paths of edges between them in addition to the node features. This makes applying directly existing interpretability methods on graph models infeasible. We develop methods to explain decisions of already trained GNN models as well as shallow node embeddings.

* Funke, Thorben, Khosla, Megha, Rathee, Mandeep and Anand, Avishek. [Zorro: Valid, Sparse, and Stable Explanations in Graph Neural Networks](https://ieeexplore.ieee.org/abstract/document/9866587). In TKDE 2022

* Idahl, Maximilian, Khosla, Megha, and Anand, Avishek [Finding Interpretable Concept Spaces in Node Embeddings Using Knowledge Bases](https://link.springer.com/chapter/10.1007/978-3-030-43823-4_20) In Machine Learning and Knowledge Discovery in Databases - International Workshops of ECML PKDD 2019

* Piaggesi, Simone, Khosla, Megha, Panisson, André, and Anand, Avishek. [DINE: Dimensional Interpretability of Node Embeddings](https://arxiv.org/abs/2310.01162) arXiv:2310.01162 2023

Moreover, suitable notions of what constitutes an explanation in a graph model and its evaluation are missing. Due to the abstract nature of graphs human evaluation is usually impossible. Besides developing methods for explaining or interpreting the rationale underlying a given prediction for a GNN in our recent evaluation benchmark BAGEL, we also focus on effective evaluation strategies for measuring the goodness of an explanation.

 * Rathee, Mandeep, Funke, Thorben, Anand, Avishek, & Khosla, Megha [BAGEL: A Benchmark for Assessing Graph Neural Network Explanations](https://arxiv.org/abs/2206) arXiv:2206.13983.


**Privacy in GraphML:** Graph based learning methods, specifically graph neural networks (GNNs) are being applied in several domains including sensitive domains like medicine. It is important to ensure that such models do not inadvertantly leak any information about the data used to train such models. 
We work towards exposing vulnerabilities of graph neural networks towards privacy leaks as well as develop mitigating techniques to ensure privacy-preserving learning under differential privacy guarantees. 

* Olatunji, Iyiola E., Nejdl, Wolfgang, and Khosla, Megha. [Membership inference attack on graph neural networks](https://arxiv.org/abs/2101.06570). In IEEE International Conference on Trust, Privacy and Security in Intelligent Systems, and Applications 2021 [**Best Student Paper award**]. 

* Olatunji, Iyiola E., Funke, Thorben, and Khosla, Megha. [Releasing Graph Neural Networks with Differential Privacy Guarantees](https://arxiv.org/abs/2109.08907). In Transactions on Machine Learning Research, 2023

Privacy and explainability are fundamental in ensuring the trustworthiness of Graph Machine Learning. However, achieving both of these objectives simultaneously can be challenging. In our recent research, we delve into the dynamic relationship between explainability and privacy within the context of GraphML, offering fresh insights and perspectives on this complex interplay.

* Olatunji, Iyiola E., Funke, Thorben, and Khosla, Megha. [Private Graph Extraction via Feature Explanations](https://arxiv.org/abs/2206.14724). In Proceedings of Privacy Enhancing Technologies Symposium (PETS 2023)

* Khosla, Megha [Privacy and transparency in graph machine learning: A unified perspective](https://arxiv.org/abs/2207.10896)
In Advances in Interpretable Machine Learning and Artificial Intelligence (AIMLAI) at International Conference on Information and Knowledge Management (CIKM’22) 2022


