---
layout: page
title: Understanding Deep Networks for Imaging
description: 
img: assets/img/understanding.PNG
importance: 2
category: work
---

Convolutional neural networks (CNNs) are a well-established tool for solving computational imaging problems. It has been recently shown that, despite being highly overparameterized (more weights than pixels), networks trained with a single corrupted image can still perform as well as fully trained networks (a.k.a. the deep image prior). These results highlight that CNNs posses a very powerful learning bias towards natural images, which explains their great success in recent years. Multiple intriguing question arise:

__What is the learning bias?__
Are neural networks performing something similar to other existing tools in signal processing?
Is the existing theory able to explain this phenomenon?

In {% cite tachella2021nonlocal %}, we make a first step towards answering these questions, using recent theoretical insights of infinitely wide networks (a.k.a. the neural tangent kernel), elucidating formal links between CNNs and well-known non-local patch denoisers, such as non-local means.

Non-local means uses the following non-local similarity function:

$$ k(y_i, y_j) = \exp(-||y_i-y_j||^2/\sigma^2)$$

where $$y_i$$ and $$y_j$$ are small image patches (e.g. $$5\times 5$$ pixels) around the pixels $$i$$ and $$j$$. The filter matrix $$W$$ is constructed as $$W = \text{diag}(\frac{1}{1^TK}) K$$ and the simplest denoising procedure consists of applying $$W$$ to the (vectorized) noisy image $$y$$, that is $$\hat{z}=W y$$. There are more sophisticated procedures such as twicing, where the filtering matrix is applied iteratively to the residual:

$$z^{k+1} = z^{k} + W(y-z^{k})$$ 

This procedure trades bias (over-smooth estimates) for variance (noisy estimates), and is stopped when a good balance is achieved. How does this relate to a convolutional neural network trained with a single image? It turns out that, as the network's width increases, standard gradient descent optimization of the squared $$\ell_2$$ loss follows the twicing process, with a (fixed!) filter matrix $$W=K$$ where the pixel affinity function is available in closed form and only depends on the architecture of the network! For example, a simple single-hidden layer network with a filter of $$k\times k$$ pixels, corresponds to a non-local similarity function

$$ k(y_i, y_j) = \frac{||y_i|| ||y_j||}{\pi} (\sin\phi+(\pi-\phi)\cos\phi)$$ 

where $$\phi$$ is the angle between patches $$y_i$$ and $$y_j$$ of $$k\times k$$ pixels each. Hence, we can compute the implicit filter in closed-form, without need to train a very large network!

Our analysis reveals that a neural network that, while the NTK theory accurately predicts the filter associated with networks trained using standard gradient descent, it falls short to explain the behavior of networks trained using the popular Adam optimizer. The latter achieves a larger change of weights in hidden layers, adapting the non-local filtering function during training. We evaluate our findings via extensive image denoising experiments. See the paper for more details!

### Related papers
<div class="publications">
{% bibliography --cited -f papers %}
</div>
