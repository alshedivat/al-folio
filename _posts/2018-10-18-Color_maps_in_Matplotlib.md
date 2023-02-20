---
layout: distill
title: Color maps in Matplotlib and creating own color bar
description: Color maps are important to clarify the scientific plots better. Better color bar can help to make interesting and self explanatory Graph and Maps.
giscus_comments: true
date: 2018-10-18

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
For python/ipython module, Matplotlib offers a long list of sequential to diverging colormaps. We can change the colormap in previous example as:

{%highlight Python%}
csf = map.contourf(x,y,a,clevsf,extend='both',cmap='coolwarm')
# filled contour
{%endhighlight%}

"coolwarm" is a diverging colormap that is useful to show positive and negative data points in a graph (i.e. anomalies).



<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
      {% include figure.html path="assets/img/colorbar.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>
<div class="caption">
    Divergent colormaps
</div>


For list of colormaps in Matplotlib [follow this link](https://matplotlib.org/2.0.2/examples/color/colormaps_reference.html)

If we want to make a specific color map for our plot which is not available in Matplotlib list, we will need to install colormap and easydev python package package. For installing package in anaconda follow this link. Alternatively, we can also install the package using pip as:

{%highlight Python%}
pip install colormap
pip install easydev
{%endhighlight%}

For example if we want to make a sequential gradient colormap that will start from white to blue and end with dark blue,
{%highlight Python%}
from colormap import Colormap
c = Colormap()
cmap = c.cmap_linear('white','SkyBlue','royalblue')
{%endhighlight%}

Now test the colormap by typing: `cmap = c.test_colormap(cmap)`

We should get a test map like this:
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
      {% include figure.html path="assets/img/colorbar2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>

Now we can use this color map for our plot as before in Matplotlib plot, except we don't have to use the quote in syntax
{%highlight Python%}
csf = map.contourf(x,y,a,clevsf,extend='both',cmap=cmap)
# cmap using colormap that we just made.
{%endhighlight%}

List of color that colormap module use attached in the [color.txt](https://drive.google.com/file/d/1oRYc-NrDq_rDy7mOfayJV3PIYYMJtJ4x/view) file. We can try different combination of colors to make customized colormap.

For more details about customized colormap and colormap module [follow this link](https://colormap.readthedocs.io/en/latest/#).
