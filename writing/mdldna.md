---
layout: page
permalink: /writing/mdldna
title: Modern Deep Learning Design and Applications
description: Versatile Tools to Solve Deep Learning Problems
nav: false
---


[Springer Link](https://link.springer.com/book/10.1007/978-1-4842-7413-2#toc){: .btn :target="_blank"} 
[Barnes & Noble](https://www.barnesandnoble.com/w/modern-deep-learning-design-and-application-development-andre-ye/1139992754){: .btn :target="_blank"} 
[Amazon](https://www.amazon.com/Modern-Learning-Design-Application-Development/dp/1484274121){: .btn :target="_blank"} 

---

<img src="files\imgs\mdlda.png" width="100%" />

<small>Left: book cover, featuring mutant houseplant gone wild. Right: Little Mishi is reading about meta-optimization while comfortably nested in bed.</small>

---

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

## Pitch and Introduction

In spring of 2020, I was approached by Celestin Suresh John, acquisition editor of machine learning topics at Apress/Springer Nature, with an offer to write a book. I wrote up a book proposal in about two weeks, which was approved by the Apress editorial board. I spent the summer working several hours a day on the book - writing content, running and organizing code, producing visualizations, emailing paper authors, responding to revisions and comments by reviewers. The result: a 7-chapter, 450-page book that - in my opinion, anyway - takes a novel, underrepresented perspective on modern deep learning developments.

Much has been written about deep learning, most of it adhering to what I call a *code-centric framework*. These resources, which encompass all sorts of mediums from websites to books to online courses, center concepts around code. The reason, I suspect, is largely because software is one of the most accessible tools and hence computer science learners often expect 'hands-on' experience without too much theory. However, students that develop an understanding of deep learning through code-centric frameworks restrictively tie their understanding of deep learning *concepts* to *code*. While this makes sense from a software engineering perspective (think: data structures, memory management, etc. - tied inherently to implementation), deep learning is a combination of mathematics/statistics *and* computer science. There is an inherent abstraction to deep learning that code-centric frameworks often fail to explore fully, and thus limits learners' innovative/creative capacities to engineer novel deep learning solutions.

I think of this in terms of the bias/variance paradigm introduced early to machine learning students. Consider a simple curve-fitting model: if the model has high variance, it bases its understanding of the phenomena almost completely on the known data points. The curve passes through every point, but it doesn't model the regions "in-between" (i.e. "unseen" values not in the dataset) well. This is the sort of learning I believe too strict a code-centric framework encourages. In my book, I attempt to encourage generalization in learning by emphasizing intuitive theory as a guiding framework for engineering deep learning solutions and demonstrating the versatility and freedom of deep learning implementation tools.

Broadly, my book is a documentation and organization of more recent deep learning topics that have not made it yet into the bulk of "standard" deep learning literature. Topics include self-supervised learning, model compression (pruning, quantization, weight sharing, collaborative optimization), Bayesian optimization applications to neural network design, Neural Architecture Search, and architecture design motifs.

Read the introduction to the book (pages `I` - `XIX`) [here](https://link.springer.com/content/pdf/bfm%3A978-1-4842-7413-2%2F1.pdf){:target="_blank"}.
  
---

## Chapters
Please email me (`andreye@uw.edu`) for book, chapter, or page-range requests.

The book is organized by the following outline of topics (subsections not listed):
- `xvii` Introduction
- `001` Chapter 1: "A Deep Dive into Keras"
  - `002` Why Keras?
  - `003` Installing and Importing Keras
  - `004` The Simple Keras Workflow
  - `030` Visualizing Model Architectures
  - `033` Functional API
  - `041` Dealing with Data
  - `047` Key Points
- `049` Chapter 2: "Pretraining Strategies and Transfer Learning"
  - `050` Developing Creative Training Structures
  - `065` Transfer Learning Practical Theory
  - `081` Implementing Transfer Learning
  - `091` Implementing Simple Self-Supervised Learning
  - `095` Case Studies
  - `112` Key Points
- `115` Chapter 3: "The Versatility of Autoencoders"
  - `116` Autoencoder Intuition and Theory
  - `121` The Design of Autoencoder Implementation
  - `145` Autoencoder Applications (Denoising, Pretraining, VAE, etc.)
  - `188` Case Studies
  - `201` Key Points
- `205` Chapter 4: "Model Compression for Practical Deployment"
  - `206` Introduction to Model Compression
  - `210` Pruning
  - `229` Quantization
  - `236` Weight Clustering
  - `240` Collaborative Optimization
  - `248` Case Studies
  - `257` Key Points
- `259` Chapter 5: "Automating Model Design with Meta-Optimization"
  - `260` Introduction to Meta-Optimization
  - `264` General Hyperparameter Optimization
  - `289` Neural Architecture Search
  - `311` Case Studies
  - `323` Key Points
- `327` Chapter 6: "Successful Neural Network Architecture Design"
  - `330` Nonlinear and Parallel Representation
  - `357` Block/Cell Design
  - `380` Neural Network Scaling
  - `399` Key Points
- `401` Chapter 7: "Reframing Difficult Deep Learning Problems"
  - `403` Reframing Data Representation - DeepInsight
  - `414` Reframing Corrupted Data Usage - NLNL
  - `427` Reframing Limited Data Usage - Siamese Networks
  - `438` Key Points and Epilogue
- `441` Index 

---

## Case Study Papers
In an effort to ground the book and to further illuminate the wide breadth of concept applications, from the second chapter onwards each chapter features three case studies. A case study centers around a paper relevant to the chapter discussion, and gives context, a summary of the paper contributions and concepts, presents reported results and diagrams, and offers code if applicable/feasible.

Combined, the book explores 18 different papers. It was a great experience reaching out to the authors of each of these papers (even the ones that didn't reply to my request - I'm looking at you, Vivek Ramanujan; it is a pity your fascinating paper was left out). I've organized and linked the discussed papers below for your reference and exploration.

Chapter 2 - "Pretraining Strategies and Transfer Learning"
- ["A Target-Agnostic Attack on Deep Models: Exploiting Security Vulnerabilities of Transfer Learning"](https://arxiv.org/abs/1904.04334){:target="_blank"} by Shahbaz Rezaei and Xin Liu
- ["Unsupervised Representation Learning by Predicting Image Rotations"](https://arxiv.org/abs/1803.07728){:target="_blank"} by Spyros Gidaris, Praveer Singh, and Nikos Komodakis
- ["Unsupervised Visual Representation Learning by Context Prediction"](https://arxiv.org/abs/1505.05192){:target="_blank"} by Carl Doersch, Abhinav Gupta, and Alexei A. Efros

Chapter 3 - "The Versatility of Autoencoders"
- ["TabNet: Attentive Interpretable Tabular Learning"](https://arxiv.org/abs/1908.07442){:target="_blank"}{:target="_blank"} by Sercan O. Arik and Thomas Pfister
- ["FASPell: A Fast, Adaptable, Simple, Powerful Chinese Spell Checker Based on DAE-Decoder Paradigm"](https://aclanthology.org/D19-5522/){:target="_blank"} by Yuzhong Hong, Xianguo Yu, Neng He, Nan Liu, and Junhui Liu
- ["A Hybrid Convolutional Variational Autoencoder for Text Generation"](https://arxiv.org/abs/1702.02390){:target="_blank"} by Stanislau Semeniuta, Aliaksei Severyn, and Erhardt Barth

Chapter 4 - "Model Compression for Practical Deployment"
- ["Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization, and Huffman Encoding"](https://arxiv.org/abs/1510.00149){:target="_blank"} by Song Han, Huizi Mao, and William J. Dally
- ["Training with Quantization Noise for Extreme Model Compression"](https://arxiv.org/abs/2004.07320){:target="_blank"} by Angela Fan, Pierre Stock, Benjamin Graham, Edouard Grave, Remi Gribonval, Herve Jegou, and Armand Joulin
- ["What Do Compressed Deep Neural Networks Forget?"](https://arxiv.org/abs/1911.05248){:target="_blank"} by Sarah Hooker, Aaron Courville, Gregory Clark, Yann Dauphin, and Andrea Frome

Chapter 5 - "Automating Model Design with Meta-Optimization"
- ["Learning Transferable Architectures for Scalable Image Recognition"](https://arxiv.org/abs/1707.07012){:target="_blank"} by Barret Zoph, Vijay Vasudevan, Jonathon Shlens, and Quoc V. Le
- ["Progressive Neural Architecture Search"](https://arxiv.org/abs/1712.00559){:target="_blank"} by Chenxi Liu, Barret Zoph, Maxim Neumann, Jonathon Shlens, Wei Hua, Li-Jia Li, Li Fei-Fei, Alan Yuille, Jonathan Huang, and Kevin Murphy
- ["Efficient Neural Architecture Search via Parameter Sharing"](https://arxiv.org/abs/1802.03268){:target="_blank"} by Hieu Pham, Melody Y. Guan, Barret Zoph, Quoc V. Le, and Jeff Dean

Chapter 6 - "Successful Neural Network Architecture Design"
- ["Convolutional Networks for Biomedical Image Segmentation"](https://arxiv.org/abs/1505.04597){:target="_blank"} by Olaf Ronneberger, Philipp Fischer, and Thomas Brox
- ["Rethinking the Inception Architecture for Computer Vision"](https://arxiv.org/abs/1512.00567){:target="_blank"} by Christian Szegedy, Vincent Vanhoucke, Sergey Ioffe, Jonathon Shlens, and Zbigniew Wojna
- ["Rethinking Model Scaling for Convolutional Neural Networks"](https://arxiv.org/abs/1905.11946){:target="_blank"} by Mingxing Tan and Quoc V. Le

Chapter 7 - "Reframing Difficult Deep Learning Problems
- ["DeepInsight: A Methodology to Transform Non-Image Data to an Image for Convolution Neural Architecture"](https://www.nature.com/articles/s41598-019-47765-6){:target="_blank"} by Alok Sharma, Edwin Vans, Daichi Shigemizu, Keith A. Boroevich, and Tatsuhiko Tsunoda
- ["Negative Learning for Noisy Labels"](https://arxiv.org/abs/1908.07387){:target="_blank"} by Youngdong Kim, Junho Yim, Juseung Yun, and Junmo Kim
- ["Siamese Neural Networks for One-shot Image Recognition"](https://www.cs.cmu.edu/~rsalakhu/papers/oneshot1.pdf){:target="_blank"} by Gregory Koch, Richard Zemel, and Ruslan Salakhutdinov

---

## Code
The code snippets within each chapter have been arranged into code notebooks for easy user viewing and access. The raw notebooks for each chapter are available on the [Apress GitHub](https://github.com/Apress/Modern-Deep-Learning-Design-and-Application-Development-){:target="_blank"}.