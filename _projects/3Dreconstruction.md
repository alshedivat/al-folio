---
layout: page
title: 3D Reconstruction From Single-Photon Data
description: 
img: assets/img/lidar_summary.png
importance: 5
category: work
---


Single-photon light detection and ranging (lidar) has emerged as a prime candidate technology for depth imaging through challenging environments. This modality relies on constructing, for each pixel, a histogram of time delays between emitted light pulses and detected photon arrivals. The problem of estimating the number of imaged surfaces, their reflectivity and position becomes very challenging in the low-photon regime (which equates to short acquisition times) or relatively high background levels (i.e., strong ambient illumination). 


{%- include figure_post.html 
    path="assets/img/lidar_summary.png"
    size="100%"
    caption="Schematic of 3D reconstruction from lidar data" -%}

In a general setting, a variable number of surfaces can be observed per imaged pixel. The majority of existing methods assume exactly one surface per pixel, simplifying the reconstruction problem so that standard image processing techniques can be easily applied. However, this assumption hinders practical three-dimensional (3D) imaging applications, being restricted to controlled indoor scenarios. Moreover, other existing methods that relax this assumption achieve worse reconstructions, suffering from long execution times and large memory requirements. 

This project focuses on novel approaches to 3D  reconstruction from single-photon lidar data, which are capable of identifying multiple surfaces in each pixel. A first approach to multi-depth consists of detecting in which pixels a target is present. Limiting the number of surfaces per pixel to 0 or 1 can significantly reduce the complexity of the reconstructions algorithms, while still tackling a wide range of practical imaging scenarios. Detection methods can be found in {% cite tachella2019detection1 %} and {% cite tachella2019detection2 %}.


The models proposed in {% cite tachella2019manipop %}, {% cite tachella2019genmanipop %},  {% cite tachella2019rt3d %} and {% cite tachella2019crt3d %} differ from standard image processing tools, being designed to capture correlations of manifold-like structures. 

Until now, a major limitation has been the significant amount of time required for the analysis of the recorded data. By combining statistical models with highly scalable computational tools from the computer graphics community, we demonstrate 3D reconstruction of complex outdoor scenes with processing times of the order of 20 ms, where the lidar data was acquired in broad daylight from distances up to 320 m {% cite tachella2019rt3d %}. This has enabled robust, real-time target reconstruction of complex moving scenes, paving the way for single-photon lidar at video rates for practical 3D imaging applications

Multispectral lidar (MSL) systems gather measurements at many spectral bands, making it possible to distinguish distinct materials. The MSL modality consists of constructing one histogram of time delays per wavelength. 3D reconstruction from MSL data imposes an additional challenge as the data to be processed can become prohibitive. A way to overcome this limitation is through the use of compressive strategies on the spatial domain {% cite tachella2019manipop %}. 

A comprehensive survey of 3D reconstruction methods can be found in {% cite rapp2020advances %}.

### Related papers
<div class="publications">
{% bibliography --cited -f papers %}
</div>