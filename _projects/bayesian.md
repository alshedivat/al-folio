---
layout: page
title: HK Landslides
description: bayesian glm for landslide predictions 
img: assets/img/nate/media/mask_95.jpg
importance: 3
category: recent
---
{% if site.data.repositories.hk %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.hk %}
    {% include repository/repo.html repository=repo %}
  {% endfor %}
</div>
{% endif %}

To read the full report in all its details refer to [this link]("/assets/pdf/HongKongLandslides.pdf").

***
### Description
Hong Kong is a nation afflicted by severe landslide occurences, with around 300 landslides reported by the Geotechnical Engineering Office (GEO) each year.  Using the [Enhanced Natural Terrain Landslide Inventory](https://data.gov.hk/en-data/dataset/hk-cedd-csu-cedd-entli) database maintained by the government of Hong Kong we seek to uncover the relationship between geospatial covariates and landslide propensity. 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/ggplot_pattern_boundaries.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Landslides occurrences from 2000 onwards. 
</div>
***
### Modelling
As is typically the fashion in Bayesian modelling, we begin by considering a general framework upon which several hierarchical priors are leveraged in order to hopefully make informative updates on the underlying distributions of the hyperparameters once data is provided. 

Denoting by $$D$$ the domain of interest in which landlides occur (for us Hong Kong), we seek to model the counting process $$N(D): \mathbb{R}^{2}\rightarrow \mathbb{N}$$ of landlides using knowledge concerning geological properties of the nation's terrain, as well as the spatial relationships between previously recorded landslide sites. Assuming there's an underlying intensity surface, $$\lambda(s):D\rightarrow \mathbb{R}$$ with $$s\in D$$ which drives the landslides, we have that 

$$ 
N(D) \sim Po(\lambda(D)), \quad \lambda(D) = \int_{D}\lambda(s)ds
$$

so that $$\mathbb{E}[N(D)] = \lambda(D)$$ and more generally that $$\forall B \subset D$$, $$N(B) \sim Po(\lambda(B))$$. 

Since in the Bayesian context we're more interested in likelihoods we note that by the independence of the spatial Poisson process we can express the likelihood of a given point pattern realization, $$S = \{s_{1}, s_{2},...,s_{n}\}$$ with each $$s_{i}$$ indicating the location of an observed landslide as (noting order invariance)

$$ 
\begin{align*}
    \mathcal{L}(\boldsymbol{S}) &= n!f(\boldsymbol{s}_{1}, \boldsymbol{s}_{2}, ... , \boldsymbol{s}_{n})\cdot P(N(D) = n)\\
    &= n! \prod_{i}^{n}\frac{\lambda(\boldsymbol{s}_{i})}{\lambda(D)}\cdot \frac{\lambda(D)^{n}\exp(-\lambda(D))}{n!}\\
    &= \left(\prod_{i}^{n} \lambda(\boldsymbol{s}_{i})\right) \exp(-\lambda(D))
\end{align*}
$$

Again though, remember we have access to a dataset of spatial covariates $$X(s)$$ which we can use to replace the slightly obscure $$\lambda(s)$$ with something a bit more concrete! For our purposes we lean towards the following GLM

$$
\log\lambda(s) = X(s)^{T}\beta+w(s)
$$

where $$w$$ is some-spatially correlated noise which allows us to gain information from our spatial proximity to previously recorded landslides. 

A preliminary Bayesian framework for this problem (known as the Log Gaussian Cox Process) is

$$
\begin{align*}
s|\lambda &\sim \lambda(s)/\lambda(D)\\
    \log \lambda(S)|\beta, \sigma^{2} &\sim \mathcal{N}_{N(D)}(X(S)\beta, \sigma^{2}\rho(\cdot; \phi))\\
    N(D) | \lambda &\sim Po(\lambda(D))\\
    \beta | \nu^{2} &\sim \mathcal{N}(0, 
    \nu^{2}I_{k+1})\\
    (\sigma^{2}, \phi, \nu^{2}) &\sim \pi \text{ informative}

\end{align*}
$$

Unfortunately though this turns out to be *quite computationally infeasible* mainly due to the integral required in the likelihood function up top which you'd have to compute successively to inform sampling for the posterior chains. To remedy this we instead discretize $$D$$ into a finite number of cells (the finer the better) with centroids $$s_{i}^{*}$$ inside which covariates are assumed to be constant. 

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/grid_10.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/grid_20.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Showing different grid refinements which amalgamate landslide counts into a discrete areal units. Increasing refinement comes at a nonlinear cost of more intensive posterior sampling. 
</div>

With this slight simplification in place we obtain the following model:

$$ 
\begin{align*}
Y(s_{i}^{*}) | \lambda &\sim Po(\lambda(s_{i}^{*}))\\
\log \lambda(s_{i}^{*}) | \beta, w, \epsilon &= X(s_{i}^{*})\beta + w(s_{i}^{*}) + \epsilon(s_{i}^{*})\\
\beta | \nu^{2} &\sim \mathcal{N}(0, \nu^{2} I_{k+1})\\
\epsilon(s_{1}^{*}), \epsilon(s_{2}^{*}), ... \epsilon(s_{m*n}^{*}) | \tau^{2}&\overset{iid}{\sim} \mathcal{N}(0, \tau^{2})\\
w | \sigma^{2}, \phi &\sim \mathcal{N}_{m*n}(0, \sigma^{2}\rho(\cdot;\phi))\\

(\nu^{2}, \tau^{2}, \sigma^{2}, \phi) &\sim \pi \text{ informative}
\end{align*}
$$

where the spatially correlated noise is modelled through a standard covariance kernel $$p$$ like [exponential](https://en.wikipedia.org/wiki/Covariance_function) or [Matern](https://en.wikipedia.org/wiki/Mat%C3%A9rn_covariance_function). From here on we'll let $$\theta = (\nu^{2}, \tau^{2}, \sigma^{2}, \phi) $$.

In order to select an appropriate level of refinement (too large and you combine potentially diverse regions, too small and your computer explodes) we generated elbow plots of the variance of different covariates within the grid cells and sought to find a point where successive refinement yeilded marginal benefits. 

In the end we opted for a grid size of 21x30 representing units of roughly 2km x 2km in real terms. 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/elbow.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    One plot for each covariate (in order from top left: vegetation cover, previously recorded erosion, slope, max elevation, landslide length, landslide width). 
</div>

*** 
### Predictive 
Using the 166 marked landslide observations from 2016, 2017, and 2018 (much less than 300 a year since we combined many into spatial units!) we created a training set to inform the model fitting. We then reserved the 55 landslide samples from 2019 for predictive purposes. 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/grid2016-2019.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Landslide distribution from years 2016-2018 over the selected grid with observations from 2019 in red.
</div>

We fit the model using the hyperparameter specifications for `rstan` outlined in the table below and obtained the corresponding chain histories for the parameters

<div class="row justify-content-sm-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/stan_table.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/hyperparam_chain.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/beta_chain.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Posterior fit for the model parameters obtained through rstan 
</div>

Recalling now the useful form of our intensity surface, namely it being a Gaussian process at the log scale, we can use historical observations to inform our predictions of landslides in the 2019 test year.

$$
\begin{align*}
    \begin{bmatrix}
    \log \lambda(S^{*}_{train}) \\
    \log \lambda(S^{*}_{test})
    \end{bmatrix}
     | \beta, \theta &\sim \mathcal{N}_{n+m}\left(
     \begin{bmatrix}
    X(S^{*}_{train})\beta \\
    X(S^{*}_{test})\beta
    \end{bmatrix}
    , \begin{bmatrix}
        \Sigma_{train,train} & \Sigma_{train,test}\\
        \Sigma_{test,train} & \Sigma_{test,test}
    \end{bmatrix}
    \right)\\
\end{align*}
$$

$$
 \log \lambda(S^{*}_{test}) | \beta, \theta, \log \lambda(S^{*}_{train}) = Z \sim \mathcal{N}_{m}\left(\bar{\mu}, \bar{\Sigma} \right)
$$

with 

$$
\begin{align*}
\bar{\mu} &= X(S^{*}_{test})\beta+\Sigma_{test,train}\cdot\Sigma_{train,train}^{-1}\left(Z - X(S^{*}_{train})\beta\right)\\
    \bar{\Sigma} & = \Sigma_{test,test} - \Sigma_{test,train}\Sigma_{train,train}^{-1}\Sigma_{train,test}
\end{align*}
$$

Now all that's left is to estimate the number of landslides at each grid cell in the test year (independenlty) and add these up for our prediction!  This is where Monte Carlo estimation using our posterior estimates comes in handy.  Indeed, 

$$
P(Y(s) = k | Y(S^{*})) = \int P(Y(s) = k| \log \lambda(s))P(\log \lambda(s) | \beta, \theta, Y(S))P(\beta, \theta | Y(S))d\beta d\theta
$$

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/predictions.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Predictions visualized point wise at each candidate spatial location in 2019 with associate 90% confidence intervals. 
</div>

