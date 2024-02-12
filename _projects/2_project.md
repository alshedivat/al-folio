---
layout: page
title: Acquisition of renewable energy sites
description: Identified renewable energy sites to pursue for investment portfolio in R
img: assets/img/renewable_energy.jpeg
importance: 2
category: work 
giscus_comments: false
---

The aim of the consultancy project was to identify which renewable energy sites to pursue out of a pool of 50 simulated sites by identifying those that could be procured based on available staffing resources. This was done, keeping in portfolio diversification and assuming similar productivity levels of employees on all projects given the project requisites. The 50 potential sites, and resulting staff hours data were provided by the client. By implementing a linear optimization approach in R, the analysis recommends the acquisition of 22 sites.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>


<h2>Baseline case study</h2>

I initially identified 50 potential sites that can be acquired for renewables production by the company, amounting to a total of 2,382 MW production of electricity by April 2032 (considering a standard of 9 years for the project to be set up). Among the sites thus identified, the largest electricity producers in terms of MW were windmills, while BESS accounted for the smallest producer segments. However, I posited the production of renewables in all these 50 sites at the same time was an unrealistic target to be achieved in this period, given both staffing and programmatic constraints.

To begin with, there was a huge gap between staff required and present staff numbers to meet the demands of all these sites in the next 9 years. While this could be a factor toward initiating recruitment drives, I found myself less inclined to ask of the company that it hire more people immediately to meet the demands of the staffing requirements of all 50 sites. This was evident since the staff expansion required was to degrees much higher than the present staff numbers. Especially in the case of managerial roles, the staffing hours deficit was about three times if we were to pursue all 50 sites at the same time.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

Thus, my focus shifted toward looking at an optimal solution first based on present staff numbers and using that as a baseline for future development of projects. Furthermore, I believed our optimization methodology could be used company wide, to account for project feasibility, for staffing resource optimization, inform hiring timelines, and when opting for baskets of long term projects.

<h2> Methodology </h2>

To begin with, I established the potential energy capacity that can be produced out of each of the renewable site, and the staffing hours required out of each of the roles for each of the different technologies, namely BESS SPP, Solar, Wind plants with less than 50 MW capacity, and Wind plants with more than 50 MW capacity. Here, the staffing requirements was assumed to be only a function of the type of technology employed, and unaffected by the size of the project. Interestingly, I found that the number of managerial hours required in Wind projects was much more than for Solar and BESS. Wind technologies with more than 50 MW capacity demanded the most staff hours from all job roles, while being the highest electricity producers. Additionally, taking energy capacity into our model at this stage was deemed counterintuitive, as we won’t be able to do linear programming (since for the same staffing inputs for each technology, given everything else as constant, our data suggested different outputs in terms of energy production). Thus, I accounted for energy capacities at a later stage in the model.



Notably, I assume here that the only cost of production to get the site running is that of staff salaries and a premium of 500k for site acquisition. Both can be taken as fixed costs and are thus taken out of the model. Any new hire of staff will be a variable cost (especially since there will be cost to training and pulling up slack on an incumbent employee etc.). Given these staffing resources, and a fixed cost of 500k for each site to be acquired, an output maximizing function will essentially be a question of how many sites of each technology we would like to invest in. Thus, the maximization function would be: f(x,y,z,w)=x+y+z+w where, x is the number of sites of BESS SPP; y is the number of sites of Solar; z is the number of sites of wind MW<50; w is the number of sites of wind MW>=50

and the staffing hours constraints are :

For BESS: (Total staff hours available with team)-x(Total staff hours required from team for 1 BESS project)≥0

For Solar: [(Total staff hours available with team)-x(Total staff hours required from team for 1 BESS project)]- y((Total staff hours required from team for 1 Solar project)≥0

For Wind <50 MW: [(Total staff hours available from team)-x(Total staff hours required from team for 1 BESS project)-y(Total staff hours required from team for 1 Solar project)]-z(Total staff hours required from team for 1 Wind<50 project

For Wind >=50 MW: [(Total staff hours available from team)-x(Total staff hours required from team for 1 BESS project)-y(Total staff hours required from team for 1 Solar project)-z(Total staff hours required from team for 1 Wind<50 project]-w(Total staff hours required from team for 1 Wind≥50 project)

and other constraints: x≤6; y≤11; z≤21; w<-12

More on the project with codes and visualizations in a R markdown file can be found on my <a href="https://github.com/detectorisk/Energy_project_allocation_R/">Github repository!</a>