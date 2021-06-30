---
layout: page
title: RDMA + FaaS = rFaaS
description: 
img: /assets/img/rfaas/overview.png
importance: 1
category: serverless
---

<div style="vertical-align:middle; text-align:center">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/rfaas/overview.png' | relative_url }}" alt="" title="rFaaS overview."/>
</div>
<div class="caption">
  rFaaS combines the flexibility of FaaS and high-performance of batch jobs.
</div>

The world of supercomputing is dominated by the MPI programming model and batch systems.
Both


<div style="vertical-align:middle; text-align:center">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/rfaas/lifetime.png' | relative_url }}" alt="" title="Strong scaling."/>
</div>
<div class="caption">
  rFaaS combines the flexibility of FaaS and high-performance of batch jobs.
</div>

In rFaaS, the centralized schedulers and API gateway are replaced with a decentralized allocation
mechanisms. MPI applications query executor servers, obtain resource allocation, and establish
RDMA connections to remote workers.

<div style="vertical-align:middle; text-align:center">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/rfaas/system.png' | relative_url }}" alt="" title="rFaaS with batch systems."/>
</div>
<div class="caption">
  The integration of rFaaS with cluster batch systems and MPI applications.
</div>

<div style="vertical-align:middle; text-align:center">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/rfaas/invocation_times.png' | relative_url }}" alt="" title="Invocation latencies.."/>
</div>
<div class="caption">
  Invocation latencies of FaaS frameworks.
</div>

The preprint is of the paper is [already available](/publications#2021rfaas).
