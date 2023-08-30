---
layout: page
title: Visualisation
description: rendering simulated galaxies for science & enjoyment
img: assets/img/AP-L1-V1-4-0-gas-face.png
importance: 1
category: data
related_publications: 2023MNRAS.522.3318D,2016MNRAS.457.1931S
toc: true
---

## Rendering hydrodynamical simulations

I've spent part of the past few summers working in collaboration with project students on visualisation pipelines. A lot of this has been built around [py&#8209;sphviewer](https://alejandrobll.github.io/py-sphviewer) that is now deprecated, but most of what we've learned is quite general and I hope to port it over to another visualisation toolkit in the future.

### Early attempts

In 2021 I hosted a [Nuffield research placement](https://www.nuffieldresearchplacements.org/) with a goal of trying to learn some rudimentary visualisation techniques including stitching together images of simulated galaxies at consecutive times to make videos. py&#8209;sphviewer served as a useful tool to do the actual rendering, but there were some holes to fill in around interpolating between simulation outputs and tracking a target galaxy through time. My student Jared and I figured out some of the basics. Linear interpolation between simulation 'snapshots' turns out to be sufficient, provided that the outputs are frequent enough in time. A cubic spline fit through the positions of the target galaxy at times when we had galaxy catalogues available turned out to produce a good trajectory for the 'camera'. One of our early attempts to render the gas in a dwarf galaxy from the APOSTLE {% cite 2016MNRAS.457.1931S %} over a few billion years of its evolution looked like this:

{% include video.html path="assets/video/EarlyEvol.webm" class="img-fluid rounded" controls=false autoplay=true loop=true width="45%" caption="An early attempt to visualise the gas in a dwarf galaxy. Since we rendered all of the gas in the simulation, we picked up a lot of structure in the background that dominates over the target galaxy early on. There's also an undesirable 'flickering' effect. (J.&nbsp;Turnbull, K.&nbsp;Oman)." %}

We tried truncating a region around the target galaxy to suppress the background structure but this led to anything entering the target region appearing out of thin air. Eventually we solved this by 'fading out' towards the edge of the target region with an exponential suppression of the masses of particles close to the boundaries. We also figured out a global smoothly-varying colour scale normalisation to get rid of the flickering. By the end of the summer we managed to produce a video that we were pretty happy with overall:

{% include video.html path="assets/video/CompositeCirc.webm" class="img-fluid rounded" controls=false autoplay=true loop=true width="45%" caption="Composite visualisation of the dark matter (grayscale) and gas (purple/yellow) densities in a dwarf galaxy from the APOSTLE simulations. The viewing angle tracks the angular momentum of the gas to keep the disc face-on. (J.&nbsp;Turnbull, K.&nbsp;Oman)" %}

### Visualisation-driven science

In 2022 Eleanor Downing, then an undergraduate student at Durham, joined for a summer project where we deployed the techniques developed the previous summer on a sample of 33 low-mass galaxies from the APOSTLE suite. One of my goals for the projet was to try a new approach where the visualisations, which are often almost an afterthought in science projects, were instead the first thing to do and would be allowed to drive the process. Eleanor made many versions of movies looking at the gas and dark matter in these galaxies, totalling well over the duration of a feature-length film. Here's one example:

{% include video.html path="assets/video/FaceCirc.webm,assets/video/EdgeCirc.webm" class="img-fluid rounded" controls=false autoplay=true loop=true width="45%" caption="Visualisation of the gas density in a dwarf galaxy from the APOSTLE simulations over the last 4 billion years of its history. The viewing angle is aligned with the angular momentum vector (left) to keep the disc face-on. The right-hand video shows a perpendicular viewing angle so that the disc is seen edge-on. (E.&nbsp;Downing, K.&nbsp;Oman)" %}

She then catalogued 'by&nbsp;eye' the various processes that can disturb the gas kinematics in low-mass galaxies - mergers, warps, supernova-driven outflows and so on. We followed this up with a more quantitative analysis guided by the visual classifications to produce the first estimate of the frequencies of each type of perturbation that we identified. My favourite take-away from the project is summarised in Fig.&nbsp;6 of the resulting paper {% cite 2023MNRAS.522.3318D %}, showing that even a slightly prolate (rugby ball-shaped) dark matter halo strongly disturbs the gas - there's no stable configuration for an oblate gas disc in a prolate halo.

{% include figure.html path="assets/img/b_a_Q.png" class="img-fluid rounded" width="65%" caption="Anticorrelation between DM halo intermediate-to-major axis ratio b/a (measured from reduced inertia tensor of DM particles within a spherical aperture with radius equal to twice the radius enclosing 90 per cent of galaxy's HI mass) and the degree to which the rotation curve traces the circular velocity curve, Q. An aspherical halo (b/a<0.95, marked by the dashed red line) is a strong predictor of poor agreement between the rotation curve and the circular velocity curve, but a spherical halo does not guarantee close agreement. The coloured background marks intervals in Q where the agreement is (left to right) excellent, good, fair and poor." %}

I assembled one visualisation of each galaxy into the mosaic below. This really captures the diversity of assembly histories and evolutionary processes shaping the gas in these objects in a concise visual snapshot. The full collection of videos is [published with the paper](https://academic.oup.com/mnras/article/522/3/3318/7085003#supplementary-data).

{% include video.html path="assets/video/Mosaic.webm" class="img-fluid rounded" controls=true autoplay=false loop=false width="90%" caption="Visualisation of the gas density in dwarf galaxies from the APOSTLE simulations over the last 4 billion years of their history. The viewing angles are aligned with the angular momenta of the discs to keep them face-on. (E.&nbsp;Downing, K.&nbsp;Oman)" %}

#### Embedding an `mp4` in a `pdf` file

While writing the paper, we thought it would be a shame not to include at least one of the movies. We eventually figured out how to embed an `mp4` file in a pdf using the snippet of code below (save as `embed_video.tex` and use `\input{embed_video}` in your latex file, then in a figure environment you can do `\embedvideo*{\includegraphics{placeholderimage.pdf}}{video.mp4}` - make sure video is encoded with H.264). We didn't manage to convince the journal to do this in the version of record, but [it does work on arXiv](https://arxiv.org/abs/2301.05242) (for best results download and open with Adobe or Okular pdf viewer).

{% highlight tex %}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% \embedvideo{<poster or text>}{<video file (MP4+H264)>}
% \embedvideo*{...}{...}                     % auto-play
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\usepackage[bigfiles]{pdfbase}
\ExplSyntaxOn
\NewDocumentCommand\embedvideo{smm}{
  \group_begin:
  \leavevmode
  \tl_if_exist:cTF{file_\file_mdfive_hash:n{#3}}{
    \tl_set_eq:Nc\video{file_\file_mdfive_hash:n{#3}}
  }{
    \IfFileExists{#3}{}{\GenericError{}{File~`#3'~not~found}{}{}}
    \pbs_pdfobj:nnn{}{dict}{/Type/Filespec/F~(#3)/UF~(#3)/EF~<</F~\pbs_pdflastobj:>>}
    \tl_set:Nx\video{\pbs_pdflastobj:}
    \tl_gset_eq:cN{file_\file_mdfive_hash:n{#3}}\video
  }
  %
  \pbs_pdfobj:nnn{}{dict}{
    /Type/RichMediaInstance/Subtype/Video
    /Asset~\video
    /Params~<</FlashVars (
      source=#3&
      skin=SkinOverAllNoFullNoCaption.swf&
      skinAutoHide=true&
      skinBackgroundColor=0x5F5F5F&
      skinBackgroundAlpha=0
    )>>
  }
  %
  \pbs_pdfobj:nnn{}{dict}{
    /Type/RichMediaConfiguration/Subtype/Video
    /Instances~[\pbs_pdflastobj:]
  }
  %
  \pbs_pdfobj:nnn{}{dict}{
    /Type/RichMediaContent
    /Assets~<<
      /Names~[(#3)~\video]
    >>
    /Configurations~[\pbs_pdflastobj:]
  }
  \tl_set:Nx\rmcontent{\pbs_pdflastobj:}
  %
  \pbs_pdfobj:nnn{}{dict}{
    /Activation~<<
      /Condition/\IfBooleanTF{#1}{PV}{XA}
      /Presentation~<</Style/Embedded>>
    >>
    /Deactivation~<</Condition/PI>>
  }
  %
  \hbox_set:Nn\l_tmpa_box{#2}
  \tl_set:Nx\l_box_wd_tl{\dim_use:N\box_wd:N\l_tmpa_box}
  \tl_set:Nx\l_box_ht_tl{\dim_use:N\box_ht:N\l_tmpa_box}
  \tl_set:Nx\l_box_dp_tl{\dim_use:N\box_dp:N\l_tmpa_box}
  \pbs_pdfxform:nnnnn{1}{1}{}{}{\l_tmpa_box}
  %
  \pbs_pdfannot:nnnn{\l_box_wd_tl}{\l_box_ht_tl}{\l_box_dp_tl}{
    /Subtype/RichMedia
    /BS~<</W~0/S/S>>
    /Contents~(embedded~video~file:#3)
    /NM~(rma:#3)
    /AP~<</N~\pbs_pdflastxform:>>
    /RichMediaSettings~\pbs_pdflastobj:
    /RichMediaContent~\rmcontent
  }
  \phantom{#2}
  \group_end:
}
\ExplSyntaxOff
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
{% endhighlight %}

### Non-density rendering

In summer 2023 I co-hosted two more Nuffield research placement students, Mathilda and Piotr, both exploring visualisations of fields other than mass density. We worked out how to use the same toolset to render density-weighted properties, such as the density-weighted gas temperature or density-weighted stellar metallicity. Because of the way that the weighting integrates along the line of sight the interpretation of the outputs can be a bit tricky, but we could capture qualitative features like a cold gas disc embedded in a hot atmosphere. Perhaps my favourite visualisation from the summer is the one below. This was created by making three maps of the mass fraction in three hydrogen gas phases (ionized, atomic, molecular) and assigning each to one of the channels of an RGB image, then blending the result with a grayscale total density map to modulate the value (in the sense of HSV).

{% include video.html path="assets/video/DensityCirc.webm,assets/video/PhasesCirc.webm" class="img-fluid rounded" controls=false autoplay=true loop=true width="45%" caption="Left: gas density rendering of a simulated galaxy from the APOSTLE simulation suite. Right: same galaxy with rendering colour-coded by hydrogen gas phase - red is ionized, blue is atomic and green is molecular. (M.&nbsp;Hunnisett, I.&nbsp;Santos-Santos, K.&nbsp;Oman)" %}

This visualisation just pans around a static galaxy - there are still some kinks to work out in the process before it will give satisfactory results for a time-evolving galaxy.

## Radio datacube visualisation

Spectral line observations are intrinsically 3D measurements, though not so intuitively as a density field in a simulation. In these measurements, the telescope measures the intensity of light as a function of position on the sky, giving two spatial coordinates (right ascension and declination), and as a function of wavelength (or frequency), giving a 'spectral coordinate'. Provided that we define a metric that specifies a mapping between the spatial and spectral units (how many Hz per pixel and how many arcsec per pixel, or something like that) this can be rendered like a more conventional 3D dataset. One example that I created with the [SlicerAstro](https://doi.org/10.1016/j.ascom.2017.03.004) extension of [3DSlicer](https://www.slicer.org/) is shown below.

{% include video.html path="assets/video/SlicerCapture.webm" class="img-fluid rounded" controls=false autoplay=true loop=true width="45%" caption="Volume rendering of a 3D radio 'datacube'. The cube has two spatial axes corresponding to right ascension and declination, and a velocity axis corresponding to velocity of the hydrogen gas along the line of sight as measured from its Doppler shift. The image rotates through the spatial projection (approximately oval) and the major axis position-velocity diagram projection (approximately diagonal line). The target object is a strongly-warped giant galaxy from the EAGLE simulation suite, 'observed' with my MARTINI code. (K.&nbsp;Oman)" %}

I've also had a chance to play with the [IDIA Vislab](https://vislab.idia.ac.za/) virtual reality kit, including loading in some simulated radio observations for manipulation in 3D - definitely something I hope to explore further in the future!