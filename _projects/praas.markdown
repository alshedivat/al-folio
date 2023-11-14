---
layout: page
title: praas, serverless processes
description: new programming model for serverless
img: /assets/img/fmi/overview.png
github: spcl/PraaS
paper1: copik2022praas
paper1_description: Paper preprint.
importance: 5
category: serverless
---

Fine-grained serverless functions power many new applications that benefit from elastic scaling and pay-as-you-use billing model with minimal infrastructure management over-
head. To achieve these properties, Function-as-a-Service (FaaS) platforms disaggregate compute and state and, consequently, introduce non-trivial costs due to the loss of data
locality when accessing state, complex control plane interactions, and expensive inter-function communication.


<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/praas/cloud_overview.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/praas/cloud_overview.png' | relative_url }}" alt="" title="Overview of the cloud process concept."/>
  </a>
</div>
<div class="caption">
  <b>Cloud Processes</b>: combine the performance benefits of OS processes and elasticity of serverless functions.
</div>

We revisit the foundations of FaaS and propose a new cloud abstraction, the cloud process, that retains all the benefits of FaaS while significantly reducing the overheads that result from
disaggregation. We show how established operating system abstractions can be adapted to provide powerful granular computing on dynamically provisioned cloud resources while
building our Process as a Service (PraaS) platform. PraaS improves current FaaS by offering data locality, fast invocations, and efficient communication. PraaS delivers invocations up to 32× faster and reduces communication overhead by up to 99%.

[The system implementation](https://github.com/spcl/PraaS) is available on an open-source license - try it today!
It supports AWS Fargate, and support for other platforms is coming in the future.
