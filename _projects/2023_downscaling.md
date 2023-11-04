---
layout: page
title: From climate modeling to energy system modeling...
description: Statistical downscaling and bias correction.
img: assets/img/post/climate/cover.png
bibliography: lib.bib
importance: 1
year: 2023
category: work
---

Understanding the availability and variability of solar and wind energy resources is crucial for designing and planning optimal energy systems. However, existing climate models (GCM) have limitations in terms of resolution and bias. 

How the variability and change of climate/weather system can affect the energy system?
Can machine learning help accurately predicting radiation and wind fields at fine scales?

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iAH_7MXInyfg/v0/1200x715.png" title="Sub-Zero Power" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Renewable Energy Burst Sends Dutch Power Prices to Lowest Ever - Source: Bloomberg.
</div>


# Evaluating CMIP6 wind speed by quantile-based bias adjustment and downscaling methods

## Introduction

The accuracy of wind speed projections is essential for effective planning and decision making in the renewable energy sector. CMIP6 (Coupled Model Intercomparison Project Phase 6) is the latest generation of climate models used to project future climate conditions. However, (i) these models often exhibit biases in their wind speed projections when compared to observed data. (ii) Most analyses on CMIP6 provide results at the native resolution of the model, which may not adequately represent sub-grid changes. (iii) Moreover, the presence of non-stationary bias and low signal-to-noise ratio further necessitates comprehensive bias correction approaches.

These gaps in the CMIP6 datasets emphasize the need for additional processing when using them in wind energy modeling. One simple approach is to adjust the mean and/or variance of the dataset based on a reference dataset, such as the Global Wind Atlas (GWA) <d-cite key="gruber.etal_2022, murcia.etal_2022"></d-cite>. More advanced adjustments (or transfer function) can be made by bias correction and/or downscaling models. Among of these techniques, quantile-based bias adjustment is a statistical method that matches the quantiles to ensure the datasets have the same cumulative density function (CDF) curve <d-cite key="best.panofsky_1956"></d-cite>. When the simulations are matched to reference observations, the bias are removed and the finer resolution are also achieved. However, traditional Quantile Mapping (QM) methods may alter changing signals when applied it beyond the observation periods <d-cite key="maraun_2016"></d-cite>.

To address the issue of QM, @cannon.etal_2015 introduced a trend-preserving method called Quantile Delta Mapping (QDM). QDM captures trends derived from CMIP6 future and historical simulations based on quantiles, including extreme wind speeds and average wind speeds. These trends are then applied to detrend-simulations. @li.etal_2010 introduced a similar method called equidistant CDF matching (EDCDFm), which is equivalent to QDM but follows different steps. EDCDFm uses quantiles to describe the bias between simulations and observations and assumes that this bias is stationary, allowing it to be used in future simulations.

While most quantile-based methods are commonly used for temperature and precipitation, their application in wind speed is relatively unexplored. Therefore, this study aims to utilize trend-preserving methods like QDM and EDCDFm to debias and downscale windspeed simulations from CMIP6. By employing these approaches, the accuracy of future projections for wind energy applications are expected to be enhanced. The specific objectives of this study is to answer:

1) Are there significant changes in wind speed signals from CMIP6 or is it mostly noise?
2) Can QDM and EDCDFm make CMIP6 wind speed simulations useful for energy system modeling?
3) If yes, what are the strengths? If not, what are the remaining challenges?

This paper is organized as follows: section 2 depicts the data and data pre-processing. In section 3, the QDM and EDCDFm are described and compared. In section 4 this study present the results, and in section 5 the discussion and our conclusions are provided. The exploration on quantile-based bias adjustment and downscaling methods will aid in determining their suitability for energy system modeling using CMIP6 wind speed data.

## Data setting

The ERA5 reanalysis data is obtained by running a numerical weather prediction model, which simulates the behavior of the atmosphere based on physical equations. Observations from various sources are assimilated into the model to adjust the simulations to better match the observed atmospheric conditions. The resulting ERA5 reanalysis data provides hourly information at approximately 30 km horizontal grid spacing. 

Global Climate model (GCM) simulations, like those in CMIP6, are computer-based representations of the Earth's climate system. These models simulate various components of the climate system, such as the atmosphere, ocean, land surface, and sea ice, and their interactions over time by differential physics equations. These equations are solved numerically to simulate the long term behavior of the climate system under different scenarios or conditions. It contains the changing signals but also suffering from bias and coarse-resolution.

This study focuses on the Scandinavian Peninsula and examines the changing wind speed patterns in this region. Two coarse resolution GCMs, CMCC-CM2 and CMCC-ESM2 from CMIP6 Shared Socioeconomic Pathways (SSP) 585, are used, along with the ERA5 dataset as a reference. Table @tbl:dataset and Figure @fig:dataset provide an overview of the dataset used. At a specific location (011° East and 60° North), no significant trends in wind speed were observed (Figure @fig:dataset a,b). 

In order to further analyze the changing wind speed signals, this study compares the wind speed baseline data from the Global Climate Models (GCMs) for the period between January 1, 1980, and December 31, 1999. To extract the changing signals, a ten-year moving window approach is employed for the time span from 2015 to 2060 (e.g., 2015-2025, 2016-2026...2050-2060) (see Figure @fig:dataset a,b).

To assess the discrepancy between GCMs and ERA5 data, a comparison is made for the period of 1999-2014. Both CMCC-CM2 and CMCC-ESM2 models exhibit similar patterns to ERA5-Coarsen; however, significant biases are observed (refer to Figure @fig:dataset d,e,f). These differences are captured by quantiles and serve as inputs for training the EDCDFm bias adjustment model. 

The validation of downscaling is conducted using ERA5 and ERA5-Coarsen data from the period between 1999 and 2014. The period of 1999 to 2013 are used in training, and year 2014 is utilized to assess the accuracy and reliability of the downscaling technique.



Table: Data setting {#tbl:dataset}

| Type               | Dataset      | Date      | Type       | Temporal interval | Spatial grid | SSP  |
| ------------------ | ------------ | --------- | ---------- | ----------------- | ------------ | ---- |
| CMIP6              | CMCC_CM2     | 1980-2014 | Historical | 6-hourly          | ~100 km      | -    |
|                    | CMCC_CM2     | 2015-2060 | Projection |                   |              | 585  |
|                    | CMCC_ESM2    | 1980-2014 | Historical |                   |              | -    |
|                    | CMCC_ESM2    | 2015-2060 | Projection |                   |              | 585  |
| Climate Reanalysis | ERA5         | 1999-2014 | Historical | hourly            | ~30 km       | -    |
|                    | ERA5_Coarsen | 1999-2014 | Historical |                   | ~100 km      | -    |



<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="https://i.imgur.com/Z844paa.jpg" style="width:100.0%" alt="The windspeed from CMIP6 and ERA5 (a)CMCC-CM2 weekly mean 1980-2060,(b) CMCC-ESM2 weekly mean 1980-2060,(c) ERA5 weekly mean 1999-2014,(d) average windspeed of CMCC-CM2 1999-2014,(e)average windspeed of CMCC-ESM2 1999-2014,(f) average windspeed of ERA5 coarsen 1999-2014.The left black box indicates the baseline (1980-1999) and the right black box represents where the time windows from. All windspeed is at height 60m above the ground." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">The windspeed from CMIP6 and ERA5 (a)CMCC-CM2 weekly mean 1980-2060,(b) CMCC-ESM2 weekly mean 1980-2060,(c) ERA5 weekly mean 1999-2014,(d) average windspeed of CMCC-CM2 1999-2014,(e)average windspeed of CMCC-ESM2 1999-2014,(f) average windspeed of ERA5 coarsen 1999-2014.The left black box indicates the baseline (1980-1999) and the right black box represents where the time windows from. All windspeed is at height 60m above the ground.
</div>



## Methodology

The change signals are described by mean or median, or in more general, can also be described by quantiles individually. QDM <d-cite key="cannon.etal_2015"></d-cite> is a technique widely used to preserve trends over historical and future simulations at all quantiles. Figure @fig:method a, b show the workflow of QDM. It extracts the trend $\Delta W_{s}$ and adds it back to the adjusted timeseries to get the downscaled results $\hat{x}_{sf}$ by following steps:

The non-exceedance probability (quantiles) $Q_{sf}$ is obtained from the CDF (cumulative density function) $F_{sf}$ by simulated future (sf) variable $x_{sf}$:

$$
Q_{sf} = F_{sf} (x_{sf}), Q_{sf} \subseteq (0,1)
$$

So the relative changes on quantiles over simulated historical and future periods $\Delta W_{s}$ is:

$$
\Delta W_{s} = \frac{F_{sf}^{-1}[Q_{sf}]}{F_{sh}^{-1}[Q_{sf}]} = \frac{x_{sf}}{F_{sh}^{-1}[Q_{sf}]}
$$

Using the inversed CDF estimated from observed historical $x_{oh}$ to correct $Q_{sf}$ and get bias adjusted $\hat{x}_{oh:sf}$:

$$
\hat{x}_{oh:sf} = F^{-1}_{oh}[Q_{sf}]
$$

By adding the trend into the bias adjusted dataset $\hat{x}_{oh:sf}$, the projected variable $\hat{x}_{sf}$ is:
$$
\hat{x}_{sf} = \hat{x}_{oh:sf}\cdot{}\Delta W_{s}
$$


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="https://i.imgur.com/g708yFh.jpg" style="width:100.0%" alt="Theschematicoftwoquantile-basedmethod.(a)Howtogetdownscaledandbias-freesimulationsinfuture.(b)QDMusesquantilesdescribingthechangesignals(\Delta W_{s})(c)EDCDFmusesquantilescapturethebiasbetweenmodelsimulationandobservations.InthisstudymodelisfromCMIP6,andobserveddatasetisERA5." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The schematic of two quantile-based method.<br>
    (a) How to get downscaled and bias-free simulations in future.<br>
    (b) QDM uses quantiles describing the changes signals (<span class="math inline"><em>Δ</em><em>W</em><sub><em>s</em></sub></span>).<br>
    (c) EDCDFm uses quantiles to capture the bias between model simulation and observations.<br>
    In this study, the model is from CMIP6, and the observed dataset is ERA5.
</div>


The method EDCDFm, as shown in Figure @fig:method a, c, describes the discrepancy between simulations and bias-free, fine-resolution observations using quantiles. These discrepancies are then used as adjustment factors for future simulations. The underlying assumption of this method is that the differences between modeled and observed values during the reference period will remain consistent in a future period. The downscaled variable $\hat{x}_{sf}$ is calculated as follows <d-cite key="li.etal_2010"></d-cite>:

$$
\hat{x}_{sf} = {x}_{sf} + F^{-1}_{oh}[Q_{sf}] - F^{-1}_{sh}[Q_{sf}]
$$

Although EDCDFm and QDM are equivalent methods <d-cite key="cannon.etal_2015"></d-cite>, they employ different workflows (@fig:method a), in this study, both methods were adopted to generate a downscaled dataset that provides bias-free results at the same resolution as ERA5. To further assess potential seasonal variations in wind speed, the trends $\Delta W_{s}$ from QDM were further grouped by week of year and/or month of year.

The evaluation will follow the steps: (1) comparing the changing signals from CMCC-CM2 and CMCC-ESM2; and (2) comparing the adjusted and downscaled wind speed projections from QDM and EDCDFm at different locations and time periods, (3) Validate the downscaled results by ERA5. Various performance metrics such as mean bias, root mean square error, and Spearman correlation coefficient, R-squared value will be used to assess the accuracy of the adjusted and downscaled projections. All implementations are in Python and can be accessed from [GitHub](https://github.com/guillerval/summerproject23_CMIP6downscaling/tree/hao-dev).



## Results

### The changing signals $$\Delta W_{s}$$ from CMIP6

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="https://i.imgur.com/e4o8JoM.jpg" alt="The windspeed trend from CMCC-CM2 and CMCC-ESM2 at site(011°E,60°N) are different.(a) CMCC-CM2,(b) CMCC-ESM2. Windspeed trend are represented as ratios, which compare the windspeeds in a 10-year moving window between 2015-2060 to a baseline period(1980.01-1999.12),across different quantiles. From top to bottom, each row represents quarter 1(Jan to Mar), quarter 2(Apr to Jun), quarter 3(Jul to Sep) and quarter 4(Oct to Dec)." %}
    </div>
</div>
<div class="caption">
    The windspeed trend from CMCC-CM2 and CMCC-ESM2 at site (011°E, 60°N) are different.(a) CMCC-CM2, (b) CMCC-ESM2. Wind speed trends are represented as ratios, which compare the wind speeds in a 10-year moving window between 2015-2060 to a baseline period (1980.01-1999.12), across different quantiles. From top to bottom, each row represents quarter 1 (Jan to Mar), quarter 2 (Apr to Jun), quarter 3 (Jul to Sep), and quarter 4 (Oct to Dec).
</div>




The changing signals of wind speed at coordinates 011° E and 60° N were determined by the ratio of windspeed from a 10-year window to a baseline period. The analysis of trends using the CMCC-CM2 and CMCC-ESM2 models suggests a weak trend at this location. Figure @fig:trend illustrates the trends of wind speed in four quarters. None of the quarters demonstrate similarity between the CMCC-CM2 and CMCC-ESM2 models, indicating low consistency between these two models at this location from 2016 to 2060.

Figure @fig:trend_map demonstrates the wind speed trends over the Scandinavian Peninsula, revealing differences between CMCC-CM2 and CMCC-ESM2 models. The quantification of trends is based on the median value (Q50). The CMCC-CM2 exhibits a more pronounced negative trend when compared to CMCC-ESM2. In general, projections indicate a decreasing trend in both the Norwegian Sea and Baltic Sea for most years. However, specific trends within the Scandinavian Peninsula from 2016 to 2060 are not clearly observed.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="https://i.imgur.com/S2T0bpn.gif" alt="Thetrendofmedianwindspeed(Q50)2015-2060.Thetrendiscalculatedina10-year-windowrelativetobaselinefromCMCC-CM2(top)andfromCMCC-ESM2(bottom).Visithttps://i.imgur.com/S2T0bpn.giftogetthedynamicgif." %}
    </div>
</div>
<div class="caption">
    The trend of median windspeed (Q50) 2015-2060. The trend is calculated in a 10-year window relative to baseline from CMCC-CM2 (top) and from CMCC-ESM2 (bottom). Visit https://i.imgur.com/S2T0bpn.gif to get the dynamic gif.
</div>



Specific to the period from 2050 to 2060, Figure @fig:trend_chart shows the changing trend at coordinates 011° E and 60° N. The CMCC-CM2 model shows a strong positive trend across all quantiles in weeks 10 to 12. On the other hand, the CMCC-ESM2 model exhibits a positive trend at weeks 43 to 45. The fact that the two models show different trends suggests that they have distinct projections for this region and time period. These differences in trends have implications for any analysis or decision-making based on these models' results (Figure @fig:trend_chart b, d). Depending on the specific application, it may be necessary to consider both models' projections and their respective uncertainties.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="https://i.imgur.com/6g1Kslx.jpg" alt="Comparisonofwindspeedtrend2050-2060atcoordinates011°Eand60°N.(a)ThechangingsignalsofCMCC-CM22050-2060tobaseline(1980-1999).(b)Mappingthesignalsfrom(a)towindspeedtimeseriesofyear1999.(c)ThechangingsignalsofCMCC-ESM22050-2060tobaseline(1980-1999)(d)Mappingthesignalsfrom(c)towindspeedtimeseriesofyear1999." %}
    </div>
</div>
<div class="caption">
    Comparison of windspeed trend 2050-2060 at coordinates 011°E and 60°N.<br>
    (a) The changing signals of CMCC-CM2 2050-2060 to baseline (1980-1999).<br>
    (b) Mapping the signals from (a) to windspeed timeseries of year 1999.<br>
    (c) The changing signals of CMCC-ESM2 2050-2060 to baseline (1980-1999).<br>
    (d) Mapping the signals from (c) to windspeed timeseries of year 1999.
</div>

### The downscaled windspeed 2050 to 2060

The windspeed project of CMCC-CM2 and CMCC-ESM2 exhibit inconsistencies when compared at seasonal to yearly time scales. To specific time period from year 2050 to 2060, QDM and EDCDFm yield similar downscaled results, with R-squared coefficients exceeding 0.995. However, the projections of CMCC-CM2 and CMCC-ESM2 differ significantly, resulting in downscaled results with R-squared coefficients below 0.008. Specifically, at coordinates 011° E and 60° N (Oslo, Norway), the model simulations indicate lower windspeeds. And, the downscaled windspeeds are adjusted higher and adopt the patterns observed in the models. For instance, between 2050 and 2054, the peak windspeed of downscaled ESM2 (shown in green on Figure @fig:downscaled_chart a) follows the rising trend of raw ESM2 (shown in orange on Figure @fig:downscaled_chart a). Similarly, at coordinates 005.5° E and 60.5° N (Bergen, Norway), the downscaled estimation reduces the windspeeds from the model while preserving the underlying patterns. So, the downscaling cannot "correct" the inherent bias of models, but just rescale it to match the distribution trained by ERA5.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
    <img src="https://i.imgur.com/GB39Q0T.jpg" alt="Comparison of downscaled windspeeds at coordinates 011° E and 60° N using QDM and EDCDFm methods from 2050 to 2060 (a) Oslo, Norway (b) Bergen, Norway. The reference dataset for downscaling is ERA5 (1999-2014)">
	</div>
</div>
<div class="caption"> Comparison of downscaled windspeeds at coordinates 011° E and 60° N using QDM and EDCDFm methods from 2050 to 2060 (a) Oslo, Norway (b) Bergen, Norway. The reference dataset for downscaling is ERA5 (1999-2014)
</div>



### The downscaled windspeed on validation dataset

The validation results for the year 2014 using three different timespans indicate that the quantile-based downscaling method effectively reproduces most of the details on ERA5 coarsen dataset, demonstrating its effectiveness in downscaled windspeed estimation. Figure @fig:downscaled_2014 presents the validation results for the year 2014 at time span: monthly, seasonally, and yearly. The quantile-based downscaling method successfully reproduces most of the details on ERA5 coarsen dataset. As discussed in previous sections, there is a bias present in the CMCC-CM2 model, resulting in significant residuals compared to ERA5 coarsen dataset. Moreover, as the timespan increases to 4 months and a year, these residuals become less pronounced. Specifically, the downscaled yearly average windspeed shows a much closer agreement with ERA5 validation compared to the weekly average. These findings indicate that while there are low signal-to-noise ratio in the CMCC-CM2 model, the aggregation along time axis can still make the downscaled windspeed presenting the correct subgrid details. Overall, the quantile-based downscaling method effectively reproduces most of the details on ERA5 coarsen dataset, validating its accuracy and robustness in downscaled windspeed estimation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
	<img src="https://i.imgur.com/p4h0m7y.jpg" style="width:75.0%" alt="Downscale windspeed from ERA5 Coarsen and CMCC-CM2 and validation by ERA5. (a) mean windspeed 2014.01.01 to 2014.01.30 (b) mean windspeed 2014.01.01-2014.03.30 (c) mean windspeed 2014.01.01-2014.12.31. The training dataset is ERA5 between 1999 and 2013.">
	</div>
</div>
<div class="caption"> Downscale windspeed from ERA5 Coarsen and CMCC-CM2 and validation by ERA5. (a) mean windspeed 2014.01.01 to 2014.01.30 (b) mean windspeed 2014.01.01-2014.03.30 (c) mean windspeed 2014.01.01-2014.12.31. The training dataset is ERA5 between 1999 and 2013.
</div>


## Discussion and Conclusion

This research aimed to enhance the accuracy of wind speed projections by employing trend-preserving methods, namely Quantile Delta Mapping (QDM) and Empirical Distribution Function Mapping (EDCDFm), to debias CMIP6 simulations and increase spatial resolution. The study encompassed the following key findings:

1. The trend extraction from CMCC-CM2 and CMCC-ESM2 revealed low consistency between these two climate models. Changing signals exhibited weak patterns in most areas and time periods, with wind speed trends sometimes exhibiting opposing directions. Expanding the ensemble to include more models may help mitigate uncertainties in wind speed simulations.
2. QDM and EDCDFm, while mathematically identical, produced very similar downscaled results. Both methods effectively captured details when applied to synthetic ERA5 coarsened datasets. However, it is important to note that these techniques did not fully correct CMCC-CM2; instead, they inherited bias patterns from the original climate models.
3. Despite the low signal-to-noise ratio of climate models, the downscaled models still demonstrated subgrid variability at both seasonal and yearly mean values. This observation highlights the potential of the downscaling techniques to capture fine-scale variations despite the limitations of climate models. In other words, the climate models so far is not able to provide reliable simulation at weekly, daily, hourly intervals for energy system modeling.
4. Bias correction and downscaling can be executed as a single step (QDM, EDCDFm) or through separate steps, such as the Bias Correction and Spatial Disaggregation (BCSD) model. While spatial disaggregation proved feasible, with quantile mapping demonstrating satisfactory performance, addressing bias proved more intricate. Purely statistical methods like QDM only 'rescale' datasets while retaining ranks, which may not be sufficient to correct datasets with erroneous 'ranks'. Climate models, featuring time-dependent bias along the time axis and unrealistic spatial circulations, require the introduction of additional variables to capture and remove such bias patterns.

In conclusion, this research makes significant strides towards improving the accuracy of wind speed projections for renewable energy systems by utilizing trend-preserving methods and increasing spatial resolution. The findings highlight the uncertainties arising from inconsistencies between climate models. Both QDM and EDCDFm demonstrated comparable downscaled results, effectively capturing fine-scale details but facing challenges in fully 'correcting' biases in climate models. To feed energy system with reliable simulations, more advanced bias techniques are needed.

## References

Best, W. H., & Panofsky, H. A. (1956). *Some Applications of Statistics to Meteorology*. Mineral Industries Extension Services, School of Mineral Industries, Pennsylvania State College.

Cannon, A. J., Sobie, S. R., & Murdock, T. Q. (2015). Bias Correction of GCM Precipitation by Quantile Mapping: How Well Do Methods Preserve Changes in Quantiles and Extremes? *Journal of Climate*, *28*(17), 6938–6959. https://doi.org/10.1175/JCLI-D-14-00754.1

Gruber, K., Regner, P., Wehrle, S., Zeyringer, M., & Schmidt, J. (2022). Towards global validation of wind power simulations: A multi-country assessment of wind power simulation from MERRA-2 and ERA-5 reanalyses bias-corrected with the global wind atlas. *Energy*, *238*, 121520. https://doi.org/10.1016/j.energy.2021.121520

Li, H., Sheffield, J., & Wood, E. F. (2010). Bias correction of monthly precipitation and temperature fields from Intergovernmental Panel on Climate Change AR4 models using equidistant quantile matching. *Journal of Geophysical Research*, *115*(D10). https://doi.org/10.1029/2009JD012882

Maraun, D. (2016). Bias Correcting Climate Change Simulations - a Critical Review. *Current Climate Change Reports*, *2*(4), 211–220. https://doi.org/10.1007/s40641-016-0050-x

Murcia, J. P., Koivisto, M. J., Luzia, G., Olsen, B. T., Hahmann, A. N., Sørensen, P. E., & Als, M. (2022). Validation of European-scale simulated wind speed and wind generation time series. *Applied Energy*, *305*, 117794. https://doi.org/10.1016/j.apenergy.2021.117794
