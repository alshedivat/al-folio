---
layout: page
title: perf-taint
description: Enhancing performance modeling with program analysis information.
img: /assets/img/perf_taint/overhead.png
github: spcl/perf-taint
zenodo: 10.5281/zenodo.4295657
paper1: 2019perftaint
paper1_description: Poster @ SC 2019
paper2: 2021perftaint
paper2_description: Paper @ PPoPP 2021
docker: spcleth/perf-taint
importance: 1
category: program analysis
---

Performance modeling has had a huge impact on the world of scientific and high-performance computing.
It gave us tools to discover scalability bugs, validate performance expectations, and design new systems.
In particular, empirical modeling tools made it much easier for users to derive parametric performance
models. After the long modeling process, users obtain parametric models estimating the behavior
of each function in the program.

<div class="img-magnifier-container" style="vertical-align:middle; text-align:center">
    <a href="/assets/img/perf_taint/modeling_framework.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/perf_taint/modeling_framework.png' | relative_url }}" alt="" title="Performance modeling framework."/>
    </a>
</div>
<div class="caption">
  The Extra-P performance modeling toolchain, including first two manual steps (click to zoom).
</div>

Unfortunately, those tools are not a perfect solution - they are not always easy to use,
not each model is perfect, and modeling is expensive: its cost increases exponentially with the number of parameters.
We identified five major issues:  
(1) users can usually afford to create models with 2-3 parameters, and selection of important program parameters is far from trivial;  
(2) experiment design process is manual and can be difficult as well;  
(3) instrumenting all functions adds significant overhead and affects the quality of results;  
(4) function models can present false-positive dependencies due to noise and overfitting,
**particularly on small and short running functions** (see example below);  
(5) empirical models can represent effects other than those resulting from the program itself, such as hardware effects.

<div class="row justify-content-sm-center align-items-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    <a href="/assets/img/perf_taint/false_model_code.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/perf_taint/false_model_code.png' | relative_url }}" alt="" title="Performance modeling framework."/>
    </a>
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    <a href="/assets/img/perf_taint/false_model.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/perf_taint/false_model.png' | relative_url }}" alt="" title="Performance modeling framework."/>
    </a>
  </div>
</div>
<div class="caption">
  Example of an incorrect parameter dependency in a model (right): performance of the code (left) does not depend on <b>s</b>.
</div>

Our work shows that these issues can be mitigated by **turning the black-box empirical
modeling process into a white-box one**. We include in the modeling process a program analysis step
to achieve two goals: identify functions which performance is constant with respect to input parameters,
and detect which parameters affect the function's computational effort. In addition, the analysis must be memory agnostic
and inter-procedural, and it must be possible to integrate it into distributed MPI applications.

<div class="img-magnifier-container" style="vertical-align:middle; text-align:center">
    <a href="/assets/img/perf_taint/taint_analysis.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/perf_taint/taint_analysis.png' | relative_url }}" alt="" title="Dynamic taint analysis."/>
    </a>
</div>
<div class="caption">
  Dynamic taint analysis in practice: the taint labels <b>a, b</b> are propagated to variables that depend on the value of <em>a</em> and <em>b</em>.
</div>

We selected **dynamic taint analysis**, a computer security technique used to analyze the dependency
of program code on potentially malicious user input.
The analysis allows us to annotate program input parameters as a source of taint labels, and the
compiler instrumentation introduces propagation of taint labels across data flow and control flow.
Furthermore, the user memory region is replicated in the
so-called _shadow memory_ to keep track of the labels associated with each program variable.
In the end, we can inspect performance-critical code regions, such as loop conditions
and determine which program parameters affected their value.

<div class="img-magnifier-container" style="vertical-align:middle; text-align:center">
    <a href="/assets/img/perf_taint/perf_taint.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/perf_taint/perf_taint.png' | relative_url }}" alt="" title="perf-taint."/>
    </a>
</div>
<div class="caption">
  The <b>perf-taint</b> toolchain: user code is executed with the taint instrumentation, and the results are used in Extra-P modeling.
</div>

**perf-taint** extracts the vital program information to simplify the modeling process.
The parameter dependency is used to:  
(1) help users select modeling parameters;  
(2) simplify modeling experiments;  
(3) removing constant functions from instrumentation and modeling;  
(4) removing models with false dependencies;  
(5) detecting when empirical models differ substantially from the program and can include other effects.

We evaluated perf-taint on two HPC benchmarks and showed that perf-taint makes the performance
modeling easier, cheaper, and more robust.
In HPC applications, perf-taint helps primarily by identifying that over 85% of functions are constant.

<div class="img-magnifier-container" style="vertical-align:middle; text-align:center">
    <a href="/assets/img/perf_taint/overhead.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/perf_taint/overhead.png' | relative_url }}" alt="" title="Instrumentation overhead."/>
    </a>
</div>
<div class="caption">
  Modeling runs are expensive: full instrumentation leads to huge overheads, and the default instrumentation is unsuitable for modeling.
  Application of the results of perf-taint decreases instrumentation overheads significantly.
</div>

<div class="img-magnifier-container" style="vertical-align:middle; text-align:center">
    <a href="/assets/img/perf_taint/intrusion.png">
      <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/perf_taint/intrusion.png' | relative_url }}" alt="" title="Instrumentation intrusion."/>
    </a>
</div>
<div class="caption">
  Excessive instrumentation can change program behavior so much that performance models will not represent
the actual program behavior. Improved perf-taint instrumentation helps to generate better models.
</div>

Our work has been recognized at the **ACM Student Research Competition at Supercomputing 19**,
where [the poster](/publications#2019perftaint) won first place.
In addition, the full [research paper](/publications#2021perftaint) has been presented at ACM SIGPLAN PPoPP 2021.

