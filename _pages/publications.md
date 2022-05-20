---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2022, 2021, 2020, 2019, 2018, 2017, 2016]
nav: true
---

[[Conference papers](#conference-papers)] | [[Journal papers](#journal-papers)]

#### Books

<div class="publications">

{% for y in page.years %}
  {% bibliography -f books -q @*[year={{y}}]* %}
{% endfor %}

</div>


#### Conference papers

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f confs -q @*[year={{y}}]* %}
{% endfor %}

</div>

#### Journal papers

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f journal -q @*[year={{y}}]* %}
{% endfor %}

</div>

<!-- #### Preprints and submissions -->
<!-- 1. Pooladian, A-A., and Niles-Weed, J. "Entropic estimation of optimal transport maps" (2021) [<a href="https://arxiv.org/pdf/2109.12004.pdf">PDF</a>]

#### Conference papers
1. Pooladian, A-A.\*, Finlay, C., Hoheisel, T., and Oberman, A. "A principled approach for generating adversarial images under non-smooth dissimilarity metrics", in *23rd International Conference on Artificial Intelligence and Statistics (AISTATS 2020)*. [<a href="https://github.com/APooladian/FarkasLayers">Github</a>] [<a href="https://arxiv.org/pdf/1908.01667.pdf">PDF</a>]
2. Finaly C.\*, Pooladian, A-A.\*, and Oberman, A., " The LogBarrier Adversarial Attack: Making effective use of decision boundary information", in *IEEE International Conference on Computer Vision (ICCV 2019)* [<a href="https://github.com/cfinlay/logbarrier">Github</a>] [<a href="https://arxiv.org/pdf/1903.10396.pdf">PDF</a>] 

#### Workshop papers
1. Finlay, C.\*, Gerolin, A.\*, Oberman, A., Pooladian A-A.\* (alphabetical) "Learning normalizing flows from Entropy-Kantorovich potentials", in *ICML workshop on Invertible Neural Networks, Normalizing Flows, and Explicit Likelihood Models (INNF+ 2020)*, with contributing talk, [<a href="https://arxiv.org/pdf/2006.06033.pdf">PDF</a>]

#### Journal articles
1. Hoheisel, T., Pablos, B., Pooladian, A-A., Schwartz, A., and Steverango, L. (alphabetical) "A study of one-parameter regularizations for mathematical programs with vanishing constraints", in *Optimization Methods and Software* (2020) [<a href="https://arxiv.org/pdf/2006.15662.pdf">PDF</a>]

#### Deep learning projects
1. Pooladian, A-A.\*, Finlay, C., and Oberman, A., "Farkas layers: Don't shift the data, fix the geometry" (2019) [<a href="https://github.com/APooladian/FarkasLayers">Github</a>] [<a href="https://arxiv.org/pdf/1910.02840.pdf">PDF</a>]
2. Pooladian, A-A.\*, Iannantuono, A., Finlay, C., and Oberman, A., "A Langevin dynamics based approach to generating sparse adversarial perturbations" (2019) [<a href="http://www.math.mcgill.ca/apooladian/LangevinDynamicsPreprint.pdf">PDF</a>] 
3. Pooladian, A-A.\*, Orfanides, G., "Sparse autoencoder using Scholtes relaxation scheme" (2018)
-->
<!-- #### Fun projects
1. Pooladian, A-A., "Batchwise projection algorithm onto total variation ball" (2019) [abcd](https://github.com/APooladian/TVProjection) -->
