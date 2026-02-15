---
layout: single
comments: true
title: Rate Limitter
date: 2021-03-01 08:12:00-0400
# description: Instance
categories: ['System Design']
---

Here we aim to restrict the API calls to a server within a specified limit.

---
### Requirements
#### Functional

1. Limit the number of requests to an API server within a time window. Ex: 100 requests/sec.
2. The rate limiter should be applied to all the instances of the API server in a distributed server. This means that an error should be thrown when the request threshold is crossed either on a single server or across a combination of servers.

#### Non-functional
1. Highly available
2. Scalable
3. Low Latency

---


#### Throttling Criteria
The important point to note here is that the throttling can be done at two levels:
1. *User*: 
    After authentication, the user can be assigned tokens. Based on the token, throttling can be performed. The problem with this approach is that throttling can only be performed after authentication. Any malicious actor can throttle the authentication system itself. 
2. *IP/ Geography*:
    Based on the source of the request throttling can be performed. The problem with this approach is that multiple users can be using the same gateway as in a big data center. This will cause an issue as for the rate limiter it will seem as if the requests are coming from a single source.

We can combine both approaches for the best performance.

----

### Approach

Let's assume we are designing a system to limit the requests to 5 **requests per second (RPS)**

#### 1. Fixed Window Counter

We maintain a fixed window and count the number of requests in that window. If the requests exceed the limit in that particular window, we drop that request. The count is reset after the window expires.

<div>
    {% include figure.html path="assets/img/FixedWindow.png" %}
</div>

The problem with this approach is that we are considering requests per window as independent from each other. There could be a case where the request is stacked near the end of the current window and the start of the next window. The algorithm will allow the request to be forwarded to the API server, but in reality, the server would be serving requests more than the limit.

To overcome the problem, we can have a rolling window.

#### 2. Sliding Window Counter

In the sliding window, the window is considered from the time of the request. We count the number of requests that are pending from the current request time.

---

### Algorithm

We maintain a hashtable or a Redis cache to store the user visits, where the `key: userId, value: List<timestamp>`.

1. Remove all the entries  `current timestamp - ListTimeStamp > 1` as they will not contribute to the requests for that window. 
2. Check the size of the remaining list. If the `ListSize >= limit` drop the request else process the request.

Lets assume that X is sending request at instances: `[ 03:00:00 AM [400], 03:01:05 AM [465], 03:01:20 AM [480], 03:01:45 AM[505] , 03:01:50 AM[520], 03:02:10 AM [530] ]`.
Let the limit be set as 3 requests per second.

1. **Request: [X] at 03:00:00** 
    * This is the first request. Insert it into the cache/table
    * **Cache: [x: {400}]**

2. **Request: [X] at 03:01:05**
    * Remove the existing entry in the timestamp list as the `currentTimestamp - ListTimeStamp > 1`. The existing entry was of `03:00:00` and the current request is at `03:01:05`. The 1 second window of first request has expired so its safe to remove the entry.
    *  <font color=green> List size for X is 0. Process the request.</font>
    * **Cache: [x: {465}]**

3. **Request: [X] at 03:01:20**
    *  <font color=green> List size for X is 1. Process the request.</font>
    * **Cache: [x: {465, 480}]**

4. **Request: [X] at 03:01:45**
    *  <font color=green> List size for X is 2. Process the request.</font>
    * **Cache: [x: {465, 480, 505}]**

5. **Request: [X] at 03:01:50**
    * List size for X is 3. `Size > Limit - 1`, <font color=red> Drop the request. </font>
    * **Cache: [x: {465, 480, 505}]**


4. **Request: [X] at 03:02:10**
    * Remove the existing entry in the timestamp list as the `currentTimestamp - ListTimeStamp > 1`. Remove the entry for `03:01:05 AM`
    * <font color=green> List size for X is 2. Process the request.</font>
    * **Cache: [x: {480, 505, 530}]**

---

### Sample C++ implementation

{% highlight c++%}

unordered_map<userId, std::dequeue<TimeStamp>> request_queue;

bool request(const std::string userId, TimeStamp request_time) {
    std::dequeue<TimeStamp> time_queue;
    
    // first request
    if (request_queue.find(userId) == request_queue.end()) {
        request_queue[userId] == time_queue.push(request_time);
        return true;
    }

    time_queue = request_queue[userId];
    while(!time_queue.empty() && request_time - time_queue.top() > 1) {
        time_queue.pop();
    } 

    if (request_queue.size() > LIMIT) {
        return false;
    }

    time_queue.push(request_time);
    return true;
}

{% endhighlight %}


---

### Distributed System

In a distributed environment this technique will suffer from a few issues:
1. If the request is fired by the user to two different servers at the same time, then there might be a chance of breaching the threshold.
    Ex: If the threshold is 3 and the user has already attempted 2 requests. Now suppose the user fires 2 requests to different servers. The Redis entry will still reflect as 2 attempts for both the servers and both the requests will go through. This will cross the threshold of the server as now the server has serviced 4 requests.


<div>
    {% include figure.html path="assets/img/RateLimitterDS.png" %}
</div>



We can shard based on the ‘UserID’ to distribute the user’s data. For fault tolerance and replication we should use Consistent Hashing. If we want to have different throttling limits for different APIs, we can choose to shard per user per API. Take the example of URL Shortener; we can have different rate limiters for createURL() and deleteURL() APIs for each user or IP.

If our APIs are partitioned, a practical consideration could be to have a separate (somewhat smaller) rate limiter for each API shard as well. Let’s take the example of our URL Shortener where we want to limit each user not to create more than 100 short URLs per hour. Assuming we are using Hash-Based Partitioning for our createURL() API, we can rate-limit each partition to allow a user to create not more than three short URLs per minute in addition to 100 short URLs per hour.

Our system can get huge benefits from caching recent active users. Application servers can quickly check if the cache has the desired record before hitting backend servers. Our rate limiter can significantly benefit from the Write-back cache by updating all counters and timestamps in cache only. The write to the permanent storage can be done at fixed intervals. This way we can ensure minimum latency is added to the user’s requests by the rate limiter. The reads can always hit the cache first; which will be extremely useful once the user has hit their maximum limit and the rate limiter will only be reading data without any updates.

Least Recently Used (LRU) can be a reasonable cache eviction policy for our system.


