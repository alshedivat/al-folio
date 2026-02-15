---
layout: single
comments: true
title: Cassandra
date: 2022-01-16 00:00:00-0000
description: Key/Value Store
categories: ['Distributed Systems Components']
---

Cassandra is a key/value store database. It provides `Availablity` and `Partial Fault Tolerance` from the CAP. Cassandra combines the `BigTable` data model and `Dynamo` system architecture.

* The database is `NoSQL, wide-column, key-value` like BigTable. 
* It's `key/value store, highly available like Dynamo.

---

## Fully replicated

Cassandra is a fully replicated, highly available, partial fault tolerance database. The data from each node is replicated to other nodes. The number of nodes to which data is replicated is called the `replication factor`. Generally, the replication factor is 3.

When a client sends a `put(K,V)` operation
* the data is replicated in the local data center as well as the other data center. The data is replicated on nodes in both the data center.
* replication factor can also be set per data centers

<div>
    <center>{% include figure.html path="assets/img/cassandra/server.png" %}</center>
</div>


----

### Write

* Client sends `put(K,V)` to the node.
* The request is written into `commit log` for crash recovery
* The values are inserted in the in-memory `memtable`
* Memtables are periodically flushed to the file system in the form of `SSTables`

<div>
    {% include figure.html path="assets/img/bigTable/BigTableWrite.png" %}
</div>

---

## Write with Partitioning

* For writes, it is necessary that a single node in the cluster is not overwhelmed with write requests, while other nodes are idle.
* `Cassandra maintains a primary key for the table`. This primary key determines to which node the write request will be sent.
* Each node is assigned a range, for which it stores the data. This node is called `primary`. The primary is also responsible for replicating the data to other nodes as per the replication factor.
* For consistency and load distribution, the primary key is hashed either using MD5 or murmur3 hash. 
* The hashed key is then used with `consistent hashing` to determine the node.
* `The data is first sent to the primary node and then replicated to other nodes` as per the replication factor.

<br/>
<div>
    {% include figure.html path="assets/img/cassandra/table.png" %}
</div>
<br/>


<br/>
<div>
    {% include figure.html path="assets/img/cassandra/hashed_pk.png" %}
</div>
<br/>

<br/>
<div>
    {% include figure.html path="assets/img/cassandra/token_ring.png" %}
</div>
<br/>


---

## Read 

* `Client can connect to any node in the cluster`
* `All nodes are aware of each other in the cluster`
* `All nodes know which node is responsible for the key range along with its replica`
* If the client connects to a node that is neither primary nor the replica of primary, the node forwards the read request based on the hashed key to the responsible primary node and its replica

<br/>
<div>
    {% include figure.html path="assets/img/cassandra/read.png" %}
</div>
<br/>

* Node 4 receives the client request for a read
* If node 4 is not responsible for the key range, it is aware that the requested key has primary as node 1
* request is forwarded to node 1 along with the replicas responsible for the key
* node 4 waits for the quorum 
* once the quorum is received, it forwards data to the client

---

### Consistency Level

For every read request, read repair is performed. It can be done across data centers as well

* **ONE** : 
    * the data is returned to client from a single node.  
    * very fast but high probability of stale data
* **QUORUM**:  
    * \> 51% replicas ack
    * high consistency as there is atleast one single node that has seen the latest write
* **LOCAL QUORUM**:  
    * \> 51% replicas ack in local Data Center
* **LOCAL_ONE**:  
    * \> read repair only in local Data Center
* **ALL**:
    * Ack from all nodes

---

**`Cassandra`** combines the Hash and key range. It has a **` compound primary key`**, consisting of several columns. The first part is used as input to the hash function, the other part of the key is used to sort the data in the partition.


## Resources

1. [Talk by Patrick McFadin](https://www.youtube.com/watch?v=B_HTdrTgGNs&ab_channel=CernerEng)