---
layout: post
title: Advanced Python 3 - Lists and tuples
date: 2024-01-20 11:59:00-0400
description: Going
tags: comments
categories: python coding lists tuples
giscus_comments: true
related_posts: false
---

While reading the book "Effective Python: 90 Specific Ways to Write Better Python" I discovered a few interesting behaviors about Python lists and tuples. I list some of them below.

# Lists and tuples as arrays

Same as dictionaries, lists and tuples can be visualized as a collection of equally-sized buckets. Each bucket can store a fixed-length integer, representing a memory reference to an object. The buckets are located consecutively in memory, in a data structure known as *array*. 

When we initialize an array, Python will request $N$ consecutive buckets to the kernel. Out of those, the first element stores the length of the list, and the remaining $N - 1$ will store the elements.

## Searching, and sorting, and searching

Python uses Tim sort, a combination of heuristics, and insertion and merge sort. Best case is $$O(n)$$, worst case is $$O(n \log n)$$. Then, binary search.

## Memory considerations: tuples vs lists

The immutability of tuples makes them more lightweight.
Lists are stored as *dynamic* arrays, which are mutable and can be resized. Tuples, as *static* arrays, i.e., they are immutable and cannot be resized.
Tuples are more light weight, and instantiating them is faster.

## Time complexity 

**Lookup**: since the buckets in the array are equally-sized and consecutive, we can quickly retrieve any item by knowing where the array starts and the index of its bucket. For instance, if our array starts at bucket index 1403, and our bucket is index 5 within the array, we simply need to go to bucket index 1408. Hence, accessing a given index is $$O(1)$$.

**Search**: if we need to find a particular object in an unsorted array, we need to perform a [linear search](https://en.wikipedia.org/wiki/Linear_search). This algorithm has a complexity $$O(n)$$. If the array has been sorted, we can use [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm), which is $$O(\log n)$$.

### Lists

**Insertion**: $$O(1)$$ However, when the list's array gets full, Python will allocate a new array with 12.5% more space and copy all the elements. Thus, the worst case is $$O(n)$$.

**Deletion**: $$O(1)$$

### Tuples

**Insertion**: though tuples are immutable, we can consider the combination of two tuples into a longer one as an insertion operation. If they have sizes $$m$$ and $$n$, each item needs to be coppied to the new tuple. Hence, the complexity is $$O(m+n)$$.

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
* M. Gorelick & I. Ozsvald, High Performance Python: Practical Performant Programming for Humans. Chapter 3. Lists and Tuples.
* B. Slatkin, Effective Python: 90 Specific Ways to Write Better Python.
