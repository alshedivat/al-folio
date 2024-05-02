---
layout: page
title: HPC software disaggregation
description: high HPC utilization with serverless functions
img: /assets/img/disagg/overview.png
github: spcl/serverless-software-disaggregation-artifact
paper1: copik2024disagg
paper1_description: Paper @ IPDPS'24
importance: 3
category: serverless
---

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/disagg/overview.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/disagg/overview.png' | relative_url }}" alt="" title="Software disaggregation with FaaS."/>
  </a>
</div>
<div class="caption">
  <b>Software disaggregation with FaaS</b>: increasing resource utilization without modifications to the HPC hardware.
</div>

Supercomputing systems often suffer from resource underutilization.
In particular, large memory pools and GPU accelerators are idle when batch jobs do not require them.
While we could raise the system utilization by allowing other jobs to use them,
this is not currently possible in the rigid world of HPC clusters.
Hardware disaggregation can solve the issue, but this, in turn, requires a new dedicated data center architecture.

Instead, we present a new software disaggregation approach system.
We allow other jobs to access idle resources from short-running serverless functions.
Functions are co-located with other jobs on the same node to allow applications with different
computational requirements to benefit from shared resources. 
We show that the FaaS programming model satisfies the requirements of high-performance applications
and how idle memory helps resolve cold startup issues.
We demonstrate a software resource disaggregation approach where the co-location of functions
allows idle cores and accelerators to be utilized while retaining near-native performance.

