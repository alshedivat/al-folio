---
layout: distill
title: How to read netCDF file in Python
description:
giscus_comments: true
date: 2018-10-02

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
NetCDF (nc) file format is a widely used data format in Geo, Earth, and planetary science field. To import nc data to python workspace, we will need to install a necdf4 package in python. Depending on your python software tool search online on how to install package for that specific python tool. If you are using anaconda3 like I just follow the instructing below:

open Anaconda > Go to Environment > click in search package and write netcdf4 > click check button to install netcdf4 package.

After installing the package open the python terminal (I use spyder/ipython terminal) and follow the script:

`from netCDF4 import Dataset as nc`
#this line imports the package we just installed


`file=nc('/Users/afahad/Desktop/slp.mon.mean.nc')` # this line defines the file path of the file we are trying to read

#read variable

`slp=file.variables['slp'][:]` # ":" takes all the data dimension from the file
{%highlight Python%}
lon=file.variables['lon'][:]
lat=file.variables['lat'][:]
time=file.variables['time'][:]
{%endhighlight%}

To make sure if your data dimensions are right you can type the following commands and check if they match:

{%highlight Python%}
slp.shape
lon.shape
lat.shape
time.shape
{%endhighlight%}
Install anaconda: [https://www.anaconda.com/](https://www.anaconda.com/)

Alternatively, you can use rnc function  from aoespy toolbox to read as in one line as:

`slp=rnc('slp','/Users/afahad/Desktop/slp.mon.mean.nc')`

AOESPY toolbox link: [Click here](https://github.com/afahadabdullah/AOESpy)
