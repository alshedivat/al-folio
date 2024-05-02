---
layout: page
title: faaskeeper, building serverless services
description: Blueprint for serverless applications demonstrated on ZooKeeper.
img: /assets/img/faaskeeper/main_logo.png
github: spcl/faaskeeper
github2: spcl/faaskeeper-python
paper1: copik2024faaskeeper
paper1_description: Paper @ HPDC'24
importance: 3
category: serverless
---

In FaaS (Function-as-a-Service), virtual machines are replaced with dynamically allocated resources.
While functions are stateless, they gain a pay-as-you-go model and can better support infrequent workloads.
However, adapting existing cloud services to the simplified programming model of serverless functions
is challenging.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/faaskeeper/zookeeper.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/faaskeeper/zookeeper.png' | relative_url }}" alt="" title="ZooKeeper system model."/>
  </a>
</div>
<div class="caption">
  <b>ZooKeeper system model</b>: data is spread across replicas to ensure high read throughput, while an elected leader handles state modifications.
</div>

An example of a popular and complex stateful service is [Apache ZooKeeper](https://zookeeper.apache.org/).
ZooKeeper provides distributed applications with a coordination service that allows for controlling
shared state, guaranteeing data consistency, building locks, and electing leaders.
Furthermore, in comparison to cloud-native storage, ZooKeeper provides additional
semantics of total order with linearizable writes, atomic updates,
and ordered push notifications.
Thus, it is essential to offer ZooKeeper to serverless functions, but it cannot be done in the current
form due to the lack of a pay-as-you-go cost model.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/faaskeeper/workflow.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/faaskeeper/workflow.png' | relative_url }}" alt="" title="Workflow for building serverless services."/>
  </a>
</div>
<div class="caption">
  <b>Building serverless services</b>: persistent virtual machines are replaced with cloud storage, functions, and queue-based communication.
</div>

In this work, we introduce design principles for creating
complex serverless services and contribute a set of requirements for
efficient and scalable FaaS computing.
We follow the previously established conventions of decoupling system from application state and computing from storage
tasks, use ephemeral and serverless functions to implement computing tasks,
and employ auto-scalable cloud storage to achieve data reliability.
Our serverless design is cloud-native,  deployable to clouds today, and has a full pay-as-you-go cost model.
Our blueprint focuses on the semantics of services and abstracts away programming differences, helping
design cloud-agnostic and portable systems.

Furthermore, we provide a list of serverless requirements for complex applications such as ZooKeeper
(see the paper for details).
These future goals present features platforms must offer to support stateful and distributed applications efficiently.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/faaskeeper/main_logo.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/faaskeeper/main_logo.png' | relative_url }}" alt="" title="FaasKeeper model."/>
  </a>
</div>
<div class="caption">
  <b>FaasKeeper</b>: elastic and scalable ZooKeeper implementation.
</div>

We demonstrate the usability of our workflow on ZooKeeper and build FaasKeeper, a new FaaS application
built on top of serverless cloud services that provides the same wait-free consensus mechanism and interface
as ZooKeeper. The price model of our service is proportional to the system's activity, and users are
charged no costs when not using the system.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/faaskeeper/cost_model.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/faaskeeper/cost_model.png' | relative_url }}" alt="" title="FaasKeeper cost model."/>
  </a>
</div>
<div class="caption">
  <b>FaasKeeper cost model</b>: FaasKeeper offers lower usage costs for workloads with hundreds of thousands of daily requests.
</div>

In evaluation, we demonstrate that FaasKeeper can handle hundreds of thousands read and write
transactions every day before reaching the cost of a provisioned ZooKeeper instance.
While FaasKeeper cannot match the write performance of ZooKeeper due to inefficiencies of FaaS
platforms, it provides high read performance with flexible scalability.

More insights and results can be found in [the preprint of our paper](/publications#2022faaskeeper).
[The system implementation](https://github.com/spcl/faaskeeper)
and [client library](https://github.com/spcl/faaskeeper-python) are available on open-source license - try it today!
It supports AWS Lambda, and support for other cloud platforms is coming in the future.

