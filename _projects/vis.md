---
layout: page
title: Data visualisation
description: rendering simulated galaxies for science & enjoyment
img: assets/img/AP-L1-V1-4-0-gas-face.png
importance: 1
category: data
related_publications: 2023MNRAS.522.3318D,2016MNRAS.457.1931S
---

I've spent part of the past few summers working in collaboration with project students on visualisation pipelines. A lot of this has been built around [py-sphviewer](https://alejandrobll.github.io/py-sphviewer) that is now deprecated, but most of what we've learned is quite general and I hope to port it over to another visualisation toolkit in the future.

## Early attempts

In 2021 I hosted a [Nuffield research placement](https://www.nuffieldresearchplacements.org/) with a goal of trying to learn some rudimentary visualisation techniques including stitching together images of simulated galaxies at consecutive times to make videos. py-sphviewer served as a useful tool to do the actual rendering, but there were some holes to fill in around interpolating between simulation outputs and tracking a target galaxy through time. My student Jared and I figured out some of the basics. Linear interpolation between simulation 'snapshots' turns out to be sufficient, provided that the outputs are frequent enough in time. A cubic spline fit through the positions of the target galaxy at times when we had galaxy catalogues available turned out to produce a good trajectory for the 'camera'. One of our early attempts to render the gas in a dwarf galaxy from the APOSTLE {% cite 2016MNRAS.457.1931S %} over a few billion years of its evolution looked like this:

{% include video.html path="assets/video/EarlyEvol.webm" class="img-fluid rounded" controls=false autoplay=true loop=true width="45%" caption="An early attempt to visualise the gas in a dwarf galaxy. Since we rendered all of the gas in the simulation, we picked up a lot of structure in the background that dominates over the target galaxy early on. There's also an undesirable 'flickering' effect. (J.&nbsp;Turnbull, K.&nbsp;Oman)." %}

We tried truncating a region around the target galaxy to suppress the background structure but this led to anything entering the target region appearing out of thin air. Eventually we solved this by 'fading out' towards the edge of the target region with an exponential suppression of the masses of particles close to the boundaries. We also figured out a global smoothly-varying colour scale normalisation to get rid of the flickering. By the end of the summer we managed to produce a video that we were pretty happy with overall:

{% include video.html path="assets/video/CompositeCirc.webm" class="img-fluid rounded" controls=false autoplay=true loop=true width="45%" caption="Composite visualisation of the dark matter (grayscale) and gas (purple/yellow) densities in a dwarf galaxy from the APOSTLE simulations. The viewing angle tracks the angular momentum of the gas to keep the disc face-on. (J.&nbsp;Turnbull, K.&nbsp;Oman)" %}

## Visualisation-driven science

{% include video.html path="assets/video/FaceCirc.webm,assets/video/EdgeCirc.webm" class="img-fluid rounded" controls=false autoplay=true loop=true width="45%" caption="Visualisation of the gas density in a dwarf galaxy from the APOSTLE simulations over the last 4 billion years of its history. The viewing angle is aligned with the angular momentum vector (left) to keep the disc face-on. The right-hand video shows a perpendicular viewing angle so that the disc is seen edge-on. (E.&nbsp;Downing, K.&nbsp;Oman)" %}

{% include video.html path="assets/video/Mosaic.webm" class="img-fluid rounded" controls=true autoplay=false loop=false width="90%" caption="Visualisation of the gas density in dwarf galaxies from the APOSTLE simulations over the last 4 billion years of their history. The viewing angles are aligned with the angular momenta of the discs to keep them face-on. (E.&nbsp;Downing, K.&nbsp;Oman)" %}

## Non-density rendering

{% include video.html path="assets/video/DensityCirc.webm,assets/video/PhasesCirc.webm" class="img-fluid rounded" controls=false autoplay=true loop=true width="45%" caption="Left: gas density rendering of a simulated galaxy from the APOSTLE simulation suite. Right: same galaxy with rendering colour-coded by hydrogen gas phase - red is ionized, blue is atomic and green is molecular. (M.&nbsp;Hunnisett, I.&nbsp;Santos-Santos, K.&nbsp;Oman)" %}

## Radio datacube visualisation

{% include video.html path="assets/video/SlicerCapture.webm" class="img-fluid rounded" controls=false autoplay=true loop=true width="45%" caption="Volume rendering of a 3D radio 'datacube'. The cube has two spatial axes corresponding to right ascension and declination, and a velocity axis corresponding to velocity of the hydrogen gas along the line of sight as measured from its Doppler shift. The image rotates through the spatial projection (approximately oval) and the major axis position-velocity diagram projection (approximately diagonal line). The target object is a strongly-warped giant galaxy from the EAGLE simulation suite, 'observed' with my MARTINI code. (K.&nbsp;Oman)" %}