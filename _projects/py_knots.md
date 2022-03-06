---
layout: page
title: py_knots
description: Knot algorithms in Python.
img: assets/img/py_knots.png
importance: 1
category: computer-assisted mathematics
---

Re-implemented the generalized Seifert matrix algorithm from my summer research in Python, upon discovering several bottlenecks coming from the scarcity of good Scala libraries. The GUI is being refined. 

**Positives:** Getting back to Python after so many years was fun! The wealth of libraries was extremely convenient, especially matplotlib and linear algebra libraries.

**Negatives:** Sympy. The Bareiss determinant algorithm has trouble with large matrices since sympy's division of multivariable polynomials is not very efficient. Will implement the Bareiss determinant in C using the FLINT library's extremely fast multivariable polynomial division and then use ctypes to import it to Python.

**Technical takeaways:** Python refresher. PEP8-aligned Python code formatting. Objected oriented GUI design. Experience with Tkinter and matplotlib. 

**Meta takeaways:** A reminder that often, starting from scratch (Python) is much better than wading through vastly inefficient setups created by sunk costs (Scala). Much like my experience with solving math problems, it can be good to take an exploratory leap of faith with confidence. If things still aren't working out, it can help to increase your exploration time for a given idea, which takes courage. The benefits of exploring start outweighing the benefits of exploiting your current comfort zone, the longer you stay in the latter without fruit. 

[Link](https://github.com/Chinmaya-Kausik/py_knots) to the Github Repository.

More details to come soon. 
