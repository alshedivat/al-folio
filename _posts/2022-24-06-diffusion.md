---
layout: distill
title: Diffusion theory
description: Explanation of DDPM.
date: 2022-06-24

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
  - name: Problem Formulation
  - name: Loss Function Construction
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2
  - name: Posterior Distribution

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

## Problem Formulation

In recent years, Generative Adversarial Network has dominated in the field of generative model in term of sample quality and inference rate. Yet GANs show the weakness about the data distribution coverage and the challenging problem of training. In 2015, the idea of diffusion model had came out and then in 2020, DDPM (cite something here) was introduced and illustrated amazing results regarding to image fidelty and the coverage of distribution. Furthermore, in 2021, (Diffusion model beat GANs) shows that Diffusion Models have the ability to overcome GANs in the sample quality and exhibit good behavior in distribution coverage, which is the critical weakness of GANs.

In this blog, we will go through the idea and derivation of DDPM (the formulas and ideas follows the DDPM.)

<div class="l-body">
    {% include figure.html path="assets/img/posts/diffusion/figure1.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

The concept of diffusion model is diffusing the original image into a white noise with a given strategy and then learn a reverse process to approximate it. Behind the scene, (cite Feller theory) shows that if the noise schedule at each step is small enough, the reverse process shares the same form with the forward one, that is a vital factor which allows us to construct the loss functions and the learning algorithms.

In detail, forward process is formulated as follow:

$$
\begin{align*}
	q(x_{1:T}|x_{0}) = q(x_{0}).\prod^{T}_{1} q(x_{t}|x_{t-1}) \\
	q(x_{t}|x_{t-1}) = \mathcal{N}(\sqrt{1-\beta_{t}}\:x_{t-1}, \beta_{t}\mathrm{I})
\end{align*}
$$

where $$\beta_{t}$$ is the noise schedule that add noise to image sample, $$T$$ is the number of diffusion steps. The forward process is modeled as a Markov chain, in which the random variable $$x_{t}$$ only depends on the right previous one $$x_{t-1}$$.

The reverse process is straight forward reversal version of the forward one:

$$
\begin{align*}
  p_{\theta}(x_{0:T}) = p(x_{T}).\prod^{T}_{1} p_{\theta}(x_{t-1}|x_{t}) \\
  p(x_{T}) = \mathcal{N}(\mathrm{0}, \mathrm{I})
\end{align*}
$$

The task is now searching for the proper form of $$p_{\theta}$$, constructing the loss function and learning algorithm.

To make the later notation more readable, we make some transformation on the formulation as follow:

Set $$\alpha_{t} = 1 - \beta_{t}$$ and $$\bar{\alpha}_{t} = \prod_{s=1}^{T} \alpha_{s}$$, thus we can re-write the distribution $$ q(x_{t}\vert x_{t-1}) $$:

$$
\begin{align*}
  q(x_{t}|x_{t-1}) = \mathcal{N}(\sqrt{\alpha_{t}}\:x_{t-1}, (1-\alpha_{t})\mathrm{I})
\end{align*}
$$

Using above notation reveal a nice ability of sampling $$x_{t}$$ with a trivial effort:

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

Where $$\bar{z}_{t}$$ is random variable sampled from standard normal distribution. Do above transformation repeatly, we have:

$$
\begin{align*}
x_{t} &= \sqrt{\prod_{s=1}^{T} \alpha_{s}}\: x_{0} + \sqrt{(1-\prod_{s=1}^{T} \alpha_{s})} \bar{z}_{t} \\
&= \sqrt{\bar{\alpha}_{t}}\: x_{0} + \sqrt{(1-\bar{\alpha}_{t})} \bar{z}_{t}
\end{align*}
$$

Finally, we have the marginal distribution $$ q(x_{t}\vert x_{0}) = \mathcal{N}(\sqrt{\bar{\alpha}_{t}}\: x_{0}, (1-\bar{\alpha}_{t})\mathrm{I}) $$, which allows us to sample an arbitrary $$x_{t}$$ from $$x_{0}$$.

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
  &=\mathbf{E}_{q}\left[ -\log{p(x_{T})} - \sum_{t>1} \log \frac{p_{\theta}(x_{t-1}|x_{t})}{q(x_{t-1}|x_{t}, x_{0})}.\frac{q(x_{t-1}|x_{0})}{q(x_{t}|x_{0})} - \log(\frac{p_{\theta}(x_{0}|x_{1})}{q(x_{1}|x_{0})})\right] \text{(apply bayes rule)} \\
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

One noticeable property is that with given $$x_{t-1}, x_{0}$$, $$q(x_{t-1}\vert x_{0}, x_{t})$$ and $$p_{\theta}(x_{t-1}\vert x_{t})$$ are completely defined and $$\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}\vert x_{0}, x_{t}) \| p_{\theta}(x_{t-1}\vert x_{t}))$$ is known, or can be set as a constant. Thus, we have the following equation:

$$
\begin{align*}
\mathbf{E}_{q(x_{t-1})} [\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))] = \mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))
\end{align*}
$$

From that observation, we finally get the form of $$L_{t}$$:

$$
\begin{align*}
	\mathbf{E}_{q}\left[- \log \frac{p_{\theta}(x_{t-1}|x_{t})}{q(x_{t-1}|x_{t}, x_{0})} \right] 
	&= \mathbf{E}_{q(x_{0:t-2}, x_{t:T}|x_{t-1})} [\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))] \\
	&= \mathbf{E}_{q(x_{0:t-2}, x_{t:T}|x_{t-1})} \mathbf{E}_{q(x_{t-1})} [\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))] \\
	&= \mathbf{E}_{q(x_{0:T})}[\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}| x_{0}, x_{t}) || p_{\theta}(x_{t-1}|x_{t}))]
\end{align*}
$$

Applying above transformation to the general $$L$$, we get the final form of $$L$$:

$$
\begin{align*}
	L
	&=\mathbf{E}_{q}\left[-\log{\frac{p_{\theta}(x_{0:T})}{q(x_{1:T}|x_{0})}}\right] \\
	&=\mathbf{E}_{q}\left[ \mathrm{D}_{\mathrm{KL}}(q(x_{T}|x_{0})||\:p(x_{T})) + \sum_{t>1}\mathrm{D}_{\mathrm{KL}}(q(x_{t-1}|x_{t}, x_{0}) ||\: p_{\theta}(x_{t-1}|x_{t})) + \log(\frac{q(x_{1}|x_{0})}{p_{\theta}(x_{0}|x_{1})})\right]
\end{align*}
$$

Since the term $$ \mathrm{D}_{\mathrm{KL}}(q(x_{T} \vert x_{0}) \vert\:p(x_{T})) $$ is a constant, training is now 
approximating the reverse distribution $$p_{\theta}(x_{t-1}\vert x_{t})$$ to the posterior $$ q(x_{t-1}\vert x_{t}, x_{0}) $$.

***

## Posterior Distribution