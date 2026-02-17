---
layout: page
title: Basic CFD Flows in Python
description: Two classic CFD problems implemented with finite differences for learning flow physics and numerical methods.
img: assets/img/projects/p3/channel1.png
importance: 3
category: research
related_publications: false
---

This project features two classic **incompressible CFD flow problems** implemented from scratch in Python using finite difference methods. These examples serve as a foundation for learning numerical methods, simulation workflow, and understanding basic flow physics.

---

## Included Problems

### 1. Lid-Driven Cavity Flow

- Solves the **incompressible Navier–Stokes equations** in a 2D square domain.
- The top wall (lid) moves with constant velocity, generating vortices in the cavity.
- Implements a **pressure Poisson equation** using:
  - **Dirichlet** conditions on pressure
  - **Neumann** conditions for velocity walls
- Uses:
  - Fixed uniform grid (default: 100×100)
  - Explicit time-stepping scheme
---

### 2. Channel Flow 

- Simulates **pressure-driven flow** between two parallel horizontal plates
- Periodic boundary conditions in the **streamwise direction**
- Solves the incompressible Navier–Stokes equations using finite differences
- Includes:
  - Iterative pressure-velocity solver

---

---

## Results and Discussion

### Lid-Driven Cavity Flow

<div class="row">
  <div class="col-sm-6 mt-3">
    {% include figure.liquid 
      path="assets/img/projects/p3/c2.png" 
      title="Velocity Field (Quiver)" 
      caption="Velocity vectors showing the main vortex structure" 
      class="img-fluid rounded z-depth-1" 
    %}
  </div>
  <div class="col-sm-6 mt-3">
    {% include figure.liquid 
      path="assets/img/projects/p3/c1.png" 
      title="Streamlines" 
      caption="Streamline plot visualizing circulation inside the cavity" 
      class="img-fluid rounded z-depth-1" 
    %}
  </div>
</div>

**Observations:**
- A strong primary vortex forms in the center, driven by the top lid.
- Secondary eddies begin to form near the corners as time advances.
- The flow stabilizes after sufficient time steps, showing smooth velocity distribution.

---

### Channel Flow

<div class="row">
  <div class="col-sm-6 mt-3">
    {% include figure.liquid 
      path="assets/img/projects/p3/channel1.png" 
      title="Velocity Field (Quiver)" 
      caption="Streamwise velocity vectors inside the channel" 
      class="img-fluid rounded z-depth-1" 
    %}
  </div>
  <div class="col-sm-6 mt-3">
    {% include figure.liquid 
      path="assets/img/projects/p3/channel2.png" 
      title="Smoothed Velocity Magnitude" 
      caption="velocity distribution" 
      class="img-fluid rounded z-depth-1" 
    %}
  </div>
</div>

<div class="row">
  <div class="col-sm-6 mt-3">
    {% include figure.liquid 
      path="assets/img/projects/p3/channel3.png" 
      title="Smoothed Vorticity Field" 
      caption="Boundary layers and shear zones visualized via vorticity" 
      class="img-fluid rounded z-depth-1" 
    %}
  </div>
  <div class="col-sm-6 mt-3">
    {% include figure.liquid 
      path="assets/img/projects/p3/channel4.png" 
      title="Centerline Velocity Profile" 
      caption="u vs y profile confirming parabolic trend" 
      class="img-fluid rounded z-depth-1" 
    %}
  </div>
</div>

**Observations:**
- Smoothed velocity field shows clean profile across the channel.
- Vorticity plot highlights boundary-layer effects near walls.
- Centerline velocity matches parabolic-like behavior, confirming solver accuracy.

---

### Conclusion

These simulations demonstrate fundamental fluid dynamics behaviors using classical numerical methods. Both cases validate the accuracy of solving the **incompressible Navier–Stokes equations** using finite difference schemes, with meaningful **post-processing** for analysis and interpretation.


🔗 [View Project on GitHub](https://github.com/FaiqShahbaz/CFD-Code-Development/tree/main/Python_BasicFlows)
