---
layout:     post
title:      Relative paths in LaTeX.
date:       2021-07-19 08:00
summary:    A short but useful tip for relative inclusions.
categories: tips
tags:       [latex]
---

Recently, I started to gather the LaTeX tools, scripts, and useful imports in a single
repository: [latex-tools @ GitHub.com](https://github.com/mcopik/latex-tools).
I designed it to have a single entry point `includes.tex`, and for each paper, I could add this
repository as a submodule.

But how should I include such a file in a LaTeX document? One option is to use `include`, but it mustn't
be used in preambles which disqualifies it from handling package imports.
Instead, we can use `input` that works similarly to the C/C++ `#include`, doing a simple copy&paste.
It does not simplify the build and development, as `include` does by splitting `.tex` files
into different compilation units, which is great for books and theses with many chapters.
However, you can use `input` with almost all parts of the document and you are allowed to use
nested inputs.

There's one caveat, though: `input` does not support relative imports.
So, for example, if we have the following directory structure, we won't be able to
use `\usepackage{dependency}` in `includes.tex`:

```
+-- paper.tex
+-- latex-tools
|   +-- dependency.sty
|   +-- includes.tex
```

The paths in `input` are always relative to the main file. Thus, we end up with an error:

```
! LaTeX Error: File `dependency.sty' not found.
```

Fortunately, there's an [`import`](https://www.ctan.org/pkg/import) package to the rescue!
The last `/` in directory name is important, otherwise the path is not correctly processed.

```latex
\usepackage{import}
\subimport{latex-tools/}{includes.tex}
```

Thus, we can easily decompose LaTeX sources, tables, and graphics into a hierarchy of modules.

