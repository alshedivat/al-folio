---
layout: post
title: Advanced Python 2 - Lists and tuples
date: 2024-02-09 11:59:00-0000
description: Buckets, buckets, buckets!
tags: comments
categories: python coding lists tuples
giscus_comments: true
related_posts: false
---

Lists and tuples are fundamental data structures.

# The inner workings of lists and tuples

[Similarly to the computer's memory](../hardware), lists and tuples can be visualized as a sequence of equally-sized buckets. Each bucket can store a fixed-length integer (e.g., 64 bits in modern computers), representing the memory address to an object. The buckets are located consecutively in memory, in a data structure known as *array*. When Python instantiates an array, it will request $$N$$ consecutive buckets to the kernel. Out of those, the first bucket stores the length of the array, and the remainng $$N - 1$$ will store the elements. However, lists are stored in so-called *dynamic* arrays, while tuples are stored in *static* arrays. Let's explore why:

- Lists are mutable: we can keep adding and removing items to the buckets. Hence, sometimes we might need to store more than $$N - 1 $$ elements originally requested. That is why they are stored in so-called dynamic arrays, which can be resized. Specifically, when the array gets full, Python will allocate a new array with ~12.5% more space and copy all the elements. This means that any given array might be using up to 12.5% more space than absolutely necesary to store their data.
- Tuples, on the other hand, are immutable. Hence, they are supported by *static* arrays, which cannot be resized. Hence, tuples only take up the strictly required memory, making them more lightweight. Additionally, Python has a little optimization trick involving tuples. When a tuple of size 1 to 20 is no longer in use, Python does not immediately deallocate the memory. Hence, if a new tuple needs to be instantiated, Python can place it to that memory without communciating with the kernel, leading to a speed-up.

## Time complexity 

**Lookup**: since the buckets in the array are equally-sized and consecutive, we can quickly retrieve any item by knowing where the array starts and the index of its bucket. For instance, if our array starts at bucket index 1403, and our bucket is index 5 within the array, we simply need to go to bucket index 1408. Hence, accessing a given index is $$O(1)$$.

**Search**: if we need to find a particular object in an unsorted array, we need to perform a [linear search](https://en.wikipedia.org/wiki/Linear_search). This algorithm has a complexity $$O(n)$$. If the array has been sorted, we can use [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm), which is $$O(\log n)$$.

**Sort**: Python uses [Timsort](https://en.wikipedia.org/wiki/Timsort), a combination of heuristics, and insertion and merge sort. Best case is $$O(n)$$, worst case is $$O(n \log n)$$.

### Lists

**Insertion**: we can replace an existing element in $$O(1)$$. That is also the case in most insertions of a new element at the end. However, when the list's array gets full (the worst case) inserting a new element is $$O(n)$$.

**Deletion**: $$O(1)$$

### Tuples

**Insertion**: though tuples are immutable, we can consider the combination of two tuples into a longer one as an insertion operation. If they have sizes $$m$$ and $$n$$, each item needs to be copied to the new tuple. Hence, the complexity is $$O(m+n)$$.

# Sorting by complex criteria

The [`list.sort`](https://docs.python.org/3/library/stdtypes.html#list.sort) method orders a list's elements in ascending order. It will work as long as the items have defined the `<` comparison operator, as is the case for floats, integers and strings. However, in some cases that operator might not be implemented, or might not be making the comparison that we care about. The `key` argument can be helpful in those cases:

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

When comparing tuples, Python first compares the initial elements. If they are equal, it then compares the second one, and so on.

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

```python 
from collections import deque

q = deque()
q.append(1)
q.append(2)
q.appendleft(3)
q.appendleft(4)

print(q)
```
```
deque([4, 3, 1, 2])
```
```python
q.pop()
```
```
2
```
```python
q.popleft()
```
```
4
```

Deque is more efficient than a list when dealing with queuing problems.

## `collections.ChainMap`

- Problem: Search multiple places

# References

* D. Beazley, [Advanced Python Mastery](https://github.com/dabeaz-course/python-mastery)
* M. Gorelick & I. Ozsvald, High Performance Python: Practical Performant Programming for Humans. Chapter 3. Lists and Tuples.
* B. Slatkin, Effective Python: 90 Specific Ways to Write Better Python.
* CPython's implementation of lists: <http://www.laurentluce.com/posts/python-list-implementation/>
