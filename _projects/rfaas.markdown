---
layout: page
title: RDMA + FaaS = rFaaS
description: Solving the high latency invocations problem of FaaS.
img: /assets/img/rfaas/overview.png
importance: 1
github: spcl/rfaas
paper1: 2021rfaas
paper1_description: Paper @ IPDPS 2023
zenodo: 10.5281/zenodo.7657524
category: serverless
---

<div style="vertical-align:middle; text-align:center">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/rfaas/utilization.png' | relative_url }}" alt="" title="Piz Daint utilization."/>
</div>
<div class="caption">
  The utilization of CPU cores in the Piz Daint supercomputer, April 2021.
</div>

The world of supercomputing is dominated by the MPI programming model and batch systems.
These solutions provide the high performance needed for scalable scientific computing, but
they don't make it particularly difficult to achieve high machine utilization.
As shown on the CPU utilization graph from Piz Daint (above), many resources are available
only for a short time, and the long-running and persistent batch jobs cannot use them.

<div style="vertical-align:middle; text-align:center">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/rfaas/overview.png' | relative_url }}" alt="" title="rFaaS overview."/>
</div>
<div class="caption">
  rFaaS combines the flexibility of FaaS and high-performance of batch jobs.
</div>

FaaS provides an elastic resource management system that could address this utilization problem.
However, serverless struggles to achieve the performance needed in high-performance computing:
slow invocations, low network bandwidth, and the overheads of the FaaS management system
make it difficult to incorporate serverless functions when every millisecond counts.
Therefore, we decided to combine the best of both worlds: **elasticity of FaaS** and **high-performance
of cluster batch systems**. We built a new FaaS platform with RDMA-accelerated network transport.


<div style="vertical-align:middle; text-align:center">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/rfaas/lifetime.png' | relative_url }}" alt="" title="rFaaS invocations."/>
</div>
<div class="caption">
  The lifetime of rFaaS invocations.
</div>

In rFaaS, the centralized schedulers and API gateway are replaced with a decentralized allocation mechanism.
Instead of using a traditional cloud trigger, MPI applications query executor servers,
obtain resource allocation and establish RDMA connections to remote workers.
Every function is invoked by writing input data directly to the memory of the worker.
This allows us to achieve **a single-digit microsecond hot invocation latency** - hot invocations
add less than 350 nanoseconds overhead on top of the fastest available network transmission.

<div style="vertical-align:middle; text-align:center">
  <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/rfaas/system.png' | relative_url }}" alt="" title="rFaaS with batch systems."/>
</div>
<div class="caption">
  The integration of rFaaS with cluster batch systems and MPI applications.
</div>

rFaaS comes with a dedicated resource manager to notify MPI jobs about changing resource availability
in an efficient and scalable manner. In addition, the accounting system utilizes RDMA atomic operations to minimize the overheads of user management.
In rigid MPI jobs, processes (ranks) allocate and use functions independently, allowing for 
decentralized offloading parts of the computation to the idle cluster capacity.

<div style="vertical-align:middle; text-align:center">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/rfaas/invocation_times.png' | relative_url }}" alt="" title="Invocation latencies.."/>
</div>
<div class="caption">
  Invocation latencies of FaaS frameworks.
</div>

We have shown that rFaaS invocations provide the lowest latency and the highest bandwidth
compared to state-of-the-art solutions. Furthermore, we have shown that rFaaS functions
can be integrated into scientific applications to provide cheap and easy acceleration.
More insights and results can be found in [the paper](/publications#2021rfaas) that has been accepted at IPDPS 2023.
