---
layout: page
title: SEIR model
description: Disease model for analyzing the spread of COVID-19. 
img: /assets/img/covid_1.png
importance: 6
category: Data Science
---

*You can find the full code in [here](https://github.com/DanielDaCosta/COVID-19-Analysis)*

This project consists of a disease model for analyzing the spread of COVID-19. 

The project intuition and parameters estimations were retrieved from the article of [Christian Hubbs](https://towardsdatascience.com/social-distancing-to-slow-the-coronavirus-768292f04296). For a more detailed explanation of the modeling process, please read Christian's article.

# Model

The project uses a SEIR model. The SEIR models the flow of the population between 4 states:
- Susceptible (S)
- Exposed (E)
- Infected (I)
- Recovered/Dead (R)

The model assumes that the popualtion has a fixed size and also that it's distributed between only these 4 states. Each of these variables represents the number of people in these groups.
The model is governed by 4 differential equations:

- dS/dt = -rho * beta * S * I
- dE/dt = rho* beta * S * I - alpha * E
- dI/dt = alpha * E - gamma * I
- dR/dt = gamma * I

Where:

- rho: represents the social distancing effect ([0, 1]). Where 0 represents a total lockdown
- beta: the rate of spread between a susceptible and an infectious individual.
- alpha: The incupation rate. The rate of latent individuals becoming infectious (average duration of incubation is 1/alpha)
- gamma: Recovery rate. gamma = 1/D, where D is average duration of infection.


# Results

Detailed study of the distribution of each of the 4 states trough time. It's possible to observe a peak in the number of infected around the forfieth day (around 10% of the total population).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/covid_1.png' | relative_url }}" alt="" title="COVID 1"/>
    </div>
</div>


Importance of social distancing to slow the spread of the disease. The lower the value of *rho* (increase in social distancing), the more flatten the curve becomes.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/covid_2.png' | relative_url }}" alt="" title="COVID 2"/>
    </div>
</div>


# References & Acknowledgements

The values of the parameters *alpha*, *beta* and *gamma* for COVID-19 came from:
- https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(20)30074-7/fulltext
- https://arxiv.org/pdf/2002.06563.pdf

Other references:

- https://www.youtube.com/watch?v=mwJXjxMTwAw
- http://www.public.asu.edu/~hnesse/classes/seir.html