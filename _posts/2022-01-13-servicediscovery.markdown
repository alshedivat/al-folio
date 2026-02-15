---
layout: single
comments: true
title: Service Discovery
date: 2022-01-13 00:00:00-0000
description: Identify which node to connect
categories: ['Distributed Systems Components']
---

When a client wants to make a request, it has to know which node it should connect to. As partitions are rebalanced, the assignment of partitions to node changes. This problem is called *service discovery*.


---
## Routing tier

Many applications have a routing tier, which receives requests from clients. This routing tier is partition aware and forwards the request to the appropriate node. The **`ZooKeeper`** configuration service can be used to track the nodes along with the keys they serve.

<div>
    <center>{% include figure.html path="assets/img/serviceDiscovery/configService.png" %}</center>
</div>



