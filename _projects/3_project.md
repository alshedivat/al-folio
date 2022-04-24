---
layout: page
title: Representation Learning 
description: New techniques to learn effective node/graph representations
img: assets/img/GRL.pdf
importance: 1
category: Graph ML
---

Graphs are a highly informative, flexible, and a natural way to represent data. Machine
Learning for graphs (MLG), whereby classical ML is generalized to irregular graph domains, has
enjoyed a recent renaissance, leading to a dizzying array of models and their applications in drug
design, Web and recommender systems, social networks, and many more. The key challenge in MLG is to effectively learn to encode 
discrete graph structure into low-dimensional vector representations or embeddings which are then used in various prediction tasks. 

The most popular GRL approaches include (i) random-walk based methods  which first transforms the graph into node sequences, in which, the co-occurrence of two nodes measures the structural distance between them; (ii) matrix-factorization based methods which uses low ranked
decomposition of some node similarity matrix as node embeddings; and (iii) graph neural networks
(GNNs) which encode graph structure directly in the latent representations via neighborhood aggregation strategies. While these methods have shown state of the art improvements in various node/edge/graph level tasks on graphs, there are still open questions about their effectiveness for datasets with varying structural and task properties. On the one hand, we develop new datasets and benchmarks to audit the learning capabilities of existing methods. On the other hand we focus on developing new methods specifically for graphs with certain structural properties and under certain task conditions. 

*  Khosla, Megha,  Setty, Vinay, and Anand, Avishek. [A Comparative Study for Unsupervised Network Representation Learning](https://ieeexplore.ieee.org/document/8890798). In IEEE Transactions on Knowledge and Data Engineering, vol. 33, no. 5, pp. 1807-1818, 2021

* Khosla, Megha, Leonhardt, Jurek, Nejdl, Wolfgang, and Anand, Avishek. [Node Representation Learning for Directed Graphs](https://link.springer.com/chapter/10.1007/978-3-030-46150-8_24). In Machine Learning and Knowledge Discovery in Databases - European Conference, ECML PKDD 2019, Würzburg, Germany, September 16-20, 2019, Proceedings, Part I 2019





