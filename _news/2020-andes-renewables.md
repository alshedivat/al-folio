---
layout: post
title: ANDES Version 1.1.0 released highlighting renewable generation models.
date: 2020-09-01 11:00:00-0400
inline: false
---

ANDES Version 1.1.0 released highlighting renewable generation models.

***
The most recent ANDES release v1.1.0 comes with renewable generation models, including solar PV, generic type 3 wind, and generic type 4 wind.

Models developed in ANDES are:

- Converter control model `REGCA1`
- Electrical control model `REECA1`
- Plant control model`REPCA1`
- Drive-train models `WTDTA1` (dual-mass model) and `WTDS` (single-mass model)
- Aerodynamic model `WTARA1`
- Pitch controller model `WTPTA1`
- Torque (a.k.a. Pref) model `WTTQA1`

These models are in PSS/E's naming convention.

The general combination of models are

- One will use `REGCA1`, `REECA1` and `REPCA1` to simulate large-scale solar PV.
- One will use `REGCA1`, `REECA1` and `REPCA1` to simulate type 4 wind model.
  The drive-train model can be added optionally.
- One can use all the models to simulate type 3 wind model.

Reference: PowerWorld, "Transient Stability Overview: Renewable Energy Generation Modeling (Wind, Solar, Energy Storage, Distributed Photo Voltaic)", Online: [PowerWorld website](https://www.powerworld.com/WebHelp/Content/MainDocumentation_HTML/Transient_Stability_Overview_WindModeling.htm).

