---
layout: page
permalink: /writing/mdl4td
title: Deep Learning for Tabular Data
description: Novel Methods to Solve Common Problems
nav: false
---

[Springer Link](https://link.springer.com/book/10.1007/978-1-4842-8692-0){: .btn :target="_blank"} 
[Barnes & Noble](https://www.barnesandnoble.com/w/modern-deep-learning-for-tabular-data-andre-ye/1141877884?ean=9781484286913){: .btn :target="_blank"} 
[Amazon](https://www.amazon.com/Modern-Deep-Learning-Tabular-Data/dp/148428691X){: .btn :target="_blank"} 

Read the foreword by Tomas Pfister (Head of AI @ Google Cloud) and Alok Sharma (Professor, Senior Scientist @ RIKEN Center), as well as the complete Introduction, in the front matter [here](https://link.springer.com/content/pdf/bfm:978-1-4842-8692-0/1?pdf=chapter%20toc).

Amazon Top Rankings
- #1 for new releases in Information Theory
- #4 for new releases in Artificial Intelligence
- #23 in Artificial Intelligence
- #28 in Information Theory

---

<img src="\assets\img\mdl4td.png" width="100%" />

<small>Left: book cover. Right: Little Mishi is engrossed in how t-SNE can be used to visualize the latent spaces of autoencoders.</small>

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

## Deep learning is not 'worse' than trees on tabular data.
Deep learning has become the public and private face of Artificial Intelligence. When one talks casually about Artificial Intelligence with friends at a party, strangers on the street, and colleagues at work, it is almost always on the exciting models which generate language, create art, synthesize music, and so on. Massive and intricately designed deep learning models power most of these exciting machine capabilities.

Many practitioners, however, are rightfully pushing back against the technological sensationalism of deep learning. While deep learning is “what’s cool”, it certainly is not the end-all be-all of modeling.

While deep learning has undoubtedly dominated specialized, high-dimensional data forms such as images, text, and audio, the general consensus is that it performs comparatively worse in tabular data.

It is therefore tabular data where those with some distaste, or even resentment, towards deep learning stake out their argument. (It was and still is fashionable to publish accepted deep learning papers which make seemingly trivial or even scientifically dubious modifications. This is one of the gripes against deep learning research culture articulated by many of my more classically minded colleagues in the space, which is fair.)

It is also fashionable now within this minority to bash the “fresh-minted new-generation data scientists” for being too enamored with deep learning, and instead to tout the comparatively more classic tree-based methods as instead the ‘best’ model for tabular data. You will find this perspective everywhere — in bold research papers, AI-oriented social media, research forums, and blog posts. Indeed, the counter-culture is often as fashionable as the mainstream culture, whether it is with hippies or deep learning.

This is not to say that there is no good research which points in favor of tree-based methods over deep learning — there certainly is. But too often this nuanced and contextualized research is mistaken and taken for a general rule, and those with a distaste for deep learning often commit to the same problematic doctrine as many advancing the state of deep learning: taking results obtained within a generally well-defined set of limitations and willfully extrapolating them in ways irrespective of said contextual bounds.

The most obvious short-sightedness of those which advocate for tree-based models over deep learning models is in the problem domain space. A common criticism of tabular deep learning approaches is that they seem like ‘tricks’, intricate and complex one-off methods which work sporadically, as opposed to reliably high-performance tree methods. The intellectual question Wolpert and Macready’s classic No Free Lunch Theorem makes us think about whenever we encounter claims of universal (or even near-universal) superiority, whether this is superiority in performance, consistency, or another metric, is: (near) universal across what subset of the problem space?

The datasets used by the well-publicized research surveys and more informal investigations showing the success of deep learning over tabular data are common benchmark datasets — the Forest Cover dataset, the Higgs Boson dataset, the California Housing dataset, the Wine Quality dataset, and so on. These datasets, even when evaluated in the dozens, are undoubtedly limited. Of course, we must acknowledge that it is much more difficult to perform an evaluative survey study with poorly behaved diverse datasets than these more homogenous benchmark datasets.

Yet those that tout the findings of such studies as bearing a broad verdict on the capabilities of neural networks on tabular data overlook the sheer breadth of tabular data domains in which machine learning models are applied.

> It would not be unreasonable to suggest that out of all data forms, tabular data is the most diverse in structural qualities and domain. In this sense, ‘tabular data’ is more of a ‘big Other’ or even the ‘encompassing All’ than a specific type or structure of data.

Let us consider some very real examples of tabular data problems which fall outside this narrow benchmark set.

- With the increase of data signals acquirable from biological systems, biological datasets have increased significantly in feature richness from their state just one or two decades ago. The richness of these tabular datasets exposes the immense complexity of biological phenomena — intricate patterns across a multitude of scales, ranging from the local to the global, interacting with each other in innumerable ways. Deep neural networks are almost always used to model modern tabular datasets representing complex biological phenomena.
- Alternatively, content recommendation, an intricate domain requiring careful and high-capacity modeling power, more or less universally employs deep learning solutions. Netflix, for instance, reported “large improvements to our recommendations as measured by both offline and online metrics” when implementing deep learning. Similarly, a Google paper demonstrating the restructuring of deep learning as the paradigm powering YouTube recommendations writes that “In conjugation with other product areas across Google, YouTube has undergone a fundamental paradigm shift towards using deep learning as a general-purpose solution for nearly all learning problems.”
- Multimodal problems involve data of multiple different types (modalities). Many tabular datasets contain text attributes, such as an online product reviews dataset which contains a textual review as well as user and product information represented in tabular fashion. Recent house listing datasets contain images associated with standard tabular information such as the square footage, number of bathrooms, and so on. Alternatively, consider stock price data which captures time series data in addition to company information in tabular form. What if we want to also add the top ten financial headlines in addition to this tabular data and the time series data to forecast stock prices? Tree-based models, to my knowledge, cannot effectively address any of these multimodal problems. Deep learning, on the other hand, can be used to solve all of them.

The fact is that data has changed since the 2000s and early 2010s, which is when many of the benchmark datasets used in studies which investigate performance discrepancies between deep learning and tree-based models. Tabular data is more fine-grained and complex than ever, capturing a wide range of incredibly complex phenomena. It is decidedly not true that deep learning functions as an unstructured, sparsely and randomly successful method in the context of tabular data.

Moreover, raw supervised learning is not just a singular problem in modeling tabular data.

- Tabular data is often noisy, and we need methods to denoise noise or to otherwise develop ways to be robust to noise.
- Tabular data is often also always changing, so we need models which can structurally adapt to new data easily.
- We often also encounter many different datasets which share a fundamentally similar structure, so we would like to be able to transfer knowledge from one model to another.
- Sometimes tabular data is lacking and we need to generate realistic new data.
- We would also like to be able to develop very robust and well-generalized models with a very limited dataset.

Again, as far as we are aware, tree-based models either cannot do the above or have difficulty doing the above. Neural networks, on the other hand, can do all of the following successfully, following adaptations to tabular data from the computer vision and natural language processing domains.

Of course, there are important legitimate general objections to neural networks.

One such objection is interpretability — the contention that deep neural networks are less interpretable than tree models. Interpretability is a particularly interesting idea because it is more an attribute of the human observer than the model itself. Is a gradient boosting model operating on hundreds of features really more intrinsically interpretable than a multi-layer perceptron trained on the same dataset? Tree models do indeed build easily understandable single-feature split conditions, but this in and of itself is not really quite valuable. Moreover, many or most models in popular tree ensembles like gradient boosting systems do not directly model the target, but rather the residual, which makes direct interpretability more difficult. What we care about more is the interaction between features. To effectively grasp at this, tree models and neural networks alike need external interpretability methods to collapse the complexity of decision making into key directions and forces. Thus, it is not clear that tree models are more inherently interpretable than neural network models on complex datasets.

The second primary objection is the laboriousness of tuning the meta-parameters of neural networks. This is an irreconcilable attribute of neural networks. Neural networks exist fundamentally more as ideals than asreal concrete algorithms, given the sheer diversity of possible configurations and approaches to the architecture, training curriculum, optimization processes, and so on. It should be noted that this is an even more pronounced problem for computer vision and natural language processing domains than tabular data, and that approaches have been proposed to mitigate this effect. Moreover, it should be noted that tree based models have a large number of meta-parameters too, which often require systematic meta-optimization.

A third objection is the difference in training time between neural networks and tree models (tree models are faster than neural networks). Anyone who brings up this objection as representative of tabular data demonstrates that they hold a quite specific conception of what tabular data is — namely, small & simple datasets. On large and complex datasets, tree-based models are similarly expensive — time-wise and space-wise — to train. (On small & simple tabular datasets, tree models tend to do better anyway. There is no contesting this. The problem hereis the falsely restricted space of what tabular data can be.)

Yet another objection is the inability of neural networks to effectively preprocess data in a way which reflects the effective meaning of the features. Popular tree-based models are able to interpret features in a way which is argued to be more effective for heterogeneous data. However, this does not bar the conjoined application of deep learning with preprocessing schemes, which can put neural networks on equal footing against tree-based models with respect to access to expressive features.

All of this is to challenge the notion that tree based models are superior to deep learning models, or even that tree based models are consistently or generally superior to deep learning models. It is not to suggest that deep learning is generally superior to tree-based models, either. The goal is instead to be holistic and fair.

To be clear, the following claims were made:

- Deep learning works successfully on a certain well-defined domain of problems, just as tree-based methods work successfully on another well-defined problem domain.
- Deep learning can solve many problems beyond raw tabular-data-to-label supervised learning that tree-based methods cannot, such as modeling multimodal data (image, text, and/or audio, etc. data in addition to tabular data), denoising noisy data, transferring knowledge across datasets, successfully training on limited datasets, and generating data.
- Deep learning is indeed prone to difficulties, such as interpretability and meta-optimization. In most of these cases, however, tree-based models suffer from the same problems to a somewhat similar degree (on the sufficiently complex cases where deep learning would be at least somewhat successful in the first place — we have to make apples-to-apples comparisons here).

The objective of the book is to substantiate these claims.

_This material is taken from the Introduction of the book and revised._

---

## Book Description 

Deep learning is one of the most powerful tools in the modern artificial intelligence landscape. While having been predominantly applied to highly specialized image, text, and signal datasets, this book synthesizes and presents novel deep learning approaches to a seemingly unlikely domain – tabular data. Whether for finance, business, security, medicine, or countless other domain, deep learning can help mine and model complex patterns in tabular data – an incredibly ubiquitous form of structured data.

Part I of the book offers a rigorous overview of machine learning principles, algorithms, and implementation skills relevant to holistically modeling and manipulating tabular data. Part II studies five dominant deep learning model designs – Artificial Neural Networks, Convolutional Neural Networks, Recurrent Neural Networks, Attention and Transformers, and Tree-Rooted Networks – through both their ‘default’ usage and their application to tabular data. Part III compounds the power of the previously covered methods by surveying strategies and techniques to supercharge deep learning systems: autoencoders, deep data generation, meta-optimization, multi-model arrangement, and neural network interpretability. Each chapter comes with extensive visualization, code, and relevant research coverage.

_Modern Deep Learning for Tabular Data_ is one of the first of its kind – a wide exploration of deep learning theory and applications to tabular data, integrating and documenting novel methods and techniques in the field. This book provides a strong conceptual and theoretical toolkit to approach challenging tabular data problems.
