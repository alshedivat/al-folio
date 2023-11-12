---
layout: page
title: Using 5.8 million to buy a unit in Oslo, which one is worth?
description: Housing Price MCDA Model - a perspective from spatial contributions
img: assets/img/post/MCA/gis6_price.jpg
importance: 4
year: 2022
category: fun
---

<div class="row">
    <div class="col-s mt-3 mt-md-0"
        {% include figure.html path="assets/img/post/MCA/gis6_price.jpg" title="oslo_finn_unit_price" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The on-sale units of Oslo from Finn in Feb 2022.
 N = 950, Mean = 7.56M kr, Median = 5.77M kr. Which one is a good choice? it's up to your own preferences!
</div>

There are so many factors contributing on house price. At the same location, the price varies by building’s attributes, e.g., the cost of construction, design, decoration, furnishings. If a pair of twin buildings exist, which are at different locations, the surrounding environment will decide price. In this report, we defined surroundings as `spatial contributions`, or `spatial score`.

Someone like to lives in the city center, enjoying night pubs, shopping malls, whereas the other one prefers being near forest. So, **the unit’s price or value varies under different perspective. Multi-criterion decision analysis (MCDA) is to support decision-makers solving such problems(Meng et al., 2011; “Multiple-Criteria Decision Analysis,” 2022).**

This report proposed a Housing Price MCDA Model (HPMM) to value the spatial contributions by inputting user’s preferences, basing on spatial information from open access database (Norwegian Public Roads Administration, Statistics Norway), OpenStreetMap, and satellite images. **The model is aimed to provide best-fitting options for house buyers and assess the living conditions in various areas of Oslo for better urban planning regulation**. In the end, I discussed the weakness of the model, and the several shopping tips revealed by model.

This is a demonstration model that could be extended to other cities easily. The post-processed datasets in this project are good materials for automating GIS or WebGIS training courses. But I had no time to make this model online due to limited time.

### How it works 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/mca1.png" title="mca_step1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/mca2.png" title="mca_step2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    HPMM: Quantifying your living condition/city service (infrastracture) by `spatial score` and help to make decision.
</div>

HPMM obtains (1) spatial information from statistics Norway, OpenStreetMap and optical satellite imagery, (2) user’s preferences, including point of interests (POI) and weights for all criteria. Once the model is set up, the on-sale units of Oslo in February from Finn.no are inputted to model. Then, the recommended units are output by model.

Oslo County polygon was resampled into 50x50 meters grid firstly. All spatial information was accordingly assigned into each cell by location. The spatial information used in this scenario includes **public transportation, kindergarten, school, stores, groceries, culture and sports building, parking places, vegetation index, and noise level.** The *spatial score* is contributed by all these ***elements i*** on different ***distance a/b/c/d...*** and ***weights*** under certain reclassifying rules ***f(x).***

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/workflows.png" title="mca_workflows" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Workflows.
</div>

The main tools used in this project:

- Scraping data from Finn by [scrapy/scrapy: Scrapy, a fast high-level web crawling & scraping framework for Python. (github.com)](https://github.com/scrapy/scrapy)
- Geocoder from [GeoPy](https://geopy.readthedocs.io/en/stable/)).
- Spatial joining, calculation, cleaning, and visualizing by [GeoPandas](https://geopandas.org/en/stable/#)
- Focol statistics, reclassify, raster calculator, extract multi values to points by ArcGIS Pro.

The parameters used in demo model:
**Table 1.** *The criteria and the model parameters (demo).*

| **Code** | **Criteria** | **Type** | **Spatial points by function** | **Reclassifying** | **Weight** |
| ---- | ------------------------------------------------------------ | --------- | -------------------------------------------- | ------------------------------------------------------------ | ------ |
| 1 | Bus or metro Stop | Numerical | 1.5 pt: <250 m 1 pt: <500 m 0 pt: >=500 m | 10 pt : >=24 pt 6 pt : >=12 pt 3pt : >=6 pt 1 pt : >=3 pt 0 pt : <3 pt | 15 |
| 2 | Parking place | Boolean | 10 pt: =<100 m 5 pt: =<250 m 0 pt: >=250 m | - | 5 |
| 3 | Kindergarten | Boolean | 10 pt: <500 m 0 pt: >=500 m | - | 10 |
| 4 | School | Boolean | 10 pt: <500 m 0 pt: >=500 m | - | 5 |
| 5 | Supermarket | Boolean | 10 pt: <250 m 5 pt: <500 m 0 pt: >=500 m | - | 10 |
| 6 | Café, Bakery, Bar, Restaurant, Pharmacy, Fast food, Convenience store, Beverage | Numerical | 1 pt: <500 m 0 pt: >=500 m | 10 pt : >=50 pt 8 pt : >=25 pt 6pt : >=8 pt 4 pt : >=4 pt 0 pt : <4 pt | 5 |
| 7 | Library, Museum, Theatre, Stadium, Sports center, Cinema, Playground, Mall, Swimming pool | Numerical | 1 pt: <500 m 0 pt: >=500 m | 10 pt : >=15 pt 6 pt : >=8 pt 3pt : >=3 pt 1 pt : >=1 pt 0 pt : <1 pt | 5 |
| 8 | College, University, Hospital | Numerical | 1 pt: <1000 m 0 pt: >=1000 m | 10 pt : >=7 pt 5 pt: >=4 pt 1 pt: >=1 pt 0 pt : <1 pt | 5 |
| 9 | NDVI | Numerical | Average of 50 m | 10 pt: 70% 6 pt: 50% 4 pt: 30% 0 pt: below 30% | 20 |
| 10 | Noise | Numerical | Average of 50 m | 10 pt: <= 55db 2 pt: <= 60db 1 pt: <= 65db 0 pt: >65db | 20 |


### Some results

Taking public transportation or driving? Or half-half.
<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/result_pt.jpg" title="result_public_transportation" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/result_parking.jpg" title="result_parking" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (left) The middle of city center and the east side of Sankt Hanshaugen, are too far from T-bane, and have relatively low density of road network due to terrain. Besides, the big park, University of Oslo, Ulleval hospital, Aker hospital have a negative impact on public transportation access. (right) If you prefer driving, Mjorstuen, Uranienborg, Fagerborg are not easy parking area.
</div>

Shops and supermarket.

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/result_s.jpg" title="result_shops" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/result_sm.jpg" title="result_supermarket" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (left) In this report, the shops layer contain café, bakery, bar, restaurant, pharmacy, fast food, convenience store, and beverage. The hot zone for hang out is between the Colosseum in Majorstuen, Frogner (west), Gamle oslo (east), and Torshov (north). And Nydalen is a good choice as well. Vestre Aker and Grorud have several choices relative other suburban areas. (right) There is no supermarket for the people living in the north of Frognerseterveien in at least 500m. Another supermarket blockhole is the T-bane station Smestad, which locates at a crossroad of Road 168 and 150, with the nearest supermarket 1.5 km in east, 1.0 km in south, 1.3 km in north, and 0.8km in west
</div>

When we use NDVI as a criterion, there is an obvious underestimation for units located near water body, e.g., shore line or lake. For example, in Huk, the better view to fjord, the more expensive the house would be. However, the beach does not have any vegetation, and none contribution to spatial score. This issue could be fixed by adding another criterion.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/result_NDVI.jpg" title="result_NDVI" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Is your place greener than the average?
</div>

The average noise level below 55db over 24 hours would be thought harmless, 10 points, otherwise can only get 2 point (<60db), 1 points (<65db), 0 point (>65db). The noise exposure is the result from modelling, not indoor noise exposure, resulting an uncertainty to final results. Since normally noise model considers vegetation as an important parameter, so the area close to park and away from highway and railway get excellent scores from both two criteria.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/result_noise.jpg" title="result_noise" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The noise is mainly produced by trafic roads and railways.
</div>

### What it suggests

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/result.jpg" title="result_aggregation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     We put units from Finn on the spatial score map, the best-fit units are marked with cyan dots
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/plot.png" title="result_scores_price" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Clearly, there is no correlation between price and spatial score under my preferences. The best-fit units are marked with cyan dots.
</div>


Aggregation was carried out under two scenarios, aggregation_1 based on demo parameters (table 1) and aggregation_2. When changing to the latter, shops, entertainment, NDVI and Noise were set from 5% to 10%, 5% to 10%, 20 % to 15% and 20% to 15%. 

To be short, here is the recommended list of the units:

**Table 2.** *The best-fits (Aggregation_1 > 8).*

| **Finn_code**                                                | **District**      | **Size** | **Price (Kr)** | **Type**                                | **Ppsm (Kr)** | **Aggregation_1** |
| ------------------------------------------------------------ | ----------------- | -------- | -------------------- | --------------------------------------- | ------------------ | ----------------- |
| [249110832](https://www.finn.no/realestate/homes/ad.html?finnkode=249110832) | Gamle Oslo        | 71       | 6029516              | Andel • Leilighet • 3 soverom           | 84923              | 8.28              |
| [248981927](https://www.finn.no/realestate/homes/ad.html?finnkode=248981927) | Frogner           | 76       | 6909620              | Eier (Selveier) • Leilighet • 2 soverom | 90916              | 8.15              |
| [248049271](https://www.finn.no/realestate/homes/ad.html?finnkode=https://www.finn.no/realestate/homes/ad.html?finnkode=248049271) | Søndre Nordstrand | 81       | 3588916              | Eier (Selveier) • Leilighet • 2 soverom | 44308              | 8.18              |
| [249057789](https://www.finn.no/realestate/homes/ad.html?finnkode=249057789) | Sagene            | 50       | 5088694              | Eier (Selveier) • Leilighet • 1 soverom | 101774             | 8.14              |
| [243905166](https://www.finn.no/realestate/homes/ad.html?finnkode=243905166) | Sagene            | 53       | 4763626              | Andel • Leilighet • 1 soverom           | 89880              | 8.36              |
| [248207270](https://www.finn.no/realestate/homes/ad.html?finnkode=248207270) | Sagene            | 60       | 5362570              | Andel • Leilighet • 2 soverom           | 89376              | 8.45              |
| [248035518](https://www.finn.no/realestate/homes/ad.html?finnkode=248035518) | Sagene            | 95       | 8151292              | Eier (Selveier) • Leilighet • 3 soverom | 85803              | 8.38              |

 

There is a sensitivity test, using the second group of parameters:

**Table 3.** *The best-fits (Aggregation_2 > 8).*

| **Finn_code**                                                | **District** | **Size ** | **Price (Kr)** | **Type**                                | **Aggregation 2** | **Aggregation 1** |
| ------------------------------------------------------------ | ------------ | --------- | ------------------- | --------------------------------------- | ----------------- | ----------------- |
| [249110832](https://www.finn.no/realestate/homes/ad.html?finnkode=249110832) | Gamle Oslo   | 71        | 6029516             | Andel • Leilighet • 3 soverom           | 8.4               | 8.28              |
| [248219200](https://www.finn.no/realestate/homes/ad.html?finnkode=248219200) | Frogner      | 84        | 9754142             | Eier (Selveier) • Leilighet • 2 soverom | 8.2               | 7.80              |
| [249057789](https://www.finn.no/realestate/homes/ad.html?finnkode=249057789) | Sagene       | 50        | 5088694             | Eier (Selveier) • Leilighet • 1 soverom | 8.6               | 8.14              |
| [248999688](https://www.finn.no/realestate/homes/ad.html?finnkode=248999688) | Frogner      | 36        | 3985861             | Andel • Leilighet • 1 soverom           | 8.2               | 7.60              |
| [243905166](https://www.finn.no/realestate/homes/ad.html?finnkode=243905166) | Sagene       | 53        | 4763626             | Andel • Leilighet • 1 soverom           | 8.7               | 8.36              |
| [195629975](https://www.finn.no/realestate/homes/ad.html?finnkode=195629975) | -            | 71        | 7483877             | Eier (Selveier) • Leilighet • 2 soverom | 8.1               | 7.50              |
| [248035518](https://www.finn.no/realestate/homes/ad.html?finnkode=248035518) | Sagene       | 95        | 8151292             | Eier (Selveier) • Leilighet • 3 soverom | 8.6               | 8.38              |


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/result2.jpg" title="result_aggregation_2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Aggregation 2 result. In my own preferences, model strongly suggests units near the river and park in the city center. Secondly, Ullern, Vestre Aker, Bjerke, Grorud, Stovner, Nordstrand and Stenbraten also got high scores for good public transportation, nice environment and numerous shops.
</div>


#### Anything else?

A unit ([finn code 248049271](https://www.finn.no/realestate/homes/ad.html?finnkode=248049271)) at Søndre Nordstrand with extreme low price (3.6 million Kr) and good size (81 m2) got 8.18 points. Sadly, it is sold already. Most of the units recommend by model are sold already in the past month, which means the best-fit units are popular in some degree.

I know there are **several issues** in my method, but I have to limit my time on this project. Otherwise, **a Web-based, automating GIS-MCDA model** could be super fun for exploring dataset from Finn.

In general, the housing price MCDA model could provide the best-fitting options for house buyers but is not capable of suggesting selling price for landlords, because personnel preferences are totally different from the market average, and the model does not count the attributions of the house itself. But it is still possible and fun to do price estimation after gathering more information about market average and normalizing house attributions with coefficients.


<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/plot2.png" title="plot2" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/MCA/plot3.png" title="plot3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (left) Spatial score and total price scatter plot (Aggregation_1). The dot size represents the unit size. (right) Spatial score and price per square meters scatter plot (Aggregation_1). The dot size represents unit size.
</div>