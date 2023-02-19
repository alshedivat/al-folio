---
layout: distill
title: Download Climate Data
description:  List of different climate data sources and their uses
giscus_comments: true
tags: Data
categories: Data_Handling
date: 2018-10-29

authors:
  - name: Abdullah Al Fahad
    url: "https://scholar.google.com/citations?user=60Bz9LYAAAAJ&hl=en&oi=sra"
    affiliations:
      name: NASA GSFC


bibliography:

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).

toc:
  - name: NOAA, Earth System Research Laboratory
  - name: ECMWF, European Centre for Medium-Range Weather Forecasts
  - name: NCAR, National Center for Atmospheric Research
  - name: USA Gov Data
  - name: International Research Institute for Climate & Society
  - name: NASA, EARTHDATA

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
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









### NOAA, Earth System Research Laboratory
[List of Dataset1](https://psl.noaa.gov/data/gridded/)

[List of Dataset2](https://www.ncdc.noaa.gov/cdo-web/datasets)

Instead of clicking every single year file to download, python script can be used as:

{% highlight Python %}
import urllib.request
for i in range(1979,2018,1):
    print('donwloading year',i)
file='ftp://ftp.cdc.noaa.gov/Datasets/ncep.reanalysis.dailyavgs/surface/slp.'+str(i)+'.nc'
data='slp.'+str(i)+'.nc'
urllib.request.urlretrieve(file, data)
{% endhighlight %}


This script downloads SLP daily data from 1979 to 2017 without clicking all files one by one.


### ECMWF, European Centre for Medium-Range Weather Forecasts

[List of all Dataset](https://www.ecmwf.int/en/forecasts/datasets)

Example python script for downloading from ECMWF:
{% highlight Python %}
from ecmwfapi import ECMWFDataServer
from numpy import*
server = ECMWFDataServer()
for i in range(1979,2018,1):
    dat=str(i)+"-04-01/to/"+str(i)+"-09-30"
    tar="slp_era"+str(i)+".nc"
    server.retrieve({
        "class": "ei",
        "dataset": "interim",
        "date": dat,
        "expver": "1",
        "grid": "1/1",
        "levtype": "sfc",
        "param": "151.128",
        "step": "0",
        "stream": "oper",
        "time": "00:00:00/06:00:00/12:00:00/18:00:00",
        "type": "an",
        "area": "0/-180/-90/180",
        "format" : "netcdf",
        "target" :tar,
    })
{% endhighlight %}
[For details how to download using webAPI](https://confluence.ecmwf.int//display/WEBAPI/Access+ECMWF+Public+Datasets)

### NCAR, National Center for Atmospheric Research
[List of all Dataset](https://rda.ucar.edu/lookfordata/)


### USA Gov Data
[List of all Dataset](https://catalog.data.gov/dataset)


### International Research Institute for Climate & Society
The IRI Data Library is a powerful and freely accessible online data repository and analysis tool that allows a user to view, analyze, and download hundreds of terabytes of climate-related data through a standard web browser.

[List of all Dataset](http://iridl.ldeo.columbia.edu/)


### NASA, EARTHDATA
[Earth Observation Data](https://www.earthdata.nasa.gov/learn/get-started)
