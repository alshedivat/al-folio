---
layout: page
title: SLAM
description: Mapping and localization with a particle filter
img: assets/img/SLAM/preview.png
importance: 2
category: course
header-includes:
  - \usepackage[ruled,vlined,linesnumbered]{algorithm2e}
output:
    pdf_document
---
__Collaborators: \\__

This project is to implement a simple mapping and localization algorithm in an indoor environment. TO do so, we employ a particle filter which uses information from an IMU and a LiDAR sensor. Specifically, the particle filter is used to localize the agent and the best particle (instead of all particles in general cases) is used to update the map.

---
##### __Localization__
Let's start with the partical filter. 

Particle filters (PFs) are a generalization of Unscented Kalman Filters that can handle non-Gaussian filtering distributions. Specifically, a PF utilizes the notion of importance sampling to estimate the distribution of robot's state. The positions (values) $$x^{(i)}$$ together with the weights $$w^{(i)}$$ of the particles decribe the estimation of the target distribution as a sum of [Dirac-delta distributions](https://en.wikipedia.org/wiki/Dirac_delta_function#:~:text=In%20mathematics%2C%20the%20Dirac%20delta,line%20is%20equal%20to%20one.) at points $$x^{(i)}$$, as shown in the figure below. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/SLAM/importance_sampling.png" title="example image" class="img-fluid rounded z-depth-1" width=600%}
    </div>
</div>

The key questions are
- How do we sample the values of particles?
- How do we update the weights of the particles?

in order to best approximate the actual distribution of the robot's state.

For the first question, the values of the particles are first changed by propagating the dynamics and then changed by the resampling process. For the second question, the weight of each particle is scaled propotionally to the likelihood of receiving current observation and then the sum of the weights are normalized to one. In addition, the resampling process will make all weights equal while keeping the estimated distribution unchanged. Here is the algorithm


1. __Propagating the dynamics__
> for each particle i = 1, . . . , n, update particles by one timestep 
>> $$x^{(i)}_{k+1 \mid k} = f(x^{(i)}_{k \mid k}, u_k) + \epsilon_k$$, where $$f$$ is the system dynamics, $$\epsilon_k \sim  \mathcal{N} (0, \mathbf{R})$$ is Gaussian noise. Weights of particles are unchanged $$w^{(i)}_{k+1\mid k} = w^{(i)}_{k\mid k} = 1/n$$.
2. __Incorporating the observation__
> for each particle i = 1, . . . , n, scale the weight using the likelihood of receiving that observation
>> $$w^{(i)}_{k+1\mid k+1} \propto P(y_{k+1} \mid x^{(i)}_{k+1 \mid k}) w^{(i)}_{k+1\mid k} $$
>>> In this project, $$P(y_{k+1} \mid x^{(i)}_{k+1 \mid k})$$ is given by $$e^{\sum_{ij \in O}m_{ij}}$$, where $$O$$ is the set of occupied cells as detected by the LiDAR scan assuming the robot is at particle $$p$$ and $$m_{ij}$$ is our current estimate of the binarized map.
3. __Normalizing the weights__
> the weights $$w^{(i)}_{k+1\mid k+1}$$ to sum up to 1.
4. __Resampling step__
> Perform the resampling step to obtain new particle locations $$x^{(i)}_{k+1 \mid k+1}$$ with uniform weights

###### __Resampling step__
The resampling step takes particles $${w^{(i)}, x^{(i)}}^n_{i=1}$$ which approximate a probability density $$p(x)$$ 

$$
p(x) = \sum^{n}_{i=1} w^{(i)}\delta_{x^{(i)}}(x)
$$

and returns a new set of particles $$x'^{(i)}$$ with equal weights $$w'^{(i)} = \frac{1}{n}$$ that approximate the same probability density

$$
p(x) = \frac{1}{n}\sum^{n}_{i=1} \delta_{x'^{(i)}}(x)
$$

The goal of the resampling step is to avoid particle degeneracy, i.e., remove unlikely particles with very low weights and effectively split the particles with very large weights into multiple particles.

<div class="row">
    <div class="col-sm mt-3 mt-md-0" style="text-align:center">
        {% include figure.html path="assets/img/SLAM/resampling.png" title="example image" class="img-fluid rounded z-depth-1" width="250" %}
    </div>
</div>

Consider the weights of particles $$w^{(i)}$$ arranged in a roulette wheel as shown above. We perform the following procedure: we equally divide the wheel into n areas. We randomly pick a location at each area and add the corresponding particle into our set $${x'^{(i)}}$$ Since particles with higher weights take up a larger angle in the circle, this procedure will often pick those particles and quickly move across particles with small weights without picking them too often. As an algorithm
- initialize $$i = 1$$, $$c = w^{(1)}$$ and let $$r\sim  Uniform(0,\frac{1}{n})$$
- For each $$m = 1, . . . , n$$, let $$u = r+(m-1)/n$$. Increment $$i \leftarrow i+1$$ and
$$c \leftarrow c +w^{(i)}$$ while $$u > c$$ and set new particle location $$x'^{(m)} = x^{(i)}$$.

##### __Update Map__
Using the particle with largest weight, we increase a map_t.log_odds array at cells that are recorded as obstacles by the LiDAR by slam_t.log_odds_occ and decrease the values in all other cells inside the LiDAR's vision by log_odds_free. We also clip the map_t.log_odds to lie between [-slam_t.map.log_odds_max, slam_t.map.log_odds_max] to prevent increasingly large values in the log_odds array. The cells with corresponding log_odds larger than a threshold will be treated as occupied, otherwise will be treated as free cells.

##### __Code and Implementation__
We test the SLAM algorithm with the data collected from a humanoid named THOR in indoor environment. The implementation datails, which involve some 3D transformation since the robot has a 2-DoF neck, are omitted here. The code can be found [HERE](https://github.com/TheZeyuanFeng/SLAM_PF). Just downloading it and running main.py should work!

##### __Preliminary Results__
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/SLAM/1.png" title="example image" class="img-fluid rounded z-depth-1" width="600" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/SLAM/2.png" title="example image" class="img-fluid rounded z-depth-1" width="600" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/SLAM/3.png" title="example image" class="img-fluid rounded z-depth-1" width="600" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/SLAM/4.png" title="example image" class="img-fluid rounded z-depth-1" width="600" %}
    </div>
</div>