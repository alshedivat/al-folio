---
layout: page
title: Energy Forecasting
description: XGboost model for energy forecasting
img: /assets/img/1.jpg
importance: 2
category: Data Science
---

*You can find the full code in [here](https://github.com/DanielDaCosta/energy-forecast)*

This repository code came from the work of [Mario Dagrada](https://github.com/madagra/energy-ts-analysis), special thanks for the help.

The repository consists of an energy forecasting model using XGboost. The dataset consists of hourly energy consumption rates in kWh for an industrial utility over a period of around 7 months, from July 2019 to January 2020.

The final model has an *forecasting horizon* (The number of time periods to forecast into the future) of 48 time periods which corresponds to 2 days ahead forecasting. 

# Details
Main techniques and terms used:
- Trend, Seasonality
- Stationary and Non-Stationary Time Series
- Augmented Dickey-Fuller Test
- Autocorrelation(ACF) and Partial Autocorrelation(PACF)
- Feature Engineering (lag features, standard time series features, endogenous features)
- XGBoost model with Bayesan hyperparameters optimization

The final model can be found inside ```model/```

# Usage
The Jupyter-Notebook, dataset and model were saved as Docker Image in GitHub Package.
You can install the package locally:
```
docker pull docker.pkg.github.com/danieldacosta/energy-forecast/energy-forecast_notebook:v1
```

You can also download it direct from the repository:

```
git clone https://github.com/DanielDaCosta/energy-forecast.git
```


# Acknowlegments & References
Special thanks to Mario Dagrada [Medium post](https://towardsdatascience.com/ml-time-series-forecasting-the-right-way-cbf3678845ff).

**References**:
- https://www.youtube.com/watch?v=Nm7m92sZZJA
- https://towardsdatascience.com/containerize-your-whole-data-science-environment-or-anything-you-want-with-docker-compose-e962b8ce8ce5
