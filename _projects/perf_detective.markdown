---
layout: page
title: Performance-Detective
description: Cheap and accurate white-box performance models.
img: /assets/img/perf-detective/results.png
artifact: https://doi.org/10.5445/IR/1000146001
paper1: schmid2022perfdetective
paper1_description: Paper @ ICS 2022
importance: 2
category: program analysis
---

Modern high-performance applications include many configuration parameters.
While not all of them influence the program's performance, their presence makes performance
modeling much more difficult.
Since modeling experiments using more than three or four parameters are too expensive to conduct,
HPC users need a methodology to select modeling parameters and understand how they depend on each other.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/perf-detective/analysis.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/perf-detective/analysis.png' | relative_url }}" alt="" title="Perf-Detective analysis workflow.."/>
  </a>
</div>
<div class="caption">
  <b>Analysis workflow</b>: extracting parameter dependency information helps to reduce the number of experimental samples.
</div>

In this collaborative effort led by Larissa Schmid from the Karlsruhe Institute of Technology,
we developed a new white-box modeling framework.
Using the program information supplied by [perf-taint](/projects/perf_taint), we are able to deduce
a simplified experiment design when parameters do not depend on each other.
Furthermore, many HPC applications have a main computation loop that runs for many iterations,
and all performance-critical functions are located within this loop.
Perf-Detective detects when the loop behavior does not change across iterations and uses the iteration
data to model the function's performance from many repetitions.
The iteration data removes the need to conduct many repetitions of the entire application, achieving
statistical model quality at a much lower cost.

<div style="vertical-align:middle; text-align:center">
  <a href="/assets/img/perf-detective/results.png">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/perf-detective/results.png' | relative_url }}" alt="" title="Accuracy and cost results."/>
  </a>
</div>
<div class="caption">
  <b>Perf-Detective results</b>: the white-box analysis workflow reduces the cost of experiments while keeping accuracy high.
</div>

We show lower experimental costs and high accuracy in an extensive evaluation of two representative HPC applications.
Furthermore, we improve over sparse modeling methods by replacing decisions made by heuristics with verified program information,
reducing the risk of missing vital parameter dependencies.

More insights and results can be found in [the paper](/publications#schmid2022perfdetective) that has been
presented at ICS 2022.

