---
layout: post
title: Python functions
date: 2024-01-26 11:59:00-0400
description: Fourth post in the Python series
tags: comments
categories: python coding
giscus_comments: true
related_posts: false
---

While reading the book "Effective Python: 90 Specific Ways to Write Better Python" I discovered a few interesting behaviors about Python funcions. I list some of them below.

# Function's arguments: mutable vs. immutable

Python has two kinds of data types, mutable and immutable, which respectively can and cannot be modified after being created. Mutable data types include lists, dictionaries and sets; immutable data types, int, float, bool, string and tuples. This distiction has implications when different datatypes are passed to functions as arguments. When an immutable datatype is passed, Python creates a copy and assigns it to a new variable. Hence, the original variable does not get affected:

```python
def sum_five(a: int):
    a += 5
    return a

a = 3
b = sum_five(a)
print(f"a = {a}")
print(f"b = {b}")
```
```
a = 3
b = 8
```

Mutable types, on the other hand, are passed by reference. In other words, the function will operate on the same object that existed outside of the function:

```python
def append_three(input: list):
    input.append(3)
    return input

a = [1, 2]
b = append_three(a)
print(f"a = {a}")
print(f"b = {b}")
```
```
a = [1, 2, 3]
b = [1, 2, 3]
```

# Scopes

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

