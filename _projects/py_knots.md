---
layout: page
title: py_knots
description: Knot algorithms in Python, 2022.
img: assets/img/py_knots.png
importance: 1
category: undergraduate
---

Re-implemented the generalized Seifert matrix algorithm from my summer research in Python, upon discovering several bottlenecks coming from the scarcity of good Scala libraries. 

[Link](https://github.com/Chinmaya-Kausik/py_knots) to the Github Repository.

**Positives:** Getting back to Python after so many years was fun! The wealth of libraries was extremely convenient, especially matplotlib and linear algebra libraries. Had a much better experience this time, now that I rigorously organize my programming habits and code. My code was also able to conveniently accommodate optimizations added in later, because of the way I had organized it. Finally switched to Linux on one of my laptops. Using Tkinter with grid-based layout arrangement was not the most fun, but it worked out.

**Negatives:** Sympy. The Bareiss determinant algorithm has trouble with large matrices since sympy's division of multivariable polynomials is not very efficient. Will implement the Bareiss determinant in C using the FLINT library's extremely fast multivariable polynomial division and then use ctypes to import it to Python.

**Technical takeaways:** Python refresher. Objected oriented GUI design. More experience with Tkinter, sympy, numpy and matplotlib. PEP8-aligned Python code formatting. Good programming practices. More features for OOP in Python, like the @dataclass decorator. 

**Meta takeaways:** A reminder that often, starting from scratch (Python) is much better than wading through vastly inefficient setups created by sunk costs (Scala). Much like my experience with solving math problems, it can be good to take an exploratory leap of faith with confidence. If things still aren't working out, it can help to increase your exploration time for a given idea, which takes courage. The benefits of exploring start outweighing the benefits of exploiting your current comfort zone, the longer you stay in the latter without fruit.

