---
layout: post
title: "Everything is Inter-Process Communication: HTTP, REST APIs, Serverless functions, what not"
date: 2026-03-20 10:00:00
description: "Modern software is rarely a single process doing one thing. Browsers isolate tabs for security. Databases split query workers from storage workers. API backends offload CPU-heavy jobs to background processes. The moment you divide work across processes, you need them to talk to each other."
tags: operating-system processes system-internals
categories: system-internals
mermaid:
  enabled: true
  zoomable: true
---

Repository for this article: [benchmarkIPC](https://github.com/karankessy/benchmarkIPC).

> Disclaimer: the visualizer below is a client-side-only teaching aid. It does not run real IPC, syscalls, or kernel code. The behavior is mimicked entirely in JavaScript so the flow is easy to follow.

### Client-Side Visualizer

<iframe
  src="/assets/html/ipc_visualizer.html"
  title="IPC visualizer demo"
  loading="lazy"
  style="width: 100%; height: 760px; border: 1px solid var(--global-divider-color, #ded6c8); border-radius: 12px;"
></iframe>

If the embedded demo does not load in your browser, open the standalone version at [/assets/html/ipc_visualizer.html](/assets/html/ipc_visualizer.html).

Modern software looks intimidating from the outside. You hear terms like HTTP requests, REST APIs, microservices, containers, and serverless functions, and it can feel like there is an endless number of concepts to understand. But once you start pulling at the threads, something interesting happens. The complexity begins to collapse into one surprisingly simple idea.

Processes talking to each other.

That is really what is happening underneath all of it. When you type a URL into your browser and hit enter, your browser does not do everything by itself. The networking stack, the kernel, and the renderer are all separate processes, and they are constantly passing messages and data between themselves just to get that page on your screen. What looks like one action from the outside is actually a quiet conversation happening beneath the surface.

The same is true on the backend. When a server handles an API call, it is not one monolithic thing doing all the work. The web server talks to worker processes. Those worker processes talk to database drivers. The database drivers talk to storage engines. They exchange data through pipes, sockets, shared memory, or queues managed by the kernel. Each one hands off responsibility to the next, like a relay race running faster than you can see.

Even HTTP, which most people think of as network communication, is often just data traveling through a socket between two processes sitting on the same machine. The "network" label makes it sound distant, but physically, nothing left the box.

IPC, inter-process communication, is not an obscure topic buried in operating systems textbooks. It is the quiet foundation that everything else rests on. Learn it, and the rest of the stack starts to make a lot more sense.

## 1. Why IPC Exists

Modern software is rarely a single process doing one thing.

Browsers isolate tabs for security. Databases split query workers from storage workers. API backends offload CPU-heavy jobs to background processes. The moment you divide work across processes, you need them to talk to each other.

That's the problem IPC solves.

The OS deliberately isolates processes. Each one gets a private virtual address space. Process A cannot read or write Process B's memory, the MMU and kernel enforce this boundary hard. Without it, one crash could corrupt the entire machine state.

But isolation creates friction. Two isolated programs cannot simply exchange a pointer and say "read from here." So IPC mechanisms become the bridge between isolation and collaboration.

This document uses a real project as a systems microscope: four IPC mechanisms implemented in C, benchmarked head-to-head, and orchestrated through a Node.js layer. The four mechanisms are:

- POSIX shared memory
- Pipes
- Unix domain sockets
- TCP sockets

The central question: if kernel mediation is safer and simpler, when is the overhead worth paying, and when should you bypass it entirely?

---

## 2. How Process Isolation Works

### Processes vs Threads

A **process** is a running program with:

- Its own virtual address space
- Its own file descriptor table
- Its own scheduling and accounting state in the kernel

A **thread** is an execution stream inside a process. Threads share the process's memory. Each thread has its own registers and stack. The scheduler treats threads and processes as the basic runnable units.

The key fact: process memory is private by default.

### Virtual Address Spaces and the MMU

A process sees virtual addresses, not physical RAM addresses. The **MMU (Memory Management Unit)** translates virtual addresses to physical addresses using page tables managed by the kernel.

Why this matters for IPC: Process A and Process B may both have valid memory at virtual address `0x1000`. Those addresses can map to completely different physical pages. Pointers are process-local. They mean nothing outside their own address space.

So any data exchange requires either:

- A shared mapping to the same physical pages (shared memory), or
- Kernel-mediated data transfer (pipe, socket, TCP)

### Why "Just Share Memory" Is Non-Trivial

Even if you map the same physical page into two processes, correctness is not automatic:

- Writer and reader may race
- CPU caches may delay visibility without proper ordering
- Struct layout mismatches can silently corrupt interpretation

IPC is both an OS topic and a concurrency topic. You can't fully separate them.

---

## 3. Foundations: Syscalls, Memory, and Kernel Mediation

### User Space vs Kernel Space

CPUs enforce privilege levels. User code runs unprivileged (ring 3 on x86, EL0 on ARM). Kernel code runs privileged (ring 0, EL1). User programs cannot directly reprogram page tables, manage hardware interrupts, or manipulate scheduler queues.

A **system call** is a controlled privilege transition. It's how user programs request kernel operations safely.

Call chain for something like `send()`:

1. Application calls libc wrapper
2. libc places syscall number and args in registers
3. CPU executes trap instruction (`syscall`, `svc`, etc.)
4. Kernel validates pointers/permissions, runs syscall handler
5. Kernel returns to user mode with result or `errno`

A mode transition is not free. It may flush pipeline stages, perturb branch prediction, and force synchronization between user and kernel control flow.

### File Descriptor Model

A **file descriptor (FD)** is a per-process integer that indexes that process's descriptor table. Pipes, sockets, regular files, shared memory objects opened via `shm_open()` — all exposed through FDs.

This "everything is a handle" model is why the API feels unified:

```c
read(fd, ...)
write(fd, ...)
close(fd)
```

Different FD types route to different kernel object implementations underneath.

### Context Switch

A **context switch** happens when the scheduler stops one execution context and resumes another. The kernel saves CPU state, program counter, stack pointer, general registers, SIMD state,switches memory mappings, and resumes another thread or process.

Why it's expensive:

- CPU caches and TLB entries become less useful for the next task
- Scheduler bookkeeping and run-queue operations add overhead
- Frequent switches inflate IPC latency for small messages

IPC paths that block and wake frequently will accumulate this cost at high message rates.

### Virtual Memory Internals: Page Tables and TLB

Memory is divided into **pages** (usually 4 KiB). A process's **page tables** map virtual page numbers to physical frames with permissions (read/write/execute, user/kernel).

The **TLB (Translation Lookaside Buffer)** caches recent virtual-to-physical translations. TLB hits are fast. Misses require a page table walk, which costs cycles and memory bandwidth.

How two processes share one physical page:

1. Kernel allocates or references a physical frame
2. Kernel installs page table entries in both processes pointing to the same physical frame (at different virtual addresses)
3. CPU cache coherence ensures writes by one core become visible to readers on other cores,subject to synchronization rules

### Synchronization and Memory Ordering

**Semaphore**: Kernel-supported counter. `sem_wait()` decrements or blocks; `sem_post()` increments and may wake waiters.

**Spin lock**: Busy-wait loop that polls a flag. Avoids sleep/wakeup latency but burns CPU.

**Atomic operation**: Indivisible read-modify-write or load/store with ordering guarantees.

**Acquire/Release ordering**: A release store publishes prior writes. An acquire load that observes that store guarantees subsequent reads see published data. Weaker than full sequential consistency, but sufficient for single-producer/single-consumer handoff, and cheaper.

**Cache line**: Coherence unit, commonly 64 bytes on modern CPUs.

**False sharing**: Two unrelated variables land on the same cache line. One core modifying its variable invalidates the other core's cached copy of an unrelated variable. Cross-core invalidations hurt performance badly even with no logical conflict.

---

## 4. The Two Fundamental Models

There are exactly two strategies for IPC:

**Shared memory**: The kernel maps the same physical page into both processes' virtual address spaces. After the initial `shm_open` + `mmap` setup, reads and writes go directly to RAM,load and store instructions with no syscall involvement. The processes must synchronize access themselves.

**Message passing**: The kernel copies data between address spaces. One process writes into a kernel buffer; the other reads it out. Every message involves at least two context switches and two memory copies. The kernel handles synchronization implicitly, a blocking `read`/`recv` sleeps until data is available.

The trade-off in one table:

| Dimension          | Shared Memory                    | Message Passing                 |
| ------------------ | -------------------------------- | ------------------------------- |
| Kernel per message | No (after setup)                 | Yes (every message)             |
| Copies per message | 0 (writer stores → reader loads) | 2 (user→kernel→user)            |
| Context switches   | 0                                | 2 per message                   |
| Synchronization    | Manual (your problem)            | Implicit (kernel blocks reader) |
| Cross-host         | Never                            | Yes (TCP sockets)               |
| Complexity         | High                             | Low-to-moderate                 |

Shared memory is faster because it's just reading and writing RAM after setup. No system calls. No copying. Direct memory access.

But you pay for that speed with complexity. Synchronization is your problem. Data layout is your problem. Cache coherence is your problem.

Message passing is slower because the kernel sits in the middle of every transfer. But the kernel solves coordination for you, and serialization handles layout differences and version mismatches.

---

## 5. Shared Memory: Fast and Unforgiving

### How It Works

```
+-------------+        +-------------+
| Process A   |        | Process B   |
|-------------|        |-------------|
| Virtual Mem |        | Virtual Mem |
|   0x5000    |        |   0x8000    |
|      |      |        |      |      |
|      v      |        |      v      |
| Shared Page +--------+ Shared Page |
+-------------+        +-------------+
            |
            v
    Physical Memory
    (Single Page)
```

Process A sees the shared region at `0x5000`. Process B sees it at `0x8000`. Different virtual addresses. Same physical bytes.

After `mmap`, every read and write is just a CPU load or store instruction. No syscall. No kernel involvement.

### Syscall Sequence

```c
Writer:                           Reader:
  shm_open(O_CREAT|O_RDWR)         shm_open(O_RDWR)
  ftruncate(sizeof(SharedRegion))
  mmap(MAP_SHARED)                  mmap(MAP_SHARED)
  sem_open(O_CREAT) × 2             sem_open() × 2
  close(shm_fd)                     close(shm_fd)
  ──── setup complete ────           ──── setup complete ────
  sem_wait(sem_reader)               sem_wait(sem_writer)
  memcpy to region->msg              memcpy from region->msg
  sem_post(sem_writer)               sem_post(sem_reader)
  ... repeat ...                     ... until msg.done == 1 ...
```

`shm_open()` creates or finds the object in kernel namespace. `ftruncate()` sets its byte size,skip this and your mapping is zero-length. `mmap(MAP_SHARED)` installs the virtual mapping. First access triggers a page fault; kernel materializes the physical frame, updates the PTE, and resumes the faulting instruction.

`shm_unlink()` and `sem_unlink()` must be called at startup to clear stale state from previous crashed runs. POSIX shared memory and named semaphores persist beyond process lifetime until explicitly deleted. This will catch you eventually.

Zero-copy nuance: it's zero-copy with respect to kernel-mediated transfer. The CPU still moves bytes through caches when you `memcpy` or do load/store instructions. That's not the same as free.

### Cache-Line-Aware Data Layout

```c
struct SharedMessage {
    int      sequence;    // 4 bytes
    int      type;        // 4 bytes
    double   value;       // 8 bytes
    char     text[40];    // 40 bytes
    int      done;        // 4 bytes (termination flag)
    char     _pad[4];     // padding → total: 64 bytes
};
```

The struct is padded to exactly 64 bytes, a typical CPU cache line. This is deliberate. If the struct straddled two cache lines, every access would require fetching both. Worse: on multi-core systems, two unrelated variables on the same cache line cause false sharing. Cores keep invalidating each other's cached copies on every write, even when they're writing to different fields. You'll see this in a profiler as inexplicable slowdown in code that looks correct.

### The Data Layout Problem

Both processes are staring at raw bytes. If they don't agree on what those bytes mean, nothing works and nothing crashes.

Say the writer compiles with one alignment setting and the reader compiles with another. The writer expects `double value` at offset 8; the reader expects it at offset 12. The read succeeds. The value is garbage. No error. No exception. Just wrong data flowing silently through your system.

Endianness compounds this. x86 stores `0x12345678` as `78 56 34 12`. A big-endian ARM stores it as `12 34 56 78`. Share memory between them and every multi-byte value is scrambled.

Worst case: writer updates the struct definition, reader doesn't get recompiled. They're reading different data structures from the same memory. That bug won't announce itself immediately. It will corrupt something downstream, and you'll spend days blaming the wrong component.

This is why shared memory almost always requires both processes to be compiled from the same source, with the same compiler, on the same architecture.

### Synchronization

No kernel in the middle means no coordination either.

If A writes while B reads, you get a race condition. B might see half-old, half-new data,not the old state, not the new state, something in between that makes no logical sense. Imagine A writes half a value and B reads in between. That bug won't crash immediately. It'll corrupt something silently. You'll find it three weeks later, in a component that had nothing to do with the original write.

The two-semaphore handshake solves this:

```c
Writer                           Reader
───────                          ──────
sem_wait(sem_reader)   ←──────┐
write data to region          │
sem_post(sem_writer)   ──┐    │
                         │    │   sem_wait(sem_writer) ←──┐
                         └────┼─→ read data from region   │
                              │   sem_post(sem_reader) ───┘
                              └─→ (writer unblocks)
```

`sem_reader` starts at 1 (slot is free). `sem_writer` starts at 0 (no data ready). One message in flight at a time. Clean. Correct.

But correct and fast are different things. Each `sem_wait`/`sem_post` is a syscall. At 100K messages, that's 200K syscalls, precisely the overhead shared memory is supposed to avoid. Semaphores are the right tool for teaching demos and coarse-grained coordination. For high-frequency hot paths, you need something else.

Even proper mutex implementations have edges. On multi-core systems, A might write to shared memory and that write sits in A's CPU cache. B reads and gets the old value from its own cache. The mutex didn't help. You also need **memory barriers** — instructions that force CPUs to flush and reload from main memory. This is why mutex and atomic implementations use special instructions that include implicit barriers.

And this is how tech giants utilize this IPC mechanism for optimization & efficiency.

Case 1: PostgreSQL

### PostgreSQL — The Shared Buffer Pool

Every backend process in Postgres (one per client connection) reads and writes through a single shared memory region called `shared_buffers`. Instead of each process hitting disk independently, they all access the same in-memory page cache. The kernel requirement is explicit: Postgres requires OS-level shared memory and semaphores to function at all.

The sizing decision matters more than most config tuning. A reasonable starting value is 25% of system memory — allocating more than 40% is unlikely to help because PostgreSQL also relies on the OS page cache as a second layer underneath.

- 📖 [PostgreSQL Docs: Managing Kernel Resources](https://www.postgresql.org/docs/current/kernel-resources.html) — why Postgres needs OS-level IPC to function at all.

Case 2: Nginx

### NGINX — Shared Cache Between Workers

NGINX workers are separate OS processes, not threads. Each runs its own event loop. For state that must be visible across all workers — cache metadata, rate-limit counters, session data — shared memory is the deliberate exception carved out for cross-worker coordination. Workers are otherwise fully isolated and do not share memory by default.

- 📖 [Inside NGINX: How We Designed for Performance & Scale](https://blog.nginx.org/blog/inside-nginx-how-we-designed-for-performance-scale) — NGINX's own engineering post on the event-loop worker model.

--

## 6. Message Passing: Slower, But the Kernel Does the Hard Part

### The Data Path

```c
Process A
   |
   | send()
   v
+-------------------+
|   Kernel Space    |
|   IPC Buffer      |
+-------------------+
   |
   | receive()
   v
Process B
```

What actually happens for each message:

1. A calls `send()` with a buffer
2. System call traps into kernel mode
3. Kernel validates user pointer, copies data from A's address space to kernel space
4. B calls `receive()`
5. Another system call
6. Kernel copies data from kernel space to B's buffer
7. B resumes with the message

Two copies. Two context switches. Every single message.

It's slower than shared memory. That's just true.

But the kernel now coordinates everything. If B calls `receive()` before a message arrives, it sleeps. When a message comes in, the kernel wakes it up. No mutex. No polling loop. No race condition hiding in your timing assumptions.

And when data crosses the kernel boundary, you can serialize it. Convert your struct to JSON, Protobuf, or whatever format both sides understand. The receiver deserializes into its own layout. Endianness gets handled. Struct version mismatches can be detected. The layout problem that makes shared memory fragile mostly disappears.

### Blocking vs Non-Blocking

**Blocking** `receive()` puts the process to sleep until a message arrives. Simple, but watch for deadlocks. If A waits for B and B waits for A, neither wakes up ever.

**Non-blocking** `receive()` returns immediately with an error if nothing's available. The process can do other work and check again. More complexity in your code, but no blocking hazards.

Some kernels support **zero-copy**: instead of copying the message twice, the kernel temporarily maps the sender's buffer into the receiver's address space. The data never moves. This only works on the same host and not all IPC mechanisms support it, but it narrows the performance gap with shared memory.

### Pipes

A kernel-managed byte stream between file descriptors.

```c
pipe(pipefd) → fork() →
  Parent: close(pipefd[0]), write(pipefd[1], &msg, sizeof(msg))
  Child:  close(pipefd[1]), read(pipefd[0], &buf, sizeof(buf))
```

`pipe()` allocates a kernel pipe object with a circular buffer plus read/write file descriptors. `write()` copies user bytes into the pipe's kernel buffer. `read()` copies from the kernel buffer to user memory. Blocked readers wake when new data arrives; blocked writers wake when space frees. EOF signals when all writers close and the buffer drains.

Pipes are **anonymous** (created via `pipe()`, usually inherited across `fork()`) or **named** (filesystem node via `mkfifo`, visible to unrelated processes). Unidirectional. Simple. Limited.

Raw struct transfer works here because both sides are typically the same binary,same compiler, same struct layout, no serialization needed. If the struct changes, both sides must be recompiled together.

Case 1: Unix

### Unix Shell Pipelines — The Original Use Case

Every time you run `cat access.log | grep ERROR | wc -l`, you're creating two anonymous pipes in the kernel. The shell connects stdout of one process directly to stdin of the next through kernel-managed byte stream buffers. No intermediate files. No disk.

The design insight was that processes don't need to know they're using pipes. Standard input and output get redirected at the file descriptor level. Programs written for files work through pipes unchanged. Douglas McIlroy championed the concept at Bell Labs; Ken Thompson implemented it in one evening in 1973 by modifying both the kernel and the shell.

- 📖 [Pipeline (Unix) — Wikipedia](<https://en.wikipedia.org/wiki/Pipeline_(Unix)>) — full history of the pipe operator and how the kernel implements it.
- 📖 [How Unix Pipes Are Implemented](https://toroid.org/unix-pipe-implementation) — traces the `pipe()` syscall through modern Linux kernel source.

---

Case 2: Chrome

### Google Chrome — Browser ↔ Renderer IPC

Chrome runs each renderer in a sandboxed process isolated from the browser process and from other tabs. The browser and renderers communicate using Mojo (or Chromium's legacy IPC system) over an asynchronous named pipe created per renderer process.

The isolation is the point. If a renderer crashes, the browser process keeps running. The pipe is the boundary that makes crash containment real — not just an architectural diagram.

- 📖 [Inside Chromium: Multi-Process Architecture](https://www.chromium.org/developers/design-documents/multi-process-architecture/) — Chromium's own design documentation on process isolation and IPC.
- 📖 [Inside a Modern Browser — Chrome Dev Blog](https://developer.chrome.com/blog/inside-browser-part1) — accessible walkthrough of the multi-process model and why IPC is necessary for it.

---

### Unix Domain Sockets

Like pipes but richer: full-duplex, connection-oriented, works between unrelated processes.

```c
Server: socket(AF_UNIX, SOCK_STREAM) → bind("/tmp/ipc.sock")
        → listen() → accept() → send()/recv()
Client: socket(AF_UNIX, SOCK_STREAM) → connect("/tmp/ipc.sock")
        → recv()/send()
```

`socket()` allocates an endpoint. `bind(path)` inserts it in the filesystem namespace. `listen()` marks the socket passive with an accept queue. `accept()` dequeues a pending connection and returns a connected FD. `send()`/`recv()` copy through kernel socket buffers.

Faster than TCP on the same host because it skips IP routing and most network-layer machinery while keeping full socket semantics. Supports optional metadata capabilities like credential passing and fd passing (`SCM_RIGHTS`).

Unix socket files persist on the filesystem after a crash. If the server dies without `unlink()`, the next run fails on `bind()`. Both sides should unlink the path at startup before binding.

Case 1: Redis

### Redis — Dropping TCP Overhead for Local Connections

When Redis and the application run on the same machine, every TCP connection still goes through the full protocol stack: sequence numbers, checksums, flow control, all of it. Switching to a Unix domain socket skips that entirely. Benchmarks consistently show a 15–25% reduction in latency compared to TCP loopback, and roughly 40% higher throughput on simple GET/SET operations.

The rule is simple: if both sides are on the same box, use Unix socket. The moment one side moves to a different host, TCP is the only option.

- 📖 [Unix Sockets — 12 Days of Performance (REVSYS)](https://www.revsys.com/12days/unix-sockets/) — clean benchmark comparison with production context.
- 📖 [Redis Benchmark Documentation](https://redis.io/docs/management/optimization/benchmarks/) — Redis's own numbers on socket vs TCP performance.

---

Case 2: Nginx

### NGINX — Talking to PHP-FPM

In a typical PHP stack, NGINX receives HTTP requests and proxies them to PHP-FPM workers. When both run on the same server, this connection is commonly a Unix domain socket rather than `127.0.0.1:9000`. IP routing, checksum computation, and TCP state tracking are all skipped.

The performance difference is measurable and the configuration change is one line. It's one of the cheapest wins in a standard web stack.

- 📖 [NGINX Core Module Documentation](http://nginx.org/en/docs/ngx_core_module.html) — covers Unix socket configuration and inter-worker locking mechanisms.

### TCP Sockets

Same socket API but routable across hosts.

```c
Server: socket(AF_INET) → bind(IP:port) → listen() → accept() → send()/recv()
Client: socket(AF_INET) → connect(IP:port) → send()/recv()
```

TCP adds overhead that doesn't exist in Unix sockets:

- **Segmentation**: byte stream split into segments
- **Sequence numbers**: byte-order tracking and loss recovery
- **Checksums**: integrity verification
- **Flow control**: receiver-advertised window limits in-flight bytes
- **Congestion control**: sender rate adaptation

On localhost, packets bypass physical NIC hardware. But the TCP state machine, buffering, segmentation, ACK handling, and checksum logic still execute in full. This is exactly why TCP is reliable and network-capable, and exactly why it's slower than shared memory for tiny local messages.

`SO_REUSEADDR` is necessary on the server to allow restart during TCP's `TIME_WAIT` state, avoiding `EADDRINUSE` when the previous instance just closed. Use `port 0` to let the OS assign an available ephemeral port and avoid collisions entirely.

TCP is a byte stream, not a message stream. Two `send()` calls may arrive as a single `recv()`. Use delimited protocols,newline-delimited JSON works well,to recover message boundaries. Fixed-size messages with known lengths also work if you don't need schema evolution.

Case 1: Microservices

### Every Microservice Architecture — The Forced Choice

The entire move to microservices is a forced adoption of TCP-based message passing. Services must be deployable independently, scalable independently, and movable between hosts. TCP is the only IPC mechanism that crosses host boundaries. Whether it's gRPC, HTTP/2, REST, or a message queue, the transport underneath is TCP.

The overhead is real. TCP adds protocol cost that shared memory and Unix sockets don't. But independent deployment across machines leaves no alternative.

- 📖 [The Sad State of Linux Socket Balancing — Cloudflare](https://blog.cloudflare.com/the-sad-state-of-linux-socket-balancing/) — a production war story about TCP socket architecture at scale, covering `SO_REUSEPORT`, NGINX worker balancing, and kernel-level accept queue behavior.

---

## 7. Full Data Path: Application to Hardware

### Message-Passing Path (send/recv)

```
Application code builds payload
  → libc wrapper marshals syscall
  → CPU trap to kernel mode
  → Kernel validates user pointer, copies payload to kernel buffer
  → Socket/pipe subsystem queues data
  → Scheduler wakes receiver (or network softirq for TCP)
  → Transport/network layers process protocol state (TCP)
  → Memory subsystem and caches move data; coherence maintains visibility
  → Receiver syscall copies kernel buffer to user buffer
  → Return to user mode; application resumes
```

### Shared Memory Hot Path

```
One-time setup: shm_open + mmap (syscalls, happens once)
  → Per-message: writer stores payload
  → Release-store to atomic flag (ready = 1)
  → Reader acquire-loads flag
  → Reader loads payload directly
  → No per-message copy through kernel buffers
```

The difference is stark. Message passing pays kernel transition cost on every single transfer. Shared memory pays it once at setup, then runs entirely in user space.

---

## 8. Benchmark: Quantifying the Trade-Off

### Methodology

100,000 messages × 64 bytes each, through all four mechanisms, parent/child process pair, timing via `CLOCK_MONOTONIC` with nanosecond precision. Each mechanism gets forked independently; parent measures wall time from first write to `wait(NULL)` return.

### Expected Results

```c
Shared Memory:   ~7.6M msgs/sec   (baseline)
Pipe:            ~1.7M msgs/sec   (~4.5x slower)
Unix Socket:     ~1.3M msgs/sec   (~5.8x slower)
TCP (localhost): ~1.1M msgs/sec   (~6.6x slower)
```

### Why Semaphore-Based Shared Memory Initially Lost

The first benchmark version used POSIX semaphores for shared memory coordination. Shared memory came out slower than pipes.

The root cause: `sem_wait()` and `sem_post()` are syscalls. At 100K messages, semaphore-based shared memory adds 200K kernel transitions,precisely the overhead shared memory is supposed to eliminate. Synchronization overhead consumed the transport advantage entirely.

This is the most important lesson in the benchmark. The mechanism you choose for synchronization can completely negate the mechanism you choose for transport.

### Why Spin + Atomics Won

Replacing semaphores with an atomic spin lock removed all syscalls from the hot path:

```c
struct SpinSlot {
    volatile int ready;     // 0 = writer can write, 1 = reader can read
    char _pad1[60];         // push data to next cache line
    char data[MSG_SIZE];    // 64 bytes on its own cache line
};
```

Writer:

```c
while (__atomic_load_n(&slot->ready, __ATOMIC_ACQUIRE) != 0) ;  // spin
memcpy(slot->data, data, MSG_SIZE);
__atomic_store_n(&slot->ready, 1, __ATOMIC_RELEASE);
```

Reader:

```c
while (__atomic_load_n(&slot->ready, __ATOMIC_ACQUIRE) == 0) ;  // spin
memcpy(buf, slot->data, MSG_SIZE);
__atomic_store_n(&slot->ready, 0, __ATOMIC_RELEASE);
```

No syscalls anywhere in the hot path. The spin loops execute entirely in user space.

`__ATOMIC_ACQUIRE` / `__ATOMIC_RELEASE` ordering is sufficient here. A release store publishes all prior writes. An acquire load that observes the release guarantees subsequent reads see published data. This is weaker than `__ATOMIC_SEQ_CST` (full sequential consistency) but correct for a single-producer/single-consumer slot, and significantly cheaper because it doesn't require a full memory barrier.

The 60-byte padding between `ready` and `data` puts them on separate cache lines. Without this, the writer modifying `data` would invalidate the cache line holding `ready` on the reader's core, forcing a cache-line transfer even when the reader is only polling the flag. False sharing would destroy the throughput gain from using atomics in the first place.

Spin locks burn CPU cycles while waiting,100% core utilization during spin. In this benchmark, where producer and consumer run tightly coupled on separate cores, that's acceptable. In production with variable message rates, it's expensive. Know the trade-off before reaching for it.

---

## 9. Serialization: Binary vs Schema-Driven

### Raw Struct Transfer (Pipe, Shared Memory)

```c
write(pipefd[1], &msg, sizeof(msg));  // pipe
region->msg = data;                    // shared memory
```

Zero serialization overhead. The bytes in memory are the bytes transferred.

Risks:

- Struct layout must match exactly (same types, order, padding, alignment)
- Compiler version, flags (`-fpack-struct`, alignment pragmas) can silently change layout
- Adding or removing fields requires recompiling both sides simultaneously

### JSON Serialization (Socket Demos)

```c
snprintf(msg, sizeof(msg),
    "{\"seq\":%d,\"type\":%d,\"value\":%.4f,\"text\":\"msg #%d\"}",
    i + 1, i % 3, (i + 1) * 2.236, i + 1);
```

Self-describing, tolerant of schema evolution, no struct layout dependency. New fields don't break old readers.

Cost: CPU time for formatting and parsing, larger payload, string escaping edge cases.

This mirrors real-world practice cleanly. Shared memory systems,database buffer pools, HFT engines,use binary formats. Distributed systems, REST APIs, microservices, use serialized formats. The choice is architecture, not just performance.

---

## 10. The Cross-Host Boundary

Shared memory requires two processes to map the same physical RAM. That's only possible on one machine. There is no workaround.

Message passing doesn't care where the processes live.

On the same host, the kernel copies between address spaces. Fast enough for most things.

Across hosts:

```
Process A (Host 1)
      |
      v
  Kernel (Host 1)
      |
   TCP/IP Stack
      |
   Network
      |
   TCP/IP Stack
      |
  Kernel (Host 2)
      |
      v
Process B (Host 2)
```

Network round-trips add latency measured in milliseconds. Local IPC runs in microseconds. That's a real difference.

But if your processes run on different machines, you don't get to choose. Shared memory doesn't cross machine boundaries. TCP does.

---

## 11. Node.js: High-Level Language, Low-Level Mechanics

Node.js looks high level. It's not.

### child_process.fork() and IPC

`fork()` in Node creates a new Node process and establishes an IPC channel to the parent. That channel is implemented with OS primitives, typically pipes or domain sockets depending on platform.

When JavaScript calls `process.send(obj)`:

1. V8 serializes the object to a transportable binary representation
2. Node writes framed bytes to the IPC channel
3. Kernel copies bytes through pipe/socket buffers
4. Child event loop reads and deserializes to JS object

No JS heap pointer sharing occurs across processes. Isolation stays intact. The serialization is what makes cross-process messaging safe in a language that doesn't expose raw memory.

### libuv and the Event Loop

Node's non-blocking I/O is driven by libuv:

1. Register interest in socket readability/writability
2. Kernel notifies readiness via event demultiplexer (`kqueue` on macOS, `epoll` on Linux)
3. libuv schedules JS callbacks when I/O can proceed

An Express route that handles a socket request maps to:

```
JavaScript handler
  → C++ Node bindings
  → libuv
  → syscalls (socket, bind, listen, accept, send, recv)
  → kernel networking stack
```

"High-level runtime" means "layered systems interface," not "no kernel."

### Express Route to Syscall Chain

A route like `/demos/tcp-socket` in this project:

1. `spawn(server)` — background, capture stdout
2. `setTimeout(500ms)` — wait for server to bind and listen
3. `execSync(client)` — run client to completion, capture output
4. `server.kill(SIGTERM)` — cleanup

That 500ms delay is empirical. Enough for `bind + listen` on localhost. The C server must be listening before the client connects. If you shorten it on a slow CI machine, the client gets `ECONNREFUSED` and the test fails in ways that look flaky.

### Newline-Delimited JSON

Both Unix socket and TCP Node.js demos use newline-delimited JSON: each message is a JSON object followed by `\n`. The receiver splits on newlines to recover individual messages.

This solves TCP stream coalescing. TCP is a byte stream. Multiple `write()` calls may arrive in one `data` event. Without delimiters, you can't tell where one message ends and the next begins. Newlines are simple and sufficient for most cases. Length-prefixed binary framing is faster but more code.

---

## 12. Pitfalls and Failure Modes

**Stale shared memory and semaphores**: POSIX shared memory objects and named semaphores persist after process exit. A crashed previous run leaves stale objects with wrong state. Always call `shm_unlink` and `sem_unlink` at startup — treat it as a reset.

**Struct layout mismatch**: Different compilers, flags, or architectures can change struct alignment silently. The reader doesn't segfault. It reads the wrong bytes at the wrong offsets and produces wrong values. No warning. This is why both sides must compile from the same source under the same conditions.

**TCP message coalescing**: Two `send()` calls can arrive as one `recv()`. Always use delimited protocols or fixed-size messages. Never assume one send = one receive.

**Port conflicts (EADDRINUSE)**: Use `SO_REUSEADDR` on the C server to handle `TIME_WAIT`. Use `port 0` in Node.js to let the OS assign an available port and avoid collisions.

**Unix socket file cleanup**: The socket file persists on the filesystem after a crash. Next run fails on `bind()`. Unlink the path at startup before binding.

**False sharing**: If the spin flag and payload data share a cache line, the writer modifying data invalidates the reader's cached flag on every write — even though the reader only cares about the flag. Pad them to separate cache lines. 60 bytes of padding between a 4-byte flag and a 64-byte payload is not waste; it's the difference between 7.6M msgs/sec and a fraction of that.

**Semaphores masking shared memory performance**: If your benchmark shows shared memory losing to pipes, check your synchronization. Per-message semaphore calls reintroduce the kernel transitions you were trying to avoid. The mechanism and its synchronization strategy must be evaluated together.

---

## 13. Design Decisions

| Decision                                              | Rationale                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| Semaphores for demos, spin locks for benchmark        | Semaphores are pedagogically clear; spin locks prove the performance hypothesis |
| JSON for socket demos, raw structs for pipe/shm       | Mirrors real-world: local binary vs network serialized                          |
| 64-byte struct padding                                | Matches typical x86/ARM cache line; prevents false sharing                      |
| Named semaphores (not unnamed)                        | Required for coordination between independent processes (not just threads)      |
| `shm_unlink` at writer startup                        | Clears stale state from previous crashed runs                                   |
| `port 0` for Node.js TCP                              | OS assigns available ephemeral port; avoids EADDRINUSE                          |
| Newline-delimited JSON for Node.js socket demos       | Solves TCP stream coalescing                                                    |
| `SO_REUSEADDR` on C TCP server                        | Allows restart during TIME_WAIT                                                 |
| `CLOCK_MONOTONIC` for timing                          | Not affected by NTP adjustments or wall-clock changes                           |
| `__ATOMIC_ACQUIRE`/`__ATOMIC_RELEASE` (not `SEQ_CST`) | Sufficient for single-producer/single-consumer; no full memory barrier needed   |
| `INADDR_LOOPBACK` not `INADDR_ANY`                    | Security: demo/benchmark should not accept external connections                 |

---

## 14. When to Use Each

**Shared memory**: Both processes on the same machine, you control both sides, you need every microsecond, and you're willing to own synchronization, layout, and cache behavior. High-frequency trading engines and database buffer pools live here.

**Pipes**: Simple unidirectional data flow between related processes, usually parent/child. Correct by default. Not much ceremony. Good starting point before you need more.

**Unix domain sockets**: Local multi-process service decomposition where you want full-duplex communication, connection semantics, or unrelated processes. The sweet spot between pipes and TCP for same-host work.

**TCP sockets**: Any time processes might run on different hosts — or might move there. The only option for distributed systems. You pay for the protocol overhead, but you buy reliability, routing, and reach that no other mechanism provides.

---

## 15. What the Benchmark Actually Teaches

The headline result is "shared memory is fastest." That's true but incomplete.

The deeper result is to show that the shared memory with semaphores lost to pipes. Adding spin atomics made it win again. The synchronization strategy dominated the transport mechanism choice.

The benchmark is only valid because the synchronization and measurement methodology match the question being asked. A hidden syscall in your sync path can invalidate your entire conclusion. When someone shows you a benchmark, the first question is: what exactly is being measured?

Benchmarks must measure the mechanism you think you're measuring.

Operating systems are a set of explicit trade-offs among safety, portability, debuggability, and raw speed. IPC mechanisms are where those trade-offs become numbers. That's what makes IPC worth understanding at this depth — not to memorize the syscall sequence for `shm_open`, but to build the intuition for what each layer costs, why it costs that, and when the cost is worth paying.

High-level runtimes don't remove OS fundamentals. They package them. The kernel is always there.

Repository for this article: [benchmarkIPC](https://github.com/karankessy/benchmarkIPC).
