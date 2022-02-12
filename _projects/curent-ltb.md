---
layout: page
title: CURENT Large-Scale Testbed
description: The CURENT LTB for wide-area monitoring, modeling, control, and demonstration

img: /assets/img/proj_ltb_icon.jpg
---

[Download the LTB Fact Sheet](/assets/pdf/Fact_Sheet_Tomsovic_Li_LTB.pdf)

[Download the LTB article on the IEEE Power and Energy Magazine](https://www.nxtbook.com/nxtbooks/pes/powerenergy_030420/index.php#/p/60)

[Download the paper on LTB's cyber-physical simulation architecture](https://digital-library.theiet.org/content/journals/10.1049/iet-esi.2019.0084/)

[Download the paper on LTB's power system simulator ANDES](https://arxiv.org/abs/2002.09455)

[Explore the source code of the ANDES simulator](https://github.com/cuihantao/andes)

## Overview

The objective of LTB is to develop a software platform for the large-scale test bed (LTB) thrust that can serve as a real-time grid operation platform to continuously simulate the operation of an actual power grid with small or large disturbances using communication and control actions as considered under wide-area measurement.

While the traditional power system simulators only focus on the physical power system components, the LTB incorporates power system components,
communication networks, energy management systems (EMS) and a measurement-based control system into an integrated platform for researchers to address emerging challenges such as renewable energy integration and cyber-physical security under innovative measurement-based technologies and controls.

## Technology Pathway

The LTB platform is designed on a decoupled architecture based on the concept of “module”. With the data interfaces properly defined, each module runs its own routines independently and communicate with other modules through data streaming. The modules are categorized into four categories based on functionality: grid simulators, measurement devices, energy management system, and controls. These modules, the underlying communication network, and the large-scale system
models make up the LTB system.

<div class="img_row">
<img class="col three" src="/assets/img/proj_ltb_arch.jpg" alt="" title="LTB Software Architecture">
</div>

This figure shows the overall architecture and the structural organization in LTB. The CURENT North America systems with 50% wind scenarios are created for different seasons. The grid simulator produces algebraic and state variable data from time-domain integration on a large-scale grid model. The measurement system receives the raw state, imposes measurement errors and delays, and send the measurements to the state estimator. The state estimator sends the estimated states to
control modules for further processing. Control signals from the control modules are sent back to the grid simulator for actuation.

The control system consists of the wide-area measurement-based control methods developed in the CURENT thrusts. Over the years of development, several control methods have been implemented on the LTB, including controlled system separation for the WECC system, voltage stability assessment, damping control and frequency control. The control methods were developed in standalone mode with the simulation data dumped from the simulators. When the methods are mature, they are interfaced to the
LTB platform via data streaming, which provides the inputs to the control methods. The next figure shows the visual comparison of hierarchical voltage control method using an in-house interactive visualization platform.

<img class="col three" src="/assets/img/proj_ltb_web.jpg" alt="" title="LTBWeb">

## Impacts

LTB provides a testing platform to validate and verify new models and control technologies developed in CURENT. It also serves as a driver of research since it allows fast prototyping of new models and grid infrastructures, direct access to simulation and measurement data, and instant feedback of the wide-area control signals. Thus, it is of critical importance to the success of the CURENT research visions.


## Points of Contact

Fran Li (865) 974-8401 (ph.), (865) 974-9723 (fax), fli6@utk.edu

Kevin Tomsovic (865) 974-2693 (ph.), (865) 974-5483 (fax), tomsovic@utk.edu

Hantao Cui (865) 974-5493 hcui7@utk.edu

