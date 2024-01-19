---
layout: page
title: cppless, serverless for C++
description: Single-source model for productive serverless programming in C++
img: /assets/img/cppless/main_logo.png
paper1: 2023cppless
paper1_description: Preprint
github: spcl/cppless
github2: spcl/cppless-clang
importance: 7
category: serverless
---

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/cppless/main_logo.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/cppless/main_logo.png' | relative_url }}" alt="" title="ZooKeeper system model."/>
  </a>
</div>
<div class="caption">
  <b>Cppless Programming Model</b>: we extract serverless functions from single-source 
  applications, allowing the compiler to automatically deploy them at build time and invoke with at runtime.
</div>

The rise of serverless allowed many systems to benefit
from offloading computations and parallel tasks to dynamically allocated resources.
However, the developers of C++ applications found it difficult to integrate functions due
to complex deployment, lack of compatibility between client and
cloud environments, and loosely typed input and output data.

Cppless resolves this problem by providing a single-source programming model for serverless functions.
It is an end-to-end framework for implementing remote functions which handles the creation, deployment, and invocation of serverless functions.
Cppless is built on top of LLVM and requires only two compiler extensions to automatically extract C++ function objects and deploy them to the cloud.

The architecture of the compiler, including benchmark evaluation, details can be found in thLukas' Bachelor thesis [Cppless: A single-source programming model for high-performance serverless.](https://mcopik.github.io/assets/pdf/students/2022_cppless_moeller.pdf)
[The compiler implementation](https://github.com/spcl/cppless) is available on open-source license - try it today!
Furthermore, you can find details of the project in the following talk given by Lukas:

<div style="text-align: center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/M2xFEtPxmlw?si=Bxzl9zh4JOEOx7rO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

