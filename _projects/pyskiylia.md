---
layout: page
title: Skiylia Lang (Deprecated)
description: My (deprecated) custom programming language, written in python.
highlights:
img: assets/img/skiylia/PySkiyliaLogo.png
redirect: https://github.com/Skiylia-Lang/PySkiyliaLogo
category: fun
date: "2021-03-18"
---

## What is Skiylia?

<div class="row">
  <div class="col-sm-10 mt-3 mt-md-0">
    <p><a href="https://skiylia-lang.github.io/">Skiylia</a> is a custom programing language I started developing back in March of 2021.
    The language is dynamically typed, object oriented, and most importantly *interpreted*, with a strong focus on code readability and understandability.
    While it may share many similarities with C derivatives, its heritage is definitely Pythonic.</p>
  </div>
</div>

The first version of skiylia began with a relatively slow [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) interpreter built in pure python. This provided an excellent real-world test bed for language features, as everything had been purely theoretical before that point.
This version of Skiylia, [PySkiylia](https://github.com/Skiylia-Lang/PySkiylia), is currently version [![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/skiylia-lang/PySkiylia?include_prereleases&label=%20&style=flat-square)](https://github.com/Skiylia-Lang/PySkiylia/releases/latest), and represents the first itteration of the language.

While progress has stalled somewhat in light of other projects, the second itteration of the language, [PyPySkiylia](https://github.com/Skiylia-Lang/RPythonSkiylia), will utilise Restricted Python and the PyPy toolchain, as well as implement or rewrite features of the PySkiylia. This version is currently [![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/skiylia-lang/RPythonSkiylia?include_prereleases&label=%20&style=flat-square)](https://github.com/Skiylia-Lang/RPythonSkiylia/releases/latest).

***

### Example code

{% highlight skiylia %}
/// This contains a snippet of Skiylia code that
    computes the factorial of a number. ///

def factorial(n):
  // return null if n is not an integer.
  if n !~~ 0:
    return null

  // return 1 if n is less than, or equal to, 2.
  if n <= 1:
    return 1

  // otherwise, recursively multiply.
  return n * factorial(n - 1)

var num = 6

print("The factorial of", num, "is", factorial(num))

/// Expected output:
    The factorial of 6 is 720 ///
{% endhighlight %}

***

The remainder is a work in progress.
