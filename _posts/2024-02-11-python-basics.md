---
layout: post
title: Advanced Python 0 - The Basics
date: 2024-02-11 11:59:00-0000
description: Revisiting Python's properties
tags: comments
categories: python coding
giscus_comments: true
related_posts: false
toc:
    sidebar: left
---

# Basic properties and concepts

## Python is dynamically typed

A language is statically typed when variables have types, i.e., the type of the variables are checked before execution (usually at compilation). In contrast, in dynamycally typed languages variable names don't have types, runtime values (objects) do, i.e., the variable types are checked during execution.

## (C)Python is interpreted

It is often said that whether a language is compiled or interpreted is an "implementation detail". That is, we should separate Python, the programming language itself, from its specific implementation (like [CPython](https://github.com/python/cpython), [IronPython](https://ironpython.net/) or [PyPy](https://www.pypy.org/)). Nonetheless, the most popular implementations, indeed, behave like interpreters. More specifically, they execute code in two steps:

1. "Compile" the source code into a Python-specific lower level code (`*.pyc`, stored in `__pycahce__`), called "bytecode".
1. Execution by the Python Virtual Machine. Essentially, an infinite evaluation loop containing a switch over all possible bytecode instructions.

Note that the "compilation" step is quite different from what it would involve for a so-called compiled language, like C or C++. For the latter, we would end up with an independent executable. Furthermore, CPython's puts emphasis in quickly executing the code. Hence, it spends little time in optimizing the executable. On the other hand, compilation in C/C++ can take a significant amount of time, as these optimizations take place.

## Python types

The Python interpreter comes with some predefined types:

- Numeric Types (`int`, `float`, `complex`)
- Boolean Type (`bool`)
- Iterator Types
- Sequence Types (`list`, `tuple`, `range`)
- Text Sequence Type (`str`)
- Binary Sequence Types (`bytes`, `bytearray`, `memoryview`)
- Set Types (`set`, `frozenset`)
- Mapping Types (`dict`)
- Context Manager Types
- Type Annotation Types (`Generic Alias`, `Union`)
- Other Built-in Types (modules, classes, `None` and others)

## Mutability

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

Interestingly, and as we saw when [examining the *refcount*](../python-objects#refcount), Python leverages this immutability:

```python
# two int(1) objects are created, each assigned a name
x = 1
y = 1

assert x is not y
```
```
AssertionError
```

In other words, 1 (and other common objects, like 0 or `True`) are singletons. That way, Python does not need to keep allocating memory for new objects that are used very often. This does not happen for more unique immutable objects:

```python
x = 8457
y = 8457

assert x is not y
```

Mutability also has implications on [memory allocation](#memory-management-in-python). Python knows at runtime how much memory an immutable data type requires. However, the memory requirements of mutable containers will change as we add and remove elements. Hence, to add new elements quickly if needed, Python allocates more memory than is strictly needed.

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
  
# Memory management in Python

In CPython, all the objects live in a *private* [heap](../hardware#memory-allocation). Memory management is handled exclusively by the Python memory manager. In other words, and in contrast to languages like C, the user has no way directly to manipulate items in memory. The Python heap is further subdivided into *arenas* to reduce data fragmentation.

When an object is created, the memory manager allocates some memory for it in the heap, and its reference is stored in the relevant namespace. 

Conversely, the garbage collector is an algorithm that deallocates objects when they are no longer needed. The main mechanism uses the [reference count](../python-objects#refcount) of the object: when it falls to 0, its memory is deallocated. However, the garbage collector also watches for objects that still have a non-zero refcount, but have become inaccessible, for instance:

```python
# create a list - refcount = 1
x = []

# add a reference to itself - refcount = 2
x.append(x)

# delete the original reference - refcount = 1
del x
```

# The infamous Global Interpreter Lock (GIL)

GIL is a mechanism to make CPython's thread safe, by only allows one thread to execute Python bytecode at a time. This vastly simplifies CPython's implementation and writing extensions for it, since thread safety is not a concern. It also leads to faster single-thread applications. However, CPU-bound tasks cannot be sped up by multithreading, since nonetheless the threads will run sequentially, never in parallel. However, it can be used to speed up I/O-bound operations.

When parallel processing is needed, Python can still do that via:

1. Multiprocessing, i.e., launching multiple Python processes, each with their own interpreter, memory, and GIL.
1. Developing a C extension, which gives us lower-level access to threading.

# The Python import system

A Python module is simply a file containing Python functions, classes, constants and runnable code. When we want to use them, we need to *import* the module using the `import` statement. For instance:

```python
import numpy as np
```

It imports [this file](https://github.com/numpy/numpy/blob/main/numpy/__init__.py) from your installed NumPy package as a module object and assigns its reference name `np`.

There are multiple things that Python recognizes as modules:

1. Built-in modules: written in C, and part of the Python executable.
1. Frozen modules: written in Python, and part of the Python executable.
1. C extensions: written in C, but loaded dynamically into the Python executable.
1. Python source code and bytecode files
1. Directories

TO EXPAND


# TODO

- Pickling
- Scope resolution

# Further reading

- [StackOverflow: If Python is interpreted, what are .pyc files?](https://stackoverflow.com/questions/2998215/if-python-is-interpreted-what-are-pyc-files)
- [Python behind the scenes #11: how the Python import system works](https://tenthousandmeters.com/blog/python-behind-the-scenes-11-how-the-python-import-system-works/)
- [Python behind the scenes #13: the GIL and its effects on Python multithreading](https://tenthousandmeters.com/blog/python-behind-the-scenes-13-the-gil-and-its-effects-on-python-multithreading/)