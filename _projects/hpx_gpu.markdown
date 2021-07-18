---
layout: page
title: Single-source GPU programming 
description: Incorporating Khronos SYCL into HPX.
img: /assets/img/sycl/hpx_internal.png
github: mcopik/hpx/tree/compute_sycl
paper1: 2017sycl
paper1_description: Paper @ IWOCL Workshop
importance: 3
category: hpc
---


<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/sycl/hpx.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sycl/hpx.png' | relative_url }}" alt="" title="HPX." style="max-width:100%;width:70%;"/>
  </a>
</div>
<div class="caption">
  The components of shared and distributed memory programming in HPX.
</div>

In the last years, the HPC world has moved to more heterogeneous architectures, exploiting hardware
offering different types of parallelism and enforcing specific programming models.
It has become a standard practice to offload computations to dedicated accelerators, and it is
expected that the importance of massively parallel processors will increase.
However, up to now, we have not seen a standardized C++ approach that would allow for writing portable
code for heterogeneous systems.

HPX is a parallel runtime system for applications of any scale, exposing parallelism API conforming
to the newest developments in the C++ standards.
However, it lacks the integration of computing accelerators.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/sycl/hpx_internal.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sycl/hpx_internal.png' | relative_url }}" alt="" title="OpenCL callbacks." style="max-width:100%;width:70%;"/>
  </a>
</div>
<div class="caption">
  The high-level overview of the parallel executor model in HPX.
</div>

[HPX.Compute](https://link.springer.com/chapter/10.1007%2F978-3-319-46079-6_2) is an attempt to
solve the heterogeneous programming problem using standard C++ language and libraries.
The system is designed on top of three concepts: **allocators** responsible for memory management,
**target** providing an opaque view of a device, and **executor** responsible for scheduling
computations on a target.
The design is orthogonal to compilers, libraries, and other vendor-specific changes.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/sycl/sycl_overview.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sycl/sycl_overview.png' | relative_url }}" alt="" title="Overview of SYCL compilers." style="max-width:100%;width:70%;"/>
  </a>
</div>
<div class="caption">
An overview of the SYCL frameworks, compilers, and backends.
<a href="https://www.khronos.org/blog/sycl-2020-what-do-you-need-to-know">Source of the image</a>.
</div>

We implemented the HPX.Compute model on top of [Khronos SYCL](https://www.khronos.org/sycl/), the new standard for single-source
GPU programming. SYCL is built on top of OpenCL semantics, and it brings simplified memory management
and support for C++ kernels while providing portability guarantees similar to OpenCL.
The SYCL compiler accepts a C++ source file, looks for SYCL kernels and compiles them to SPIR-V
bitcode. Later, the same source code is compiled with a regular C++ compiler, and the SYCL bitcode is linked
with it. We used [ComputeCpp](https://developer.codeplay.com/products/computecpp/ce/home),
which at the time was the only SYCL compiler and framework with a complete implementation.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/sycl/futures.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sycl/futures.png' | relative_url }}" alt="" title="OpenCL callbacks." style="max-width:100%;width:70%;"/>
  </a>
</div>
<div class="caption">
  Implementation of C++ futures with OpenCL callbacks.
</div>

We implemented **allocators** using SYCL buffers, **targets** encapsulating SYCL device, and
**HPX executors** scheduling the parallel `for_each` algorithm on SYCL targets.
To implement asynchronous programming with futures, we needed a way to receive a callback from
SYCL that the kernel execution has finished, and we can change the state of the promise tied with
a future object returned to the user.
Unfortunately, SYCL does not have a native interface for callbacks.
However, it does have rich cooperation with OpenCL, and we were able to access and use
the underlying OpenCL system.
We implemented the futures without any hacks, and the compiler does the heavy lifting of compiling
GPU code for us!

<div class="row justify-content-sm-center align-items-center">
  <div class="col-sm-6 mt-3 mt-md-0">
    <a href="/assets/img/sycl/stream_bw_305.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sycl/stream_bw_305.png' | relative_url }}" alt="" title="STREAM benchmark." />
    </a>
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    <a href="/assets/img/sycl/stream_bw.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sycl/stream_bw.png' | relative_url }}"
        alt="" title="STREAM benchmark." />
    </a>
  </div>
</div>
<div class="caption">
  STREAM benchmark on arrays from less than 1 MB to 305 MB, on a single AMD GPU R9 Nano. 
</div>

Using [the STREAM benchmark](https://www.cs.virginia.edu/stream/), we have shown that SYCL kernels can be integrated with HPX with minimal performance overheads,
**including the asynchronous executions with `hpx::future`**.
Furthermore, our implementation provides **high-performance GPU computations with a native C++ interface**
similar to CPU programming.

This work is a result of my internship at the [STE||AR Group](https://stellar.cct.lsu.edu) at the [Louisiana
State University](https://www.lsu.edu/) in summer 2016.
During that time, I worked on C++AMP, AMD HC, and Khronos SYCL as potential implementation
backends for GPU programming in HPX.
We presented our paper [at the DHPCC++ 2017 at the 9th International Workshop on OpenCL and SYCL](/publications#2017sycl).
