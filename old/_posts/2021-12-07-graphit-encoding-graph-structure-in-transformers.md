---
layout: post
title: "GraphiT: Encoding Graph Structure in Transformers"
speaker: Gregoire Mialon
speaker_url:
speaker_institution:
date: 2021-12-07
---

Graph Neural Networks (GNNs) are a popular architecture when it comes to handling graph structured data such as datasets of molecules or proteins. However, GNNs may have difficulties to capture interactions between distant neighbors, in this case the compound's atoms. Transformers on the other hand are a promising solution to this issue as they allow all elements of the input set to exchange information.  But, vanilla transformers do not take the structure of the graph into account, thus loosing valuable information. In this talk, we will explain how it is possible to incorporate node structural and positional information into the transformer architecture. Our resulting model, GraphiT, is able to outperform representations learned with GNNs.
