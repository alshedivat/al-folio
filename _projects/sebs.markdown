---
layout: page
title: SeBS, the serverless benchmark suite
description: Understanding performance challenges in the serverless world.
img: /assets/img/sebs/benchmark_suite.png
github: spcl/serverless-benchmarks
paper1: copik2020sebs
paper1_description: Paper @ Middleware 2021
zenodo: 10.5281/zenodo.5357597
docker: spcleth/serverless-benchmarks
importance: 2
category: serverless
---

Serverless computing gained significant traction in industry and academia and allowed
developers to build scalable and elastic applications.
Nevertheless, many authors raised several important issues, including unpredictable and
reduced performance, and the black-box nature of commercial systems made it difficult to gain
insights into the limitations and performance challenges of FaaS systems.
But the new field was lacking an automatic, representative, and easy-to-use benchmarking platform.
Therefore, we built **SeBS**, a serverless benchmarking suite, to fill that gap and provide clear and fair baselines
for the comparative evaluation of serverless providers.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/sebs/platform_model.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sebs/platform_model.png' | relative_url }}" alt="" title="FaaS platform model."/>
  </a>
</div>
<div class="caption">
  <b>FaaS platform model</b>: function invocations are triggered (1), sent to cloud executon servers (2), and use cloud storage (3, 4). (click to zoom)
</div>

In our work, we consider an abstract and high-level view of the serverless platform that allows us
to design a benchmarking suite that is independent of a specific cloud provider.
With a clear decomposition of the system, we can design experiments measuring the performance and overheads of different components of the FaaS platform.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/sebs/benchmark_suite.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sebs/benchmark_suite.png' | relative_url }}" alt="" title="SeBS overview."/>
  </a>
</div>
<div class="caption">
  <b>SeBS</b>: the overview of our benchmarking suite with applications, metrics, experiments, and a deployment toolkit.
</div>

While prior research work in the field included serverless benchmark suites, often the benchmarks
included only functions with an input, without any automatization of the deployment to the cloud.
Therefore, we build SeBS with **a fully automatic framework for building, deploying, and invoking
functions** to guide users towards reproducible results.
Users must only select the platform and provide credentials, and all necessary cloud resources are created automatically.
The experiments are conducted automatically, and the results are parsed into a data frame format for easy analysis and plotting.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/sebs/benchmarks.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sebs/benchmarks.png' | relative_url }}" alt="" title="Benchmark collection."/>
  </a>
</div>
<div class="caption">
  <b>SeBS benchmark applications</b> include a selection of Python and Node.js functions.
</div>

Our benchmark suite includes multiple functions to cover **the broad spectrum of serverless applications**,
from lightweight utilities and website backends, up to computationally intensive multimedia
and machine learning functions.
The functions are implemented in a platform-agnostic way, and we deploy small and light-weight
shims to adapt function and storage interfaces to the selected FaaS system.
The platform is modular, and thanks to the abstract system view, it can be easily extended
to support new serverless platforms.


<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/sebs/cold_startups.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sebs/cold_startups.png' | relative_url }}" alt="" title="Cold startups."/>
  </a>
</div>
<div class="caption">
  <b>Cold startup overheads</b>: significant penalty in functions with large deployment package and runtime shorter than one second.
</div>

Our work resulted in multiple novel findings into the performance, reliability, and portability
of serverless platforms. In addition to extensive performance evaluation of
different workloads, we identified portability issues between providers, analyzed the
**cold startup** cost and overhead, and we quantified the **performance cost of application "FaaSification"**
with a comparison against an IaaS deployment.

<div class="row justify-content-sm-center align-items-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    <a href="/assets/img/sebs/cost_invocations.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sebs/cost_invocations.png' | relative_url }}" alt="" title="Functions invocations cost."/>
    </a>
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    <a href="/assets/img/sebs/cost_efficiency.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sebs/cost_efficiency.png' | relative_url }}" alt="" title="Resource utilization efficiency."/>
    </a>
  </div>
</div>
<div class="caption">
  <b>Serverless cost</b>: the cost of one milion invocations (left), and the utiliation of CPU and memory resources (right).
</div>

We conducted a detailed **cost analysis** of functions, showing essential cost differences between
cloud providers and significant underutilization of provided resources.
These results confirm prior findings from non-serverless applications that CPU and memory consumption
are rarely correlated.
The current price systems lead to resource waste, as computationally-intensive functions must
allocate large amounts of unused memory to obtain sufficient CPU power.
The overallocation limits the number of active sandboxes on a server and negatively affects the utilization
boost provided by FaaS platforms.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/sebs/invocations_overheads.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/sebs/invocations_overheads.png' | relative_url }}" alt="" title="Cold startups."/>
  </a>
</div>
<div class="caption">
  <b>Invocation overheads</b>: comparing timestamps between function server and client, with the help of a clock drift estimation technique.
</div>

Because of the black-box nature of serverless systems, it isn't easy to measure the invocation overheads accurately;
after all, we don't know how much time passes between the arrival of the request at the cloud trigger
system and the beginning of an invocation.
Some benchmarks approximate this by measuring the difference between the function execution time reported
by the cloud provider and the total execution time observed by the client.
To find the most accurate estimation, we estimate the _clock drift_ between function
execution sandbox and client.
With that information, we can directly compare timestamps obtained on the client and the function server.
After subtracting connection setup overheads provided by curl, we provide **an accurate
estimation of the invocation overhead**.
The results show that while warm starts increase linearly with the payload size, as expected,
the cold starts on some of the platforms indicate significant bottlenecks and nondeterminism.


More insights and results can be found in [our benchmarking paper](/publications#2020sebs) that has been accepted at Middleware 2021.
[The open-source release of SeBS is available on GitHub](https://github.com/spcl/serverless-benchmarks) - try it today!
It supports AWS Lambda, Azure Functions, Google Cloud Functions, and OpenWhisk support is coming soon!
