---
layout: post
title: Advanced Python 1 - Objects
date: 2024-02-08 11:59:00-0000
description: Everything is an object! 
tags: comments
categories: python coding objects
giscus_comments: true
related_posts: false
toc:
    sidebar: left
---

*Python has been the programming language I used most in the past decade. In this series, I explore its more advanced features.*

It is often said that in Python, everything is an object: builtins, functions, classes, instances, etc. Thus, improving our understanding of objects will is key to mastering Python. In this first post I explore some general concepts related to objects.

# Properties of an object

Simply put, an object is a data structure with an internal state (a set of variables) and a behaviour (a set of functions). The "class" is the template to create new objects or instances. New objects are defined using the `class` operator, and instantiated using the class name.

Every object has, at least, three properties: a reference, a class, and a refcount.

## Reference

A *reference* is a pointer, a way to access the memory address that stores the object. It can be associated to a name, or an element in a collection:

```python
# create a new integer object, and 
# copy its reference to the name "a"
a = 1

# create a new integer object, and
# append its reference to the list "x"
x = list()
x.append(1)
```

We can retrieve the memory address using `id()`, represented as an integer:

```python
id(a)
```
```
4342270592
```

Note that the assignment operator (`=`) **never** makes a copy of the value being assigned, it just copies the reference. We can check if two names point to the same memory location using `is`:

```python
x = [1, 2, 3]
y = [1, 2, 3]
z = x

# same reference?
assert x is z
assert id(x) == id(z)
assert x is not y

# same value?
assert x == y
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

Similarly, we can check if an object is an instance of a given class:

```python
assert isinstance(1, int)
assert isinstance("1", str)
assert isinstance(1., float)
```

## Refcount

The *refcount* is a counter that keeps track of how many references point to an object. Its value gets increased by 1 when, for instance, an object gets assigned to a new name. It gets decreased by 1 when a name goes out of scope or is explicitly deleted (`del`). When the refcount reaches 0, its object's memory will be reclaimed by the garbage collector.

In principle, we can access the refcounts of a variable using `sys.getrefcount`:

```python
import sys

sys.getrefcount(1)
```
```
218
```

I expected that a newly created integer would have a `refcount` of 1. However, the actual number is much higher. [The explanation might involve optimizations happening under the hood.](https://stackoverflow.com/a/44096890) Accordingly, the refcount of more and more unique integers gets smaller:

```python
assert sys.refcount(2) < sys.getrefcount(123456)
```

## Other properties

On top of these three properties, objects have additional properties and methods that encode their state and behaviors. For instance, the `float` class has an additional property that stores the numerical value, as well as multiple methods that enable algebraic operations. A user-defined object will have an arbitrary number of attributes and methods.

Notably, the `None` object has no other properties. It is a singleton: only one such object exists:

```python
a = None
b = None

# same object, despite independent assignments
assert a is b
```

# Objects are first-class citizens

Objects are first-class citizens in Python. In other words, they can:

- Be assigned a name:

```python
def pretty_print(x: str):
    print(x.title() + ".")

pp = pretty_print
pp("hey there")
```

```
Hey there.
```

- Be passed as arguments:

```python
from typing import Callable

def format(x: str, formatter: Callable[[str], None]):
    formatter(x)

format("hey there", pretty_print)
```
```
Hey there.
```

- Be returned by other functions:

```python
def formatter_factory():
    return pretty_print

formatter_factory()("hey there")
```
```
Hey there.
```

# Mutability

Python has two kinds of data types, mutable and immutable, which respectively can and cannot be modified after being created. Mutable data types include lists, dictionaries and sets; immutable data types, integers, floats, booleans, strings and tuples. Let's see an example:

```python
# and (immutable) int(1) object is created
# both x and y point at it
x = y = 1

assert x is y

# we change the value of x. since integers are immutable,
# a new int(x + 1) is created to store that value, and 
# x is assigned that new reference
x += 1

# x and y don't refer to the same object anymore
assert x != y
assert x is not y
```

Let's compare this behaviour to that of a mutable object:

```python
# an list is created, and both x and y point at it
x = y = [1]

assert x is y

# we change the value of x. since lists are mutable,
# the original list gets altered
x.append(2)

# x and y still refer to the same object
assert x == y
assert x is y
```

Interestingly, and as we saw when examining the *refcount*, Python leverages this immutability:

```python
# two int(1) objects are created, each assigned a name
x = 1
y = 1

assert x is not y
```
```
AssertionError
```

In other words, 1 (and other common objects, like 0 or `True`) are singletons. That way, Python does not need to keep allocating memory for new objects that are used very often.

Mutability also has implications on memory allocation. Python knows at runtime how much memory an immutable data type requires. However, the memory requirements of mutable containers will change as we add and remove elements. Hence, to add new elements quickly if needed, Python allocates more memory than is strictly needed. 

## Copying an object

As mentioned above, `=` does not copy objects, only references. If we need to copy an object, we need to use the `copy` module. There are two kinds of copies:

- **Shallow copy:** `copy.copy` copies the object, but any reference it stores will just get copied, i.e., not the whole referenced object.
- **Deep copy:** `copy.deepcopy` recursively copies the object, all the objects it references to, and so on.

```python
from copy import copy

x = [1, 2, [3, 4]]
# copies the two first integers, but only 
# the reference to the 3rd element
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
# copies the two first integers as 
# well as the list
y = deepcopy(x)

x[2].append(5)
print(y[2])
```
```
[3, 4]
```

# Scopes and namespaces

A namespace is a mapping from names to objects. In fact, underlying a namespace there is a dictionary: its keys are symbolic names (e.g., `x`) and its values, the object they reference (e.g., an integer with a value of 8). During the execution of a typical Python program, multiple namespaces are created, each with its own lifetime. There are four types of namespaces:

- **Builtin** namespace: it is created when the interpreter starts up. It contain names such as `print`, `int` or `len`.
- **Global** namespaces:
    - *The* global namespace contains every name created at the main level of the program. This dictionary can be examined using `globals()`.
    - Weirdly, *other* global namespaces are possible: each imported module will create its own.
- **Local** namespaces: one is created every time a function is called, and is "forgotten" when it terminates. This dictionary can be examined using `locals()`.
- **Enclosed** namespaces: when a function calls another function, the child has access to its parent's namespace.

Namespaces are related to scopes, which are the parts of the code in which a specific set of namespaces can be accessed. When a Python needs to lookup a name, if resolves it by examining the namespaces using the LEGB rule: it starts at the Local namespace; if unsuccessful, it moves to the Enclosing namespace; then the Global, and lastly the Builtin. By default, assignments and deletions happen on the local namespace. However, this behaviour can be altered using the `nonlocal` and `global` statements:

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

Python allows us to define our own classes:

```python
class Animal:

    phylum = "metazoan"

    def __init__(self, name, weight):
        self.name = name
        self.weight = weight
        self.__favorite = True

    def eat(self):
        self.weight += 1
        print("chompchomp")
```

Below I zoom in on some interesting features.

## Private and protected attributes

In other languages, a class' attributes can be set as protected (only accessible within the class and subclasses) or as private (only accessible within the class). While you can always modify attributes from the outside in Python, the language emulates protected and private attributes by prepending one or two underscores respectively:

```python
whale = Animal("whale", 100000)
whale.__favorite # a private attribute
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
print(whale._Animal__favorite)
print(whale.__favorite)
```
```
True
False
```

## The two dictionaries underlying an object

Two dictionaries underlie each object, and are accessible using `instance.__dict__` and `Class.__dict__`. The first one is the instance-specific dictionary, unique to that instance and containing its writable attributes:

```python
whale = Animal("whale", 100000)

print(whale.__dict__)
```
```
{'name': 'whale', 'weight': 100000, '_Animal__favorite': True}
```

Note that private attributes like `__favorite` appear with an altered name of the form `_{class name}{attribute}`.

Similarly, each class has its own dictionary, containing the data and functions used by all instances (class' methods, the attributes defined at the class level, etc.):

```python
Animal.__dict__
```
```
mappingproxy({'__module__': '__main__', 'phylum': 'metazoan', '__init__': <function Animal.__init__ at 0x103236b90>, 'eat': <function Animal.eat at 0x103236c20>, '__dict__': <attribute '__dict__' of 'Animal' objects>, '__weakref__': <attribute '__weakref__' of 'Animal' objects>, '__doc__': None})
```

For instance, this is where the `Animal.eat()` method lives. This dictionary is shared by all the instances, which is why every non-static method requires the instance to be passed as the first argument. Under the hood, when we call an instance's method, Python finds the method in the class dictionary and passes the instance as first argument. But we can also do it explicitly:

```python
Animal.__dict__["eat"]()
```
```
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: Animal.eat() missing 1 required positional argument: 'self'
```

```python
Animal.__dict__["eat"](whale)
```
```
chompchomp
```

Both dictionaries are linked by `instance.__class__`, which is assigned to the class object:

```python
assert whale.__class__.__dict__ == Animal.__dict__
```

As we saw, an attribute might exist in either dictionary. To find an attribute at runtime, Python will first search `instance.__dict__`, and then `Class.__dict__` if unsuccessful.

## `__slots__` helps with memory optimization

The instance's dictionary keeps the class flexible, since we can add new attributes at any time:

```python
whale.medium = "water"
print(whale.__dict__)
```
```
{'name': 'whale', 'weight': 100000, '_Animal__favorite': True, 'medium': 'water'}
```

`__slots__` allows us to fix the possible attributes a priori, allowing Python to reserve the exact amoung of memory needed and to bypass the creation of the dictionary:

```python
class EfficientAnimal:

    __slots__ = ["name", "weight", "__favorite"]
    phylum = "metazoan"

    def __init__(self, name, weight):
        self.name = name
        self.weight = weight
        self.__favorite = True

dog = EfficientAnimal("dog", 10)
dog.__dict__
```
```
AttributeError: 'EfficientAnimal' object has no attribute '__dict__'. Did you mean: '__dir__'?
```

In addition to the memory optimizations, this approach also helps to prevent bugs caused by typos in variable names:

```python
dog.namme = "puppy"
```
```
AttributeError: 'EfficientAnimal' object has no attribute 'namme'
```

# Further reading

* D. Beazley, [Advanced Python Mastery](https://github.com/dabeaz-course/python-mastery)
* https://www.interviewbit.com/python-interview-questions/#freshers
* More on classes: <https://docs.python.org/3/tutorial/classes.html>
* More on `__slots__`: <https://wiki.python.org/moin/UsingSlots>
