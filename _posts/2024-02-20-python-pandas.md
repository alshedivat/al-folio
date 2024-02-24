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

DataFrames are matrix-like structures, which build on top of Series. They can be created in multiple ways, some of which are:

- A dictionary of lists/arrays/series
    ```python
    data = {'Column1': [1, 2, 3], 'Column2': ['A', 'B', 'C']}
    df = pd.DataFrame(data)
    ```
- A list of dictionaries:
    ```python
    data = [{'Column1': 1, 'Column2': 'A'}, {'Column1': 2, 'Column2': 'B'}, {'Column1': 3, 'Column2': 'C'}]
    df = pd.DataFrame(data)
    ```
- A CSV, Excel or JSON file
- An SQL query or table

The DataFrame stores data as multiple Series with a shared index. While the data of a Series lives altogether, the different Series of a DataFrame are scattered in memory. In consequence, adding a new column to a DataFrame is fast: Pandas just needs to add its reference to the registry.

# Indexing

As in NumPy vectors, we can access a Series' elements using their *positional* indexes. But, furthermore, it has an *index*, a hash map structure which allows us to access each element in the array using a *label*:

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

Thanks to their dictionary-like properties, indexes allow to access an element in constant time. However, including non-unique indexes might lead to a worst case $$O(n)$$ lookup time.

Unless otherwise specified, the index gets initialized to a (lazy) enumeration of the rows/items. We can access the index using `.index()`, and revert it to this default behaviour using `.reset_index(drop=True)`. Note that indexes are immutable, to ensure data integrity. In other words, adding or deleting entries will not alter the index of the remaining elements, in contrast to the positional index.

## MultiIndex

[MultiIndex](https://pandas.pydata.org/docs/user_guide/advanced.html) is an index in which is key is a (unique) tuple. We can create them from lists of lists or of tuples, from DataFrames, or from the cross-product of two iterables:

```python
x = pd.Series([1,2,3,4])

class_1 = ["foo", "bar"]
class_2 = [1, 2]

index = pd.MultiIndex.from_product((class_1, class_2), 
                                   # the name of the levels themselves
                                   names = ["first", "second"])
x.index = index

x
```
```
first  second
foo    1         1
       2         2
bar    1         3
       2         4
dtype: int64
```

As shown above, the items within a particular position in the tuple to not need to be unique within that position. This allows to select subgroups using **partial** indexes:

```python
x["foo"]
```
```
second
1    1
2    2
dtype: int64
```
```python
x[:, 1]
```
```
first
foo    1
bar    3
dtype: int64
```

# Views and copies

[As NumPy](../python-numpy#views,-copies-and-in-place-operations), Pandas distinguishes between *viewing* an object and *copying* it.

TODO

# Further reading

- [Pandas Illustrated: The Definitive Visual Guide to Pandas](https://betterprogramming.pub/pandas-illustrated-the-definitive-visual-guide-to-pandas-c31fa921a43)
