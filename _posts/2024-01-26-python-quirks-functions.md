---
layout: post
title: Python quirks 4
date: 2024-01-26 11:59:00-0400
description: Functions
tags: comments
categories: python coding
giscus_comments: true
related_posts: false
---

While reading the book "Effective Python: 90 Specific Ways to Write Better Python" I discovered a few interesting behaviors about Python funcions. I list some of them below.

# Functions as first-class citizens

In Python, functions are first-class citizens. In other words, they can:

```python
# be assigned to variables
def pretty_print(x: str):
    print(x.title() + ".")

pp = pretty_print
pp("hey there")
```
```
Hey there.
```

```python
# passed as arguments
from typing import Callable

def format(x: str, formatter: Callable[[str], None]):
    formatter(x)

format("hey there", pretty_print)
```
```
Hey there.
```

```python
# returned by other functions
def formatter_factory(formatter: Callable[[str], None] = pretty_print):
    return formatter

formatter_factory()("hey there")
```
```
Hey there.
```

The same occurs to variables, classes, objects and, to some extent, modules. This behavior unlocks several useful features, like closures and decorators.

## Closures

## Decorators

# References

* B. Slatkin, Effective Python: 90 Specific Ways to Write Better Python.

