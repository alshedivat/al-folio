---
layout: page
title: SeBS-Flow, benchmarking serverless workflows 
description: Bringing SeBS to the next generation of serverless workloads
img: /assets/img/sebs-flow/benchmark_suite.png
github: spcl/serverless-benchmarks
paper1: 2025sebsflow
paper1_description: Paper @ EuroSys 2025 
zenodo: 10.5281/zenodo.14907321
importance: 3
category: serverless
---

Serverless computing has emerged as a prominent paradigm, with a significant adoption rate among cloud customers.
While this model offers advantages such as abstraction from the deployment and resource scheduling, it also poses limitations in handling complex use cases due to the restricted
nature of individual functions. Serverless workflows address this limitation by orchestrating multiple functions into a
cohesive application. However, existing serverless workflow
platforms exhibit significant differences in their programming models and infrastructure, making fair and consistent
performance evaluations difficult in practice. To address this
gap, we propose the first serverless workflow benchmarking
suite SeBS-Flow, providing a platform-agnostic workflow
model that enables consistent benchmarking across various platforms. SeBS-Flow includes six real-world application
benchmarks and four microbenchmarks representing different computational patterns. We conduct comprehensive
evaluations on three major cloud platforms, assessing performance, cost, scalability, and runtime deviations. We make
our benchmark suite open-source, enabling rigorous and
comparable evaluations of serverless workflows over time.

Full description of the benchmark suite, insights, and results can be found in [our benchmarking paper](/publications#2025sebsflow) that has been accepted at EuroSys 2025.
[The open-source release of SeBS is available on GitHub](https://github.com/spcl/serverless-benchmarks) - try it today!
It supports AWS Step Functions, Azure Durable Functions, and Google Cloud Workflows.

