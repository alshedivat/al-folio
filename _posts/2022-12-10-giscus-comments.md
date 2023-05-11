---
layout: distill
title: Autoencoders Explained
date: 2023-05-05 11:59:00-0400
description: Exploring generative models...
giscus_comments: true

authors:
    - name: Zakaria Patel

toc:
  - name: Equations
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2
  - name: Citations
  - name: Footnotes
  - name: Code Blocks
  - name: Interactive Plots
  - name: Layouts
  - name: Other Typography?
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

# N

This theme supports rendering beautiful math in inline and display modes using [MathJax 3](https://www.mathjax.org/) engine.
You just need to surround your math expression with `$$`, like `$$ E = mc^2 $$`.
If you leave it inside a paragraph, it will produce an inline expression, just like $$ E = mc^2 $$.

To use display mode, again surround your expression with `$$` and place it as a separate paragraph.
Here is an example:

$$
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
$$

Note that MathJax 3 is [a major re-write of MathJax](https://docs.mathjax.org/en/latest/upgrading/whats-new-3.0.html) that brought a significant improvement to the loading and rendering speed, which is now [on par with KaTeX](http://www.intmath.com/cg5/katex-mathjax-comparison.php).

***

## Citations

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

