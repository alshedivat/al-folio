---
layout: page
title: Spectral Laplacian solver
description: fun with Fourier-Bessel series and quantum vortices! :>
img: assets/img/project_1_profile.png
importance: 1
category: work
---
This project develops a fast and accurate [Fourier-Bessel](https://en.wikipedia.org/wiki/Fourier%E2%80%93Bessel_series) based spectral Laplacian solver in 2D polar coordinates using [discrete Hankel transform](https://www.intechopen.com/chapters/65719). We use it to study quantum vortices in Bose-Einstein condensates and some other physical equations associated with Laplacian operator!

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2asym_dirich.gif" title="2 vortices" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/anime.gif" title="1 vortex" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/Pousuille.png" title="Zeroth order Bessel functions of the first kind" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <b>Left:</b> two quantum vortices in a 2D circular BEC. <b>Middle:</b> single vortex interaction with the infinite potential well (domain edge). <b>Right:</b> resulting steady Poiseuille pipe flow (velocity field) by simulating the time-dependent <a href='https://en.wikipedia.org/wiki/Hagen%E2%80%93Poiseuille_equation'>Hagen–Poiseuille equation</a>.
</div>

The dynamics of Bose-Einstein condensates (BEC) is completely governed by the time-dependent [Gross-Pitaevskii equation](https://en.wikipedia.org/wiki/Gross%E2%80%93Pitaevskii_equation):

$$
i\hbar \frac{\partial }{\partial t} \psi (r,\theta) =  -\frac{\hbar^2}{2m} \nabla^2 \psi + V(r,\theta)\psi + U_0 |\psi|^2 \psi.
$$

$$ \psi (r,\theta) $$ is the wave function describing the state of BEC. $$ i $$ is the imaginary number, $$ m $$ is the mass of each individual particles, $$ \hbar $$ is the reduced [Planck constant](https://en.wikipedia.org/wiki/Planck_constant). $$ U_0 $$ represents the interactions between particles, defined as:

$$
U_0 = \frac{4 \pi \hbar^2 a_s}{m},
$$

where $$ a_s $$ is the boson–boson <i>s</i>-wave scattering length. $$ V(r,\theta) $$ is the potential. In our case, we want to confine the BECs inside an infinite circular potential well. The potential is then infinite outside the domain, and equals to some constant inside.

The key to numerically solve the Gross-Pitaevskii equation is dealing with the Laplacian operator $$ \nabla^2 $$. Due to the infinite potential well, the BEC vanishes at the domain edge. This facts make Fourier-Bessel series an ideal choice to decompse the wave function in the radial direction.