---
layout: page
title: Langevin dynamics
description: what happens when Langevin dynamics meets Markov chain meets simulated annealing? :o
img: assets/img/project_3_profile.png
# redirect: https://unsplash.com
importance: 4
category: work
---

<iframe width="375" height="375" src="https://www.youtube.com/embed/gKb6rRKX3FI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="375" height="375" src="https://www.youtube.com/embed/P38AqPNxM6g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I developed this project during PHY407 Computational Physics course. It simulates particle motions inside a closed square box, governed by [Langevin dynamics](https://en.wikipedia.org/wiki/Langevin_dynamics) and [Lennard-Jones potential](https://en.wikipedia.org/wiki/Lennard-Jones_potential). In real life situations, molecule systems are not likely to exist in a complete vacuum, but in a sort of medium, like solvent or air. Langevin dynamics is thus developed to describe the interactions between particles and environments, which can be considered as a way to describe [Brownian motion](https://en.wikipedia.org/wiki/Brownian_motion). It is governed by a stochastic differential equation:

$$
M \ddot{X} = -\nabla U(X) - \gamma \dot{X} + \sqrt{2\gamma k_B T}R(t).
$$

$$ M $$ is the mass of each particle, $$ X $$ is the positions of the system. $$ U(X) $$ is a potential function of some sort due to the interactions of the particles themselves. $$ \gamma $$ is the damping constant; $$ T $$ is the temperature, and $$ k_B $$ is Boltzmann's constant. $$ R(t) $$ is a stationary [Gaussian process](https://en.wikipedia.org/wiki/Gaussian_process) which gives our simulation randomness. The potential $$ U(X) $$ is chosen to be the Lennard-Jones potential:

$$
U(r) = 4\epsilon \left[ \left( \frac{\sigma}{r}\right)^{12}  - \left( \frac{\sigma}{r}\right)^{6}  \right],
$$

where $$ r $$ stands for the distance between each pair of particles. To make the project more interesting as well as considering the nature of Langevin dynamics (random process + temperature dependency), I combined the process with [Markov chain](https://en.wikipedia.org/wiki/Markov_chain) and [simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing). The whole simulation undergoes a modified [Verlet method](https://en.wikipedia.org/wiki/Verlet_integration).

The simulation results are very interesting, the particles spontaneously go into a ground state and form a lattice pattern:
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="./assets/img/9.png" title="9" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="./assets/img/16.png" title="16" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="./assets/img/25.png" title="25" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Simulation of 9, 16, and 25 particles. <b>Black dots</b>: Initial position, <b>Red dots</b>: Ending position, <b>Blue arrows</b>: Initial velocities. The particle trajectories are omitted for viewer's sanity. :>
</div>

For more details on this project, you can read my [report](/assets/pdf/Final_project_report_RundongZhou.pdf).
