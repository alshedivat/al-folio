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

The distiction between mutable and immutable datatypes has implications when they are passed to functions as arguments. When an immutable datatype is passed, Python creates a copy and assigns it to a new variable. Hence, the original variable does not get affected:

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



# Arguments

## Avoid mutable default arguments

Sometimes we might define some default value for a function's arguments. However it is often not a good idea to use mutable datatypes as a default. The default object is only created once, leading to counterintuitive behaviors:

```python
def append_three(input: list = []):
    input.append(3)
    return input

print(append_three())
print(append_three())
```
```
[3]
[3, 3]
```

## Starred expressions and functions

## Force the use of keyword arguments

We can force the use of keyword arguments using `*`:

```python
def format(x, debug=False):
    debug_info = ""
    if debug:
        debug_info = f"Formatting string: {x}\n"
    print(f"{debug_info}{x.title()}")

format("hey there", True)
```
```
Formatting string: hey there
Hey There
```

```python
def format(x, *, debug=False):
    debug_info = ""
    if debug:
        debug_info = f"Formatting string: {x}\n"
    print(f"{debug_info}{x.title()}")

format("hey there", True)
```
```
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: format() takes 1 positional argument but 2 were given
```

```python
format("hey there", debug=True)
```
```
Formatting string: hey there
Hey There
```

# Functions as first-class citizens

As Python objects, functions are first-class citizens, which unlocks several useful features, like closures and decorators.

## Closures

## Decorators

A decorator is syntactic sugar to easily create a wrapper around our functions.

```python
def wrapper()
```
```
```

# References

* B. Slatkin, Effective Python: 90 Specific Ways to Write Better Python.

