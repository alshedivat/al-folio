---
layout: distill
title: Linear regression in python, across time dimension for every lat lon grid
description: We will write a linear trend function for the 3-dimensional data set.
giscus_comments: true
date: 2018-10-13

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
The function will take input variable with [time, lat, lon] dimensions and gives output as 2-dimensional trend [lat, lon] and the p-value of the trend [lat, lon]. We can also define a significance value in function input (i.e. 0.05). If we input the significance value, output linear trend will be still in 2 dimensions with nan values in insignificant grid points (i.e. lower than 95% ).

Once we defined the function we can use it to calculate and plot the trend of a 3-dimensional variable [time, lat, lon]. For example, if we use annual mean sea level pressure era-interim reanalysis data of 39 years (1979-2016) to find a trend per year, we can use the script as:

Download the script [ltrend.py](https://bit.ly/32gb81L)

{%highlight Python%}
from numpy import *
from scipy import stats
from netCDF4 import Dataset as nc


def l_trend(var,lon,lat,time,sig=False):
    nlon=len(lon)
    nlat=len(lat)
    nt=len(time)
    vart=zeros(nlat*nlon)
    varp=zeros(nlat*nlon)
    if len(var.shape)== 3:
        var=reshape(var,(nt,nlat*nlon))
        print('l_trend: assuming variable as 3D [time,lat,lon]')
    for i in range(nlat*nlon):
        v=var[:,i]
        vart[i], intercept, r_value, varp[i], std_err=stats.linregress(time,v)
    vart=reshape(vart,(nlat,nlon))
    varp=reshape(varp,(nlat,nlon))
#return (vart,varp)
else:
raise ValueError('Variable shape is not 2D or 3D. plese instert variable in this format var[time,lat,lon] or var[time,lon*lat]')
if sig==False:
    return (vart, varp)
else:
    for i in range(nlat):
        for j in range (nlon):
            if varp[i,j]>sig:
                vart[i,j]=nan
    return (vart, varp)


# after reading the SLP file

file=nc('/homes/afahad/data/slp_erai_1979_2017.nc')
slp=file.variables['slp'][:]
lon=file.variables['lon'][:]
lat=file.variables['lat'][:]
time=file.variables['time'][:]

# dimension

nlon=len(lon)
nlat=len(lat)
ntime=len(time)

# Here my SLP data is in monthly time dimension.
# I will take average over the months to make years
mo=12
yr=ntime//mo
year=linspace(1979,2017,39)


slp=reshape(slp,(yr,mo,nlat,nlon))
slp=(nanmean(slp,1))/100 # taking mean over month diension, and making Pa to hPa by dividing 100

# Now lets calculate linear trend pr year

slp_trend, slp_p=l_trend(slp,lon,lat,year)

{%endhighlight%}

Now if we plot the slp_trend hPa per year we get a plot like below:
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
      {% include figure.html path="assets/img/linreg1.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>


If we want the show only 95% significance trend of grid points we can write the l_trend function as

`slp_trend, slp_p=l_trend(slp,lon,lat,year,sig=0.05)`

Slp_trend plot will be in this case:
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
      {% include figure.html path="assets/img/linreg2.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>

For plotting climate variable in python using matplotlib
