---
layout: post
title: Common fiducial sky for CMB experiments
description: Galactic, extragalactic and CMB recommendation for easier comparison across instruments
tags: cmb-s4 simons-observatory
---

In this document we plan do describe a set of fiducial sky models that can be used for simulation purposes by all Cosmic Microwave Background experiments to simplify the work of comparing their performance and perform joint analysis.

See also [Extragalactic and CMB](2022-11-21-common-fiducial-extragalactic-cmb.md)

## Galactic Foregrounds

For the foreground components we recommend 3 different sky models of increasing level of complexity so that analysis pipelines can be tested in different scenarios.

For each model we specify the most important features, check [in the PySM 3 documentation](https://pysm3.readthedocs.io/en/latest/models.html) for more details.

All models below are currently implemented in PySM `3.4.0b5`.

### Low complexity

PySM 3 emissions: `d9,s4,f1,a1,co1`

* Dust: Modified Black Body spectrum with Planck GNILC templates with small scales generated in Polarization Fraction Tensor formalism up to $$N_{side} =8192$$, $$\ell_{max}=16384$$, fixed spectral index of 1.48 and black body temperature to 19.6 K.
* Synchrotron: Power law model with templates from Haslam in temperature and WMAP 9 year 23 GHz in polarization, small scales in Polarization Fraction Tensor formalism up to $$N_{side} =8192$$, $$\ell_{max}=16384$$, fixed spectral index of -3.1.
* Free-free: PySM 2 Free-free model based on Commander up to $$N_{side}=512$$
* AME: PySM 2 un-polarized AME model based on Commander up to $$N_{side}=512$$
* CO: Galactic CO emissions of 3 main lines from Planck MILCA, un-polarized, $$N_{side}=2048$$

### Medium complexity

PySM 3 emissions: `d10,s5,f1,a1,co3`

* Dust: Low-complexity + GNILC spectral index and black body temperature maps with small scales added
* Synchrotron: Low-complexity + spectral index maps with small scales added
* Free-free: Low-complexity
* AME: Low-complexity
* CO: Low-complexity + .1% polarization

### High complexity

PySM 3 emissions: `d12,s7,f1,a2,co3`

* Dust: 3D model of polarized dust emission with 6 layers, MKD, $$N_{side}=2048$$
* Synchrotron: Medium-complexity + curvature map from ARCADE with small scales added
* Free-free: Low-complexity
* AME: Low-complexity + 2% polarization
* CO: Medium-complexity
