---
layout: post
title: ython quirks
date: 2024-01-07 11:59:00-0400
description: interesting features of Python
tags: comments
categories: python coding
giscus_comments: true
related_posts: false
---

While reading the book "Effective Python: 90 Specific Ways to Write Better Python" I discovered a few interesting behaviors in Python. I list some of them below.

# String formatting

While Python offers multiple ways of formatting strings (i.e., combining predefined text and variables), [F-strings](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals) are particularly elegant: 

```python
constants = {
    "pi": 3.14159265358979323846,
    "sqrt(2)": 1.41421356237309504880,
    "Euler's number": 2.71828182845904523536
}

for name, value in constants.items():
    print(f"{name} = {value}")
```
```
pi = 3.141592653589793
sqrt(2) = 1.4142135623730951
Euler's number = 2.718281828459045
```

The float variables can be rounded to a given precision:
```python
for name, value in constants.items():
    print(f"{name} = {value:.3f}")
```
```
pi = 3.142
sqrt(2) = 1.414
Euler's number = 2.718
```

Values can also be formatted to occupy a minimum fixed width:

```python
for name, value in constants.items():
    print(f"{name:10} = {value:.3f}")
```
```
pi         = 3.142
sqrt(2)    = 1.414
Euler's number = 2.718
```

Note that the string "Euler's number" exceeds the minimum length of 10, and is hence represented as is. 

# Implicit string concatenation

Strings placed next to each other are automatically concatenated:

```python
assert "foo" "bar" == "foo" + "bar"
```

This is useful to cleanly produce long strings while respecting a certain maximum line length:

```python
message = "Hello, " \
          "World!"
print(message)
```
```
Hello, World!
```

# Unpacking to swap values in place

We can use unpacking to swap multiple of a list in place, without requiring additional temporary variables:


```python
x = [1, 2, 3]
x[1], x[0] = x[0], x[1]
print(x)
```
```
[2, 1, 3]
```

# `enumerate` with an offset


The [`enumerate`](https://docs.python.org/3/library/functions.html#enumerate) function creates a lazy generator over an iterable that will return a tuple (index, item). It can take a second parameter, to indicate the first index to start counting from:

```python
x = ["a", "b", "c"]

for idx, item in enumerate(x, 10):
    print(f"{idx}: {item}")
```
```
10: a
11: b
12: c
```

# `zip` and `itertools.zip_longest`

The [`zip`](https://docs.python.org/3/library/functions.html#zip) function combines two or more iterators, generating a lazy generator which yields the next item from each. It is particularly useful to handle related lists that have the same length:

```python
numbers = [1, 2, 3]
squared = [x**2 for x in numbers]

for number, square in zip(numbers, squared):
    print(f"The square of {number} is {square}.")
```
```
The square of 1 is 1.
The square of 2 is 4.
The square of 3 is 9.
```

However, when the two iterables have different lenghts, `zip` will only emit as many elements as the shortest of them:

```python
xs = list(range(4))
ys = list(range(5))

for x, y in zip(xs, ys):
    print(x, y)
```
```
0 0
1 1
2 2
3 3
```

When we do not wish this truncation to happen, [`itertools.zip_longest`](https://docs.python.org/3/library/itertools.html#itertools.zip_longest) might be what we need:

```python
from itertools import zip_longest

xs = list(range(4))
ys = list(range(5))

for x, y in zip_longest(xs, ys):
    print(x, y)
```
```
0 0
1 1
2 2
3 3
None 4
```

# The walrus operator

The [walrus operator](https://docs.python.org/3/reference/expressions.html#assignment-expressions) (`:=`) allows to assign variables in the middle of expressions:

```python
def is_divisor(x, y):
    """
    Check if y is a divisor of x.

    Parameters:
    - x (int): The dividend.
    - y (int): The potential divisor.

    Returns:
    tuple: A tuple containing a boolean indicating whether y is a divisor of x,
           and the remainder when x is divided by y. If y is a divisor, the
           boolean is True, and the remainder is 0; otherwise, the boolean is
           False, and the remainder is the result of x % y.
    """
    if remainder := x % y:
        return False, remainder
    else:
        return True, 0

print(is_divisor(10, 5))
```
```
(True, 0)
```
```python
print(is_divisor(10, 3))
```
```
(False, 1)
```

The walrus operator is present in the first line of the `is_divisor` function. It allows two things to happen at once. First, the `if` clause will evaluate the expression `x % y` (false if the remainder is 0; true if it's any other number). Additionally, it is setting the `remainder` variable to `x % y`. This makes the code easier to understand, since `remainder` is only defined if it is going to be used.

# Sorting by complex criteria

The [`list.sort`](https://docs.python.org/3/library/stdtypes.html#list.sort) method orders a list's elements in ascending order. It will work as long as the items have defined the `<` comparison operator, as is the case for floats, integers and strings. However, in some cases that operator might not be implemented, or might not be making the comparison that we care about. The `key` argument is helpful in those cases:

```python
class Animal:
    def __init__(self, name, weight):
        self.name = name
        self.weight = weight

    def __repr__(self):
        return f"Animal({self.name}, {self.weight})"

animals = [Animal("lion", 200),
           Animal("whale", 100000),
           Animal("possum", 2.5)]

# sort by weight
animals.sort(key = lambda x: x.weight)
print(animals)
```
```
[Animal(possum, 2.5), Animal(lion, 200), Animal(whale, 100000)]
```

```python
# sort by name
animals.sort(key = lambda x: x.name)
print(animals)
```
```
[Animal(lion, 200), Animal(possum, 2.5), Animal(whale, 100000)]
```

As shown, `key` takes a function which will receive an item, and output a comparable value.

# A class' `__dict__` attribute

Every class in Python has a builtin `__dict__` method that stores its writable attributes:

```python
class Animal:

    # attributes defined at the class level, but not assigned to any instance won't show
    phyla = "metazoan"

    def __init__(self, name, weight):
        self.name = name
        self.weight = weight
        
        # private attributes will show with an altered name
        self.__favorite = True

whale = Animal("whale", 100000)

print(whale.__dict__)
```
```
{'name': 'whale', 'weight': 100000, '_Animal__favorite': True}
```

# References

* B. Slatkin, Effective Python: 90 Specific Ways to Write Better Python.

