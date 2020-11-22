---
layout: page
title: Skype a Scientist
description: 
img: /assets/img/skypeascientist.jpg
importance: 2
---

 <center>
 <img src="{{ site.baseurl }}/assets/img/skypeascientist.jpg"  height="25%" width="25%"> 
 </center>
 <br/>

[Skype a Scientist](https://www.skypeascientist.com/){:target="\_blank"}  is a nonprofit educational organization based in Willimantic, Connecticut that enables scientists to video conference with students in classrooms. It began as an informal program in 2017, founded by [Sarah McAnulty](https://sarahmcanulty.weebly.com/){:target="\_blank"} while she was a graduate student at the University of Connecticut. As of 2019, almost 15,000 classrooms and over 7,000 scientists from a total of 43 countries had participated in video conferencing sessions.

---

### **2019**
 <ul>
  <li>Don Jeter Elementary, TX, USA (Grade 4)</li>
  <li>Baldwinsville Central School District, NY, USA (Grade 9)</li>
  <li>Madison Middle School, OH, USA (Grade 5)</li>
  <li>Paxon Hollow Middle School, PA, USA (Grade 6)</li>
</ul> 

### **2020**
 <ul>
  <li>John Knox Christian School, ON, Canada</li>
  <li>Robious Middle School, VA, USA (Grade 6-7)</li>
  <li>William J. Johnston Middle School CT, USA (Grade 8)</li>
  <li>McAlpine Elementary School NC, USA (Grade 3)</li>
</ul> 


<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        <img class="img-fluid" src="{{ site.baseurl }}/assets/img/skype-a-scientist-1.jpeg" alt="" title=" Answering science questions by students of Robious Middle School "/>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid" src="{{ site.baseurl }}/assets/img/skype-a-scientist-2.jpeg" alt="" title=" Answering science questions by students of Robious Middle School "/>
    </div>
</div>
<div class="caption">
      Answering science questions by students of Robious Middle School (January 2020).
</div>

---


#### My Skype A Scientist Map
<!-- Create an element where the map will take place -->
<svg viewBox="-320 -260 630 420"></svg>

<script align="center">

// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
    
// Map and projection
var projection = d3.geoMercator()
    .center([0,20])                // GPS of location to zoom on
    .scale(99)                       // This is like the zoom
    .translate([ width/2, height/2 ])

d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")  // World shape
  .defer(d3.csv, "{{ site.baseurl }}/assets/csv/data_skype.csv") // Position of circles
  .await(ready);

function ready(error, dataGeo, data) {

  // Create a color scale
  var allContinent = d3.map(data, function(d){return(d.homecontinent)}).keys()
  var color = d3.scaleOrdinal()
    .domain(allContinent)
    .range(d3.schemePaired);

  // Add a scale for bubble size
  var valueExtent = d3.extent(data, function(d) { return +d.n; })
  var size = d3.scaleSqrt()
    .domain(valueExtent)  // What's in the data
    .range([ 1, 50])  // Size in pixel

  // Draw the map
  svg.append("g")
      .selectAll("path")
      .data(dataGeo.features)
      .enter()
      .append("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
      .style("stroke", "black")
      .style("opacity", .2)
      
  // Add circles:
  svg
    .selectAll("myCircles")
    .data(data.sort(function(a,b) { return +b.n - +a.n }).filter(function(d,i){ return i<1000 }))
    .enter()
    .append("circle", ".pin")
      .attr("cx", function(d){ return projection([+d.homelon, +d.homelat])[0] })
      .attr("cy", function(d){ return projection([+d.homelon, +d.homelat])[1] })
      .attr("r", 3)
      .style("fill", function(d){ return color(d.homecontinent) })
      .attr("stroke", 1)
      .attr("stroke-width", 1)
      .attr("fill-opacity", .7)
}

</script>
