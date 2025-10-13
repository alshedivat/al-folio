---
layout: page
title: Data Sharing and Analysis Across LCFs
description: Interactive Exploration of HACC Cosmology Data using WebXR
img: assets/img/cosmology/hacc00.png
importance: 1
category: research
tags: [data-sharing]
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cosmology/hacc00.png" title="HACC WebXR Viewer – Overview" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cosmology/hacc02.png" title="HACC WebXR Viewer – Data Exploration" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption" style="text-align: left;">
    Visualizations generated using the HACC WebXR framework, showing large-scale cosmic structure and interactive exploration capabilities within a browser-based 3D environment.
</div>

The **Interactive Exploration of HACC Cosmology Data using WebXR** project aims to make large-scale cosmological simulations more **accessible, collaborative, and immersive** by leveraging modern web technologies and WebXR. This research introduces a **web-based 3D data viewer** that allows researchers, educators, and students to explore complex cosmic structures directly in a browser or virtual reality environment—eliminating the need for resource-intensive desktop visualization tools.

The viewer integrates [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), [WebAssembly](https://webassembly.org/), [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API), and [Babylon.js](https://www.babylonjs.com/) to deliver high-performance rendering and interaction for datasets containing millions of particles. This system is designed for scalability, interactivity, and accessibility to support the analysis and interpretation of large cosmological simulations.

The key features include:

- Scalable rendering of dynamically detected data types with customizable colormaps, per-type size, opacity, and scalar controls.  
- Scalar mapping and filtering with adjustable min/max ranges, *filter vs. recolor (remap)* modes, and colorblind-friendly colormaps.  
- Rectangular data selection with detailed statistics (min, max, median, average, standard deviation) and interactive histograms for subset analysis.  
- Data clipping and slicing planes featuring full gizmo-based positioning and orientation control.  
- Guided tour mode for structured, didactic exploration highlighting scientifically significant regions of interest.  
- Immersive VR navigation via WebXR, supporting headset controls, smooth locomotion, and orientation-locked viewing.  
- Screenshot export for saving high-resolution images directly from the browser.  
- Session state management to save and reload viewer configurations (camera, rendering, scalars, colormaps, etc.) for reproducibility and collaboration.  
- Accessibility options such as high-contrast mode, colorblind-friendly palettes, screen-readable text, and adjustable interface elements.  
- Dynamic legends and colormap bars reflecting scalar fields and particle counts.  
- Scientific orientation tools, including axes visualization, vector arrows, and preset camera positions (top, side, front, reset).  
- Scalable interaction controls to limit rendered points, adjust visualization overrides, and rescale the scene.  
- Interactive help overlay and contextual UI messages for onboarding and feedback.

The viewer is being developed for integration into the [OpenCosmo Data and Analysis Portal](https://www.globus.org/blog/open-cosmo-data-and-analysis-portal). Integration with the portal will enable seamless visualization of query results, facilitate interactive data exploration, and enhance scientific insight through a fully web-based workflow.

---

#### Research Team

**Current Members**  
- [Idunnuoluwa Adeniji](https://www.linkedin.com/in/idunnuoluwa) — *PhD Research Assistant*  
- [Joseph Insley](https://www.alcf.anl.gov/about/people/joseph-insley) (Argonne)  
- [Michael E. Papka](https://www.linkedin.com/in/michaelpapka) — (UIC/Argonne)  

**Alumni**  
- [Revathi Dhotre](https://www.linkedin.com/in/revathi-dhotre)
- [Brian Ta](https://www.linkedin.com/in/ba-ta)
---

#### Funding
This work is supported by the [U.S. Department of Energy](https://www.energy.gov/), [Office of Science](https://science.osti.gov/), [High Energy Physics (HEP) program](https://science.osti.gov/hep), via sub-award from [Argonne National Laboratory](https://www.anl.gov/).
