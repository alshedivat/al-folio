---
layout: page
title: Work-stealing prefix scan
description: 
img: /assets/img/prefix_scan/prefix_scan.png
importance: 1
category: hpc
---

<div style="vertical-align:middle; text-align:center">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/prefix_scan/prefix_scan.png' | relative_url }}" alt="" title="Strong scaling."/>
</div>
<div class="caption">
  Strong scaling speedup of the work-stealing prefix scan image registration over the traditional MPI version.
</div>

In [my Master thesis](/publications#2017masterthesis), supervised by [Prof. Paolo Bientinesi](https://hpac.cs.umu.se/~pauldj/)
and [Prof. Benjamin Berkels](https://www.aices.rwth-aachen.de/en/people/berkels),
I've had the opportunity to work on the problem of **electron microscopy
image registration**. Instead of acquiring a single and high-quality image, which requires
a long acquisition with a huge amount of energy affecting the sample, one could acquire
a series of low-energy images.
The images are a bit noisy, the sample is drifting while the acquisition takes place,
and frames need to be _registered_ by aligning them to a single, common coordinate system.

<div style="margin-left: auto; margin-right: auto; display: block; justify-content: center; width: 75%">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/prefix_scan/microscopy_image.png' | relative_url }}" alt="" title="Electron microscopy frames."/>
</div>
<div class="caption">
  Example of electron microscopy image and a magnified upper left corner displaying the shift needed to align images.
</div>

To align images $$f_0$$ and $$f_1$$, we need to find a transformation $$\phi_{0,1}$$. Due to the periodical
behavior of samples, we are not allowed to align any two images directly - we need to consider
all subsequent steps. For example, alignment of $$f_0$$ and $$f_3$$ requires computing the deformations
$$\phi_{0, 1}, \phi_{1, 2}$$ to produce $$\phi_{0, 2}$$, and estimating the transformation $$\phi_{0,3}$$
using $$\phi_{0,2}$$ and $$\phi_{2,3}$$.

<div style="margin-left: auto; margin-right: auto; display: block; justify-content: center; width: 75%">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/prefix_scan/prefix_registration.png' | relative_url }}" alt="" title="Recursive image registration.."/>
</div>
<div class="caption">
  The recursive nature of the registration procedure on a series of images. 
</div>

To a computer scientist, this problem is a classic example of a **prefix sum (scan)**.
In a prefix computation, a sequence of elements $$x_0, x_1, \dots, x_{n}$$ is transformed
to produce elements $$y_i = x_0 \odot x_1 \odot \dots \odot x_{i-1}$$.
Prefix sums have been studied extensively since the 60's because binary addition is a prefix sum problem,
and scan parallelizations allow to build faster binary adders.
Prefix scans are considered a classic **parallelism pattern** - many seemingly sequential
problems can be parallelized when represented as a prefix scan.

While our problem can be represented as a prefix scan, its characteristics
are quite different from the scans analyzed in the literature: the image registration operator
is **computationally intensive** and has **unpredictable and highly imbalanced execution cost**.
In the [Master thesis](/publications#2017masterthesis), I analyzed the prefix sum algorithms
and their distributed implementations, and I found out that the `MPI_Scan` performance is unsatisfactory.
The work has been presented as [a poster](/publications#2017prefixsum) at the Student Research Competition at SC '17.

<div style="margin-left: auto; margin-right: auto; display: block; justify-content: center; width: 75%">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/prefix_scan/distributed_prefix_scan.png' | relative_url }}" alt="" title="Distributed prefix scan.."/>
</div>
<div class="caption">
  Distributed prefix scan: reduce-then-scan approach.
</div>

To provide a fast and efficient parallelization strategy for the image registration, we developed a novel
**work-stealing prefix scan** algorithm to provide **load balance** for the tightly constrained
scan algorithms.
We have shown that the new approach provides up to a two-fold decrease in computation time and
up to a 2.25x decrease in CPU resources and energy consumption.
The research paper has been published in [the IEEE Transactions on Parallel and Distributed Systems](/publications#2020prefixsum).

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/prefix_scan/weak_scaling_full.png' | relative_url }}" alt="" title="Weak scaling."/>
    </div>
</div>
<div class="caption">
  Weak scaling speedup of the work-stealing prefix scan image registration over the traditional MPI version.
</div>
