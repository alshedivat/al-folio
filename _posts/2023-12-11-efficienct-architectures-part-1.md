---
layout: distill
title: Efficient Architectures&#58; Part 1
description: A summary of efficienct transformer-based models
date: 2099-12-5
tags: technical
categories: transformers efficient-methods-for-nlp

authors:
  - name: Akshita Bhagia
    url: "{{site.url}}"

# TODO: change date in bib file.
bibliography: 2022-12-11-efficient-architectures.bib

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Efficiency in Transformers
    subsections:
      - name: The efficiency bottleneck
      - name: Complexity of feedforward layers
      - name: Design challenges
  - name: Taxonomy of Efficient Transformers
    subsections:
      - name: Fixed Patterns
      - name: Learnable Patterns
      - name: Neural Memory
      - name: Low-rank and Kernel Methods
      - name: Recurrence
      - name: Downsampling
      - name: Sparse Models and Conditional Computation
      - name: Summary
  - name: Longer sequences
    subsections:
    - name: Are longer sequences processed?
    - name: Are longer sequences utilized?
  - name: Evaluation
  - name: Conclusion

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

## Efficiency in Transformers

A transformer model's efficiency can be defined in terms of
* Memory consumption (GPU sizes)
* Computational costs (FLOPs)
as applied to large inputs.

These become especially relevant in case of scaling transformer models to work for longer sequences. TODO: add more details.

### The efficiency bottleneck

One can consider two major sources of inefficiency in the transformer:

* Attention computation
* Feedforward layers 

Both of these can be addressed orthogonally, although, there is some work which explores reducing the sequence length as a means to make attention efficient, and it ends up improving the efficiency of the latter too (TODO: add citation). Most of the work in developing efficient architectures focuses on these two bottlenecks, which is also the focus of this blog post. Some other efforts to improve efficiency are weight sharing, quantization, task adapters, alternative architectures, etc. *Efficient Methods for Natural Language Processing: A Survey* <d-cite key="Treviso2022EfficientMF"></d-cite> is a broader study of efficient methods in NLP.

### Complexity of Attention

TODO: add image and citation.

The main source of inefficiency is this quadratic complexity, where the model depends on the square of the sequence length, as every token attends to every other token in the sequence length, when we’re considering self attention. And the problem is that this makes it really difficult to scale the model to longer sequences.

Quadratic complexity (every token attends to every other token in sequence).
Longer the sequence, higher the memory/time of computing attention.

The problem with long sequences

 So for instance, here you can see the impact of increasing the sequence length in the case of full-self attention (blue curve). And so, as we will see going forward, a lot of the work focuses on ways to restrict the computation of attention scores in some way, so that we don’t compute the full attention.

### Complexity of feedforward layers

The majority of the papers surveyed tend to address the attention mechanism. But it is only part of the computational costs. The feedforward layers which are supposed to capture long term dependencies, and propagate info from far off context contribute approximately half of the complexity costs. So, some recent work addresses this as well. 

### Design Challenges

In the paper, they also make a note of challenges in implementing some of the efficient attention methods depending on the transformer mode. For instance, in the encoder decoder model, on the decoder side, you want to look at all positions on the source side and only positions to the left on the target side. So when you are designing efficient attention, you also want to be able to retain the ability to follow these requirements. And as we will see going forward, some of the models are only able to work in a single mode, so they are not as general as one would like. Also, they focus mostly on language models, but briefly mention that there is some work in vision and protein modeling.

***

## Taxonomy of Efficienct Transformers

They define this taxonomy of different types of efficient variants of transformer models. Out of these categories, all except the Sparse models focus on making the attention mechanism more efficient. and only the set of what they call Sparse models address the FF layer. This, they only added in the later revision of the paper. So, in this presentation, I will briefly describe these broad types, and then go over some of architectures in a bit more detail. As you can see, there is also some amount of overlap between different approaches, which I will try to point out as we discuss. One interesting thing to note is that between 2020, when they first came up with the this taxonomy, and 2021, there were newer transformer variants that fit quite well into these categories, except for the sparse models, which also _can_ be fit into some of these categories, but according to the paper, there is enough new research in this direction to warrant a separate category of its own. 

TODO: add the image and citation.

### Fixed Patterns

With that let’s get into the categories. The first category is Fixed patterns, or a combination of fixed patterns. The broad idea here is that instead of attending to ALL tokens in the sequence as we would do in full attention (here it’s causal), we just attend to a subset of tokens. And in case of Fixed patterns, we define this subset by some fixed rules that are based on the position of the token relative to the current token. So for instance, in case of local attention, as we can see, we only look at the last k number of tokens. In the case of strided attention, we still look at k number of tokens, but they are more spread out. And the idea is that as you go higher up in the layers, you can start to increase the value of k, and its a way of ensuring that your model eventually looks at a wider window.

This is similar to the previous slide except that it’s not causal, it’s full self-attention, but the concept remains the same. You don’t compute the attention across all tokens, but only do it for a smaller window of tokens. The last one here, this global + sliding window attention is interesting. In this case, they still compute the local attention over a fixed short window, but they also compute attention over global tokens. So, you can imagine, say putting some general context at the beginning of the sequence, that’s supposed to be relevant throughout, and maybe some other tokens that you deem to be relevant or important, and you compute the attention over those too in addition to local attention. This leads naturally to the question of determining which tokens to consider to be important enough to compute the attention over, and some of the work we will see in a bit explores this.

Before we get to that however, There’s this interesting special case not in the survey paper, which is kind of an edge case. Remember, that we have been trying to reduce the set of tokens that we attend on, and so in the case of sliding attention (prev slide) you consider this window centered around the current token and only compute the scores for that. Well, in this case, they still consider this window, but instead of computing attentions, they just hard code them! They use a gaussian distribution, say in this case centered around the current token. So the current token would get the highest score, and it will taper off towards both sides. And with this, they have completely removed the O(n^2) complexity required to compute the scores. And surprisingly, this seems to do just as well as the vanilla model! But with this change, you greatly improve the training and inference times. You are also able to use larger batch sizes (27%). So, this type of drastic simplification is a neat trick if latency is a concern for your use case. 


### Learnable Patterns

So, coming back to this notion of which tokens are important to attend on. In case of fixed patterns, you just decide which tokens are important. But you can also learn which tokens are important. That’s basically what this paper does. Up until now, whether or not to compute attention was determined by the position of the token, and in this case, it’s determined by the content. In this case, once they have key and value vectors, they cluster them into some fixed number of clusters, and then, all the tokens within a cluster only attend on all tokens within that same cluster. So, you reduce the number of attention scores being computed.

One interesting point to consider here is that when you’re clustering, in some ways, you’re really grouping similar words together. But if you actually want a more robust context, you should attend to words that are different from the current word, so maybe some form of dissimilarity could be considered instead?
Clustering happens at each layer during training: not super efficient.


### Neural Memory

Another efficiency method is about adding some sort of memory module that keeps track of the long range context. In this particular paper, for instance, they create this new layer called “all-attention” , and they completely do away with feedforward layers. Instead, they have persistent vectors that are just concatenated to the key and value vectors, and they compute the attention as usual. The idea being that these vectors stay the same for all tokens, so are said to have global context. This is one way of having a memory module. You can also have global tokens, which we saw earlier. Longformer also had this notion of global tokens, which can be considered a form of neural memory.


### Low-rank and Kernel Methods

Yet another approach is to have a lower-rank approximation of the attention matrix. For instance, in Linformer, they do this by reducing the sequence length over which you are computing the attention scores. they project the key and value vectors to a lower dimension (sequence length). And so, the complexity becomes O(nk) instead of O(n^2). Perplexity is not affected by doing this. And you can see that increasing the sequence length does not greatly impact the inference time. 


### Recurrence

Another way to process longer sequences without increasing the computational/memory complexity is to combine recurrence with attention. Eg. transformer-xl which does this. Transformer part encodes local blocks of tokens, and then RNN operating over chunked representations of the blocks. Other examples in this category include the Compressive transformer that also encodes local tokens using transformers, and uses an external memory for representing the far off context that is more global. There’s also something called the recurrent blocks network, which apparently integrates transformers and RNNs better than transformer-xl


### Downsampling

Finally, we have downsampling, which is somewhat similar to the low-rank methods. You try and reduce the sequence length to operate over. In linformer, we saw that the reduction happens within the transformer layer, for the key and value vectors. And in this Charformer, the reduction in sequence length happens before the transformer layer, at the time of tokenization.


### Sparse Models and Conditional Computation

Until now, we have discussed various approaches to make attention more efficient. There are now some approaches that are applicable to the feedforward networks. The broad idea here is to only activate a subset of parameters. The survey paper does not go into details of specific models that much, but the common element across these models is to use a mixture-of-experts setting, where they use a gating mechanism to determine whether or not to use a particular layer. From what I gathered, it’s not so much about reducing the parameters compared to a vanilla transformer, but rather increase the parameter count, with the idea that more parameters make the model more expressive, but do this while keeping the floating point operations (FLOPs) per example constant. So, here in switch transformers, you can see that there are multiple FF layers to choose from, and this router is the gating mechanism that determines which one to pick.


### Summary

| Approach | Address Attention | Addresses Feedforward |
| -------- | ----------------- | --------------------- |
| Fixed Patterns | Yes | No |
| Learnable Patterns | Yes | No |


**No clear winner**

Now that we’ve discussed all these different architecture types, one might wonder which one does the best. And unfortunately, none of these architectures are a clear winner. The reasons, I think are because most of them are constrained in some way. For example, some of them can’t do auto-regressive decoding, most of them add their own bit of, sometimes, convoluted complexity, and are often slower in practice, for eg. the routing transformer, which does k-means clustering for key-value vectors at every transformer layer during training. Vanilla transformers, generally speaking, do well across a wider range of requirements. 

***

## Longer Sequences

At this point, let’s zoom out a bit and revisit why we want efficient architectures in the first place. To remind ourselves, we want to be able to process long sequences without running into memory issues, and do this in a reasonable amount of time. But we also want to utilize these longer sequences effectively, and I’ll explain what I mean by that in a minute.


Why do we want more efficient architectures?
* Process longer sequences
* Utilize longer sequences

### Are longer sequences processed?

So, let’s talk about the first goal: processing longer sequences. With all these architectures, we do find that we are able to process longer sequences than before (there’s some variants which are able to process upto 16k tokens). But what this practically means is that we can feed in 16k tokens to the model, and we won’t get an out of memory error, and it won’t take unbearably long. But we don’t know if these longer sequences are actually used by the model meaningfully.


### Are longer sequences utilized?

So there is this paper which explores this in more detail, and they have a bunch of interesting experiments to determine what the model does with these sequences. And one of the experiments is to perturb the longer context, by either shuffling, or randomly replacing, or randomly dropping out some tokens.

And they have this really interesting finding that perplexity is not really affected at all if you perturb the first 6k tokens of an 8k long sequence, and it degrades a little bit in the nearest 2k tokens. And they find this across different models: here we have the local attention and routing attention models being compared. And this observation holds true for both . So, yes, the routing transformer’s perplexity is lower than the local transformer, from these experiments, it looks like you can’t really attribute this to the routing transformer being able to extract more information out of longer sequences. There’s something else that makes that model better. So, you might consider whether the objective of next word prediction is really helpful when trying to evaluate the utility of long context sequences. If you’re reading a book, and asked to predict the next paragraph, sure you might be using the longer context of what happened in previous chapters, but in order to predict the next word itself, you don’t really need to know what happened in chapter 1.

*** 

## Evaluation



*** 

## Conclusion


## Citations

Citations are then used in the article body with the `<d-cite>` tag.
The key attribute is a reference to the id provided in the bibliography.
The key attribute can take multiple ids, separated by commas.

The citation is presented inline like this: <d-cite key="Vaswani2017AttentionIA"></d-cite> (a number that displays more information on hover).
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

**Note:** `<d-code>` blocks do not look well in the dark mode.
You can always use the default code-highlight using the `highlight` liquid tag:

{% highlight javascript %}
var x = 25;
function(x) {
  return x * x;
}
{% endhighlight %}

***

## Layouts

The main text column is referred to as the body.
It is the assumed layout of any direct descendants of the `d-article` element.

<div class="fake-img l-body">
  <p>.l-body</p>
</div>

For images you want to display a little larger, try `.l-page`:

<div class="fake-img l-page">
  <p>.l-page</p>
</div>

All of these have an outset variant if you want to poke out from the body text a little bit.
For instance:

<div class="fake-img l-body-outset">
  <p>.l-body-outset</p>
</div>

<div class="fake-img l-page-outset">
  <p>.l-page-outset</p>
</div>

Occasionally you’ll want to use the full browser width.
For this, use `.l-screen`.
You can also inset the element a little from the edge of the browser by using the inset variant.

<div class="fake-img l-screen">
  <p>.l-screen</p>
</div>
<div class="fake-img l-screen-inset">
  <p>.l-screen-inset</p>
</div>

The final layout is for marginalia, asides, and footnotes.
It does not interrupt the normal flow of `.l-body` sized text except on mobile screen sizes.

<div class="fake-img l-gutter">
  <p>.l-gutter</p>
</div>

***

## Other Typography?

Emphasis, aka italics, with *asterisks* (`*asterisks*`) or _underscores_ (`_underscores_`).

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> and sometimes 
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

Inline `code` has `back-ticks around` it.

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```
 
```python
s = "Python syntax highlighting"
print s
```
 
```
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
```

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 


Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.
