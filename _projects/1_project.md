---
layout: page
title: GNN-Based Flow Prediction
description: Integration of GNNs with classical CFD simulations
img: assets/img/projects/p1/p1.png
repo: https://github.com/FaiqShahbaz/CFD-GNN
importance: 1
category: research
related_publications: false
---

This project combines classical CFD with Graph Neural Networks (GNNs) to enhance physical system modeling.

### 1. Lid-Driven Cavity Flow

- Solves the Navier–Stokes equations using finite difference methods.
- Computes the velocity field in a 2D square cavity where the top lid moves and induces flow.
- Converts the velocity field into a graph, where:
  - **Nodes** = grid points (with normalized spatial coordinates)  
  - **Node labels** = velocity magnitudes  
  - **Edges** = adjacency based on grid neighbors
- Trains a GCN (Graph Convolutional Network) to predict the velocity magnitude.
- Visualizes actual vs predicted vs error.

---

### 2. Pipe Potential Flow

- Solves the Laplace equation for a 2D pipe with specified inlet/outlet conditions.
- Simulates potential flow between two plates.
- Builds a graph where:
  - **Nodes** = grid points with (x, y)  
  - **Node labels** = potential value  
  - **Edges** = horizontal/vertical grid connections
- Trains a GCN to predict the potential field.
- Outputs a comparison of actual vs predicted potential and absolute error.

---
## Results and Discussion
### Cavity Flow Results – Velocity Magnitude Predictions

{% include figure.liquid 
   path="assets/img/projects/p1/cavity-21x21.png" 
   title="21×21 Grid" 
   caption="Velocity magnitude prediction on 21×21 grid" 
   class="img-fluid rounded z-depth-1 my-3" 
%}

{% include figure.liquid 
   path="assets/img/projects/p1/cavity-41x41.png" 
   title="41×41 Grid" 
   caption="Velocity magnitude prediction on 41×41 grid" 
   class="img-fluid rounded z-depth-1 my-3" 
%}

{% include figure.liquid 
   path="assets/img/projects/p1/cavity-61x61.png" 
   title="61×61 Grid" 
   caption="Velocity magnitude prediction on 61×61 grid" 
   class="img-fluid rounded z-depth-1 my-3" 
%}


**Observations:**
- The numerical simulation captures vortex formation inside the cavity.
- GNN predictions follow the numerical results well, though some smoothing is observed.
- Errors concentrate near the top corners where shear layers develop.

---

### Pipe Flow Results – Potential Field Predictions

{% include figure.liquid 
   path="assets/img/projects/p1/pipe-10x5.png" 
   title="10×5 Grid" 
   caption="Potential field prediction on 10×5 grid using GNN" 
   class="img-fluid rounded z-depth-1 my-3" 
%}

{% include figure.liquid 
   path="assets/img/projects/p1/pipe-20x10.png" 
   title="20×10 Grid" 
   caption="Potential field prediction on 20×10 grid using GNN" 
   class="img-fluid rounded z-depth-1 my-3" 
%}

{% include figure.liquid 
   path="assets/img/projects/p1/pipe-30x15.png" 
   title="30×15 Grid" 
   caption="Potential field prediction on 30×15 grid using GNN" 
   class="img-fluid rounded z-depth-1 my-3" 
%}


**Observations:**
- The numerical solver produces a smooth potential field with gradients along the pipe.
- GNN surrogate approximates the field well but has discrepancies at boundary zones.
- Errors are higher near the pipe walls due to fewer training samples.

---

## Conclusion

- GNNs can approximate CFD solutions with reasonable accuracy.
- Errors peak in complex regions (shear layers and boundaries).
- Higher grid resolution improves predictions but increases training demand.
- This hybrid approach shows promise for real-time flow estimation and surrogate modeling in CFD.

---

🔗 [View Project on GitHub](https://github.com/FaiqShahbaz/CFD-GNN/tree/main/basic_flows)
