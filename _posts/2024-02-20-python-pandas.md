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

[Pandas](https://pandas.pydata.org/) is the most common Python library to deal with data frames. It builds on top of [NumPy](../python-numpy) to provide useful data structures for data scientists.

# Data structures provided by pandas

Pandas provides several data structures, out of which two are particularly popular: Series and DataFrames.

## Series

A Series is a vector-like structure, that builds on top of and extends NumPy vectors.

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

Indeed, the data is stored as a [NumPy vector](../python-numpy#the-inner-workings-of-numpy-arrays), and inherit its advantages and disadvantages. Computations on Series come with an extra overhead, since Pandas puts extra effort in handling missing values.

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

Indeed, the data is stored as multiple Series with a shared index.

# Indexing

As in vectors, we can access its elements using their *positional* index. But, furthermore, it has an *index*, a dictionary-like structure which allows us to access each element in the array using a *label*:

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

When indexes are **unique**, they are **fast**.

Unless otherwise specified, the index gets initialized to a (lazy) enumeration of the rows/items. We can access the index using `.index()`, and revert it to this default behaviour using `.reset_index(drop=True)`. Note that, unless we alter it explicitly, the index will not change, even after deleting elements. This is in contrast to the positional index.

# Further reading

- [Pandas Illustrated: The Definitive Visual Guide to Pandas](https://betterprogramming.pub/pandas-illustrated-the-definitive-visual-guide-to-pandas-c31fa921a43)
