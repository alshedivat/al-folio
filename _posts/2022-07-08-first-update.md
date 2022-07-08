---
layout: post
title: First Update on MFCs
date: 2022-07-08
description: MFCs are starting up
categories: updates
---

To kickstart the new blog on the website and not leave the blog empty, we have the first update on the lab. This generally covers what has been happing with the Microbial Fuel Cells (MFCs) since the summer session has started.

The first priority was to get the MFCs producing power. The cells were from Standford and had completely dried out, not so good for living organisms. Initially the cells were going to be rehydrated by watering until they had a mud like consistency. This was going to take way too long as the water was just pooling at the bottom of the containers rather than absorbing into the dirt. Instead we got fresh dirt from the UCSC Farm, which was turned into mud with the help of some water and the cells reconstructed. There was very little documentation on how the MFCs were constructed and it was a lot of trial and error until they were properly constructed. Now they are fully assembled with a TEROS-12 moisture sensors and rocketloggers attached. It was important to the lab to record what the startup process looks like for these type of MFCs as there is no baseline to compare the startup voltages too. The researchers working on this before us had lots of difficulty finding the correct parts (wrong wire, fake carbon felt, etc) so they were not able to document the process. We are around a week into the process and here is what the voltage, current and power graphs look like.

<div class="container mt-2">
	<div class="row">
		<div class="col-sm">
			<h4>Rocket1</h4>
			{% include figure.html path="assets/img/2022-07-08_rocket1.jpg" class="img-fluid rounded" zoomable=true %}
		</div>
		<div class="col-sm">
			<h4>Rocket3</h4>
			{% include figure.html path="assets/img/2022-07-08_rocket3.jpg" class="img-fluid rounded" zoomable=true %}
		</div>
	</div>
</div>

These graphs look great! The voltage, current and power are all increasing over time, which is what the expected behavior was. Initially looking back on a paper written on soil based MFCs, our voltage levels look indicative that we had created a galvanic battery rather than a MFC, but this was just due to the conditions our cells were in. In the paper they were deployed in a farm setting where the moisture levels were much lower. The higher moisture in the lab allows the cells to produce more power. Now we just sit and wait for the cells to reach steady state, then they will be deployed onto the UCSC farm.
