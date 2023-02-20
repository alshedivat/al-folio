---
layout: distill
title: Plotting Climate data in Python using matplotlib
description:
giscus_comments: true
date: 2018-10-12

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
Using the same example as before, we will use sea level pressure (SLP) netcdf data to read and make a plot of annual mean SLP (globally). Most of the script line below is commented to show their purpose:
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
      {% include figure.html path="assets/img/ploting_climate.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>

{%highlight Python%}

from netCDF4 import Dataset as NetCDFFile #this package reads nc data
import matplotlib.pyplot as plt #python plotting package
import numpy as np #numpy is for all scientific computing
from mpl_toolkits.basemap import Basemap  
#Basemap package helps to plot lat lon dimension data

print('reading the file ..')

nc = NetCDFFile('/homes/afahad/data/slp_erai_1979_2016.nc') #read the file

lat = nc.variables['lat'][:] #this the data from file
lon = nc.variables['lon'][:]
time = nc.variables['time'][:]
mslp = nc.variables['slp'][:]
nc.close()

print('Making climatology...')

# we will take average over time dimension, which is 0 (1st index index in #python)

a=(np.mean(mslp,0))/100 #climatology of SLP

# make some plot
print('Ploting...')
plt.figure(figsize=(9,5)) #setting the figure size

map = Basemap(projection='cyl',llcrnrlat=-90,urcrnrlat=90,\
            llcrnrlon=-180,urcrnrlon=180,resolution='l')      
#This like sets the lat lon of the plot. Projection cylinder.

map.drawcoastlines(linewidth=.5)  #draws coastline

parallels = np.arange(-90,91,30.) # make latitude lines ever 30 degrees from 30N-50N
meridians = np.arange(-180,180,60.) # make longitude lines every 60 degrees from 95W to 70W

#labelling the lat and lon dimesion

map.drawparallels(parallels,labels=[1,0,0,0],linewidth=0.2,fontsize=8)
map.drawmeridians(meridians,labels=[0,0,0,1],linewidth=0.2,fontsize=8)

lons,lats= np.meshgrid(lon,lat) #2D lat lon to plot contours
x,y = map(lons,lats)

clevsf = np.arange(960,1040,4)
clevs = np.arange(1020,1040,10)

#clevs and clevsf sets the contour interval of contour and filled contour. if you don't set it, it will plot default values.

csf = map.contourf(x,y,a,clevsf,extend='both',cmap='coolwarm') #filled contour
cb = map.colorbar(csf,"right", extend='both',size="3%", pad="1%")
cs = map.contour(x,y,a,clevs,colors='k',linewidths=0.3)

plt.clabel(cs, inline=True, fmt='%1.0f', fontsize=3, colors='k')
plt.title('mean SLP')
plt.show()
plt.savefig('test_slp.eps', format='eps', dpi=1000) #saving figure

print('done! To see the plot, type: display test_slp.eps')

{%endhighlight%}

Install matplotlib if you are not using anaconda:

{%highlight Python%}
python -m pip install -U pip setuptools
python -m pip install matplotlib
{%endhighlight%}

fore more: [https://matplotlib.org/faq/installing_faq.html](https://matplotlib.org/faq/installing_faq.html)

If you are using anaconda 3 like me, to install packages follow: How to read netcdf file in Python
