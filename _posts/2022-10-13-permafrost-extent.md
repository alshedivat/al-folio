---
layout: post
title: Modeling permafrost global extent in three steps
author: Zhihao
description: Lap report
date: 2022-10-13
tags: notes code # notes\links\code\math\images
categories: permafrost climate # topic, in small case
bibliography: lib.bib
csl: C:\Users\ZOZN109\AppData\Local\Pandoc\apa.csl
lang: eng
publish: yes
---

In this permafrost distribution modeling lab, we use the temperature dataset from climate reanalysis (EAR5) to estimate the permafrost global extent present and future empirically. Step1 is a short introduction to definitions and short review of the previous studies. Step 2 describes the equations from air temperature to the top temperature of permafrost in detail, and Step 3 discusses the results and compares it with the literature.

### Step 1:   the definitions and concepts

By definition, ***Permafrost*** is ground that continuously remains below 0 °C for two or more years. Thus, the distribution of the permafrost is the function of the local air temperature, or the lost of the permafrost is a function of global warming[@chadburn.etal_2017].

Chadburn et al use ***MAAT*** (Mean annual air temperature) to describe the possibility of permafrost and achieve a good fit with International Permafrost Association (IPA) map of permafrost (Figure 1a, 1b, 1c). If this relationship keep unchanged in future, this characteristic could be used to estimate permafrost sensitivity to global warming. This study project 4 (-1.1 to +1.0) million km2 permafrost lost per degree warming up after considering arctic amplification. Stabilizing at 1.5 C rather than 2 C would save approximately 2 million km2 of permafrost (Figure 1d). This lab is going to examine these results.

<img src="https://i.imgur.com/ihDMkJp.png" width="770">
**Figure 1 MAAT-Permafrost relationship and permafrost sensitivity to global warming**

The difference between **GST*** (Ground surface temperature) and air temperature is the ***surface offset***, which related to topoclimate variables such as vegetation, snow cover, soil moisture and topography[@gisnas.etal_2013]. Numerical model for instance the surface energy balance can used to elaborate this. In general, snow cover result negative offset in harsh cooling season, which means GST is obvious warmer than air temperature.

The ***TTOP*** is the mean annual temperature at the top of the permafrost, which is the straight forward to definition of the permafrost. The heat flux is dominated by thickness, thermal conductivity, and temperature gradient.

### Step 2:  the equations

The mean annual ground surface temperature:

$$
MAGST = \frac{n_{t}*TDD_{air} - {n_{f}*FDD_{air}}}{\tau}
$$



where

$$
FDD = \sum_{i} |T_{i} - T_{freezing}| 
$$

$$
TDD = \sum_{j} T_{j} - T_{freezing}
$$

$$
n_{f} = \frac{FDD_{ground surface}}{FDD_{air}}
$$

$$
n_{t} = \frac{TDD_{ground surface}}{TDD_{air}}
$$



From air temperature to MAGST, we add the two empirical ratio nf (e.g. the insulation of snow cover) and nt (e.g. albedo, vegetation, moisture). From MAGST to TTOP, as the thermal conductivity of ice is four times of water, we take into account by modifying the equation to:
$$
TTOP = \frac{n_{t}*TDD_{air}*r_{r} - {n_{f}*FDD_{air}}}{\tau}
$$


where

$$
r_{k} = \frac{k_{thawed}}{k_{frozen}}
$$

### Step 3: Implement

{% highlight matlib linenos %}

load areas.mat
load ipa_map.mat
load NCEP_reanalysis.mat

%% Calculate TTOP
greenland = 1710000;
nf = 0.7;
r = 0.7; % rk * nt
offset = 0; % -5 to +5

aitT = airT.*land + offset;
TTOP = mean(airT.*(airT>0).*r + airT.*(airT<0).*nf,3);   % mean on aix=3 time domian(825 month)

%% make figure   -5 0 5

figure 
worldmap([25 90],[-180,180])
surfm(lat_ipa,lon_ipa,ipa_simple)
hold on
contourm(lat,lon,TTOP',[-5 -5],'b--')
hold on
contourm(lat,lon,TTOP',[5 5],'b--')
hold on
contourm(lat,lon,TTOP',[0 0],'k')
hold on
load coastlines
plotm(coastlat,coastlon)

%% nf=1 0.7 0.4
TTOP = mean(airT.*(airT>0).*r + airT.*(airT<0).*1,3);   % mean on aix=3 time domian(825 month)
TTOP_07 = mean(airT.*(airT>0).*r + airT.*(airT<0).*0.7,3);   % mean on aix=3 time domian(825 month)
TTOP_04 = mean(airT.*(airT>0).*r + airT.*(airT<0).*0.4,3);   % mean on aix=3 time domian(825 month)

figure 
worldmap([25 90],[-180,180])
surfm(lat_ipa,lon_ipa,ipa_simple)
hold on
contourm(lat,lon,TTOP',[0],'b')
hold on
contourm(lat,lon,TTOP_07',[0],'k')
hold on
contourm(lat,lon,TTOP_04',[0],'r')
hold on
%legend({'','nf=1','nf=0.8','nf=0.4'},'Location','southwest')

TTOP = TTOP.*land;
nansum(nansum(areas(1:60,:)'.*double(TTOP(:,1:60)<=0))) - greenland;
TTOP_07 = TTOP_07.*land;
nansum(nansum(areas(1:60,:)'.*double(TTOP_07(:,1:60)<=0))) - greenland;

%% As nf=1 and r =1, so TTOP = Annual air temp
AAT = mean(airT,3);   % mean on aix=3 time domian(825 month)

%% Time series

s_year = 1961;
e_year = 1990;
period = 12* (e_year -s_year );

start_i = find(time==datenum(s_year,1,1));
end_i = find(time==datenum(e_year,1,1));

global_PF_area = [];

for offset = -5:0.1:5
    airT_pos = airT+offset;
    airT_pos(airT_pos<0) = 0;
    TDD = sum(airT_pos(:,:,start_i:end_i),3);

    airT_neg = airT+offset;
    airT_neg(airT_neg>0) = 0;
    FDD = sum(airT_neg(:,:,start_i:end_i),3);
    
    nf = 0.7;
    r = 0.7;
    
    TTOP = (nf.*FDD + r.*TDD)/period;
    TTOP = TTOP.*land;
    global_PF_area = [global_PF_area;offset nansum(nansum(areas(1:60,:)'.*double(TTOP(:,1:60)<=0)))];

end
figure
plot(global_PF_area(:,1),(global_PF_area(:,2)-greenland))
xlabel('Temp [C]') 
ylabel('Size of the permafrost [m2]') 


{% endhighlight %}

(1) Trying different temperature threshold
- Fit the MAGST with IPA map.
- Monthly average temperature from 1948 to 2016.
- nt * r = 0.7 and nf = 0.7.

As figure 2a show, the black line outlines the MAGST = 0 C, and dash blue lines describe the MAGST = -5 C and 5 C correspond. Inside the contour line of -5 C, the fraction of permafrost is very colse to 1, and most of permafrost can not exceed the contour line of 5 C. 

<img src="https://i.imgur.com/S4D8iZ5.png" width="770">
**Figure 2** **The extent of permafrost by TTOP**

(2) Trying different nf
- nt * r = 0.7, and nf = 0.4, 0,7, 1.0
Regarding the black line (nf=0.7) as a basis, the red line (nf=0.4) is a scenario with more snow cover, and the blue line (nf=1) is without snow.

(3) Trying different nt * r
- Monthly average temperature from 1961 to 1990.
- nt * r = 0.7 and nf = 0.7 (Figure 3 left)
- nt * r = 1 and nf = 0.7  (Figure 3 right)

<img src="https://i.imgur.com/4m6NR18.png" width="770">
**Figure 3** **The projection of permafrost size to global warming**

Figure 3 display the global size projection of the permafrost to global warming. We assume the Arctic amplification is 2x to global average warming. So, the left plot has 4.6 million km2 per 2 degree permafrost lost, and the right plot 4.2 million km2 per 2 degree permafrost lost. Both results are consistent with Chadburn's estimates.

The extent of permafrost can be derived purely from MAAT or MAGST. That is to say, the climate normal dominates the permafrost under the equilibrium state. However, there are some discontinuous permafrost in mountain area locate outside the zero isotherm (Figure 2a). To map these regions, the higher resolution dataset can help. On other hand, the parmefrost under transient state needs more accurate topoclimate inputs.

Adjusting nf (the coefficient related to snow cover) from 1 to 0.4, the permafrost zone has significantly shifted from north to south, except the Tibet Plateau where the altitude controls local climate (Figure 2b). The snow condition is equivalent to few degrees of temperature change.
The size of the permafrost, or the size of the land where MAGST is between 0 C to 2 C, is around 4.2 – 4.6 million km2 which is undermined right in front by global warming. The accurate estimation of parmorfrost sensitivity relys on the Arctic amplification effect and parmorfrost transient response to warming. Topoclimate variables once again be cricial to explain the thaw lags behind the climate warming.

### References

Chadburn, S. E., Burke, E. J., Cox, P. M., Friedlingstein, P., Hugelius, G., & Westermann, S. (2017). An observation-based constraint on permafrost loss as a function of global warming. Nature Climate Change, 7(5), 340–344. 2022-10-04. https://doi.org/10.1038/nclimate3262
Gisnås, K., Etzelmüller, B., Farbrot, H., Schuler, T. V., & Westermann, S. (2013). CryoGRID 1.0: Permafrost Distribution in Norway estimated by a Spatial Numerical Model. Permafrost and Periglacial Processes, 24(1), 2–19. https://doi.org/10.1002/ppp.1765













