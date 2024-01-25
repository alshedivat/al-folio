---
layout: post
title: Python lists and tuples
date: 2024-01-20 11:59:00-0400
description: Third post in the Python series
tags: comments
categories: python coding lists tuples
giscus_comments: true
related_posts: false
---

While reading the book "Effective Python: 90 Specific Ways to Write Better Python" I discovered a few interesting behaviors about Python lists and tuples. I list some of them below.

# Bg

A list is a mutable datatype. Underlying it, we find a linked list.
TOCHECK: A list gets an amount of memory allocated.
The allocated memory grows by 12.5% when the current one is full.


# Sorting by complex criteria

The [`list.sort`](https://docs.python.org/3/library/stdtypes.html#list.sort) method orders a list's elements in ascending order. It will work as long as the items have defined the `<` comparison operator, as is the case for floats, integers and strings. However, in some cases that operator might not be implemented, or might not be making the comparison that we care about. The `key` argument is helpful in those cases:

```python
class Animal:
    def __init__(self, name, weight):
        self.name = name
        self.weight = weight

    def __repr__(self):
        return f"Animal({self.name}, {self.weight})"

animals = [
    Animal("whale", 100000),
    Animal("sea lion", 200),
    Animal("lion", 200),
    Animal("possum", 2.5)
]

# sort by weight
animals.sort(key = lambda x: x.weight)
print(animals)
```
```
[Animal(possum, 2.5), Animal(sea lion, 200), Animal(lion, 200), Animal(whale, 100000)]
```

```python
# sort by name
animals.sort(key = lambda x: x.name)
print(animals)
```
```
[Animal(lion, 200), Animal(possum, 2.5), Animal(sea lion, 200), Animal(whale, 100000)]
```

As shown, `key` takes a function which will receive an item, and output a comparable value. If we want to order first by weight, then by name, we just need to combine both in a tuple:

```python
# sort by name
animals.sort(key = lambda x: (x.weight, x.name))
print(animals)
```
```
[Animal(possum, 2.5), Animal(lion, 200), Animal(sea lion, 200), Animal(whale, 100000)]
```

When comparing tuples, Python will first compare the first element. Only if it is equal between the two tuples, it will compare the second element.

# Unpacking

## Unpacking to swap values in place

We can use unpacking to swap multiple of a list in place, without requiring additional temporary variables:


```python
x = [1, 2, 3]
x[1], x[0] = x[0], x[1]
print(x)
```
```
[2, 1, 3]
```

## Catch all unpacking using starred expressions

In some cases we might want to unpack a tuple whose length we don't know a priori. In such cases, we can use an starred expression, which will receive all the values that are not captured by another item:

```python
x = [1, 2, 3, 4, 5]
first, second, *middle, last = x
print(first, second, middle, last)
```
```
1 2 [3, 4] 5
```

If there is nothing left to unpack, the starred item will become an empty list:
```python
x = [1, 2, 3]
first, second, *middle, last = x
print(first, second, middle, last)
```
```
1 2 [] 3
```

Starred elements cannot be used without non-starred elements (e.g., `*all = x`); multiple starred expressions cannot be used together either (e.g., `first, *middle1, *middle2 = x`).

# `collections.deque` for queuing problems

When dealing with queuing problems, we can use `collections.deque`,

• Double-ended queue
25
from collections import deque
>>> q = deque()
>>> q.append(1)
>>> q.append(2)
>>> q.appendleft(3)
>>> q.appendleft(4)
>>> q
deque([4, 3, 1, 2])
>>> q.pop()
2
>>> q.popleft()
4
>>>
• More efficient than a list for queuing problems

## `collections.ChainMap`

• Problem: Search multiple places

# References

* D. Beazley, [Advanced Python Mastery](https://github.com/dabeaz-course/python-mastery)
* B. Slatkin, Effective Python: 90 Specific Ways to Write Better Python.