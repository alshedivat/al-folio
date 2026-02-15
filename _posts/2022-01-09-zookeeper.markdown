---
layout: single
comments: true
title: Zookeeper
date: 2022-01-09 00:12:00-0400
description: Coordination Service
categories: ['Distributed Systems Components']
---

Zookeeper(ZK) is a coordination service. One of the basic form of coordianation is Configuration. ZK stores the configuration of a system and makes it highly available by replication.

<p>Coordination</p>

* Group Membership
* Leader election
* Dynamic Configuration
* Status Monitoring
* Queuing


<p>Overview</p>

* It does not implement lock like structures as  Chubby but uses *`wait free`* data objects organized heirarichally as in file system.
* It is suited for read heavy systems. Reads are quite fast but write take some time to persist.
* It ensures *`FIFO client ordering and Linearizable writes`* but *`reads are eventually consistant`*
* Under the hood ZK uses *`Zab (Zookeeper Atomic Broadcast)`* service
* Clients cache the current ZK leader, to prevent them probing ZK everytime
* Clients establish session when they connect to ZK service and obtain a session handle through which they issue requests

---
## Data Model

ZK stores data in file format called znodes. They are heirarchal namespaces (like file system). Each znode has data and children. There are two types of znodes:
1. **Ephemeral**: znode deleted when creater fails or explicitly deleted.

    A typical use case for ephemeral nodes is when using ZooKeeper for discovery of hosts in the distributed system. Each server can then publish its IP address in an ephemeral node, and should a server loose connectivity with ZooKeeper and fail to reconnect within the session timeout, then its information is deleted.

2. **Sequence**: append a monotonically increasing counter

<div>
    {% include figure.html path="assets/img/zk/zk_datamodel.png" %}
</div>


---

## Zookeeper APIs

<p> Create, delete, exists znode </p>

1. **create(path, data, flags)**: Creates a znode with path name *path* and stores the *data[]* in it, and returns the name of new znode.*flags* indicate the type of node: *regular, ephermeral, sequential* flag.
2. **delete(path, version)**: Delete the znode if it is at the expected version
3. **exists(path, watch)**: Returns true is path exists else returns false. It enables client to keep a watch


<p> get, set data znode </p>

1. **getData(path, watch)**: returns the data and meta-data, such as version info associated with znode. Enables watch if path exists.
2. **setData(path, data, version)**: writes data[] to path if the znode with version exists


<p>  others </p>

1. **getChildren(path, watch)**: returns the set of names of the children of a znode.
2. **syncpath(path)**: wait for all the updates pending at the start of the operation to propogate to the server that the client is connected to.

---

## Writes
 
All the writes go through the leader. Every data object has a version number. When a write is successfull, the version number is increamented by 1.

Let's write a program that increaments a counter in file whenever an incident occurs. The incident can occur at any client and should result in increament of counter.

```python
while true: 
    x,v = getData("file")
    if (setData("file", x+1, v)):
        break
}
```

Here **setData("file",x+1, v)** will only set *file* to *x+1* if the version number matches *v*.

----
## Locks

ZK can provide distributed locks. 
* The clients who want to aquire the lock attempt to create an ephemeral node, which gets deleted when the lock is released. 
* The client is successful in aquring the lock if it is able to create the node. 
* If the it fails, it means that some node has already created the node and acquired the lock. Then client then can put a watch on the node and wait for the notification of the node getting deleted. It can then retry again to acquire the lock.

```python
acquire():
    while true:
        if create("lf",  EPHEMERAL)
            success
        if exists("lf", watch = true)
            wait for notification
    
    release():
        delete("lf")
```

When a client releases the lock, every other client will try to aquire the lock. If there a lot of clients waiting for the lock, it will trigger a huge traffic of *create* requests. This is called *`Herd effect`*. The complexity becomes $$O(n^2)$$.

To overcome this problem, sequence in which clients requests can be used to grant the lock.

```python
While true:
    n = create(l + '/lock-', EPHEMERAL|SEQUENTIAL)
    C = getChildren(l, false)
    if n is lowest znode in C, exit
    p = znode in C ordered just before n
    if exists(p, true) wait for watch event
        goto 2

Unlock()
    delete(n)
```

----

## configuration

<div>
    {% include figure.html path="assets/img/zk/zk_config.png" %}
</div>

<br/>

* workers get configuration 
    * **getData("../config/settings", true)**
* Administrator changes setting
    * **setData("../config/settings", newConf, -1)**
* Workers notified of change and get new settings
    * **getData("../config/settings", true)**


---

## leader election

An easy way of doing leader election with ZooKeeper is to let every server publish its information in a zNode that is both **`sequential and ephemeral`**. Then, whichever server has the lowest sequential zNode is the leader. If the leader or any other server for that matter, goes offline, its session dies and its ephemeral node is removed, and all other servers can observe who is the new leader.


---


### Resources

1. [Benjamin Reed's Talk](https://www.youtube.com/watch?v=rXI9xiesUV8&ab_channel=CNSwebcast)
2. [MIT Notes]({{ site.baseurl }}/assets/img/zk/notes.txt) 
    * [MIT Discussion](http://dsrg.pdos.csail.mit.edu/2013/07/11/zookeeper/)
3. Apache Wiki: [Link 1](https://cwiki.apache.org/confluence/display/ZOOKEEPER/Index) [Link 2](https://zookeeper.apache.org/doc/r3.3.3/recipes.html) [Link 3](https://zookeeper.apache.org/doc/r3.1.2/zookeeperProgrammers.html)
4. [Elastic Search](https://www.elastic.co/blog/found-zookeeper-king-of-coordination)
5. [ZAB](https://distributedalgorithm.wordpress.com/tag/zookeeper/#:~:text=leader%20and%20followers%2D%20in%20ZooKeeper,between%20all%20followers%20and%20leader.)
6. [Zookeeper Paper]({{ site.baseurl }}/assets/img/zk/zookeeper.pdf)