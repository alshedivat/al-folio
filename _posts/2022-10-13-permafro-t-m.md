---
layout: post
title: Modeling permafrost global extent in three steps
author: Zhihao
description: Thawing permafrost is the function of the global warming
date: 2022-10-13
categories:
  - notes
tags:
  - Permafrost
  - Climate
lang: eng
publish: true
filename: 2022-10-13-permafrost-m
---

In this permafrost distribution modeling lab, we use the temperature dataset from climate reanalysis (EAR5) to estimate the permafrost global extent present and future empirically. Step1 is a short introduction to definitions and short review of the previous studies. Step 2 describes the equations from air temperature to the top temperature of permafrost in detail, and Step 3 discusses the results and compares it with the literature.

### Step 1: the Definitions and Concepts

By definition, ***Permafrost*** is ground that continuously remains below 0 °C for two or more years. Thus, the distribution of the permafrost is the function of the local air temperature, or the lost of the permafrost is a function of global warming[@chadburn.etal_2017].

Chadburn et al use ***MAAT*** (Mean annual air temperature) to describe the possibility of permafrost and achieve a good fit with International Permafrost Association (IPA) map of permafrost (Figure 1a, 1b, 1c). If this relationship keep unchanged in future, this characteristic could be used to estimate permafrost sensitivity to global warming. This study project 4 (-1.1 to +1.0) million km2 permafrost lost per degree warming up after considering arctic amplification. Stabilizing at 1.5 C rather than 2 C would save approximately 2 million km2 of permafrost (Figure 1d). This lab is going to examine these results.

![](https://i.imgur.com/ihDMkJp.png)
**Figure 1 MAAT-Permafrost relationship and permafrost sensitivity to global warming**

The difference between **GST*** (Ground surface temperature) and air temperature is the ***surface offset***, which related to topoclimate variables such as vegetation, snow cover, soil moisture and topography[@gisnas.etal_2013]. Numerical model for instance the surface energy balance can used to elaborate this. In general, snow cover result negative offset in harsh cooling season, which means GST is obvious warmer than air temperature.

The ***TTOP*** is the mean annual temperature at the top of the permafrost, which is the straight forward to definition of the permafrost. The heat flux is dominated by thickness, thermal conductivity, and temperature gradient.

### Step 2: the Equations

The mean annual ground surface temperature:

$$ MAGST = \frac{n_{t}*TDD_{air} - {n_{f}*FDD_{air}}}{\tau}$$
where
$$FDD = \sum_{i} |T_{i} - T_{freezing}| $$
$$TDD = \sum_{j} T_{j} - T_{freezing} $$
$$n_{f} = \frac{FDD_{ground surface}}{FDD_{air}}$$
$$n_{t} = \frac{TDD_{ground surface}}{TDD_{air}}$$
From air temperature to MAGST, we add the two empirical ratio nf (e.g. the insulation of snow cover) and nt (e.g. albedo, vegetation, moisture). From MAGST to TTOP, as the thermal conductivity of ice is four times of water, we take into account by modifying the equation to:

$$ TTOP = \frac{n_{t}*TDD_{air}*r_{r} - {n_{f}*FDD_{air}}}{\tau}$$
where
$$r_{k} = \frac{k_{thawed}}{k_{frozen}}$$

### Step 3: Implement and Discussion

(1) Trying different temperature threshold
- Fit the MAGST with IPA map.
- Monthly average temperature from 1948 to 2016.
- nt * r = 0.7 and nf = 0.7.

As figure 2a show, the black line outlines the MAGST = 0 C, and dash blue lines describe the MAGST = -5 C and 5 C correspond. Inside the contour line of -5 C, the fraction of permafrost is very colse to 1, and most of permafrost can not exceed the contour line of 5 C. 

![](https://i.imgur.com/S4D8iZ5.png)
**Figure 2** **The extent of permafrost by TTOP**

(2) Trying different nf
- nt * r = 0.7, and nf = 0.4, 0,7, 1.0
Regarding the black line (nf=0.7) as a basis, the red line (nf=0.4) is a scenario with more snow cover, and the blue line (nf=1) is without snow.

(3) Trying different nt * r
- Monthly average temperature from 1961 to 1990.
- nt * r = 0.7 and nf = 0.7 (Figure 3 left)
- nt * r = 1 and nf = 0.7  (Figure 3 right)
- 
![](https://i.imgur.com/4m6NR18.png)
**Figure 3** **The projection of permafrost size to global warming**

Figure 3 display the global size projection of the permafrost to global warming. We assume the Arctic amplification is 2x to global average warming. So, the left plot has 4.6 million km2 per 2 degree permafrost lost, and the right plot 4.2 million km2 per 2 degree permafrost lost. Both results are consistent with Chadburn's estimates.

The extent of permafrost can be derived purely from MAAT or MAGST. That is to say, the climate normal dominates the permafrost under the equilibrium state. However, there are some discontinuous permafrost in mountain area locate outside the zero isotherm (Figure 2a). To map these regions, the higher resolution dataset can help. On other hand, the parmefrost under transient state needs more accurate topoclimate inputs.

Adjusting nf (the coefficient related to snow cover) from 1 to 0.4, the permafrost zone has significantly shifted from north to south, except the Tibet Plateau where the altitude controls local climate (Figure 2b). The snow condition is equivalent to few degrees of temperature change.
The size of the permafrost, or the size of the land where MAGST is between 0 C to 2 C, is around 4.2 – 4.6 million km2 which is undermined right in front by global warming. The accurate estimation of parmorfrost sensitivity relies on the Arctic amplification effect and parmorfrost transient response to warming. Topoclimate variables once again be cricial to explain the thaw lags behind the climate warming.














