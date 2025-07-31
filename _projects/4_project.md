---
layout: page
title: Sellers on Black Market Online Platforms
description: Ratings and reputation effects on pricing on darknet platforms
img: /assets/img/darknet-2.png
redirect:
importance: 3
category: research
---


Reputation can play a crucial role in facilitating trade. Especially, when legal institutions are failing or absent and contracts become unenforceable. Darknet platforms provide a unique opportunity to study the role of reputation when contracts are de facto unenforceable and reputation is directly measurable in the form of seller ratings.

We develop a full dataset of the market for illicit drugs online during 2014-2015 based on webscrape data. The market was characterized at the time by two dominant platforms covering over 90% of the market, one of which unexpectedly disappeared in March 2015 by performing a so-called 'exit-scam': the platform administrators shut down access of buyers and sellers to their bitcoin wallets on the platform, took it offline, and disappeared with their customers' money. We track sellers that migrated platforms in the aftermath and exploit the exogenous shock they incur.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/darknet-plsize.png' | relative_url }}" alt="" title="The development of the market 2014-2015"/>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/darknet-ratshock.png' | relative_url }}" alt="" title="the ratings reset for re-entering sellers"/>
    </div>
</div>
<div class="caption">
    On the left, the number of accounts of sellers for the two platforms. On the right, the average rating on a scale of 0-100 of sellers forced to re-enter the market following the platform exit. Source: <a href="https://neschenbaum.github.io/assets/pdf/dealing-with-uncertainty.pdf">Eschenbaum & Liebert (2021)</a>.
</div>



<div class="row justify-content-sm-center">
    <div class="col-sm-8">
        In <a href="https://neschenbaum.github.io/assets/pdf/dealing-with-uncertainty.pdf">Eschenbaum & Liebert (2021)</a>, we study the price effects the forced re-entry had. We perform an event-study style analysis and show that prices fell by almost 10% on average. The drop in price occurs gradually and recovers fully after 12-13 weeks. This is exactly in line with the time it takes on average for a new entrant in the market to establish a high rating and reputation. We document the same pattern for the individual types of illegal substances, but the effect size varies depending on the price level of the drug. We then use the exogenous variation in rating to provide causal estimates of the effect of rating on price. We find an
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/darknet-eventstudy.png' | relative_url }}" alt="" title="Estimated effect on unit price of re-entering sellers"/>
    </div>
</div>
 average elasticity of 1. The sellers we track are representative of high-reputation sellers prior to the platform exit, so we calculate that this implies that identified 'good' types obtain on average 1,650 USD per week more compared to unknown entrants who may be good or bad types. Thus, reputation is very valuable when legal institutions are absent.

In ongoing work, we further investigate the role ratings play in sellers' market entry decisions. Sellers may be less willing to enter individual product markets with strong existing competition by highly-rated sellers. This would imply that a functioning rating system can help overcome informational asymmetries, yet also deter market entry, and therefore its welfare implications depend on the relative sizes of these two effects. We study whether the placement of potential future competitors in the product market in the ratings distribution may enter affects the likelihood of re-entry for a seller, and how this is related to the sellers own rating prior to the platform exit.

<h4>Project materials:</h4><ul><li>
Nicolas Eschenbaum and <a href="https://hliebert.github.io">Helge Liebert</a>. <a href="/assets/pdf/dealing-with-uncertainty.pdf">Dealing with Uncertainty: The Value of Reputation in the Absence of Legal Institutions</a> (WP). <i> 2021.</i>
</li>
</ul>
