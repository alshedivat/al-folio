---
layout: post
title: Advanced Python 2 - Dictionaries
date: 2024-01-15 11:59:00-0400
description: Supporting 
tags: comments
categories: python coding dictionary
giscus_comments: true
related_posts: false
---

A dictionary is a data structure that stores key-value pairs. Crucially, dictionaries are behind many of Python's features. In this post, I do a deeper dive on the underpinnings on Python's dictionaries, and describe some useful features.

# Dictionaries revisited

Underlying a dictionary, we find a hash map. Hash maps rely on a *hash* functions that can map the keys to a limited number of buckets. These buckets, in turn, store the values. 
TODO check
When two keys map to the same bucket, we have a "collision". The first key takes the bucket. The second key, finding its bucket full, will systematically iterate over the remaining buckets until an empty bucket is found.

The hashing process requires that keys are "hashable", i.e., implement a `__hash__()` method. Among the builtin types, that includes strings, numbers and tuples. Keys also require an `__eq__()` method, to handle collisions.

The allocated memory grows by 100% when the current one is 2/3 full.

TODO move
Specifically:

- Sets: the allocated memory grows by 300% when the current one is 2/3 full.

# Handling default values
## `dict.setdefault` to set and fetch values

The [`dict.setdefault`](https://docs.python.org/3.8/library/stdtypes.html#dict.setdefault) method is useful to assign a value to a key if and only if the key is missing:

```python
ingredients = {
    "carrots": 3,
    "tomatoes": 2,
    "lettuces": 1,
}

ingredients.setdefault("carrots", 0)
ingredients.setdefault("pineapples", 0)

print(f"Number of carrots: {ingredients['carrots']}")
print(f"Number of pineapples: {ingredients['pineapples']}")
```
```
Number of carrots: 3
Number of pineapples: 0
```

However, and despite its name, `dict.setdefault` will also fetch the value (either the preexisting one, or the newly created):

```python
carrots = ingredients.setdefault("carrots", 0)

print(f"Number of carrots: {carrots}")
```
```
Number of carrots: 3
```

## Use `defaultdict` when there is a single default value

The [`collections.defaultdict`](https://docs.python.org/3/library/collections.html#collections.defaultdict) go one step beyond. They are a goon replacement for dictionaries when there is a unique default value. Its first argument is a function which returns the default value. It will be called if and only if the key is missing:

```python
from collections import defaultdict

ingredients_dd = defaultdict(lambda: 0) 

for ingredient, amount in ingredients.items():
    ingredients_dd[ingredient] = amount

print(ingredients_dd)
print(f"Number of cabbages: {ingredients_dd['cabbages']}")
print(ingredients_dd)
```
```
defaultdict(<function <lambda> at 0x1014eb6d0>, {'carrots': 3, 'tomatoes': 2, 'lettuces': 1, 'pineapples': 0})
Number of cabbages: 0
defaultdict(<function <lambda> at 0x1014eb6d0>, {'carrots': 3, 'tomatoes': 2, 'lettuces': 1, 'pineapples': 0, 'cabbage': 0})
```

Note that the `ingredients_dd` contains an item for cabbage which was never explicitly inserted. `defaultdict` not only allows us to write simpler code, but is more efficient than `setdefault` to avoid unnecesary calls to the default factory. For instance, `ingredients.setdefault("carrot", set())` would instantiante a new set even if the key `carrot` already exists; `defaultdict` would avoid that call. 

# Use `Counter` to count

The `collections.Counter` is a type of dictionary specialized in counting objects, i.e., the values are integers. It can be initialized from an existing dictionary: 

```python
from collections import Counter

ingredients_counter = Counter(ingredients)
print(ingredients_counter)
```
```
Counter({'carrots': 3, 'tomatoes': 2, 'lettuces': 1, 'pineapples': 0})
```

By default missing keys have a value of 0, but they are not inserted:

```python
print(f"Number of cabbages: {ingredients_counter['cabbage']}")
print(ingredients_counter)
```
```
Number of cabbages: 0
Counter({'carrots': 3, 'tomatoes': 2, 'lettuces': 1, 'pineapples': 0})
```

Counters extend dictionaries in interesting ways. For instance, they make it easy to find the elements with the most counts:

```python
ingredients_counter.most_common(1)
```
```
[('carrots', 3)]
```

# Insertion order

Since Python 3.6, Python dictionaries preserve insertion order, i.e., the items are printed in the same order in which they were inserted in the dictionary:

```python
ingredients = {
    "carrots": 3,
    "tomatoes": 2,
    "lettuces": 1,
}
print(ingredients)
```
```
{'carrots': 3, 'tomatoes': 2, 'lettuces': 1}
```

```python
ingredients = {
    "lettuces": 1,
    "tomatoes": 2,
    "carrots": 3,
}
print(ingredients)
```
```
{'lettuces': 1, 'tomatoes': 2, 'carrots': 3}
```

# Further reading

* D. Beazley, [Advanced Python Mastery](https://github.com/dabeaz-course/python-mastery)
* B. Slatkin, Effective Python: 90 Specific Ways to Write Better Python.

