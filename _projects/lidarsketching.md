---
layout: page
title: Sketching Single-Photon Data
description: 
img: assets/img/sketching_summary.PNG
importance: 4
category: work
---

Single-photon lidar is an emerging ranging technique that can obtain 3D information at kilometre distance with centimetre precision, and has important applications in self-driving cars, forest canopy monitoring, non-line-of-sight imaging and more. This modality consists of contracting a histogram of time-of-arrival of individual photons per pixel. For each object in the line-of-sight of the device there is a peak in the histogram. These peaks are found by a 3D reconstruction algorithm that takes into account the Poisson statistics of the photon-count data, while promoting spatial smoothness in the reconstructed point clouds. In a previous post, I presented an algorithm that can find multiple peaks per pixel in a matter of milliseconds even in challenging very long range scenarios with high background noise. As the algorithm needs to process the histogram data, the <strong>reconstruction time</strong> depends (linearly) on the total number of non-zero bins in the histogram:

{%- include figure_post.html 
    path="assets/img/timing_bins.png"
    size="60%"
    caption="Execution time of a 3D reconstruction algorithm as a function the number of non-zero bins in the collected time-of-arrival histograms" -%}

As single-photon lidar arrays get bigger and faster, the number of photons collected per histogram gets bigger, while there is an increased need for faster real-time frame rates. The volume of photon data that needs to be transmitted is ever-increasingly large, generating a <strong>data transfer bottleneck</strong>. Moreover, reconstruction algorithms are required to deal with ever-increasingly large and dense histograms, generating a <strong>computational bottleneck</strong>. So far, most attempts to alleviate these bottlenecks consisted in building coarser histograms. Despite reducing the amount of information to be transferred and processed, this approach sacrifices important depth resolution.


In {% cite sheehan2021sketching %}, we propose a sketching method to massively <strong>compress the histograms without any significant loss of information</strong>, removing the data and computational bottlenecks. The technique builds on recent advances in <a href="https://arxiv.org/abs/1706.07180">compressive learning</a>, a theory for compressing distributions. The compressed data consists of a series of $$K$$ statistics 

$$\Phi_k(t) = [\cos(w_k t),  \sin(w_kt)]^{T} \quad \text{for} \quad k=1, \dots, K$$

where $$t$$ denotes the time of arrival. The statistics can be <strong>computed on-the-fly</strong>, i.e. updated with each photon arrival, hence completely by-passing the need to construct a histogram. Below you can see the large difference between reducing the data by coarse binning the histogram and our proposed method:


{%- include figure_post.html 
    path="assets/img/sheehan2021sketching2.gif"
    size="100%"
    caption="Coarse binning and sketching" -%}

In {% cite sheehan2021detection %}, we propose detection methods (i.e., deciding whether there is a surface in a given pixel), which only require access to the sketched data and perform similarly to the other detection methods which require access to time-of-arrival histograms.

In {% cite tachella2022srt3d %}, we introduce a framework for using sketching together with spatially regularised reconstruction method, which can be applied to most existing spatial reconstruction methods (for example the ones in [this project]({% link _projects/3Dreconstruction.md %}), and is able to massively reduce their computational complexity in mid and high photon regimes.


### Related papers
<div class="publications">
{% bibliography --cited -f papers %}
</div>