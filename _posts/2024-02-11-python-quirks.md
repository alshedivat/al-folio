---
layout: post
title: Advanced Python n - Quirks
date: 2024-02-11 11:59:00-0400
description: A catch-all of interesting behaviors
tags: comments
categories: python coding
giscus_comments: true
related_posts: false
---

In this post, I present some interesting features of Python that were not within the scope of the previous posts.

# Strings
## String formatting

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

## Implicit string concatenation

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

# Lists

## `enumerate` with an offset

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

## `zip` and `itertools.zip_longest`

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

# Floats and integers

## Underscores as visual separators

We can use underscores `_` as visual separators between any pair of digits in integers, floats or complex numbers:

```python
assert 10_000_000 == 10000000
assert 1_100.3 == 1100.3
```

I find this particularly useful when dealing with large numbers.

# Generators

TODO

# Typing hints

In this series, we have seen multiple examples in which the type of a variable is specified. For instance:

- Variables:
```python
x: dict[int, int] = {0: 0, 1: 1}
```
- Function arguments and return values:
```python
def pretty_print(x: str, prefix: str | None = None) -> None:
    prefix = f"{prefix}: " if prefix else ""
    print(f"{prefix}{x.title()}.")
```

Note that typing hints are a relatively recent addition to Python. Typing hints of recent verions of Python might produce parsing errors on older version.

The stdlib's [`typing`](https://docs.python.org/3/library/typing.html) module gives many options to control type hints. (Widely used packages bring their own typing hints, like [numpy](https://numpy.org/devdocs/reference/typing.html).) Below I explore some interesting features.

## Overloading functions

The decorator `@typing.overload` allows to overload functions, that is, have a function behave differently depending on the argument type.

```python
from typing import overload
 
@overload
def square(x: int) -> int:
    ...
 
@overload
def square(x: list[int]) -> list[int]:
    ...
 
def square(x: list[int] | int) -> list[int] | int:
    if isinstance(x, list):
        return [square(_x) for _x in x]
    return x * 2
```

## Type checking

Python is a dynamically typed language. Hence, typing hints are just, that, hints. However, we can use [mypy](https://github.com/python/mypy) on our entire codebase to check that types are used correctly.

# Integer arithmetic using bitwise operations

Some people are really concerned by performance. Their concern is such that they are willing to sacrifice code readability for minor gains in performance. Such people might get satisfaction from replacing arithmetic operations involving integers by bitwise operations. Since those act directly on the bit representation of the integer, they can be more efficient. Despite compilers performing some optimization of their own, [there is some somewhat old evidence supporting that bitwise operations are faster.](https://stackoverflow.com/questions/37053379/times-two-faster-than-bit-shift-for-python-3-x-integers) I describe below some common optimizations.

## Dividing and multiplying by powers of two

The `>>` and the `<<` operators shift the bit representation to the left and to the right, respectively. This can be used to quickly divide or multiply integers by powers of two:

```python
x = 0b101 # 5

# shift to the right by 1
#   0b101 >> 0b10
# equivalent to 5 // 2**1
5 >> 1 # 2

# shift to the left by 4
#   0b101 >> 0b1010000
# 5 * 2**4
5 << 4 # 80
```

## Check if a number is odd

The `&` operator is the bitwise AND operator. When we use `&` between any integer and a 1, we are effectively cheching if the last bit is a 1 (odd) or a 0 (even):

```python
# 0b1110 & 0b0001 = 0b0000 = 0
assert not 14 & 1

# 0b1111 & 0b0001 = 0b0001 = 1
assert 15 & 1
```

## Iterate a list from the end

The `~` operator is the complement operator, which switches 1s by 0s and vice versa. Let's see it in action:

```python
# 0b01 -> 0b10
assert ~1 == -2
assert ~-2 == 3
```

Since the first bit represents the sign, it has the effect of turning $$x$$ into $$-x - 1$$. This is useful when we need to simultaneously iterate the front and the back of a list:

```python
def is_palindrome(word: str) -> bool:
    return all([word[i] == word[~i] for i in range(len(word) // 2)])

assert is_palindrome("kayak")
assert not is_palindrome("dog")
```

# Exceptions

Handling exceptions with `try: ... except: ...` is a common in Python code. But there are some additional nuances:

```python
y = list()
x = 1
try:
    x + 1
    y.append(1)
    {}[1]
# we can handle multiple, specific exceptions
except TypeError:
    print(f"Can't sum an integer and a {type(x)}.")
except AttributeError:
    print(f"Can't append to {type(y)}.")
# we can still add a catch-all exception
except:
    # we can throw our own exception
    raise Exception("Something went wrong.")
# behavior if no error is raised
else:
    print("All good.")
# a block that will be run no matter what,
# usually good for clean up
finally:
    print("Thanks anyway.")
```

# References

* D. Beazley, [Advanced Python Mastery](https://github.com/dabeaz-course/python-mastery)
* B. Slatkin, Effective Python: 90 Specific Ways to Write Better Python.
* [PEP 515 – Underscores in Numeric Literals](https://peps.python.org/pep-0515/)
