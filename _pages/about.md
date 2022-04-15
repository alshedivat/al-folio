---
layout: about
title: Szymon Sacher
permalink: /

profile:
  align: right
#  image: szymonsacher.jpg
#  address: >
#    <p>555 your office number</p>
#    <p>123 your address street</p>
#    <p>Your City, State 12345</p>

news: false  # includes a list of news items
selected_papers: false # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of the page
---

### About me

I am a PhD Student in Economics at [Columbia University](https://econ.columbia.edu/). Previously I studied at [the University of Edinburgh](https://www.ed.ac.uk/economics) and was a Visited Researcher at [Imperial College](https://www.imperial.ac.uk/business-school/)      

My research instrests include Industrial Organization, Public Economics, Bayesian Econometrics and Natural Language Processing. This website is a work in progress!

### Contact

szymon.sacher[at]columbia.edu

Department of Economics, Columbia University
420 w 118th st, NYC, NY 10027


## Research
### Working Papers

<div class="publications">
{% bibliography -f papers -q @*[published=false]* %}
</div>

### Published
<div class="publications">
{% bibliography -f papers -q @*[published=true]* %}
</div>
