---
layout: distill
title: Plasma Two Stream Instability
description: Introduction to two stream instability in plasma through code
tags: simulation
giscus_comments: true
date: 2019-02-28
featured: true
categories: physics
thumbnail: assets/img/twostream/thumb.png

authors:
  - name: Morris Huang
    url: "https://morris-huang.com"
    affiliations:
      name: Physics, NTU

bibliography: 2018-12-22-distill.bib

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: What is two stream instability ?
  - name: Theory
    subsections:
      - name: Governing Equations
      - name: Case 1
      - name: Case 2
      - name: Combine Case 1 and 2
  - name: Equations
    # if a section has subsections, you can add them as follows:
  - name: Citations
  - name: Footnotes
  - name: Code Blocks
  - name: Interactive Plots
  - name: Layouts
  - name: Other Typography?

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
# _styles: >
#   .fake-img {
#     background: #bbb;
#     border: 1px solid rgba(0, 0, 0, 0.1);
#     box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
#     margin-bottom: 12px;
#   }
#   .fake-img p {
#     font-family: monospace;
#     color: white;
#     text-align: left;
#     margin: 12px 0;
#     text-align: center;
#     font-size: 16px;
#   }

---

## What is two stream instability ?
Consider a system comprising two types of fluid, which can be either cold or hot electron beams, moving through a periodic domain with a length of L.

<center>
<div class="l-page">
  <iframe src="{{ '/assets/plotly/twostream.html' | relative_url }}" frameborder='0' scrolling='no' height="300px" width="70%"  onerror="this.onerror=null;this.src='/assets/img/twostream/twostream.png';">
    </iframe>
    <noscript>
        <img src="/assets/img/twostream/twostream.png" height="300px" width="70%">
    </noscript>
</div></center>

We’ll first derived the linear behavior of the instability then verified the theory by applying Particle-in-Cell simulation.

***

## Theory

### Governing Equations
The system is described using:
- Electrostatic wave ↔ Electron motion
- Vlasov (equation of motion) + Continuity Equation + Poisson’s equation

The fundamental equations are:

$$ f(x, v, t) = v $$

$$ \frac{\partial v}{\partial t} + v \frac{\partial v}{\partial x} = - \frac{e}{m_e} E $$

$$ \frac{\partial n}{\partial t} + \frac{\partial (nv)}{\partial x} = 0 $$

$$ \frac{\partial E}{\partial x} = - \frac{e}{\varepsilon_0} (n - n_0) $$

Where:
- `v` is the velocity of the electron fluid,
- `n` is the density of the electron fluid,
- `n_0` is the density of the ion background.

### Case 1

Consider small perturbations of density, velocity, and field in a stationary background.

First, we consider the case where `E0 = 0` and `v0 = 0`, combine the govern equations and keeping only linear terms we have:

$$ \frac{\partial v_1}{\partial t} = -\frac{e}{m_e} E_1 $$

$$ \frac{\partial n_1}{\partial t} + n_0 \frac{\partial v_1}{\partial x} = 0$$

$$ \frac{\partial E_1}{\partial x} = -\frac{e}{\varepsilon_0} n_1 $$

Then, we assume the traveling wave solution which is proportional to $$ e^{i(kx - \omega t)} $$. We have:

$$ i \omega v_1 = -\frac{e}{m_e} E_1 $$

$$ -i \omega n_1 + i n_0 k v_1 = 0 $$

$$ i k E_1 = -\frac{e}{\varepsilon_0} n_1 $$

We have

$$ \left( 1 - \frac{n_0 e^2}{\varepsilon_0 m \omega^2} \right) E_1 = 0 $$

$$ \left( 1 - \frac{\omega_p^2}{\omega^2} \right) E_1 = 0$$

For a nontrivial solution:

$$ \omega = \pm \omega_p$$

This is consistent with our physical picture, where the electrostatic wave frequency equals the plasma frequency.

### Case 2

In another situation where the electron fluid has a velocity (`v0 ≠ 0`), the governing equations become:

$$
\frac{\partial v_1}{\partial t} + v_0 \frac{\partial v_1}{\partial x} = - \frac{e}{m_e} E_1
$$

$$
\frac{\partial n_1}{\partial t} + n_0 \frac{\partial v_1}{\partial x} + v_0 \frac{\partial n_1}{\partial x} = 0
$$

$$
\frac{\partial E_1}{\partial x} = - \frac{e}{\varepsilon_0} n_1
$$

Assuming a plane wave solution, we have:

$$
\left[ 1 - \frac{\left( \omega_p^2 / \omega^2 \right) - k v_0}{2} \right] E_1 = 0 
$$

$$
\omega = \omega_D \pm \omega_p
$$

Where $$ \omega_D $$ represents the Doppler frequency, indicating that the plasma oscillation frequency is shifted by the Doppler effect.

### Combine Case 1 and 2

This scenario consists of two electron fluid species: one relatively stationary to the ion background, and another with velocity $$ v_0 $$. For plasma neutrality, we require:

$$
n_0 = n_{01} + n_{02}
$$

The Vlasov and continuity equations are the same as in the previous cases (3) and (8), but Poisson's equation is coupled together by the two fluids:

$$
\frac{\partial E_1}{\partial x} = -\frac{e}{\varepsilon_0} (n_{11} + n_{12})
$$

By substituting $$ n_{11} $$ and $$ n_{12} $$ with the Vlasov and continuity equations, we obtain:

$$
\left[ \frac{n_{01} e^2}{m \varepsilon_0 \omega^2} + \frac{n_{02} e^2}{m \varepsilon_0 (\omega - \omega_D)^2} - 1 \right] E_1 = 0
$$

Finally, the dispersion relation can be expressed as:

$$
F(\omega) \equiv \frac{\omega_{p1}^2}{\omega^2} + \frac{\omega_{p2}^2}{(\omega - \omega_D)^2} = 1 
$$

Where $$ \omega_{p1} $$ and $$ \omega_{p2} $$ are the plasma frequencies of the two species.


For $$ \omega_D >> 0 $$ (right figure)

$$
F(\omega) = \frac{\omega_{p1}^2}{\omega^2} + \frac{(\omega - \omega_{p2}^2)^2}{(\omega - \omega_D)^2} = 1
$$

<div class="fake-img l-body" style="transform: scale(0.6);">
  {% include figure.html path="assets/img/twostream/a.png" class="img-fluid rounded" zoomable=true %}
</div>

The solution is $$ \omega \approx \pm \omega_{p1} \quad \omega \approx \omega_D \pm \omega_{p2} $$

We look for the minimum of $$ F\left( \omega \right) $$ which happens at

$$
\omega = \omega_m = \omega_D \left[1 + \left(\frac{\omega_{p2}}{\omega_{p1}}\right)^{2/3}\right] \equiv \omega_D \left(1 + \alpha^{2/3}\right)
$$

where $$ \alpha \equiv \frac{\omega_{p2}}{\omega_{p1}} $$

For $$ \omega_D \approx 0 $$ (left figure)

Then the minimum of function $$ F\left( \omega \right) $$ is

$$
F_m = F(\omega_m) = \frac{\omega_{p1}^2}{\omega_D^2} \left(1 + \alpha^{2/3}\right)^3
$$

Let’s assume that $$ n_{02} \ll n_{01} $$, $$ \omega_{p2} \ll \omega_{p1} \quad \text{and} \quad \alpha \ll 1.  $$

$$
F_m \approx \frac{\omega_{p1}^2}{\omega_D^2} \left(1 + 3\alpha^{2/3}\right)
$$

So then if

$$ \frac{\omega_{p1}^2}{\omega_D^2} < \left(1 + 3\alpha^{2/3}\right)\text{,} \quad F_m < 1  \quad \Rightarrow \quad 4 \text{ real roots.}$$

$$ \frac{\omega_{p1}^2}{\omega_D^2} > \left(1 + 3\alpha^{2/3}\right)\text{,} \quad F_m > 1 \quad \Rightarrow \quad 2 \text{ real + 2 complex roots.}$$

$$
\Rightarrow \quad \omega = \omega_{re} \pm i\omega_{im}
$$

It will have the solution of $$ E \propto e^{i(kx - \omega_{re} t)} e^{\omega_{im} t} $$ which grows in time.

***

## Equations

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

You can add interative plots using plotly + iframes :framed_picture:

<div class="l-page">
  <iframe src="{{ '/assets/plotly/demo.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 1px dashed grey;"></iframe>
</div>

The plot must be generated separately and saved into an HTML file.
To generate the plot that you see above, you can use the following code snippet:

{% highlight python %}
import pandas as pd
import plotly.express as px
df = pd.read_csv(
  'https://raw.githubusercontent.com/plotly/datasets/master/earthquakes-23k.csv'
)
fig = px.density_mapbox(
  df,
  lat='Latitude',
  lon='Longitude',
  z='Magnitude',
  radius=10,
  center=dict(lat=0, lon=180),
  zoom=0,
  mapbox_style="stamen-terrain",
)
fig.show()
fig.write_html('assets/plotly/demo.html')
{% endhighlight %}

***

## Details boxes

Details boxes are collapsible boxes which hide additional information from the user. They can be added with the `details` liquid tag:

{% details Click here to know more %}
Additional details, where math $$ 2x - 1 $$ and `code` is rendered correctly.
{% enddetails %}

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
