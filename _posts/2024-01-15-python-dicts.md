---
layout: post
title: Advanced Python 3 - Dictionaries
date: 2024-02-10 11:59:00-0000
description: Keeping Python together since 1991
tags: comments
categories: python coding dictionary
giscus_comments: true
related_posts: false
toc:
    sidebar: left
---

A dictionary is a data structure that stores key-value pairs. As we saw in the previous post and will keep exploring, dictionaries are behind many of Python's features, including objects and namespaces. In this post, I do a deep dive in the underpinnings on Python's dictionaries, and describe some useful features.

# The inner workings of dictionaries (and sets)

Dictionaries and sets are ideal data structures to collect items when 1. the data has no intrinsic order; and 2. elements can be retrieved using *keys*, i.e., so-called *hashable* objects (further described below). The underpinnings of dictionaries and sets are very similar, a data structure called the *hash map*. [Similarly to lists and tuples](../python-lists/), we can visualize it as a finite number of memory buckets, each of which can store a reference to an object. The number of buckets is called the *capacity*. Each possible key maps univocally to a bucket, thanks to the hash function. Hence, lookups, insertions and deletions are performed in constant time. The difference between dictionaries and sets lies in what goes in the bucket: dictionaries store key-value pairs, while sets only store keys.

## Hashing, explained

Hash maps rely on the key objects implementing a hash method (`.__hash__()`). This function maps each object to a fixed-byte integer. When we apply the `hash()` function to the object, its hash method gets called. The hash method needs to be fast, since all operations on a hash map are limited by its speed. In addition, it needs to be deterministic and produce fixed-length values. For reasons we will go over later, a *hashable* object needs to additionally implement either an `__eq__` operator, or a `__cmp__` operator.

Let's see some examples using the immutable builtins:

```python
hash(1)        # 1
hash(1.)       # 1
hash("1")      # 6333942777250828306

hash((1))      # 1
hash((1, 1))   # 8389048192121911274
hash((1., 1.)) # 8389048192121911274
```

Imagine that our hash map has a capacity of 16, i.e., we have 16 buckets indexed from 0 to 15. However, as we just saw, hashing can produce very large integers, which makes it impossible to use the integer as a bucket index. To keep things small, let's say our object's hash is 62. To map 62 to one of our 16 buckets, we need an additional operation called *mask*. A simple mask is the modulo function using the capacity, which will always produce a value between 0 and 15:

```python
62 % 15
```
```
2
```

In other words, 62 would map to bucket number 2. However, there are faster *masks*. Specifically, Python uses the bitwise AND (`&`):

```python
# bin(62) = 0b111110
#               &
# bin(15) = 0b001111
# ------------------
#           0b001110 = 14
62 & 15
```
```
14
```

Note that since the number of buckets will often be much smaller than the hash, `&` is effectively operating only on the tails.

## Storing data into a bucket: handling collisions

If the number of *empty* buckets is large enough, a new key can be mapped to an empty bucket with high probability. (Empty buckets contain a `NULL` value.) In that case, we will simply store the key-value pair in the bucket.

However, it is possible that the bucket is already occupied. In that case, Python will first check if the keys are equal. That is why 1. we store the key object in the bucket; and 2. the key object needs to implement `.__eq__` or `.__cmp__`. If there is a match, the key-value pair gets updated. Otherwise, we have a collision, i.e., two keys map to the same bucket. In that case, a deterministic exploration of other buckets starts. The details of this process, called *probing*, are beyond the scope of this article. Once an empty bucket is found, the key-value pair will be stored there. At lookup time, this probing process will be followed, until either the right key or an empty bucket is found.

When a value is deleted, we cannot simply overwrite it with a `NULL`. That would make the bucket identical to a "virgin" bucket, and potentially disrupt the probing strategy, leading to inconsistent results. Instead, a special value is written (sometimes called a "turd"). Nonetheless, this memory is not wasted: another key-value pair can take its place if needed, without compromising the integrity of the data.

## Time complexity

Understanding what underlies dictionaries and sets allows us to estimate the time complexity of the different operations.

**Lookup**: given a key, in the vast majority of cases a lookup is done in $$O(1)$$. The actual time depends on how fast the hash function is. Collisions are the main hurdle to lookup: in the worst case, all keys collide, meaning we have to iterate over all the elements to find ours. In that case, complexity is $$O(n)$$. Luckily, a good hash function ensures that colisions are very rare.

**Insertion**: for similar reasons, the amortized time complexity is $$O(1)$$ and the worst case is $$O(n)$$.

**Deletion**: for similar reasons, the amortized time complexity is $$O(1)$$ and the worst case is $$O(n)$$.

**Resizing**: Python doubles the capacity of a dictionary when it becomes 2/3 full. Similarly, the capacity of a set gets quadrupled when it becomes 2/3 full. When such a thing happens, all key-value pairs need to be relocated into their new buckets. This is a pretty expensive step, albeit very infrequent, which keeps the amortized insertion complexity at $$O(1)$$.

## A dictionary implementation

Putting it all together, this is a very rough implementation of a dictionary:

```python
from collections.abc import Hashable
from typing import Any

class Dictionary:
    """
    A dictionary implementation using linear probing for collision resolution.
    """

    def __init__(self, capacity: int = 1024) -> None:
        """
        Initialize the Dictionary with a given capacity.

        Parameters:
        - capacity (int): The initial capacity of the dictionary.

        Returns:
        - None
        """

        # virgin buckets are set to None, deleted buckets to False
        self.__buckets = [None for _ in range(capacity)]  
        self.__size = capacity
        self.__n_items = 0

    def __setitem__(self, key: Hashable, value: Any) -> None:
        """
        Set the value for a given key in the dictionary.

        Parameters:
        - key (Hashable): The key to be inserted.
        - value (Any): The value associated with the key.

        Returns:
        - None
        """
        idx = self.__find_key_bucket(key)
        self.__buckets[idx] = (key, value)
        self.__n_items += 1
        self.__resize_check()

    def __getitem__(self, key: Hashable) -> Any:
        """
        Get the value associated with a given key from the dictionary.

        Parameters:
        - key (Hashable): The key whose value needs to be retrieved.

        Returns:
        - Any: The value associated with the given key.

        Raises:
        - KeyError: If the key is not found in the dictionary.
        """
        idx = self.__find_key_bucket(key)
        return self.__buckets[idx][1]

    def __contains__(self, key: Hashable) -> bool:
        """
        Check if the dictionary contains a given key.

        Parameters:
        - key (Hashable): The key to check for existence in the dictionary.

        Returns:
        - bool: True if the key is present in the dictionary, False otherwise.
        """
        try:
            idx = self.__find_key_bucket(key)
        except KeyError:
            return False

        return bool(self.__buckets[idx])


    def __delitem__(self, key: Hashable) -> None:
        """
        Delete the entry for a given key from the dictionary.

        Parameters:
        - key (Hashable): The key to be deleted.

        Returns:
        - None

        Raises:
        - KeyError: If the key is not found in the dictionary.
        """
        idx = self.__find_key_bucket(key)
        self.__buckets[idx] = False

    def __resize_check(self) -> None:
        """
        Check if resizing of the dictionary is necessary based on the load factor (2/3).

        Returns:
        - None
        """
        if self.__n_items < (self.__size * 2 / 3):
            return

        new_size = 4 * self.__size
        dummy_dict = Dictionary(new_size)

        # reinsert all existing key-value pairs
        for bucket in self.__buckets:
            if not bucket:
                continue
            key, value = bucket
            dummy_dict[key] = value

        self.__size = new_size
        self.__buckets = dummy_dict.__buckets
        self.__n_items = dummy_dict.__n_items

    def __find_key_bucket(self, key: Hashable) -> int:
        """
        Find the index of the bucket corresponding to a given key.

        Parameters:
        - key (Hashable): The key to be found.

        Returns:
        - int: The index of the bucket.

        Raises:
        - KeyError: If the key is not found in the dictionary.
        """
        idx = hash(key) & (self.__size - 1)
        n_iters = 0

        # find an empty bucket (either None or False)
        while self.__buckets[idx]:

            # stop once we have checked all buckets
            if n_iters >= self.__size:
                raise KeyError

            if isinstance(self.__buckets[idx], tuple):
                if self.__buckets[idx][0] == key:
                    break

            idx += 1
            n_iters += 1
            if idx >= self.__size:
                idx = 0

        return idx
```

Let's see it in action:

```python
# I show under each command shows the the internal bucket state

my_dict = Dictionary(4)
# [None, None, None, None]

my_dict[1] = "a"
# [None, (1, 'a'), None, None]

my_dict[2] = "b"
# [None, (1, 'a'), (2, 'b'), None]

# 75% is full, which will trigger a resizing
my_dict[5] = "c"
# [None, (1, 'a'), (2, 'b'), None, None, (5, 'c'), None,
#  None, None, None, None, None, None, None, None, None]

my_dict[140] = "d"
# [None, (1, 'a'), (2, 'b'), None, None, (5, 'c'), None,
#  None, None, None, None, None, (140, 'd'), None, None, None]

my_dict[1] = 2
# [None, (1, 2), (2, 'b'), None, None, (5, 'c'), None, None,
#  None, None, None, None, (140, 'd'), None, None, None]

1 in my_dict # True

del my_dict[1]
# [None, False, (2, 'b'), None, None, (5, 'c'), None, None,
#  None, None, None, None, (140, 'd'), None, None, None]

1 in my_dict # False

my_dict[1] = "x"
# [None, (1, 'x'), (2, 'b'), None, None, (5, 'c'), None,
#  None, None, None, None, None, (140, 'd'), None, None, None]

my_dict[1] # x
my_dict[2] # b
```

# Starred expressions

Dictionaries have two star operators: `*` and `**`. Let's see how they work:

```python
ingredients = {
    "carrots": 3,
    "tomatoes": 2,
    "lettuces": 1,
}

print({*ingredients})
```
```
{'tomatoes', 'carrots', 'lettuces'}
```

`*` unpacked the keys, which went into a set.

```python
print({**ingredients})
```
```
{'carrots': 3, 'tomatoes': 2, 'lettuces': 1}
```

`**` unpacked the key-value pairs, which went into a new dictionary.

# Insertion order is preserved

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

# Merging two dictionaries

After Python 3.10, there are three ways of merging two dictionaries. Two of them are equivalent: unpacking using the `**` operator and the merge operator `|`:

```python
dairy_1 = {
    "cheese": 5,
    "yogurt": 4
}

dairy_2 = {
    "cheese": 3,
    "paneer": 2
}
{**dairy_1, **dairy_2}
```
```
{'cheese': 3, 'yogurt': 4, 'paneer': 2}
```
```python
dairy_1 | dairy_2
```
```
{'cheese': 3, 'yogurt': 4, 'paneer': 2}
```

These options create a new dictionary with all the key-value pairs. As one might expect, the key insertion order is preserved from left to right. Note than when there are shared keys, the last value is kept.

An alternative is `dict.update()`, wich merges the dictionaries in place, updating the values when a key is shared:

```python
dairy_1.update(dairy_2)
print(f"dairy_1 = {dairy_1}")
print(f"dairy_2 = {dairy_2}")
```
```
dairy_1 = {'cheese': 3, 'yogurt': 4, 'paneer': 2}
dairy_2 = {'cheese': 3, 'paneer': 2}
```

This is more memory efficient, since it does not create a new dictionary. However, it is not desirable if we want to keep the original dictionaries.

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

The [`collections.defaultdict`](https://docs.python.org/3/library/collections.html#collections.defaultdict) goes one step beyond. They are a good replacement for dictionaries when there is a unique default value. Its first argument is a function which returns the default value. It will be called if and only if the key is missing:

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

Note that the `ingredients_dd` contains an item for cabbages which was never explicitly inserted. `defaultdict` not only allows us to write simpler code, but is more efficient than `setdefault` to avoid unnecesary calls to the default factory. For instance, `ingredients.setdefault("carrot", set())` would instantiate a new set even if the key `carrot` already exists; `defaultdict` would avoid that call. 

## Use `collections.Counter` to count

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

# Composite keys

Since tuples are hashable objects, they can be used as keys:

```python
# store ingredients and purchase date
ingredients = {
    ("carrots",  "2024-01-04"): 3,
    ("tomatoes", "2024-01-13"): 2,
    ("carrots", "2024-01-13"): 1,
}
```

Then, composite keys are used like this:

```python
ingredients["carrots", "2024-01-13"]
```
```
1
```

# Use `zip` to create dictionaries from lists

When we have two lists of the same length, we can quickly combine them using `zip`:

```python
ingredient_list = ["carrots", "tomatoes", "lettuces"]
counts = [3, 2, 1]
ingredients = dict(zip(ingredient_list, counts))
print(ingredients)
```
```
{'carrots': 3, 'tomatoes': 2, 'lettuces': 1}
```

# Further reading

* D. Beazley, [Advanced Python Mastery](https://github.com/dabeaz-course/python-mastery)
* M. Gorelick & I. Ozsvald, High Performance Python: Practical Performant Programming for Humans. Chapter 4. Dictionaries and Sets.
* B. Slatkin, Effective Python: 90 Specific Ways to Write Better Python.
* On resizing dictionaries: <https://mail.python.org/pipermail/python-list/2000-March/048085.html>
* CPython's implementation of dictionaries: <http://www.laurentluce.com/posts/python-dictionary-implementation/>
