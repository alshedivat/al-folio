---
layout: post
title: Advanced Python 1 - Objects
date: 2024-01-07 11:59:00-0400
description: Everything is an object! 
tags: comments
categories: python coding
giscus_comments: true
related_posts: false
---

It is often said that in Python, everything is an object: builtins, functions, classes, instances, etc. Thus, it makes sense to study first the general case. In this post, I explore some general concepts related to objects.

# Properties of an object

Simply put, an object is a data structure with an internal state (a set of variables) and a behaviour (a set of functions). The "class" is the template that createss new object; using this template, we create new objects or instances. New objects are defined using the `class` operator, and instantiated using its name.

Every object has, at least, three properties: a 
reference, a class, and a refcount.

## Reference

A *reference* is a pointer, a way to access a memory address that stores the object. It can be associated to a name, or an element in a collection:

```python
a = 1 # creates a new integer object, and copies its reference to the name "a"

x = list()
x.append(1) # creates a new integer object, and appends its reference to the list "x"
```

We can retrieve the memory address using `id()` as a pretty meaningless integer:

```python
id(a)
```
```
4342270592
```

Note that the assignment operator `=` **never** makes a copy of the value being assigned, it just copies the pointer. We can check if two names point to the same memory location using `is`:

```python
x = [1,2,3]
y = [1,2,3]
z = x

assert x is z
assert x is not y
assert x == y
assert id(x) == id(z)
```

## Class

A *class* is the type of the object (e.g., a float, or a str). We can know an object's class using the `type` operator:

```python
type(1)
```
```
<class 'int'>
```
```python
type("1")
```
```
<class 'str'>
```
```python
type(1.)
```
```
<class 'float'>
```

## Refcount

The *refcount* is a counter that keeps track of how many references point to an object. Its value gets increased by 1 when, for instance, an object gets assigned to a new name. It gets decreased by 1 when a name goes out of scope or is explicitly deleted (`del`). When the refcount reaches 0, its object's memory will be reclaimed by the garbage collector.

We can access the refcounts of a variable using `sys.getrefcount`:

```python
import sys

sys.getrefcount(1)
```
```
218
```

The number is higher than I expected for a newly created integer. [The explanation might involve optimizations happening under the hood.](https://stackoverflow.com/a/44096890)

## Other properties

The builtin class float will have an additional property, storing the numerical value, as well as multiple methods that enable algebraic operations. A user-defined object will have an arbitrary number of attributes and methods.

Notably, the `None` object has no other properties. It is a singleton: only one such object exists:

```python
a = None
b = None

a is b
```
```
True
```

# Objects are first-class citizens

Objects are first-class citizens in Python. In other words, they can:

```python
# be assigned a name
def pretty_print(x: str):
    print(x.title() + ".")

pp = pretty_print
pp("hey there")
```
```
Hey there.
```

```python
# be passed as arguments
from typing import Callable

def format(x: str, formatter: Callable[[str], None]):
    formatter(x)

format("hey there", pretty_print)
```
```
Hey there.
```

```python
# be returned by other functions
def formatter_factory():
    return pretty_print

formatter_factory()("hey there")
```
```
Hey there.
```

# Mutability

Python has two kinds of data types, mutable and immutable, which respectively can and cannot be modified after being created. Mutable data types include lists, dictionaries and sets; immutable data types, integers, floats, bool, strings and tuples.

Mutability has implications on memory allocation. Python knows at runtime how much memory an immutable datatype require. However, the memory requirements of mutable containers will change as we add and remove elements. To add new elements quickly, Python allocates more memory than is strictly needed. 

TOMOVE:
Specifically:

- Sets: the allocated memory grows by 300% when the current one is 2/3 full.

## Copying an object

As mentioned above, `=` does not copy objects. If we need a copy, we need to use the `copy` module. There are two kinds of copies:

- **Shallow copy:** `copy.copy` copies the object, but any reference it stores will just get copied, i.e., not the whole referenced object.
- **Deep copy:** `copy.deepcopy` recursively copies the object, all the objects it references to, and so on.

```python
from copy import copy

x = [1, 2, [3, 4]]
# will only copy the reference to the third element
y = copy(x)

x[2].append(5)
print(y[2])
```
```
[3, 4, 5]
```

```python
from copy import deepcopy

x = [1, 2, [3, 4]]
# will make copy of the third reference too
y = deepcopy(x)

x[2].append(5)
print(y[2])
```
```
[3, 4]
```

# Scopes and namespaces

A namespace is a mapping from names to objects. In fact, it is a dictionary in which the keys are symbolic names (e.g., `x`) and the value is the object it references (e.g., an integer with a value of 8). During the execution of a typical Python program, multiple naespaces are created, and can have different lifetimes. There are four types of namespaces:

- The **builtin** namespace is created when the interpreter starts up. It contain names such as `print`, `int` or `len`.
- The **global** namespaces:
    - *The* global namespace contains every name created at the main level of the program.
    - Weirdly, *other* global namespaces are possible: each imported module will create its own.
- A **local** namespace is created everytime a function is called, and is "forgotten" when it terminates. 
    - When a function calls another function, the child has access to its parent's namespace. This is called the **enclosing** namespace.

Namespaces are related to scopes, which are the parts of the code in which sets of namespaces can be accessed. When a Python needs to lookup a name, if resolves it by examining the namespaces using the LEGB rule: it starts at the local namespace, then enclosing, global and builtin. By default, assignments and deletions happen on the local namespace. However, this behaviour can be altered using the `nonlocal` and `global` statements:

```python
def enclosing_test():
    foo = "enclosed"
    print(f"Inside enclosing_test, foo = {foo}")

    def local_test():
        foo = "local"
        print(f"Inside local_test, foo = {foo}")

    local_test()
    print(f"After local_test, foo = {foo}")

    def nonlocal_test():
        nonlocal foo
        foo = "nonlocal"
        print(f"Inside nonlocal_test, foo = {foo}")

    nonlocal_test()
    print(f"After nonlocal_test, foo = {foo}")

    def global_test():
        global foo
        foo = "global"
        print(f"Inside global_test, foo = {foo}")

    global_test()
    print(f"After global_test, foo = {foo}")

foo = "original"
print(f"At the beginning, foo = {foo}")
enclosing_test()
print(f"Finally, foo = {foo}")
```
```
At the beginning, foo = original
Inside enclosing_test, foo = enclosed
Inside local_test, foo = local
After local_test, foo = enclosed
Inside nonlocal_test, foo = nonlocal
After nonlocal_test, foo = nonlocal
Inside global_test, foo = global
After global_test, foo = nonlocal
Finally, foo = global
```

# Defining our own objects

Python allows to define our own classes:


```python
class Animal:

    phylum = "metazoan"

    def __init__(self, name, weight):
        self.name = name
        self.weight = weight
        self.__favorite = True
```

Here, I will focus on some interesting features.

## Private and protected attributes

In other languages, a class' attributes can we set as protected (only accessible within the class and subclasses) or as private (only accessible within the class). While in Python you can always modify attributes from the outside, it emulates that behavior by prepending one or two underscores respectively:


```python
whale = Animal("whale", 100000)
whale.__favorite
```
```
AttributeError: 'Animal' object has no attribute '__favorite'
```

If we want to access that attribute, we need to put some extra effort:

```python
print(whale._Animal__favorite)
```
```
True
```

However, and rather confusingly, this is valid:

```python
whale.__favorite = False
print(whale._Animal__favorite, whale.__favorite)
```
```
True False
```

## Each instance has an instance dictionary

Every instance in Python has a builtin `__dict__` method that stores its writable attributes:

```python
whale = Animal("whale", 100000)

print(whale.__dict__)
```
```
{'name': 'whale', 'weight': 100000, '_Animal__favorite': True}
```

Note that:

- Attributes defined at the class level (`phylum`) don't show
- Private attributes (`_favorite`) appear with an altered name

## `__slots__` helps with memory optimization

The instance's dictionary keeps the class flexible, since we can add new attributes any time:

```python
whale.medium = "water"
print(whale.__dict__)
```
```
{'name': 'whale', 'weight': 100000, '_Animal__favorite': True, 'medium': 'water'}
```

`__slots__` allows us to specifying the attributes a priori, allowing Python to reserve the memory and to bypass the creation of the dictionary:

```python
class ConstrainedAnimal:

    __slots__ = ["name", "weight", "__favorite"]
    phylum = "metazoan"

    def __init__(self, name, weight):
        self.name = name
        self.weight = weight
        self.__favorite = True

dog = ConstrainedAnimal("dog", 10)
dog.__dict__
```
```
AttributeError: 'ConstrainedAnimal' object has no attribute '__dict__'. Did you mean: '__dir__'?
```

On top of the memory optimizations, this prevents us from introducing bugs by using wrong variable names:

```python
dog.namme = "puppy"
```
```
AttributeError: 'ConstrainedAnimal' object has no attribute 'namme'
```

# References

* D. Beazley, [Advanced Python Mastery](https://github.com/dabeaz-course/python-mastery)
* https://www.interviewbit.com/python-interview-questions/#freshers
* <https://docs.python.org/3/tutorial/classes.html>
* <https://wiki.python.org/moin/UsingSlots>
