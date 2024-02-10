---
layout: post
title: Advanced Python 4 - Vectors and matrices
date: 2024-02-08 11:59:00-0000
description: NumPy and vectorization
tags: comments
categories: python coding numpy
giscus_comments: true
related_posts: false
toc:
    sidebar: left
---

In data science we often operate on numerical vectors are matrices. Although we could store such data as Python's builtins, as a list and a list of lists respectively, we don't. Instead, we use specialized packages like [NumPy](https://numpy.org/), which provide much better performances. In this post I dig into the reasons behind this superiority. As is common in this series, I assume familiarity with Python, and NumPy in this case.

# The inner workings of NumPy arrays

The main selling point of NumPy is the speed up in computations it offers. However, to understand that, we need to first understand the underpinnings of the NumPy array, or `ndarray`. The `ndarray` is made up of two components: an array (the *data buffer*) containing the data, and the metadata, containing information about the data buffer.

The **data buffer** is an array of elements of the same type:

```python
import numpy as np

# ndarrays can contain multiple data types, e.g.,
# integers
np.array([1, 2, 3])

# floats
np.array([1., 2., 3.])

# 1-character string
np.array(["1", "2", "3"])

# Python references - which, as we will see soon,
# greatly undoes the benefits of NumPy
np.array([int, float, str])
```

Let's compare this to a Python builtin: a list containing floats. [Remember](../python-lists) that each of the 64-bit buckets does not store the float, but a 64-bit reference to the float object. This keeps lists flexible, since each bucket can contain a reference to any object, float or not. But it comes with a memory overhead since, on top of the reference, we need to store the object itself, [which is more complex than a naked float value](../python-objects/#properties-of-an-object). In contrast, an `ndarray` stores only the floats themselves, requiring less than 25% of the memory. Furthermore, in the list of floats, the data is *fragmented*: the list itself, and all the objects it references are scattered across memory. In contrast, the whole data buffer lives in a single block of memory.

The **metadata** includes important information about the data buffer. We can access the metadata like this:

```python
x = np.array([1, 2, 3, 4, 5, 6])
x.__array_interface__
```
```python
{'data': (105553130143936, False),
 'descr': [('', '<i8')],
 'shape': (6,),
 'strides': None,
 'typestr': '<i8',
 'version': 3}
```

For instance, each `ndarray` has a data type, or `dtype`, which specifies what type of elements it contains (e.g., `float64`, `float16` or `int32`). If we need further memory savings, we can consider reducing the numerical precision:

```python
np.array([1., 2., 3.], dtype = "float16").nbytes # 6
np.array([1., 2., 3.], dtype = "float64").nbytes # 24
```

# Vectorization

Vectorization refers to computing multiple computations at once. As an example:

```python
# non-vectorized
xs = [1, 2, 3]
ys = [4, 5, 6]

# we sequentially iterate the
# pairs and compute the sum
[x + y for x, y in zip(xs, ys)]
```
```
[5, 7, 9]
```

```python
# vectorized
import numpy as np

xs = np.array(xs)
ys = np.array(ys)

# all 3 sums happen at once
xs + ys
```
```
array([5, 7, 9])
```

Importantly, a vectorized operation is vastly faster than its explicit `for` loop counterpart. To understand why, we need to take a step back, and [understand how the RAM and the CPU interact](../hardware). CPU and RAM are the two sides of this story.

## On the memory side

First, Python's native data structures are highly **fragmented**. This severely hampers the prefetcher, and [cache misses](../hardware#cache-and-prefetching) are common. In other words, the list is an object with an attribute containing a reference to an array which in turn stores references to float objects. The object, the array and the floats are scattered across memory. (Potentially, this could be solved by [`arrays`](https://docs.python.org/3/library/array.html). But they seem to have their own downsides.) Keeping data together, as `ndarrays` do, leads to less cache misses. (Additional gains are possible by reducing the number of [cache lines](../hardware) an array spans, e.g., using aligning their beginning to the memory grid. So far I have find some indications, but not strong sources supporting that NumPy attempts this too.)

Second, Python is **dynamically** typed. This means that every operation between two numbers becomes a complex interaction between two heavy data structures. Internally, Python needs to find out the types of the objects, recover their values, run the computation, and store the result in a new object. Statically typed languages avoid much of this overhead.

## On the CPU side

Vectorization has another meaning in hardware. Specifically, it refers to SIMD, the ability of the CPU to [handle multiple numbers in a single instruction](../hardware#registers-and-simd). CPython does not leverage SIMD, or gives us access to them. However, many NumPy functions are implemented in low-level languages to take advantage of this instruction set. This leads to even faster code. However, we won't take advantage of this optimization when using Python-implemented vector operations, for instance custom transformations of our data.

## Further efficiency gains

### Row vs. column operations

By default, `ndarrays` store matrices in a row-major order, that is, as a concatenation of the rows of the matrix. In other words, the elements from the same row live close (sharing cache lines), but the ones in the same column might live very far apart. Since retrieving one element will copy to the CPU cache the whole matrix row, row operations are fast. In contrast, column operations are slow, since they require copying as many cache lines as rows. Let's see one example:

```python
import numpy as np
import time

# create a large matrix
n_rows = 100_000
n_cols = 100_000

# the default order is "C", 
# which confusingly refers to row-major
matrix = np.ones((n_rows, n_cols), order = "C", dtype = "int8")

# time row operation
start_time = time.time()
_ = matrix.sum(axis = 1) # sum the columns row-wise
end_time = time.time()
row_time = end_time - start_time
print("Time taken for the row operation:", row_time)

# time column operation
start_time = time.time()
_ = matrix.sum(axis = 0) # sum the rows col-wise
end_time = time.time()
col_time = end_time - start_time
print("Time taken for the column operation:", col_time)
```
```
Time taken for the row operation: 8.663719177246094
Time taken for the column operation: 9.641089916229248
```

(Note that `ndarray.sum()` calls an efficient, low-level function. The gap is much larger for most user-defined functions.)

Consistenly, shifting to column-major order (`order = "F"`) produces the opposite result.Carefully considering the operations we will be carrying out can have a major impact.

# Views, copies and in-place operations

NumPy introduced an important but tricky concept: data *views*. A views is just a new way to access the data buffer of an existing `ndarray`, with different metadata. Some operations produce views, like basic indexing (i.e., using single indexes and slices):

```python
x = np.array([1, 2, 3, 4, 5, 6])
y = x[:2]

# x and y point to the same data buffer
assert x.__array_interface__['data'][0] == y.__array_interface__['data'][0]
```

We can check if an ndarray is a view using the base attribute:

```python
assert x.base is None
assert y.base is not None
assert y.base is x
```

Other operations return a copy of the data:

```python
x = np.array([1, 2, 3, 4, 5, 6])
# advanced indexing
# (e.g., integer or boolean arrays)
y = x[[0, 1]]
z = x[x > 4]

assert y.base is None
assert z.base is None

# arithmetic operations
y = x + 1

assert y.base is None
```

Other functions, like `numpy.reshape` or `numpy.ravel`, will produce a view whenever possible and a copy otherwise.

Lastly, note that some operations happen in-place:

```python
x = np.array([1, 2, 3, 4, 5, 6])
pointer_1 = x.__array_interface__['data'][0]

x += 1
pointer_2 = x.__array_interface__['data'][0]

assert pointer_1 == pointer_2
assert x.base is None
```

Let's see some specific cases.

## Casting

Casting is the conversion of data from one type into another. The simplest form of casting is simply changing the type of an `ndarray`:

```python
x = np.array([1, 2, 3], dtype = "int8") # x.dtype is int64

y = x.astype("float16")
```

In general, casting triggers a copy:

```python
assert y.base is None
```

Casting commonly occurs when performing arithmetic operations between different types. In those cases, NumPy picks the largest type that can safely represent both operants without losing precision. For instance, `x + y` involves `int8` and `float16`. Since the latter can represent the former, the type of the sum will be `float16`.

## Explicit viewing

We can explicitly trigger a reinterpretation of the data buffer under another type using `ndarray.view()`. Note that produces a view, not a re-casting of the original `ndarray`. Let's see an example:

```python
x = np.array([1, 2], dtype = "uint8")
binary_repr = ''.join(format(byte, '08b') for byte in x.data.tobytes())

print(binary_repr)
```
```
0000000100000010
```

This is what our array looks like in memory. We can see the binary encoding as an `np.unit8` of 1 (`00000001`) and of 2 (`00000010`). `ndarray.view()` can reinterpret this sting of 16 bits as an `np.int16`:

```python
assert x.view("int16").byteswap()[0] == int(binary_repr, base = 2) # 258
```

Ignore the `byteswap()` call. [It relates to how NumPy parses a sequence of bits.](https://numpy.org/devdocs/user/byteswapping.html#changing-byte-ordering)

# Broadcasting

# Further reading

- M. Gorelick & I. Ozsvald, High Performance Python: Practical Performant Programming for Humans. Chapter 5. Matrix and Vector Computation.
- A series of [Python⇒Speed](https://pythonspeed.com/) articles:
    - [The limits of Python vectorization as a performance technique](https://pythonspeed.com/articles/vectorization-python-alternatives/)
    - [How vectorization speeds up your Python code](https://pythonspeed.com/articles/vectorization-python/)
    - [Massive memory overhead: Numbers in Python and how NumPy helps](https://pythonspeed.com/articles/python-integers-memory/)
- [What scientists must know about hardware to write fast code](https://viralinstruction.com/posts/hardware/)
- [Scipy lecture notes: Advanced NumPy](https://scipy-lectures.org/advanced/advanced_numpy/)
