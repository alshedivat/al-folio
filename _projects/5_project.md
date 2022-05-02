---
layout: page
title: animating flows
description: time-lapse visualization of mobility patterns
img: assets/img/3dheb_flow.png
importance: 3
category: visualization
---


Porto buses are equipped with a Mobile Wi-Fi service from [Veniam](http://www.veniam.com), which provides free Wi-Fi to bus passengers. The system stores the start and end locations and times of Wi-Fi sessions, allowing to infer mobility patterns from Wi-Fi usage. The video below shows these mobility patterns. Locations were clustered with K-means, highly decreasing the complexity of the mobility graph and allowing to understand the major flows in the city.

<div style="padding:51.76% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/124638700?h=0441f0b86c&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Origins and destinations of Porto&amp;rsquo;s bus passengers based on Wi-Fi"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
<div class="caption"></div>

Clustering locations enables to understand the major patterns, but detail is lost in the way. Another approach for visualizing mobility flows is illustrated in the video below. Here, instead of clustering locations, the origin-destination pairs are bundled. Edges connecting the start and end location of a Wi-Fi session are deformed and grouped in order to identify major flows. These edges do not represent the paths (they are not mapped to roads) but flows in the city. In this version, flows that have different direction avoid each other while flows that have similar direction are attracted together. A blue to red gradient is used to illustrate flow, with flows starting blue at the origin and red at the destination.

<div style="padding:51.88% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/124650835?h=d1f988fd75&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Animated edge bundling for visualising the flow of bus passengers in Porto"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
<div class="caption"></div>

Different criteria can be explored to bundle edges together. Some examples are illustrated in the video below here flows and their coloring are based on the trip's distance or on the destination of the trip, for example.

<div style="padding:40.7% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/125892304?h=c701324d0e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="3DHEB in action: visualising the same data using different bundling criteria"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
<div class="caption"></div>

Finally, and mainly for fun, we can do the animation in 3D and play with the height of the flows. In the next video, the direction of the flows is ignored, and height is calculated from the density of flows, creating interesting visual effects.

<div style="padding:51.88% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/129894173?h=a8840a587e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Under the Skin (of Porto&amp;#039;s bus network)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
<div class="caption"></div>
