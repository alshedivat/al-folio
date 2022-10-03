---
layout: page
title: Epi-Proj 
description: Efficiently computing epigraphical and level set projections for problems in nonsmooth optimization
img: assets/img/epigraph.png
importance: 1
category: work
---

Given an extended-valued convex function $$f\colon \mathbb{R}^n \to [-\infty,\infty]$$ its epigraph is defined by 

$$\mathrm{epi}(f) = \{(x,\alpha) \in \mathbb{R}^n \times \mathbb{R} \mid f(x) \leq \alpha\}$$

Intuitively, the epigraph is the area that lives above the graph of the function. A related concept
is that of a level set. Fixing $$\alpha\in \mathbb{R}$$, the $$\alpha$$ level set for $$f$$ is defined by

$$\mathrm{lev}(f,\alpha) = \{x\in \mathbb{R}^n \mid f(x) \leq \alpha \}$$

Level sets are quite familiar. For example, given a vector norm $$\| \cdot \|$$ on $$\mathbb{R}^n$$
the closed ball centred at the origin of radius $$r$$ is the $$r$$ level set for the norm:

$$B_{r,\|\cdot\|}(0) = \mathrm{lev}(\|\cdot\|, r)$$ 

In particular, many optimization problems with origins in machine learning, compressed sensing, and statistical estimation employ the $$\ell_1$$ norm as a regularizer to encourage sparse solutions. These problems can be recast as constrained optimization problems where the constraint is of the form $$\|x\|_1 \leq \delta$$.
In problems with epigraphical or level set constraints such as this, many optimization algorithms will often 
need to compute the projection onto the corresponding epigraph or level set at each iteration.


<div class="row justify-content-sm-center">
    <img src = "/assets/img/epigraph%20copy.png" width= "350" height = "244">
</div>
<div class="caption">
    The projection of a point onto the epigraph of a convex function
</div>

 Efficiently solving this sub-problem is of interest, and it turns out to yield a fruitful study of the variational analytic
properties of the so-called proximal operator (due to Moreau):

$$\mathrm{prox}_f(\bar{x}) := \mathrm{argmin}_{u\in \mathbb{R}^n}\{f(u) + \frac{1}{2}\|u-\bar{x}\|^2\}$$ 

The prox operator is a generalization of the usual Euclidean projection operator, and plays an important role in modern first-order methods for optimization.

Our result shows that the projection onto the epigraph can be computed by solving a differentiable scalar
convex optimization problem, and moreover when the objective function has semismooth structure this technique
is amenable to superlinear convergence guarantees. More precisely:

Suppose $$f \colon \mathbb{R}^n \to (-\infty,+\infty]$$ is a closed (meaning its epigraph is closed), proper 
($$f(x) < \infty$$ for some $$x$$), convex function, and $$(\bar{x},\bar{\alpha})\in \mathbb{R}^n\times\mathbb{R}$$. Then 

$$P_{\mathrm{epi}(f)}(\bar{x},\bar{\alpha}) = \begin{cases} \left( P_{\mathrm{cl}(\mathrm{dom} f)}(\bar{x}),\bar{\alpha}\right), & \text{if } f( P_{\mathrm{cl}(\mathrm{dom} f)}(\bar{x})) \leq \bar{\alpha}\\
\left(\mathrm{prox}_{\bar{\lambda}f}(\bar{x}),\bar{\alpha} + \bar{\lambda}\right), &\text{else}
\end{cases} $$

where $$\bar{\lambda} > 0$$ is the unique root of the strictly decreasing function 
$$0 < \lambda \mapsto f(\mathrm{prox}_{\bar{\lambda}f}(\bar{x}))-\lambda - \bar{\alpha}$$.

For level sets, the situation is largely the same except the problem is no longer strongly convex, so the
root may not be unique. The analogous formula is

$$P_{\mathrm{lev}(f,\bar{\alpha})}(\bar{x}) = \begin{cases} P_{\mathrm{cl}(\mathrm{dom} f)}(\bar{x}), & \text{if } f( P_{\mathrm{cl}(\mathrm{dom} f)}(\bar{x})) \leq \bar{\alpha}\\
\mathrm{prox}_{\bar{\lambda}f}(\bar{x}), &\text{else}
\end{cases} $$

where $$\bar{\lambda} > 0$$ is any root of the non-increasing function 
$$0 < \lambda \mapsto f(\mathrm{prox}_{\bar{\lambda}f}(\bar{x})) - \bar{\alpha}$$.



