---
layout: page
title: fmi, serverless collectives
description: high-performance message passing and collective communication
img: /assets/img/fmi/overview.png
github: spcl/fmi
paper1: copik2022fmi
paper1_description: Paper @ ICS' 23
importance: 3
category: serverless
---

While serverless functions provide high scalability and elastic resource management,
the lack of fast and cheap communication is a major limitation of applying serverless
computing to distributed applications. Without direct communication and group operations,
functions must use cloud storage, resulting in cost and performance overheads.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/fmi/overview.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/fmi/overview.png' | relative_url }}" alt="" title="Overview of the FMI system."/>
  </a>
</div>
<div class="caption">
  <b>Function Message Interface</b>: an MPI-like interface for many channels of inter-function communication.
</div>

FaaS Message Interface (FMI) overcomes these limitations
by offering and high-performance framework for general-purpose peer-to-peer
and collective communication in FaaS applications.
FMI provides portable communication with performance closer to that offered by high-performance systems.

[The system implementation](https://github.com/spcl/fami) is available on an open-source license - try it today!
It supports AWS Lambda, and support for other cloud platforms is coming in the future.
