---
layout: distill
title: Detrend a Timeseries in Python
description: To find inter-annual variability and correlation between two time series variable that excludes the influence of external forcing (i.e. global warming), we might want to detrend the time series of variables. For detrending, we will use scipy package of python.
giscus_comments: true
date: 2019-07-29

authors:
  - name: Abdullah Al Fahad
    url: "https://scholar.google.com/citations?user=60Bz9LYAAAAJ&hl=en&oi=sra"
    affiliations:
      name: NASA GSFC



#toc:
#  - name: Bash commands
#  - name: CDO

_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }

---

Let's say if we have sea level pressure variable with 38 years of data that has 360 longitude and 180 latitude. First will import `scipy` package in our python library.

example pip install cmd: `python -m pip install --user numpy scipy`

For more follow this [link](https://scipy.org/install/)

Now example script for detrending:

{%highlight Python%}
import numpy as np
from scipy import signal
{%endhighlight%}

Now read the data. For example I'm using SLP

{%highlight Python%}
slp.shape
> (38,180,360) #time, lat, lon
{%endhighlight%}

Now use signal function to detrend the variable:
{%highlight Python%}
slp_detrended=np.zeros(slp.shape)
for i in range(len(lat)):
    for j in range(len(lon)):
        slp_detrended[:,i,j]= signal.detrend(slp[:,i,j])
{%endhighlight%}

**What is data detrending:** Detrending is **removing a  [trend](https://www.statisticshowto.datasciencecentral.com/trend-analysis/) from a [time series](https://www.statisticshowto.datasciencecentral.com/timeplot/)**; a trend usually refers to a change in the mean over time. When you detrend data, you remove an aspect from the data that you think is causing some kind of distortion. For example, you might detrend data that shows an overall increase, in order to see subtrends. Usually, these subtrends are seen as fluctuations on a time series graph. [source](https://www.statisticshowto.datasciencecentral.com/detrend-data/)
