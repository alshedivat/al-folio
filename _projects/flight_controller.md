---
layout: page
title: KOS Flight Controller
description: An autopilot script written for KSP + RSS.
highlights:
img: assets/img/FlightControllerUI.png
redirect: https://github.com/SK1Y101/KOSFlightController
category: fun
date: "2022-01-02"
---

This page is a work in progress.

```
SSTO Steps

Launch:
> enable engines
> Engage brakes
> Throttle to maximum
> Disengage brakes when speed > 1 m/s

Flight:
> Maintain level flight until speed > 400 m/s
> Pitch up between 5 and 20 degrees, depending on lift and thrust of vehicle
> Maintain attitude
> Toggle Rapier to vacuum mode when velocity decreases
> Point prograde at some point (Maybe when apoapsis exceeds 55km?)
> Circularise at apoapsis

Landing:
> Reduce Periapsis to 50km at around 200 degrees ahead of ksc
> Maintain AoA of 5-25 degrees, depending on flight characteristics I haven't worked out yet
> Survive
> Fly back to KSC
```