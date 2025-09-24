---
layout: post
title: PySM Methods Paper Published in ApJ
description: Pan Experiment Galactic Science Group small-scale Galactic emission models paper accepted by ApJ
tags: pysm
date: 2025-09-24
image: /assets/img/pysm-methods-figure.jpg
---

![Small-scale Galactic emission realizations from the PySM methods paper](/assets/img/pysm-methods-figure.jpg)

The *Astrophysical Journal* formally published our paper, [*Full-sky Models of Galactic Microwave Emission and Polarization at Sub-arcminute Scales for the Python Sky Model*](https://iopscience.iop.org/article/10.3847/1538-4357/adf212), on **September 12, 2025**. We are sharing this update now that the issue is out, following up on the [March note about the arXiv submission](https://www.zonca.dev/posts/2025-03-03-paper-pysm-models). This work represents the efforts of the entire Pan Experiment Galactic Science Group.

You can still read the open-access version on [arXiv:2502.20452](https://arxiv.org/abs/2502.20452), and the latest software documentation lives at the [PySM3 docs](https://pysm3.readthedocs.io/).

## Recommended complexity bundles

The paper formalizes three recommended PySM foreground bundles that bracket different astrophysical assumptions:

- **Low complexity**: `d9`, `s4`, `f1`, `a1`, `co1` -- amplitude-only small-scale fluctuations with no dust or synchrotron frequency decorrelation and unpolarized CO.
- **Medium complexity**: `d10`, `s5`, `f1`, `a1`, `co3` -- extends fluctuations to the spectral parameters and includes CO polarization at the 1% level.
- **High complexity**: `d12`, `s7`, `f1`, `a2`, `co3` -- adopts the Martinez-Solaeche dust layer model with line-of-sight decorrelation, spatially varying synchrotron curvature, and polarized AME and CO.

## Models characterized in the paper

Beyond the bundle definitions, the publication provides validation and performance metrics for the new component models now available in PySM 3:

- **Dust**: `d9`, `d10`, `d11`, and the layer-based `d12` implementation.
- **Synchrotron**: `s5`, `s6`, and `s7`, contrasted with the legacy templates.
- **Free-free and AME**: continued reliance on `f1` plus both `a1` (unpolarized) and `a2` (2% polarized) AME options.
- **CO lines**: new `co1`, `co2`, and `co3` scenarios spanning unpolarized to polarized implementations.

All of these models, and experiment-specific sky realizations derived from them, are available for download through the [CMB-S4 Data Portal](https://data.cmb-s4.org).

In addition, the paper's LaTeX sources and the notebooks used for figures live in the [galsci/pysm_methods_paper](https://github.com/galsci/pysm_methods_paper) repository.

