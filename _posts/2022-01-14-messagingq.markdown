---
layout: single
comments: true
title: Kafka
date: 2022-01-14 00:00:00-0000
description: Distributed Messaging Queue
categories: ['Distributed Systems Components']
---

Messaging queue manages the logs or messages published at a very large rate. 


---

## Publisher-Subscriber Model

**Publishers**: Publish message to a particular topic. Instead of sending it directly to the queue, they publish it to topic.

**Subscribers**: Consumers can consume message by subscribing to a topic. Many consumers can subscribe to the same topic. The message is sent to all the subscribers.

<div>
    <center>{% include figure.html path="assets/img/messagingq/messageQ.png" %}</center>
</div>

----

## Kafka
Kafka works on `publisher-subscriber` model. It takes in the messages sent by Producers and stores them reliably on a center cluster, and allows the messages to be received by the consumers.


<div>
    <center>{% include figure.html path="assets/img/messagingq/kafkaCluster.png" %}</center>
</div>

<br/>

* Kafka stores all the messages on disk in an append-only log.
* **Brokers**: Kafka servers are called brokers. They are responsible for receiving messages, storing on disk and sending the messages.
* **Record**: A record is a message that has: `key, value, timestamp, optional metadata headers`.
* **Topics**: Messages are divided into categories called as topics. Topics are unique for a cluster.
    * Every message that kafka receives is associated with a topic
    * consumers subscribe to a topic and are notified whenever a new message is received by kafka
    * Multiple consumers can subscribe to the same topic  
* The messages are not deleted as soon as they are consumed. Instead they are retained for some configurable amount of time.


<div>
    <center>{% include figure.html path="assets/img/messagingq/pubSub.png" %}</center>
</div>

* **Cluster**: Set of one or more servers, responsible for running a kafka broker
* **Zookeeper**: Configuration service that maintains metadata about kafka servers


---

Resources
1. [Kafka](https://www.youtube.com/watch?v=ElilYxUOjOQ&ab_channel=Devoxx)