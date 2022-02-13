---
layout: page
title: Banff
description: "Banff National Park: 1.5 Hours from Calgary"
img: assets/img/banffphotos/peytolakepano.jpg
importance: 1
category: The Canadian Rockies
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/banffphotos/peytolakepano.jpg" title="Peyto Lake, Banff National Park" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Peyto Lake, Banff National Park
</div>

The [Canadian Rocky Mountains](https://en.wikipedia.org/wiki/Canadian_Rockies) are recognized as [UNESCO World Heritage Area](https://whc.unesco.org/en/list/304/) for it's outstanding natural landscapes, and [Banff National Park](https://www.pc.gc.ca/en/pn-np/ab/banff) is recognized as a highlight. Only an 1.5 hours drive from Calgary, Banff was the first national park in Canada, and is instantly recognizable as one of the most beautiful natural locations in the world.

<div id="map" class="col-sm mt-2 mb-2" style="width: auto; height: 400px;"></div>
<script>
	var map = L.map('map').setView([51.049, -114.841], 7);
	var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieWFuaWkiLCJhIjoiY2t6a3J2N2F1MG5xcjJucW9wNmlkeXo3YiJ9.RuoyOS1pY1_mVW7wJ2LkFQ', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/outdoors-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(map);
    L.control.scale().addTo(map);
</script>

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/banffphotos/lakelouise.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/banffphotos/IMG_6911-HDR.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/banffphotos/IMG_6852.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/banffphotos/IMG_6898.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
Banff National Park
</div>
