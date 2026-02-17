---
layout: page
title: 2D Advection-Diffusion Solver
description: Serial and parallel solvers for the 2D advection-diffusion equation using Python
img: assets/img/projects/p2/p2.png
importance: 2
category: research
related_publications: false
---

This project implements serial and parallel solvers for the **2D Advection-Diffusion Equation**, a fundamental PDE describing how a scalar quantity (e.g., temperature, concentration) evolves under the combined influence of advection (transport) and diffusion (spreading).

---

## Physics Background

In 2D, the general form of the advection-diffusion equation is:

$$
\frac{\partial \phi}{\partial t} + u \frac{\partial \phi}{\partial x} + v \frac{\partial \phi}{\partial y} = D \left( \frac{\partial^2 \phi}{\partial x^2} + \frac{\partial^2 \phi}{\partial y^2} \right)
$$

Where:

- \( phi(x, y, t) \): scalar field (e.g., temperature)
- \( u, v \): advection velocities
- \( D \): diffusion coefficient
- \( x, y \): spatial coordinates
- \( t \): time

---

## Problem Setup

For this implementation:

- Advection is **neglected** (but it can be varied in the code) → \( u = v = 0 \)
- The equation simplifies to pure diffusion:

$$
\frac{\partial \phi}{\partial t} = D \left( \frac{\partial^2 \phi}{\partial x^2} + \frac{\partial^2 \phi}{\partial y^2} \right)
$$


- **Boundary conditions**: Dirichlet (fixed values) on all sides
- **Initial condition**: Typically a Gaussian pulse or localized concentration in the center
- **Time integration**: Explicit Euler scheme

---

## Scalability and Performance Results

The following table summarizes the execution times and speedups for various domain decompositions:

| Configuration                   | Simulation Time (seconds) | Speedup (relative to serial) |
|--------------------------------|----------------------------|------------------------------|
| Serial                         | 1346.69                    | 1.00×                        |
| Parallel (MPI Decomposition: 1×2) | 773.87                     | 1.74×                        |
| Parallel (MPI Decomposition: 2×2) | 442.39                     | 3.04×                        |
| Parallel (MPI Decomposition: 1×5) | 403.66                     | 3.33×                        |

---

## Results Discussion

### Solution Consistency
- Both the serial and parallel solvers produce **nearly identical solution fields**, verifying correctness.
- Contour plots from each implementation confirm spatial consistency.

### Scalability
- Clear performance gains are observed in the parallel version:
  - 2 processors → **1.74× faster**
  - 4 processors → **3.04× faster**
  - 5 processors → **3.33× faster**

### MPI Decomposition Impact
- Decomposing the domain as 2×2 yields **better load balancing and communication efficiency**.
- Unbalanced splits like 1×5 still perform well but may incur higher communication overhead.

### Performance Trade-Offs
- For **small grids**, MPI communication overhead can dominate.
- For **larger domains**, parallel scaling becomes more effective and efficient.

---

**Solution Plot:**

<div style="width: 60%; margin: auto;">
  {% include figure.liquid 
     path="assets/img/projects/p2/advDiff.png" 
     title="Scalar Field Distribution" 
     caption="Contour of the scalar field" 
     class="img-fluid rounded z-depth-1 my-3" 
  %}
</div>

---

🔗 [View Project on GitHub](https://github.com/FaiqShahbaz/CFD-Code-Development/tree/main/python_MPI/Advection_Diffusion)
