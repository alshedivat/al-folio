---
layout: post
title: Advanced Python 5 - Pandas
date: 2024-02-20 11:59:00-0000
description: Cute bear, ok library
tags: comments
categories: python coding pandas
giscus_comments: true
related_posts: false
toc:
    sidebar: left
---

[Pandas](https://pandas.pydata.org/) is the most common Python library to deal with real world data. It builds on top of [NumPy](../python-numpy) to provide useful structures for data scientists.

# Data structures provided by pandas

Pandas provides several data structures, out of which two are particularly popular: Series and DataFrames.

## Series

A Series is a vector-like structure, that extends [NumPy vectors](../python-numpy#the-inner-workings-of-numpy-arrays).

```python
import pandas as pd

x = pd.Series([0, 1, 2, 3], index=["a", "b", "c", "d"])
x
```
```
a    0
b    1
c    2
d    3
dtype: int64
```

The Series stores the data as a NumPy vectors, inheriting its advantages and disadvantages. But computations on Series come with an extra overhead, since Pandas puts extra effort in handling missing values.

## DataFrames

DataFrames are matrix-like structures, which build on top of Series.

```python
X = pd.DataFrame({"x": [1, 2, 3],
                  "y": ["a", "b", "c"]})
X
```
```
   x  y
0  1  a
1  2  b
2  3  c
```

The DataFrame stores data as multiple Series with a shared index. While the data of a Series lives altogether, the different Series of a DataFrame are scattered in memory. In consequence, adding a new column to a DataFrame is fast: Pandas just needs to add its reference to the registry.

# Indexing

As in NumPy vectors, we can access a Series' elements using their *positional* indexes. But, furthermore, it has an *index*, a dictionary-like structure which allows us to access each element in the array using a *label*:

- `.iloc[]` uses the positional indices, and slicing works as usual:
    ```python
    x.iloc[2:3]
    ```
    ```
    c    2
    dtype: int64
    ```
- `.loc[]` uses labels, and slicing includes both beginning and end:
    ```python
    x.loc["c":"d"]
    ```
    ```
    c    2
    d    3
    dtype: int64
    ```

DataFrames also have a `.loc[]` and an `.iloc[]` function, which accepts columns as a second argument.

Thanks to their dictionary-like properties, indexes allow to access an element in constant time. However, this speed is only achievable when they are unique.

Unless otherwise specified, the index gets initialized to a (lazy) enumeration of the rows/items. We can access the index using `.index()`, and revert it to this default behaviour using `.reset_index(drop=True)`. Note that, unless we alter it explicitly, the index will not change, even after deleting elements. This is in contrast to the positional index.

# Further reading

- [Pandas Illustrated: The Definitive Visual Guide to Pandas](https://betterprogramming.pub/pandas-illustrated-the-definitive-visual-guide-to-pandas-c31fa921a43)
