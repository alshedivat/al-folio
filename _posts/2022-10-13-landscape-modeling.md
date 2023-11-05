---
layout: post
title: Landscape modeling - erosion vs tectonic uplift
author: Zhihao
description: large scale of geomorphology
date: 2022-10-13
tags: notes # notes\links\code\math\images
categories: geomorphology # topic
bibliography: lib.bib
csl: C:\Users\ZOZN109\AppData\Local\Pandoc\apa.csl
lang: eng
publish: yes
---

## 1 Background

There are several classical models describing the formation of the landscape (Figure 1). Some concepts are still used today, such as Peneplain, Pediplain. In this section, we have a short review of these classical theories of large-scale geomorphology.

![](https://i.imgur.com/lU82I9d.png)
**Figure 1**. Scheme of Davis (A), Penck (B) and King (C) models

### Davis model (1899): The cycle of erosion
![](https://i.imgur.com/4v6O3NZ.png)
**Figure 2**. Davis model

Davis *considered landforms evolution as a sequence of stages*, like life forms, from young, and mature to old. The young terrain has maximum relief, after the erosion by the river. As the *slope decline* from V to U shape, the end of the erosion is a flat surface close to base level or sea level, called **peneplain**. And then, new uplift starts a new cycle (Summerfield, 2008).

Davis does not explain that landforms under different climates are not identical. Consequently, Davis developed an arid and a glacier version of the cycle of erosion. In the case of limestone terrains, later works develop a specific karst cycle of erosion to explain it.

The rate and occurrence of uplift are also one of issues. Davis estimated the formation of peneplain may take 20-200 Ma, which may not exactly be true. Davis's model is unable to explain the rapid climate changes that happened in the Quaternary when the sea level changed frequently.

### The Penck model (1924): uplift and denudation related

The Penck model does not have rapid uplift. But the crustal uplift gets slower when reaches a maximum (slow – fast – slow). The high rate of crustal uplift would raise river channels further above base level and thus increase their gradients, so *the faster fluvial downcutting*. The converse situation applies during a decline in the rate of uplift, with rates of incision decreasing. Hence, the process could be divided into:
	• (Fast uplift - Steep slope) Waxing development yields convex valley sides
	• (Slow uplift - Less steep slope) Waning development yields concave valley sides.

Penck model links river erosion with the rate of uplift. However, *River downcutting* is also related to climate, lithology, and weathering, both of which can significantly affect relationships between stream activity and slope form.

### The King model (1953): pediplanation

The King model resembles Davis's and also has uplift, young, mature, and old stages, but assuming the uplift is episodic and rapid in comparison with rates of denudation (Summerfield, 2008). 
- The slope development is different.
	- The slope at an angle of 6-7 degrees would keep stable, call it *pediment*.
	- *Parallel retreat*: the pediment increase in size due to *backward erosion* in backwall. 
	- *Pediplains*: The Pediment joins with other pediments to form pediplains.


![Figure: the clasic theory of slope development: How valley gets wider](https://i.imgur.com/4E7hQHi.jpg)
**Figure 3**. Slope development in different classical models

## 2 Lab exercise

In our lab exercise, we use the Simple Integrated Geomorphological Numerical Model (SIGNUM) to simulate the evolution of the landscape, which is TIN-based model written in Matlab.

### The numerical euqations
The process of surface height change at each iteration are computed by a series of geomorphic transport laws (GTL), namely diffusion, channeling and uplift (Chen et al., 2014).

The diffusion GTL:

$$
\frac{\delta_z}{\delta_t} = k_d \triangledown^2z
$$


Where k_d is a diffusion parameter, and surface curvature is ∇.

The channeling GTL:

$$
\frac{\delta_z}{\delta_t} = k_c A^m\triangledown_z^n
$$


Where k_c is streampower parameter, m, n are parameters as well, and A is contribution area.

The uplift GTL:

$$
\frac{\delta_z}{\delta_t} = u_f
$$


Where u_f is the rate of uplifting.

### The study area

![](https://i.imgur.com/Jtv0fAq.jpg)
**Figure 4**. Alluvial streams, Danxia, Zhangye, China (39.1 N 099.9 E ).

Figure 4 shows an alluvial stream plain getting most of its water and sediments from the surrounding mountainn glaciers or snow cover (2200 - 2600 m a.m.s.l). Alluvium is deposited as the stream fans out on a flat plain (1600 -1800 m a.m.s.l).

As SIGNUM does not have deposit GTL, hence, the simulation aims to simulate the mountains instead.

### The sensitivity test and results

In simulations, a 20 km * 20 km square area starts uplifting, erosion and diffusion from a **peneplain** at sea level. A cycle of 100 thousand years later, we get the results. The outlet is defined as line x=0.

I use an iteration to approach the target terrain (Figure 4) by adjusting the parameters in each run (Table 1). **Run 1, Run 2 and Run 3 are my sensitivity tes**t, where I found that the 2x erosion and 2x uplift coefficient show that the erosion is more progressive (river reaches inland further, run 3), and the uplift also makes the mountain higher (Run 2). The diffusion parameter does not have that significant impact on result compared to erosion and uplift parameters (Run 3b is almost as same as Run 3)

**Table 1.**  The parameters. Run 1,2,3 are sensitivity test, and space = 250 m.

| Runs | Kd                    | Kc                   | mc   | nc   | Uf                   | comments                                      |
| ---- | --------------------- | -------------------- | ---- | ---- | -------------------- | --------------------------------------------- |
| 1    | 5e-3                  | 1e-4                 | 0.5  | 1    | 1e-3                 | Sensitivity test                              |
| 2    | 5e-3                  | 1e-4                 | 0.5  | 1    | 2e-3                 | Sensitivity test: faster uplift               |
| 3    | 5e-3                  | 2e-4                 | 0.5  | 1    | 2e-3                 | Sensitivity test: faster erosion   and uplift |
| 3b   | exp(-X\space\50)5e-3  | 2e-4                 | 0.5  | 1    | 2e-3                 | Sensitivity test: Diffusion west              |
| 4    | exp(-X\space\50)5e-3  | 2e-4                 | 0.5  | 1    | exp(X\space \50)2e-3 | diffusion west, uplift east                   |
| 5    | 5e-3                  | exp(-X\space\30)5e-3 | 0.5  | 1    | exp(X\space \50)2e-3 | erosion west, uplift east                     |
| 6    | exp(-X\space \50)5e-3 | exp(-X\space\60)5e-3 | 0.5  | 1    | exp(X\space \50)2e-3 | diffusion, erosion west, uplift   east        |



Run 4 introduces an exponential function that reduces diffusion and enhances uplift at the East side (x close to 20km), but enhances diffusion and reduces uplift at the west side (x close to 0). We can regard this function as a condition that the east side tectonic is more active and lithology has higher fracture resistance. The mountain reaches over 350 m, which is similar to my study area.

If there is less river down-cutting on the east, the east mountain is as high as 900 m (Run 5). Or, there is more river down-cutting, more diffusion on the west, the east mountain is getting steeper (Run 6). In summary, I prefer the result of run 4, which resembles Figure 2 at most. And run 5 and run 7 show that we can simulate the slope development by adjusting parameters.

![](https://i.imgur.com/bN42Dah.png)
**Figure 4**. The results

In this exercise, I noticed that there are several issues with SIGNUM:
- There is no deposit process. Hence, I cannot simulate the formation of the alluvial plain, so does the aeolian landform.
- The fluvial erosion is a fixed number or with a little variation by a self-define function. In the real world, precipitation and the river channel are highly related to climate and topography.
- Lithology is also a big issue. If could be better if we define a Kd and Kc matrix, however there is probably a different and complicated mechanism in some areas, for example, limestone terrains.
- There is no glacial erosion process.

**References**

- Chen, A., Darbon, J., & Morel, J.-M. (2014). Landscape evolution models: A review of their fundamental equations. _Geomorphology_, _219_, 68–86. https://doi.org/10.1016/j.geomorph.2014.04.037
- Refice, A., Giachetta, E., & Capolongo, D. (2012). SIGNUM: A Matlab, TIN-based landscape evolution model. _Computers & Geosciences_, _45_, 293–303. https://doi.org/10.1016/j.cageo.2011.11.013
- Summerfield, M. A. (2008). _Global geomorphology: An introduction to the study of landforms_ (Nachdr.). Pearson, Prentice Hall.