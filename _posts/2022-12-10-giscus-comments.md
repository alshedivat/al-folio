---
layout: distill
title: Autoencoders Explained
date: 2023-05-05 11:59:00-0400
description: Exploring generative models...
giscus_comments: true

authors:
    - name: Zakaria Patel

toc:
  - name: Introduction
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2
  - name: The Standard Autoencoder
  - name: Mathematical Overview of Autoencoders
  - name: Regularization Methods
  - name: Variational Autoencoders
---



## Introduction

This post explores various types of autoencoders. Autoencoders are a class of artificial neural network that can be used for unsupervised learning tasks. They have become increasingly popular in recent years, and are now used in a variety of applications, including image and speech recognition, anomaly detection, and natural language processing. 

There are several different types of autoencoders, each with its own specific architecture and use case. Some examples include the vanilla autoencoder, which consists of a single hidden layer; the denoising autoencoder, which can be used to remove noise from input data; and the variational autoencoder, which can be used to generate new data samples that are similar to the input data. 

In addition to their practical applications, autoencoders have also been used to advance the field of deep learning. For example, they have been used to pretrain deep neural networks, which can then be fine-tuned for specific tasks. They have also been used to achieve state-of-the-art results on many tasks, including image classification, speech recognition, and natural language processing. 

This post explores various autoencoder architectures, from the 

## The Standard Autoencoder

An autoencoder is a special type of neural network architecture that learns to reconstruct its input. It consists of two components: an encoder to learn a representation of the input, and decoder to construct this representation back into the input. However, the actual architecture is a single feed-forward network, with a bottleneck layer marking the boundary between the two components.

 Once an input sample of dimension $$N$$ passes through the encoder, we obtain a latent representation of it that has dimensionality $$D$$. As autoencoders are tools for dimnesionality reduction, $$D \ll N$$. Subsequently, the decoder takes this latent representation and produces an output of size $$N$$, that resembles the input as closely as possible. 

If the decoder is able to reconstruct the input simply using the latent representation, the latter must contain all the most relevant information about the original input. This latent representation is the bottleneck, which should (ideally) contain only the most meaningful features of the input. The intuition is simple: if you are given a single line to summarize a paragraph, you will carefully select only the most important details to include. Conversely, if you had a page for this task, fearing that you will miss important details, you might simply copy the entire paragraph.  

It is not possible to exactly reconstruct the input. The encoding process is lossy, as it attempts to store a relatively larger amount of information into a compressed space. Some details of the input are necessarily discarded to produce the hidden code. This lossy behaviour is intentional, of course, because it encourages the network to discard less relevant information. 

Once the autoencoder is trained, we have a system which can compress information. This is particular useful for applications such as data transfer. We can encode a piece of data, transfer the code, and decode it on the other side. This is just one of many applications of autoencoders. 

## Mathematical Overview of Autoencoders


From a mathematical perspective, the encoder can be represented as a function $$f$$ that maps an input vector $$\mathbf{x}$$ to a latent representation $$\mathbf{z}$$:

$$\mathbf{z} = f(\mathbf{x})$$

The latent representation $$\mathbf{z}$$ is \textit{typically} of lower dimensionality than the original input vector $$\mathbf{x}$$.

Once the input data has been compressed to the lower-dimensional representation $\mathbf{z}$, the decoder network takes this representation and maps it back to a reconstructed version $\mathbf{x'}$ of the original input:

$$\mathbf{x'} = g(\mathbf{z})$$

The encoder function $$f$$ and decoder function $$g$$ are implemented as a neural network with one or more hidden layers. 

The autoencoder's training objective entails minimizing the difference between the original input vector $$\mathbf{x}$$ and its reconstructed version $$\mathbf{x'}$$. This can be accomplished by defining a loss function that measures the difference between $$\mathbf{x}$$ and $$\mathbf{x'}$$, and then optimizing the parameters of the encoder and decoder networks to minimize this loss function.

The mean squared error (MSE) loss is well suited for this purpose. It measures the average squared difference between the original input vector and its reconstructed version:

$$\mathcal{L}_{\text{MSE}} = \frac{1}{n} \sum_{i=1}^{n} (\mathbf{x}_i - \mathbf{x'}_i)^2$$

where $$n$$ is the number of elements in the input vector.

Another common loss function is the binary cross-entropy (BCE) loss, which is used when the input vector consists of binary values (e.g. 0s and 1s):

$$\mathcal{L}_{\text{BCE}} = -\frac{1}{n} \sum_{i=1}^{n} (\mathbf{x}_i \log(\mathbf{x'}_i) + (1-\mathbf{x}_i) \log(1-\mathbf{x'}_i))$$

where $$\log$$ represents the natural logarithm.

## Regularization Methods

To recap, a autoencoder should take in some input, and produce an output that resembles the input as closely as possible. In between these two stages is some kind of lossy process that prevents the autoencoder from having access to the entire input, and trivially copying it. The architecture described previously falls under a category of autoencoders known as undercomplete autoencoders, where a bottleneck layer enforces this information loss. 

There are various alternatives to the bottleneck architecture. Overcomplete autoencoders avoid restricting the size of the latent vector in the neural network (i.e. the bottleneck layer), instead opting to use techniques such as regularization or denoising to limit the information stored in this layer. In this case, the dimension of the latent vector can be larger than the input. Clearly, an overcomplete autoencoder itself is useless, as the network could trivially learn the identity by passing the input through the latent layer unchanged. Regularization penalizes the use of the additional real estate in the large latent layer, hoping to prevent the autoencoder from simply passing information through it and forcing it to compress information into fewer number of neurons. In a similar vein, the denoising task also prevents the autoencoder from copying the input to the output, by providing it with a noisy copy of the input. This way, the autoencoder must learn to transform this noisy image into one that is denoised. The identity function with no longer suffice. 

## Variational Autoecoders

Consider the simple graphical model in figure X. While $$\mathbf{x}\in \mathcal{R}^d$$ is observed, it is a product of $$\mathbf{z}\in \mathcal{R}^k$$, a latent space variable. We can't observe $$\mathbf{z}$$ (otherwise it wouldn't be latent), but it may be possible to infer it after observing its generation, $$\mathbf{x}$$. We're interested in this latent variable $$\mathbf{z}$$ because it generates our observations. 

In order to treat this as a generative process, we define a distribution $$p(\mathbf{z})$$ from which we can randomly sample a latent vector. Subsequently. we could provide $$\mathbf{z}$$ as input to some deterministic decoder $$G_\theta(\mathbf{z})$$, producing generated samples $$\mathbf{x'}$$. The process of converting a latent representation into an image is complicated. As usual, such complicated functions can be approximated by a neural network, and so $$G_\theta$$ is implemented as such.

The issue with this approach occurs in how we formulate our training procedure. A natural way of training a model on this task may entail a maximum likelihood objective, where we try to optimize the parameters of the model to maximize the likelihood of the data, $$p(\mathbf{x})=\int p(\mathbf{z})p(\mathbf{x}\vert\mathbf{z}) d\mathbf{z}$$. Here, $$p(\mathbf{z})$$ is a prior distribution for $$\mathbf{z}$$, which we often choose to be a Gaussian. This may seem rather ad-hoc, but Gaussians have much to offer in the way of computational convenience. The second term, $$p(\mathbf{x}\vert \mathbf{z})$$, represents the probability distribution over the decoder's outputs, conditioned on the input $$\mathbf{z}$$. If the decoder is deterministic, each input $$\mathbf{z}$$ corresponds to a single output $$\mathbf{x'}$$, meaning the distribution $$p(\mathbf{x}\vert \mathbf{z})$$ is zero everywhere except where single point where $$\mathbf{x} = \mathbf{x'}$$. As such, there is often no training signal. The problem is made worse when $$k\ll d$$. The decoder must map the low dimensional latent code $$\mathbf{z}$$ to a much higher dimension. 

We deal with this by introducing a \textit{noisy channel model}, 

$$
p_\theta(\mathbf{x}\vert\mathbf{z}) = \mathcal{N}(\mathbf{x}; G_\theta(\mathbf{z}), \eta \mathbf{I}).
$$

This formulation ensures that the conditional probability of $$\mathbf{x}$$ is non-zero everywhere. Again, we've assumed a Gaussian for computational convenience, with mean $$G_\theta(\mathbf{z})$$  and covariance $$\eta$$. Each latent code now corresponds to a probability distribution over $$\mathbf{x}$$, ensuring that we obtain a non-zero training signal. Computing $$p(\mathbf{x})=\int p(\mathbf{z}) p(\mathbf{x}\vert\mathbf{z}) d\mathbf{z}$$ requires integration over each dimension of $$\mathbf{z}$$.

Another issue with the maximum likelihood objective is that it is possibly intractable. We chose to approximate the likelihood function $$p(\mathbf{x}\vert\mathbf{z})$$ with a neural network $$G_\theta$$. Obviously, $$G_\theta$$ is a very complicated function - there is no hope of analytically integrating it.  

Numerical methods aren't necessarily sufficient here, either. Computing $$p(\mathbf{x})$$ involves integration over all latent variables. As such, we must consider all possible combinations of values that each latent variable can take, leading to a complexity that scales with the number of latent variables. In short, a high dimensional latent space leads to a computationally burdensome integral. So, we have reached the conclusion that computing $$p(\mathbf{x})$$ is clearly intractable. 


We will briefly digress to reiterate how we planned to use this model in a generative capacity. We must be able to \textit{randomly} sample $$\mathbf{z}$$, and we can subsequently pass it into the decoder $$G_\theta$$ to produce a sample $$\mathbf{x'}$$. This is certainly a plausible scheme if we had some way of sampling $\mathbf{z}$. In fact, we do. We have already chosen $$p(\mathbf{z})$$ to be a Gaussian with mean $$\mathbf{\mu} = \mathbf{0}$$ and unit covariance. If $$G_\theta$$ has been trained to take latent vectors from this prior distribution and decode them into samples $$\mathbf{x'}$$, then we have a generative model.

How does the decoder actually learn to map latent vectors to samples? We could ask the decoder to produce samples $$\mathbf{x'}$$ that are similar to some ground truth $$\mathbf{x}$$ based on a sampled latent vector $$\mathbf{z}$$. However, this choice of latent vector is arbitrary, as we have chosen it ourselves. We would rather let the network learn a latent space on its own, as the network can learn something which has a meaningful structure. To this end, we introduce an encoder network $$q_\phi(\mathbf{z}\vert\mathbf{x})$$ which approximates the posterior distribution $$p(\mathbf{z}\vert\mathbf{x})$$

Just like the standard autoencoder, this encoder produces a latent vector $$\mathbf{z}$$ that the decoder must try to reconstruct into $$\mathbf{x}$$. Then, training the encoder and decoder together produces a meaningful latent space.

## Variational Inference

The approximation $$q_\phi(\mathbf{z}\vert\mathbf{x})$$ should be as close to $$p(\mathbf{z}\vert\mathbf{x})$$ as possible. One way to determine how different two distributions are is to measure their Kullback-Leibler (KL) divergence (formally, it is not a distance metric as it is not symmetric, i.e. $$D_{KL}(p\vert\vert q) \neq D_{KL}(q\vert\vert p)$$). For a discrete distribution,


$$
KL(p \vert\vert q) = \sum_{c=1}^{M}p_c \log{\frac{q_c}{p_c}}
$$

In our case, we convert the sum to an integral because the approximate and true posteriors are continuous. Their KL divergence can be written as follows,

$$
\begin{alignat}{1}
D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z}\vert\mathbf{x}))\\
= \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(\frac{p(\mathbf{z}\vert\mathbf{x})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right) d\mathbf{z}\\= \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(\frac{p(\mathbf{x}, \mathbf{z})}{p(\mathbf{x})q_\phi(\mathbf{z}\vert\mathbf{x})}\right) d\mathbf{z}\\
= \int q_\phi(\mathbf{z}\vert\mathbf{x})\left[ \log\left(\frac{p(\mathbf{x},\mathbf{z})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right) - \log\left(p(\mathbf{x})\right) \right]d\mathbf{z} \\
=  \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(\frac{p(\mathbf{x}, \mathbf{z})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right) d\mathbf{z} - \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(p(\mathbf{x})\right) d\mathbf{z} 
\end{alignat}
$$

$$p(\mathbf{x})$$ does not depend on $$\mathbf{z}$$, and the integral of $$q(\mathbf{z}\vert\mathbf{x})$$ over all space must be equal to 1,

$$
\begin{alignat}{1}
        =  \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(\frac{p(\mathbf{x}, \mathbf{z})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right) d\mathbf{z} - \log\left(p(\mathbf{x})\right)  \int q_\phi(\mathbf{z}\vert\mathbf{x}) d\mathbf{z}\\
        =  \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(\frac{p(\mathbf{x}, \mathbf{z})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right) d\mathbf{z} - \log\left(p(\mathbf{x})\right)
\end{alignat}
$$

Rearranging this expression,


$$
\begin{alignat}{1}
        D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z}\vert\mathbf{x})) =  \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(\frac{p(\mathbf{z}\vert\mathbf{x})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right) d\mathbf{z} - \log\left(p(\mathbf{x})\right)
        \log\left(p(\mathbf{x})\right) \\ 
        = \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(\frac{p(\mathbf{x}, \mathbf{z})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right) d\mathbf{z} - D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z}\vert\mathbf{x})) \\
        = \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(\frac{p(\mathbf{x},\mathbf{z})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right) d\mathbf{z} - D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z}\vert\mathbf{x})) \\
        = \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(\frac{p(\mathbf{x}\vert\mathbf{z})p(\mathbf{z})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right) d\mathbf{z} - D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z}\vert\mathbf{x})) \\
        = \int q_\phi(\mathbf{z}\vert\mathbf{x})\left[\log\left(\frac{p(\mathbf{z})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right) - \log\left( p(\mathbf{x}\vert\mathbf{z})\right) \right]  d\mathbf{z} - D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z}\vert\mathbf{x})) \\
        = \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left(\frac{p(\mathbf{z})}{q_\phi(\mathbf{z}\vert\mathbf{x})}\right)d\mathbf{z} - \int q_\phi(\mathbf{z}\vert\mathbf{x})\log\left( p(\mathbf{x}\vert\mathbf{z})\right) d\mathbf{z} - D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{x}\vert\mathbf{z}\vert\mathbf{x})) 
\end{alignat}
$$

We recognize the first term as the KL divergence between $$q_\phi(\mathbf{z}\vert\mathbf{x})$$ and $$p(\mathbf{z})$$, and the second as the expectation of $$p(\mathbf{x}\vert\mathbf{z})$$ with respect to the approximate posterior distribution $$q_\phi(\mathbf{z}\vert\mathbf{x})$$. 

$$  
\begin{alignat}{1}
        \log\left(p(\mathbf{x})\right) 
        = \left[ D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z})) - \mathbb{E}_ {q(\mathbf{z}\vert\mathbf{x})}\left[\log p(\mathbf{z})\right] \right] - D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z}\vert\mathbf{x})) \\ 
         = \text{ELBO}  - D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z}\vert\mathbf{x})) 
\end{alignat}
$$


The observed data does not change - $$\log(p(\mathbf{x}))$$ must be a constant. However, the terms which sum up to the log data likelihood do vary individually. If we increase one of the terms, we must decrease the others. Our objective was to minimize $$D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z}\vert\mathbf{x}))$$, but obtaining $$p(\mathbf{z}\vert\mathbf{x})$$ is difficult (which is why we are approximating it with $$q_\phi(\mathbf{z}\vert\mathbf{x})$$ in the first place). Instead, we can maximize the we named "ELBO", which \textit{is} tractable. This term is the \textbf{variational lower bound}. Given our above reasoning, maximizing the ELBO will minimize $$ D_{KL}(q_\phi(\mathbf{z}\vert\mathbf{x})\vert\vert p(\mathbf{z}\vert\mathbf{x}))$$, and we will obtain an encoder which closely approximates the true posterior distribution.

## Other Useful Sources

Citations are then used in the article body with the `<d-cite>` tag.
The key attribute is a reference to the id provided in the bibliography.
The key attribute can take multiple ids, separated by commas.

The citation is presented inline like this: <d-cite key="gregor2015draw"></d-cite> (a number that displays more information on hover).
If you have an appendix, a bibliography is automatically created and populated in it.

Distill chose a numerical inline citation style to improve readability of citation dense articles and because many of the benefits of longer citations are obviated by displaying more information on hover.
However, we consider it good style to mention author last names if you discuss something at length and it fits into the flow well — the authors are human and it’s nice for them to have the community associate them with their work.

***

## Footnotes

Just wrap the text you would like to show up in a footnote in a `<d-footnote>` tag.
The number of the footnote will be automatically generated.<d-footnote>This will become a hoverable footnote.</d-footnote>

***

## Code Blocks

Syntax highlighting is provided within `<d-code>` tags.
An example of inline code snippets: `<d-code language="html">let x = 10;</d-code>`.
For larger blocks of code, add a `block` attribute:

<d-code block language="javascript">
  var x = 25;
  function(x) {
    return x * x;
  }
</d-code>

**Note:** `<d-code>` blocks do not look good in the dark mode.
You can always use the default code-highlight using the `highlight` liquid tag:

{% highlight javascript %}
var x = 25;
function(x) {
  return x * x;
}
{% endhighlight %}

***

## Interactive Plots

