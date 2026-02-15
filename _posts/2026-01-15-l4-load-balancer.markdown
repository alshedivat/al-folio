---
layout: single
comments: true
title: L4 Load Balancer
date: 2026-01-15 00:00:00-0000
description: This post explains L4 Load Balancer.
categories: ['Distributed Systems Components']
---

## Introduction

In modern distributed systems, scalability, high availability, and fault tolerance are critical. One of the key components that enables these properties is a load balancer.

A load balancer distributes incoming network traffic across multiple backend servers to ensure no single server becomes a bottleneck, while also maintaining availability if one or more servers fail.

Load balancers can operate at different layers of the OSI model:
- Layer 4 (Transport Layer): Balances traffic based on TCP/UDP connections.
- Layer 7 (Application Layer): Balances traffic based on HTTP/HTTPS content like URLs, headers, or cookies.


## What is an L4 Load Balancer?

An L4 Load Balancer operates at the Transport Layer of the OSI model. It makes routing decisions based on network information such as **IP addresses, TCP/UDP ports**, and protocols without inspecting the actual content of the packets.

Imagine you have a website hosted on multiple servers. When a user visits your site, the L4 load balancer decides which server should handle their request based on rules like round robin or least connections. It forwards the TCP or UDP packets to the chosen server transparently.

Because it works at a lower level than HTTP, L4 load balancers are generally faster and can handle any TCP/UDP-based protocol, not just HTTP.

## How L4 Load Balancers Work

L4 load balancers inspect packet headers to make decisions. Key components include:

- **Virtual IP (VIP):** The IP address clients connect to.
- **Backend Servers:** Real servers that handle the traffic.
- **Load Balancing Algorithm:** Method to choose which backend server to forward traffic to.
- **Connection Tracking:** Maintains state of active connections to ensure packets from the same connection go to the same backend.

### Packet Flow

1. Client sends a TCP/UDP packet to the VIP.
2. Load balancer intercepts the packet.
3. Based on the algorithm and connection state, it selects a backend server.
4. The packet is forwarded to the backend server, often with source IP translation (SNAT or DNAT).
5. Responses from backend servers are routed back to clients, either via the load balancer or directly (depending on the mode).

### Modes of Operation

- **NAT Mode:** Load balancer rewrites the destination IP to backend server IP (DNAT). Backend replies go back through the load balancer.
- **Direct Server Return (DSR):** Load balancer forwards packets to backend but replies go directly to clients.
- **IP Tunneling:** Uses encapsulation to send packets to backend servers.

## Load Balancing Algorithms

| Algorithm           | Description                                                                 | Pros                      | Cons                        |
|---------------------|-----------------------------------------------------------------------------|---------------------------|-----------------------------|
| Round Robin         | Distributes requests sequentially among servers                             | Simple, fair distribution  | Doesn't consider load        |
| Least Connections   | Sends traffic to the server with the fewest active connections              | Balances load better       | Requires connection tracking |
| Source IP Hashing   | Hashes client IP to select backend, ensuring session stickiness             | Session persistence        | Uneven load distribution     |
| Weighted Round Robin| Servers have weights; more powerful servers get more requests               | Customizable distribution  | Slightly more complex        |
| Random              | Randomly picks a backend server                                             | Simple                    | Can be uneven                |

## ASCII Diagram: L4 Load Balancer Architecture

```
      +-------------------+
      |     Clients       |
      +---------+---------+
                |
                | TCP/UDP requests to VIP
                v
      +-------------------+
      |  L4 Load Balancer  |
      +---------+---------+
                |
    +-----------+-----------+
    |           |           |
+---v---+   +---v---+   +---v---+
|Server1|   |Server2|   |Server3|
+-------+   +-------+   +-------+
```

## Use Cases for L4 Load Balancers

- **TCP Load Balancing:** Databases, SMTP, FTP, and other TCP services.
- **High-Performance Scenarios:** When low latency and high throughput are critical.
- **Protocol Agnostic:** Works with any TCP/UDP protocol without needing to understand application data.
- **SSL Termination at Backend:** When SSL is terminated at backend servers rather than the load balancer.
- **Simple Session Persistence:** Using source IP hashing for sticky sessions.


### Connection Tracking and Persistence

To maintain session persistence, L4 load balancers track active connections and ensure packets from the same connection always go to the same backend server.

### Health Checks

Regularly probing backend servers to ensure they are alive and responsive. Failed servers are temporarily removed from the pool.

### Scalability and High Availability

- **Horizontal Scaling:** Multiple load balancers behind a virtual IP using techniques like anycast or VRRP.
- **State Synchronization:** Sharing connection state across load balancers for failover.

### Security Considerations

- Protect against SYN floods and DDoS attacks.
- Use firewall rules and rate limiting.
- Employ TLS offloading if needed.

## Performance Considerations

- **Throughput:** L4 load balancers can handle millions of connections per second with proper hardware.
- **Latency:** Minimal added latency since no application-level inspection.
- **Resource Usage:** Lower CPU and memory usage compared to L7 load balancers.
- **Scaling:** Use multiple load balancers and distribute VIPs for fault tolerance and capacity.

## Summary

Layer 4 load balancers are essential components in distributed systems for efficiently distributing TCP/UDP traffic. They offer high performance and protocol agnosticism by operating at the transport layer, making them suitable for a wide range of applications beyond HTTP.

Understanding their architecture, algorithms, and deployment modes helps in designing scalable, reliable, and secure systems.


## WebSocket and L4 Load Balancers

WebSocket connections start as HTTP but then upgrade to a persistent TCP connection. L4 load balancers can handle WebSocket traffic transparently because they operate at the TCP layer. However, they cannot inspect or route based on WebSocket message content. For advanced routing based on WebSocket frames, an L7 load balancer is required.

## Sticky Sessions in L4 Load Balancers

Sticky sessions, also known as session persistence, refer to the practice of directing all requests from a particular client to the same backend server throughout the duration of a session. This is crucial for applications that maintain state information locally on a backend server, such as shopping carts or user authentication sessions.

At Layer 4, sticky sessions are typically implemented using connection tracking or source IP hashing:

- **Connection Tracking:** The load balancer keeps a mapping of active connections and ensures subsequent packets of the same connection are routed to the same backend server. This approach maintains session consistency but requires the load balancer to maintain state information and can be resource-intensive.

- **Source IP Hashing:** The load balancer applies a hash function to the client's IP address to consistently select the same backend server for that client. This method is stateless and scalable but can be less reliable in environments with Network Address Translation (NAT), where multiple clients may share the same public IP.


### Example: Hash-Based Sticky Session Selection

```typescript
function selectBackendServer(clientIp: string, backendServers: string[]): string {
  // Simple hash function to convert IP string to a number
  function hashIp(ip: string): number {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
  }
  const hash = hashIp(clientIp);
  const index = hash % backendServers.length;
  return backendServers[index];
}
// Example usage
const backends = ['10.0.0.1', '10.0.0.2', '10.0.0.3'];
const clientIp = '192.168.1.100';
const selectedServer = selectBackendServer(clientIp, backends);
console.log(`Client ${clientIp} is routed to backend ${selectedServer}`);
```

## References

- [NGINX Load Balancing Guide](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
- [HAProxy Documentation](https://www.haproxy.org/)
- [Linux Netfilter and iptables](https://www.netfilter.org/)
- [The TCP/IP Guide](http://www.tcpipguide.com/)
- [High Performance Browser Networking](https://hpbn.co/)
- [Wikipedia: Load Balancing (Computing)](https://en.wikipedia.org/wiki/Load_balancing_(computing))
