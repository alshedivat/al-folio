---
layout: page
title: Perth housing prices
description: Supervised and unsupervised learning in Python
img: assets/img/house1.jpg
importance: 3
category: fun
---

A while back I picked up Deyan Sudjic book "The language of cities", where he tries to explore the idea of a "city" - what moulds its existence, the dynamic relationship between developers and governments in planning a city, and ultimately what comes out of the different ideas of a "city". What survives, and what works for a city. What fails and breaks it. 

Rapid urbanization and the need for residential housing has posed a new kind of developmental challenge to cities. In England itself, it has been estimated that 340,000 more houses are needed to be constructed every year. While the government targets to get around constructing 300,000 houses every year, last year they have been able to construct only 214,000 houses (Bramley 2019). This gaping difference between supply and demand has meant increased rent, unaffordability of home-buying, and poverty. In some areas in England, it has been reported that almost 40% of tenants are dependent on government subsidies on their rental bills (Lydia et al 2021). 

One could argue that these difficulties are particularly large in major cities such as London and Edinburgh (Brooks 2018, Cork 2022). And while this is partly true, thriving smaller thriving are facing a similar, if not more alarming housing crisis, owing to international students coming in, new businesses being set up, and the general trend toward globalization. 

Since I could not find a good enough dataset pertaining to UK houses, I sourced a  housing dataset of Perth, Australia, from <a href="https://www.kaggle.com/datasets/syuzai/perth-house-prices/">Kaggle</a>. Perth, the fourth most populated city in Australia, is perched beside the Swan River. A sunny town where both birds and people flock in the summer to catch the right amount of tan. However, all is not swell at Perth. In a city with a population of nearly 2 million, the number of houses available to rent this year is less than 2000. This plummet marks a 12 year low for the rapidly transforming city (Hamish 2022). This has meant a skyrocket in median rent and increased concerns over housing this upcoming winter (just as people in the UK are reeling with energy bills expected to rise and housing demand falling short of being met). 

My aim is to see trends and various classifications in this housing data and see what methods can be established to be useful to analyze prices and various other features of housing. This could hopefully help future policymakers and urban planners to derive some insights on what factors drive up prices, and what features to look for to classify neighborhoods and houses. 


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/house2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/house6.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The average price of a house in Perth is around $638,000 approx., while the median price is about $545,000. The standard deviation of distance to nearest business district is very high, indicating high degree of variability in location of these houses.   
</div>

To get a quick overview at the onset about the dispersion of the houses considered in the dataset I plotted their Latitudinal and Longitudinal coordinates. Further, to see correlations within the data, I created a Pearson correlation matrix, and reported these correlations in a heatmap 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/house3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/house5.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

After much descriptive analysis, such as the above, I modeled a regression model, as well as an unsupervised k-means clustering. 

<b>To check out more on the project with codes and visualizations in a jupyter notebook, you can find it in my <a href="https://github.com/detectorisk/Perth_housing_analysis">Github repository!</a></b>
