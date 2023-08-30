---
layout: page
title: Data I/O
description: streamlining interaction with simulation data
img: assets/img/cosma.png
importance: 1
category: data
---

## SWIFTGalaxy

Past simulations projects that I've been involved with have had at best fairly rudimentary tools to read in data files for analysis. At worst, I've occasionally found myself parsing 'rows' in undocumented binary files one byte at a time. The [SWIFT](http://www.swiftsim.com/) simulation code that we're going to use for several forthcoming projects comes with a nice associated [i/o package](https://github.com/SWIFTSIM/swiftsimio) written mostly by [Josh Borrow](https://joshborrow.com/).

I've built another layer on top of this called [swiftgalaxy](https://github.com/SWIFTSIM/swiftgalaxy). Given a halo catalogue, this is a tool that understands how to retrieve the particles corresponding to a given galaxy in a simulation. It then streamlines analysis with:

 - easy coordinate transformations (e.g. recentre on the centre of the galaxy, rotate the disc into the x-y plane);
 - a coordinate system enforced to be consistent across particle types (avoids accidentally rotating the stars and forgetting to rotate the dark matter);
 - masking that applies to all particle arrays (even those loaded in the future!);
 - all of the swiftsimio features (metadata, units, lazy-loading, etc.).

Check out the code on [github](https://github.com/SWIFTSIM/swiftgalaxy) and [readthedocs](https://swiftgalaxy.readthedocs.io/en/latest) or install with `pip install swiftgalaxy`.

## SWIFTSimIO development

I'm working with a team including [DiRAC](https://dirac.ac.uk/) research software engineers to create a server-client version of [SWIFTSimIO](https://github.com/SWIFTSIM/swiftsimio). In this workflow model, the simulation data are held centrally on a server and subsets can be retrieved over the network for local analysis. This doesn't work for every analysis task, but for those that need reasonably modest data volumes (small enough to go over the available network) this is a way to streamline data access for the wider research community without the hassle of getting an account on a compute cluster or downloading many terabytes of snapshots. We're still very much in the prototyping phase, but hopefully an initial version will be released in the coming months.

## Data curation

I have a general interest in making our simulation datasets easier to (re-)use. [Alastair Basden](http://agbasden.webspace.durham.ac.uk/) is leading a working group that I'm working with to develop ideas for the nascent [DiRAC Data Curation Service](https://dirac.ac.uk/data-curation/) hosted in Durham. I'll also be employing a data curator on my fellowship to explore improvements to how we archive and publicly release our data.