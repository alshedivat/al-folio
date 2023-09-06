---
layout: page
title: Dark matter
description: distribution, structure and content in galaxies
img: assets/img/apostle_trio.png
importance: 1
category: science
related_publications: 2023MNRAS.521.1316R,2023MNRAS.522.3318D,2020MNRAS.495...58S,2019MNRAS.482..821O,2018MNRAS.476.2168M,2018MNRAS.474.1398G,2017MNRAS.464.2419S,2016MNRAS.460.3610O,2016MNRAS.457.1931S,2015MNRAS.452.3650O
---

My main line of research focuses on the dark matter content and structure in galaxies. I first became interested in dark matter as a research topic (beyond the level of 'dark matter - that sounds cool!') as a senior undergraduate when the various parametrizations (NFW, Einasto, ...) of dark matter density profiles came up in lecture. I remember wondering how we could possibly have such a detailed understanding of the distribution of something so little understood.

{% include figure.html path="assets/img/colibre.png" class="img-fluid rounded" width="65%" caption="A map of the dark matter density (left) and atomic gas density (right) in a simulated dwarf galaxy from a development version of the COLIBRE galaxy formation model. Velocity vectors of a subset of the gas particles are shown with arrows in the right panel. The gas is in a rotationally-supported disc, but perturbed by supernova explosions that have opened up the bubbles visible in the disc - these also clearly perturb the velocity field." %}

## Background & past projects

I picked up some more background knowledge while doing my MSc in [satellite galaxy evolution](/projects/satellites), enough that once I was accepted to the PhD programme in [Victoria](www.uvic.ca) and got round to picking a project I proposed to work on the cusp-core problem supervised by Julio Navarro. This 'problem' was at the time a statement of the fact that simulations of dark matter evolving under the influence of gravity forms clumps ('halos') that get denser towards their centres with a power law slope of about -1, while observations of some galaxies are more consistent with a central region of constant dark matter density (power law slope of 0). The original papers on the subject go back to the mid-nineties, so this was not a newly identified discrepancy. Right around the same time there were some major advances in simulations that soon culminated in the [EAGLE simulations](https://doi.org/10.1093/mnras/stu2058) and the many associated spinoff projects, including the APOSTLE project {% cite 2016MNRAS.457.1931S %} that I was heavily involved in. Rotation curves of galaxies from the [THINGS](https://doi.org/10.1088/0004-6256/141/6/193) and especially the [LITTLE&nbsp;THINGS](https://doi.org/10.1088/0004-6256/149/6/180) 21&#8209;cm radio surveys surveys were also being published around the same time. This combination of circumstances offered an opportunity to make some new contributions on the subject.

### Dwarf galaxies

Dwarf galaxies typically have low stellar and gas densities, low enough that even in there centres the dark matter density can be higher than the visible matter density. Since the dark matter is then the main contributor to the gravitational potential, dwarf galaxies make good targets for study since the dark matter 'signal' is high relative to the visible matter 'noise'.

### Rotation curves

One way to measure the dark matter content and distribution in a galaxy is with a rotation curve. In the simplest case, the speed $$v$$ of a particle on a circular orbit of radius $$r$$ in a spherically-symmetric gravitational potential is related to the mass enclosed within the orbit $$M(<r)$$ as $$v(r)=\sqrt{GM(<r)/r}$$. If we can measure the orbital speeds of "tracer" particles at a series of radii to build up the rotation curve $$v(r)$$, we directly get the mass profile $$M(<r)$$. If we subtract off the mass profile of the visible matter (stars, gas) we're left with the dark matter mass profile.

In realistic galaxies there are some complications:

 - the gravitational potential is probably not spherically symmetric (but if the mass budget is dominated by dark matter it might be a reasonable approximation);
 - the "tracer" particles are probably not all on circular orbits;
 - with the exception of the Milky Way and galaxies in its immediate vicinity, we only measure angular positions and velocities along the line of sight, so we have incomplete information;
 - gravity may not be the only force acting.

Nevertheless, in some cases these complications can be modelled or neglected and the general approach still works.

21&#8209;cm, radio or 'HI' emission from atomic hydrogen is perhaps the best-known spectral line used to measure rotation curves. The atomic gas has the advantage of often extending well beyond the stellar disc, allowing measurements to larger radii, and the emission physics and radiative transfer are quite simple, making it relatively easy to model.

### The 'diversity' of dwarf galaxy rotation curves

When I started working on the cusp-core problem the conversation in the literature centred around the slope of the dark matter density profile measured at as small a radius as possible. This has some drawbacks, chiefly that the 'figure of merit' (that slope) is very far from what is actually measured (a rotation curve, at least at the first-derived-data-product level). To get from a rotation curve to a density profile first the rotation curve needs to be interpreted as a mass profile (with some uncertainty). Then a derivative needs to be taken to get a density profile, followed by a second derivative to measure its slope. Pushing to the smallest possible radius makes this even more challenging, as does the fact that the dark matter density profile is usually thought of in log-density and log-radius, while the rotation curve is sampled linearly in radius. One of the main goals of my first paper {% cite 2015MNRAS.452.3650O %} on the topic was to propose a formulation of the cusp-core problem that is much more directly anchored in what is actually measured. Comparing the amplitude of the rotation curve at an 'inner' and an 'outer' radius turns out to do the job, as summarised in Fig.&nbsp;5 of the paper:

{% include figure.html path="assets/img/diversity.png" class="img-fluid rounded" width="85%" caption="Rotation curves of four dwarf irregular galaxies of approximately the same maximum rotation speed <nobr>V<sub>max</sub></nobr> (<nobr>80-100 km s<sup>-1</sup></nobr>) and galaxy mass, chosen to illustrate the diversity of rotation curve shapes at given <nobr>V<sub>max</sub></nobr>. Coloured solid curves and shaded areas correspond to the median (and <nobr>10<sup>th</sup>-90<sup>th</sup></nobr> percentile) circular velocity curve of simulated galaxies matching (within 10&nbsp;per&nbsp;cent) the maximum circular velocity of each galaxy. Note that the observed rotation curves exhibit a much wider diversity than seen in the simulations, from galaxies like UGC&nbsp;5721, which are consistent with our simulations, to galaxies like IC&nbsp;2574, which show a much more slowly-rising rotation curve compared with simulations, either hydrodynamical (coloured lines) or dark matter-only (black lines)." %}

Since the four galaxies have a fixed <nobr>V<sub>max</sub></nobr>, the shapes of their rotation curves can be parametrised with one number, the amplitude at an inner radius. In this initial paper we used 2&nbsp;kpc, but later {% cite 2020MNRAS.495...58S %} refined our definition so that the 'inner' radius scales with the size of the galaxy, leading to a figure that had a lot of influence in the field (this version from the later paper's Fig.&nbsp;2):

{% include figure.html path="assets/img/vfid_vmax.png" class="img-fluid rounded" width="65%" caption="Rotation speed at the inner radius <nobr>V<sub>fid</sub></nobr> versus maximum rotation speed for all galaxies in our observational sample. Galaxies with rapidly-rising rotation curves lie near the 1:1 dotted line. Rotation curves with <nobr>(V<sub>fid</sub>, V<sub>max</sub>)</nobr> values consistent with dark matter-only ΛCDM haloes lie along the grey curve and shaded area, computed using the median <nobr>M<sub>200</sub>(c)</nobr> relation (plus 10-90 and 1-99 percentiles) for a Planck-normalized cosmology. Slowly-rising rotation curves (i.e. 'cored' galaxies with a substantial inner mass deficit relative to ΛCDM) lie below the grey-shaded area. Each galaxy is labelled with its name and coloured according to <nobr>η<sub>rot</sub></nobr>, which we adopt as a simple measure of rotation curve shape." %}