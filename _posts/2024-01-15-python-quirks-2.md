---
layout: post
title: Python quirks 2
date: 2024-01-15 11:59:00-0400
description: Dictionaries!
tags: comments
categories: python coding
giscus_comments: true
related_posts: false
---

While reading the book "Effective Python: 90 Specific Ways to Write Better Python" I discovered a few interesting behaviors about Python dictionaries. I list some of them below.

# `dict.setdefault` tries to fetch the value

The [`setdefault`](https://docs.python.org/3.8/library/stdtypes.html#dict.setdefault) method of a Python dictionary is useful to assign a default value to a key if and only if that value does not exist:

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

However, despite its name, it will also fetch the value (either the preexisting one, or the newly created):

```python
carrots = ingredients.setdefault("carrots", 0)

print(f"Number of carrots: {carrots}")
```
```
Number of carrots: 3
```

# Use `defaultdict` when there is a single default value

The [`defaultdict`](https://docs.python.org/3/library/collections.html#collections.defaultdict) is useful when the dictionary has a unique default value. Its first argument is a function whose output is the default value, which will be called if and only if the key is missing:

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

Note that the `ingredients_dd` contains an item for cabbage which was never explicitly inserted. `defaultdict` not only allows for simple code, but is more efficient than `setdefault` to avoid calling the default factory unnecesarily. For instance, `ingredients.setdefault("carrot", set())` will instantiante a new set even if the key `carrot` already exists; `defaultdict` would avoid that call. 

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

Since Python 3.6, Python dictionaries preserve insertion order, i.e., the the items are printed in the same order in which they were introduced in the dictionary:

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

# References

* B. Slatkin, Effective Python: 90 Specific Ways to Write Better Python.

