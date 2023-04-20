---
layout: distill
title: Denoising Diffusion Probabilistic Model explanation
description: Explanation of DDPM.
date: 2022-06-24
tags: ["Generative Model", "Diffusion"]

authors:
  - name: Giang Vu Long
    affiliations:
      name: Hanoi

bibliography: diffusiontheory.bib

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Problem formulation
  - name: Loss function construction
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2
  - name: Posterior distribution
  - name: Parameterizing the reverse distribution
  - name: Conclusion
    subsections:
    - name: Props
    - name: Cons
    - name: Further works

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }

---

## Problem formulation

In recent years, Generative Adversarial Network has dominated the field of the generative model in terms of sample quality and inference rate. Yet GANs show the weakness in the data distribution coverage and the challenging problem of training. In 2015, the idea of diffusion model <d-cite key="sohl2015deep"></d-cite> came out and then in 2020, DDPM <d-cite key="ho2020denoising"></d-cite> was introduced and illustrated amazing results regarding image fidelity and the coverage of distribution. Furthermore, in 2021, Dhariwal and Nichol <d-cite key="dhariwal2021diffusion"></d-cite> showed that Diffusion Models have the ability to overcome GANs in the sample quality and exhibit good behavior in distribution coverage, which is the critical weakness of GANs.

In this blog, we will go through the idea and derivation of diffusion models (the formulas and ideas follow DDPM <d-cite key="ho2020denoising"></d-cite>).

<div class="l-body">
    {% include figure.html path="assets/img/posts/diffusion/figure1.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

The concept of diffusion model is diffusing the original image into a white noise by a given strategy and then learning a reverse process to approximate it. Behind the scene, for both Gaussian and binomial diffusion, <d-cite key="feller1949theory"></d-cite> shows that if the noise schedule at each step is small enough, the reverse process shares the same form as the forward one, which is a vital factor that guides the way of constructing the loss functions and the learning algorithms.

In detail, forward process is formulated as follow:

$$
\begin{align*}
	q(x_{1:T}|x_{0}) = q(x_{0}).\prod^{T}_{1} q(x_{t}|x_{t-1}) \\
	q(x_{t}|x_{t-1}) = \mathcal{N}(\sqrt{1-\beta_{t}}\:x_{t-1}, \beta_{t}\mathrm{I})
\end{align*}
$$

where $$\beta_{t}$$ is the noise schedule which is added to image sample, $$T$$ is the number of diffusion steps. In particular, Ho <d-cite key="ho2020denoising"></d-cite> models the forward process as a Markov chain, in which the random variable $$x_{t}$$ only depends on the right previous one $$x_{t-1}$$.

The reverse process is the reversal version of the forward procedure:

$$
\begin{align*}
  p_{\theta}(x_{0:T}) = p(x_{T}).\prod^{T}_{1} p_{\theta}(x_{t-1}|x_{t}) \\
  p(x_{T}) = \mathcal{N}(\mathrm{0}, \mathrm{I})
\end{align*}
$$

The task is now searching for the proper form of $$p_{\theta}$$, constructing the loss function and the learning algorithm.

To make the later notation more readable, some transformations are made to the formulation as follows:

Set $$\alpha_{t} = 1 - \beta_{t}$$ and $$\bar{\alpha}_{t} = \prod_{s=1}^{T} \alpha_{s}$$, $$ q(x_{t}\vert x_{t-1}) $$ can be rewritten as follow:

$$
\begin{align*}
  q(x_{t}|x_{t-1}) = \mathcal{N}(\sqrt{\alpha_{t}}\:x_{t-1}, (1-\alpha_{t})\mathrm{I})
\end{align*}
$$

Using above notation reveals a nice ability of sampling $$x_{t}$$ with a trivial effort:

$$
\begin{align*}
x_{t} &= \sqrt{\alpha_{t}}\:x_{t-1} + \sqrt{(1-\alpha_{t})} z_{t} \\
&= \sqrt{\alpha_{t}}\: (\sqrt{\alpha_{t-1}}\:x_{t-2} + \sqrt{(1-\alpha_{t-1})} z_{t-1}) + \sqrt{(1-\alpha_{t})} z_{t} \\
&= \sqrt{\alpha_{t}\alpha_{t-1}}\: x_{t-2} + \sqrt{\alpha_{t}(1-\alpha_{t-1})} z_{t-1} + \sqrt{(1-\alpha_{t})} z_{t}
\end{align*}
$$

Where $$ z_{t} $$ and $$ z_{t-1} $$ is random variable sampled from standard normal distribution $$ \mathcal{N}(\mathrm{0}, \mathrm{I}) $$. So let think the whole $$ \sqrt{\alpha_{t}(1-\alpha_{t-1})} z_{t-1} + \sqrt{(1-\alpha_{t})} z_{t} $$ term as a random variable, which is combined of two smaller term: $$ \sqrt{\alpha_{t}(1-\alpha_{t-1})} z_{t-1} $$ follows $$ \mathcal{N}(\mathrm{0}, \alpha_{t}(1-\alpha_{t-1}) \mathrm{I}) $$ and $$ \sqrt{(1-\alpha_{t})} z_{t} $$ follows $$ \mathcal{N}(\mathrm{0}, (1-\alpha_{t}) \mathrm{I}) $$. Because two terms $$ \sqrt{\alpha_{t}(1-\alpha_{t-1})} z_{t-1} $$ and $$ \sqrt{(1-\alpha_{t})} z_{t} $$ are independent, so the whole term $$ \sqrt{\alpha_{t}(1-\alpha_{t-1})} z_{t-1} + \sqrt{(1-\alpha_{t})} z_{t} $$ follows $$ \mathcal{N}(\mathrm{0}, (1-\alpha_{t-1}\alpha_{t}) \mathrm{I}) $$. Thus, we have:

$$
\begin{align*}
x_{t} &= \sqrt{\alpha_{t}\alpha_{t-1}}\: x_{t-2} + \sqrt{(1-\alpha_{t-1}\alpha_{t})} \bar{z}_{t}
\end{align*}
$$

Where $$\bar{z}_{t}$$ is random variable sampled from standard normal distribution. Do above transformation repeatly, $$x_{t}$$ becomes:

$$
\begin{align*}
x_{t} &= \sqrt{\prod_{s=1}^{T} \alpha_{s}}\: x_{0} + \sqrt{(1-\prod_{s=1}^{T} \alpha_{s})} \bar{z}_{t} \\
&= \sqrt{\bar{\alpha}_{t}}\: x_{0} + \sqrt{(1-\bar{\alpha}_{t})} \bar{z}_{t}
\end{align*}
$$

Finally, the marginal distribution is well-defined $$ q(x_{t}\vert x_{0}) = \mathcal{N}(\sqrt{\bar{\alpha}_{t}}\: x_{0}, (1-\bar{\alpha}_{t})\mathrm{I}) $$, which allows us to sample an arbitrary $$x_{t}$$ from $$x_{0}$$.

***

## Loss function construction

The target is maximizing the likelihood of real data under the reverse distribution. To do so, training is minimizing the lower bound of the negative log-likelihood: <d-footnote>If you are confused by the lower bound, read the blog about VAE <d-cite key="vaetheory"></d-cite>.</d-footnote>

$$
\begin{align*}
  \mathbf{E}[-\log p_{\theta}(x_{0})] \leq \mathbf{E}_{q} \left[ -\log\frac{p_{\theta}(x_{0:T})}{q(x_{1:T}|x_{0})} \right]
\end{align*}
$$

The loss function can be derived as follow:

$$
\begin{align*}
  \mathbf{E}_{q} \left[ -\log\frac{p_{\theta}(x_{0:T})}{q(x_{1:T}|x_{0})} \right]
  &=\mathbf{E}_{q}\left[-\log{\frac{p(x_{T}).\prod^{T}_{1} p_{\theta}(x_{t-1}|x_{t})}{q(x_{1:T}|x_{0})}}\right] \\
  &=\mathbf{E}_{q}\left[ -\log{p(x_{T})} - \sum_{t\geq1} \log \frac{p_{\theta}(x_{t-1}|x_{t})}{q(x_{t}|x_{t-1})} \right] \\
  &=\mathbf{E}_{q}\left[ -\log{p(x_{T})} - \sum_{t>1} \log \frac{p_{\theta}(x_{t-1}|x_{t})}{q(x_{t}|x_{t-1})} - \log(\frac{p_{\theta}(x_{0}|x_{1})}{q(x_{1}|x_{0})})\right] \\
  &=\mathbf{E}_{q}\left[ -\log{p(x_{T})} - \sum_{t>1} \log \frac{p_{\theta}(x_{t-1}|x_{t})}{q(x_{t-1}|x_{t}, x_{0})}.\frac{q(x_{t-1}|x_{0})}{q(x_{t}|x_{0})} - \log(\frac{p_{\theta}(x_{0}|x_{1})}{q(x_{1}|x_{0})})\right] \\
	&=\mathbf{E}_{q}\left[ -\log{p(x_{T})} - \sum_{t>1} \log \frac{p_{\theta}(x_{t-1}|x_{t})}{q(x_{t-1}|x_{t}, x_{0})} -\sum_{t>1}\log\frac{q(x_{t-1}|x_{0})}{q(x_{t}|x_{0})} - \log(\frac{p_{\theta}(x_{0}|x_{1})}{q(x_{1}|x_{0})})\right] \\
	&=\mathbf{E}_{q}\left[ -\log{p(x_{T})} - \sum_{t>1} \log \frac{p_{\theta}(x_{t-1}|x_{t})}{q(x_{t-1}|x_{t}, x_{0})} - \log\frac{1}{q(x_{T}|x_{0})} - \log(\frac{p_{\theta}(x_{0}|x_{1})}{q(x_{1}|x_{0})})\right] \\
	&=\mathbf{E}_{q}\left[ -\log\frac{p(x_{T})}{q(x_{T}|x_{0})} - \sum_{t>1} \log \frac{p_{\theta}(x_{t-1}|x_{t})}{q(x_{t-1}|x_{t}, x_{0})} - \log(\frac{p_{\theta}(x_{0}|x_{1})}{q(x_{1}|x_{0})})\right] \\
\end{align*}
$$

Let $$ L_{t} = \mathbf{E}_{q}\left[- \log \frac{p_{\theta}(x_{t-1} \vert x_{t})}{q(x_{t-1}\vert x_{t}, x_{0})} \right] $$ as an example.

$$
\begin{align*}
	\mathbf{E}_{q}\left[- \log \frac{p_{\theta}(x_{t-1}|x_{t})}{q(x_{t-1}|x_{t}, x_{0})} \right] 
	&= \int q(x_{0:T})\log \frac{q(x_{t-1}|x_{t}, x_{0})}{p_{\theta}(x_{t-1}|x_{t})} dx_{0:T} \\
	&= \int q(x_{t-1}|x_{t}, x_{0}) q(x_{t}, x_{0}) q(x_{1:t-2}, x_{t+1:T}|x_{0}, x_{t-1}, x_{t}) \log \frac{q(x_{t-1}|x_{t}, x_{0})}{p_{\theta}(x_{t-1}|x_{t})} dx_{0:T} \\
	&= \int \left[ \int q(x_{t-1}|x_{t}, x_{0}) \log \frac{q(x_{t-1}|x_{t}, x_{0})}{p_{\theta}(x_{t-1}|x_{t})} dx_{t-1}\right] q(x_{0:t-2}, x_{t:T}|x_{t-1}) dx_{0:t-2, t:T} \\
	&= \int [\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))]\: q(x_{0:t-2}, x_{t:T}|x_{t-1}) dx_{0:t-2, t:T} \\
	&= \mathbf{E}_{q(x_{0:t-2}, x_{t:T}|x_{t-1})} [\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))]
\end{align*}
$$

One noticeable property is that with given $$x_{t-1}, x_{0}$$, $$q(x_{t-1}\vert x_{0}, x_{t})$$ and $$p_{\theta}(x_{t-1}\vert x_{t})$$ are completely defined and $$\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}\vert x_{0}, x_{t}) \| p_{\theta}(x_{t-1}\vert x_{t}))$$ is known, or can be set as a constant. Thus, above formula is equal to:

$$
\begin{align*}
\mathbf{E}_{q(x_{t-1})} [\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))] = \mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))
\end{align*}
$$

From that observation, $$L_{t}$$ has the form as below:

$$
\begin{align*}
	\mathbf{E}_{q}\left[- \log \frac{p_{\theta}(x_{t-1}|x_{t})}{q(x_{t-1}|x_{t}, x_{0})} \right] 
	&= \mathbf{E}_{q(x_{0:t-2}, x_{t:T}|x_{t-1})} [\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))] \\
	&= \mathbf{E}_{q(x_{0:t-2}, x_{t:T}|x_{t-1})} \mathbf{E}_{q(x_{t-1})} [\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))] \\
	&= \mathbf{E}_{q(x_{0:T})}[\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))]
\end{align*}
$$

Applying above transformation to the general $$L$$:

$$
\begin{align*}
	L
	&=\mathbf{E}_{q}\left[-\log{\frac{p_{\theta}(x_{0:T})}{q(x_{1:T}|x_{0})}}\right] \\
	&=\mathbf{E}_{q}\left[ \mathrm{D}_{\mathrm{KL}}(q(x_{T}|x_{0})||\:p(x_{T})) + \sum_{t>1}\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}|x_{t}, x_{0}) ||\: p_{\theta}(x_{t-1}|x_{t})) + \log(\frac{q(x_{1}|x_{0})}{p_{\theta}(x_{0}|x_{1})})\right]
\end{align*}
$$

Since the term $$ \mathrm{D}_{\mathrm{KL}}(q(x_{T} \vert x_{0}) \vert\:p(x_{T})) $$ is a constant, training is now approximating the reverse distribution $$p_{\theta}(x_{t-1}\vert x_{t})$$ to the posterior $$ q(x_{t-1}\vert x_{t}, x_{0}) $$.

***

## Posterior distribution

In the above section, we have gone through the ideas and transformations for the loss function. Noticeablly, the loss function is cumulative of KL divergence between the reverse distribution and the posterior over all timestep $$t$$. To complete the loss function transformation, let's take a glance at the posterior <d-cite key="weng2021diffusion"></d-cite>.

$$
\begin{align*}
  q(x_{t-1}|x{t}, x_{0})
	&= \frac{q(x_{t}, x_{t-1}|x_{0})}{q(x_{t}|x_{0})} \\
	&= q(x_{t}|x_{t-1}, x_{0})\frac{q(x_{t-1}|x_{0})}{q(x_{t}|x_{0})} \\
	&= q(x_{t}|x_{t-1})\frac{q(x_{t-1}|x_{0})}{q(x_{t}|x_{0})} \\
	&\propto \text{exp} \left(- \frac{1}{2}(\frac{(x_{t} - \sqrt{\alpha_{t}}\,x_{t-1})^{2}}{\beta_{t}} + \frac{(x_{t-1}-\sqrt{\bar{\alpha}_{t-1}}\,x_{0})^2}{1 - \bar{\alpha}_{t-1}} - \frac{(x_{t}-\sqrt{\bar{\alpha}_{t}}x_{0})^2}{1-\bar{\alpha}_{t}})\right) \\
	&= \text{exp} \left(- \frac{1}{2} ((\frac{\alpha_{t}}{\beta_{t}} + \frac{1}{1-\bar{\alpha}_{t-1}})x^{2}_{t-1} - (\frac{2\sqrt{\alpha_{t}}}{\beta_{t}}x_{t} + \frac{2\sqrt{\bar{\alpha}_{t-1}}}{1-\bar{\alpha}_{t-1}}x_{0})x_{t-1} + \mathbf{C}(x_{t}, x_{0}))\right)
\end{align*}
$$

Consider the equation inside.

$$
\begin{align*}
  &\   (\frac{\alpha_{t}}{\beta_{t}} + \frac{1}{1-\bar{\alpha}_{t-1}})x^{2}_{t-1} - (\frac{2\sqrt{\alpha_{t}}}{\beta_{t}}x_{t} + \frac{2\sqrt{\bar{\alpha}_{t-1}}}{1-\bar{\alpha}_{t-1}}x_{0})x_{t-1} + \mathbf{C}(x_{t}, x_{0}) \\
	&= (\frac{\alpha_{t}(1-\bar{\alpha}_{t-1}) + \beta_{t}}{\beta_{t}(1-\bar{\alpha}_{t-1})})\,x_{t-1}^2 - 2(\frac{\sqrt{\alpha_{t}}(1-\bar{\alpha}_{t-1})x_{t} + \sqrt{\bar{\alpha}_{t-1}}\beta_{t}x_{0}}{\beta_{t}(1-\bar{\alpha}_{t-1})})x_{t-1} + \mathbf{C}(x_{t}, x_{0}) \\
	&=\frac{\alpha_{t}-\alpha_{t}\bar{\alpha}_{t-1} + 1 - \alpha_{t}}{\beta_{t}(1-\bar{\alpha}_{t-1})}x_{t-1}^2 - 2(\frac{\sqrt{\alpha_{t}}(1-\bar{\alpha}_{t-1})}{\beta_{t}(1-\bar{\alpha}_{t-1})}x_{t} + \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_{t}}{\beta_{t}(1-\bar{\alpha}_{t-1})}x_{0})x_{t-1} + \mathbf{C}(x_{t}, x_{0}) \\
	&=\frac{1 - \bar{\alpha}_{t}}{\beta_{t}(1-\bar{\alpha}_{t-1})}x_{t-1}^2 - 2(\frac{\sqrt{\alpha_{t}}(1-\bar{\alpha}_{t-1})}{\beta_{t}(1-\bar{\alpha}_{t-1})}x_{t} + \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_{t}}{\beta_{t}(1-\bar{\alpha}_{t-1})}x_{0})x_{t-1} + \mathbf{C}(x_{t}, x_{0}) \\
	&=\frac{1 - \bar{\alpha}_{t}}{\beta_{t}(1-\bar{\alpha}_{t-1})}\left( x_{t-1}^2 - 2(\frac{\sqrt{\alpha_{t}}(1-\bar{\alpha}_{t-1})}{1 - \bar{\alpha}_{t}}x_{t} + \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_{t}}{1 - \bar{\alpha}_{t}}x_{0})x_{t-1}\right) + \mathbf{C}(x_{t}, x_{0})
\end{align*}
$$

From here $$ q(x_{t-1}\vert x{t}, x_{0}) $$ can be seen as a Gaussian with $$\mathbf{E}_{q(x_{t-1}\vert x_{t},x_{0})}[x_{t-1}] = \frac{\sqrt{\alpha_{t}}(1-\bar{\alpha}_{t-1})}{1 - \bar{\alpha}_{t}}x_{t} + \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_{t}}{1 - \bar{\alpha}_{t}}x_{0}$$ and $${\mathbf{V}_{q(x_{t-1} \vert x_{t},x_{0})}[x_{t-1}] = \frac{\beta_{t}(1-\bar{\alpha}_{t-1})}{1 - \bar{\alpha}_{t}}}$$.

Denote $$ \tilde{\mu}_{t} = \frac{\sqrt{\alpha_{t}}(1-\bar{\alpha}_{t-1})}{1 - \bar{\alpha}_{t}}x_{t} + \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_{t}}{1 - \bar{\alpha}_{t}}x_{0} $$ and $$ \tilde{\beta}_{t} = \frac{\beta_{t}(1-\bar{\alpha}_{t-1})}{1 - \bar{\alpha}_{t}}$$, then we have $$ q(x_{t-1}\vert x_{t}, x_{0}) = \mathcal{N}(\tilde{\mu}_{t}, \tilde{\beta}_{t}\mathrm{I}) $$. Furthermore, we have $$ x_{t} = \sqrt{\bar{\alpha}_t} x_{0} + \sqrt{(1-\bar{\alpha}_{t})}\epsilon $$:

$$
\begin{align*}
  \tilde{\mu}_{t} &= \frac{\sqrt{\alpha_{t}}(1-\bar{\alpha}_{t-1})}{1 - \bar{\alpha}_{t}}x_{t} + \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_{t}}{1 - \bar{\alpha}_{t}}x_{0}  \\
  &= \frac{\sqrt{\alpha_{t}}(1-\bar{\alpha}_{t-1})}{1 - \bar{\alpha}_{t}}x_{t} + \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_{t}}{1 - \bar{\alpha}_{t}} \left( \frac{x_{t} - \sqrt{(1-\bar{\alpha}_{t})}\epsilon}{\sqrt{\bar{\alpha}_t}}\right) \\
  &= \gamma_{t}x_{t} + \frac{\beta_{t}}{\sqrt{\alpha_{t}(1-\bar{\alpha}_{t})}} \epsilon
\end{align*}
$$

***

## Parameterizing the reverse distribution

Because posterior distribution is gaussian, it is reasonable to construct reverse distribution as a gaussian one $$ p_{\theta}(x_{t-1} \vert x_{t}) = \mathcal{N}(\mu_{\theta}(x_{t}, t), \Sigma_{\theta}(x_{t}, t))$$. According to Ho <d-cite key="ho2020denoising"></d-cite>, fixed $$\Sigma_{\theta}$$ illustrates better results than trainable one. In detail, the authors use two options to fix $$\Sigma_{\theta}$$:

* Fix to noise schedule: $$ \Sigma_{\theta} = \beta_{t}\mathrm{I} $$
* Fix to posterior variance: $$ \Sigma_{\theta} = \tilde{\beta}_{t}\mathrm{I} $$

Since $$\Sigma_{\theta}$$ is fix, KL divergence at timestep $$t$$ has close form:

$$
\begin{align*}
L_{t-1} &= \mathbf{E}_{q}(\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}|x_{t}, x_{0}) ||\: p_{\theta}(x_{t-1}|x_{t}))) \\
&= \mathbf{E}_{q}\left[ \frac{\beta_{t}^{2}}{2\sigma_{t}^{2}\alpha_{t}(1-\bar{\alpha}_{t})} || \epsilon - \epsilon_{\theta}(x_{t}, t)||^{2} \right]
\end{align*}
$$

From here, one can calculate the loss function easily and train the network.
Below is the algorithm Ho <d-cite key="ho2020denoising"> </d-cite> used for his training.

<div class="l-body">
    {% include figure.html path="assets/img/posts/diffusion/figure2.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

***

## Conclusion

1. Pros:

   * Diffusion model shows a new method to generate data with high quality.
   * Data generated using this family of models avoid mode collapse, which leads to a higher number in likelihood score.
  
2. Cons:

   * Because of the idea of gradually denoise from initial datapoint, diffusion model requires large number step to generate a sample, which is less efficient that prior method such as GANs or VAE.

3. Further work:
   
   * There are numerous works pushing efforts in accelerating inference rate of diffusion models such as Nicol <d-cite key="nichol2021improved"></d-cite>, Song <d-cite key="song2020denoising"></d-cite>. Inspite of large efforts on improving sampling speed, all methods succeeding in it show a trade-off between speed and quality of generated images.
   * Song <d-cite key="song2020score"></d-cite> proposes a statistical framework to explain diffusion models, with which, one has several options to construct new diffusion models. The authors also propose a method for boosting sampling speed while preserving image quality.
