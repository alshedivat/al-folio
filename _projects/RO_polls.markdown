---
layout: page
title: RO polls
description: public opinion polls in Romania
img: /assets/img/polls/overall.jpeg
importance: 5
category: work
---

<p style="text-align:justify">The page bellow presents a collection and visualization of the public opinion polls conducted in the run up to the December 2020 Romanian national parliamentary elections. It provides an overview of all polls since January 2017, except the ones conducted in the context of the 2019 European Parliamentary Elections. </p>

<h2> Overall </h2>

{% include plotly_2020_header.html %}
{% include plotly_2020.html %}

<div class="caption">
This is an interactive figure, use your mouse to zoom in on certain regions to select periods or parties. To see the source of an individual poll, hover over any data point.
</div>

<p>These are the six most recent polls:</p>

<div class="embedded-table" style="width:100%;overflow: scroll;">

{% include recent_polls.html %}

</div>
<br>

<h3> Among Larger Parties: </h3>
<ul>
    <li>gradual decline of PSD's popularity after the 2016 elections. The decline reaches its lowest point around 22 percent before the Presidential Elections in November 2019.</li>
    <li>initially, PNL can not benefit from the loss of PSD voters, but the party's popularity picks up as Iohannis' re-election campaign takes off before the 2019 Presidential Elections.</li>
    <li>gradual increase in the popularity of USR-PLUS, up until the 2019 Presidential Elections. <u><b>Note</b></u> that sometimes USR and PLUS were asked as a coalition, sometimes separately. The two parties contest in a coalition the 2020 parliamentary elections. To construct the trend line, I added together their popularity in surveys when asked separately.</li>
</ul>
<h3> Among Smaller Parties: </h3>
<ul>
    <li>increase in the popularity of Pro Romania, up until it becomes a party of 6-7 percentage points. <u><b>Note</b></u> that since October 2020 the merger of Pro Romania-ALDE, ALDE was often not asked anymore. </li>
    <li>relatively stable support for PMP and UDMR.</li>
</ul>

<h2> Since the 2019 Presidential Elections</h2>

<h3>Zooming in on larger parties</h3>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="/assets/img/polls/winners.jpeg" alt="" title="example image" />
    </div>
</div>
<div class="caption">
    The popularity of the three largest parties since the 2019 Presidential Elections  
</div>

<ul>
  <li>remarkable stability in the popularity of all three major formations: PSD, PNL, USR-PLUS.</li>
  <li>the Covid-19 crisis was not a rupture in the popularity of the governing PNL neither in a negative nor in a positive direction. The party lost some of its voters, but the decline was gradual, and the party's popularity seems to have stabilized during the summer.</li>
  <li>PSD slightly increased its popularity since the local election at the beginning of October 2020. Most likely by picking up Pro Romania voters.</li>
  <li>USR-PLUS did not capitalize on the loss of PNL voters.</li>
</ul>

<h3>Zooming in on smaller parties</h3>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="/assets/img/polls/smaller.jpeg" alt="" title="example image" />
    </div>
</div>
<div class="caption">
    The popularity of the smaller parties since the 2019 Presidential Elections 
</div>

<ul>
  <li>Pro Romania's popularity was quickly rising since the summer, but it collapsed particularly after the local elections in October 2020.</li>
  <li>PMP is relatively stable, but it is very close to the five percent threshold.</li>
  <li>UDMR is remarkably stable, but it is unclear to what extent can national polls predict fluctuations in its support.</li>
  <li>AUR appears in three polls in the run up to the parliamentary elections, and only one of those estimates the party above the parlaimentary threshold. You find all the three polls in the table at the top of this page.</li>
</ul>

<h2>Are polls accurate?</h2>

<ul>
  <li>the short answer is that it depends, but in past elections, they performed relatively well, despite non-transparent methods and some previously unknown companies releasing estimates.</li>
  <li>for the long answer see <a href="https://www.openpolitics.ro/how-accurate-were-the-polls-before-the-first-round-of-the-romanian-presidential-elections/" target="_blank">this text.</a></li>
</ul>

<h2>Note</h2>

<ul>
  <li>You can find the source of individual polls and the syntax file to construct the figures in <a href="https://github.com/eborbath/ro_poll_parl_2020" target="_blank">this repo</a>.</li>
  <li>All trend lines are represented by loess regression curves.</li>
  <li>Feel free to drop me an <a href="mailto:borbath.endre+website@gmail.com" target="_blank">email</a> in case you know of a poll not listed <a href="https://github.com/eborbath/ro_poll_parl_2020/blob/master/ro_polls_2020.csv" target="_blank"> here!</a></li>
</ul>
