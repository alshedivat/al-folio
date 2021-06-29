---
layout:     post
title:      Minimal LLVM lit configuration
date:       2018-10-16 08:00
summary:    Quick setup of testing infrastructure for LLVM projects.
categories: c++, llvm
tags:       [c++, llvm, testing, cmake]
---

LLVM has an integrated testing support which includes tools such as test runner [lit](https://llvm.org/docs/CommandGuide/lit.html) or automatic verifier of output [FileCheck](https://llvm.org/docs/CommandGuide/FileCheck.html). It's the easiest way to ensure correctness of an analysis or transformation pass where each unit and regression is implemented in the LLVM IR format and annotated with the expected output. Although documentation describes quite extensively parameters of command line tools, they lack general examples and it is definitely not easy to figure out a starting configuration for lit. [The only example](https://github.com/llvm-mirror/llvm/tree/4604874612fa292ab4c49f96aedefdf8be1ff27e/utils/lit/examples/many-tests) in the repository is quite non-standard and specific. It seems that the best way to start is simply to look at existing LLVM projects and copy their solutions. The very same approach was already advised to people asking about lit configuration on [the mailing list](http://lists.llvm.org/pipermail/llvm-dev/2016-January/094037.html). Since larger projects usually have complex configurations supporting multiple features, it takes several tries to obtain a minimum setup for an automatic test.

In this post, I'm going to describe a minimal lit configuration which assumes distinct source and build directories. This is very suitable for build systems and it can be immediately integrated with CMake.

We start with the main `lit.cfg` script, assuming the simpler case where both tests and config file are located somewhere in the main project directory. The first few lines of script are rather self-explanatory. We define the config name, the set of suffixes of test files, `test_format` field specifies how tests should be executed and ShTest is a format where one file is used per test case. Later we define the most important field: `test_source_root` that is used to locate test files. This works very well if the config file is in the same directory. Otherwise, one would need to define source root differently and use the `test_exec_root` to specify where tests should be executed. The `lib_dir` variable is a non-necessary helper variable containing the location of built shared library with LLVM pass.

```python

import lit.util
import lit.formats

config.name = 'my-pass'
config.suffixes = ['.ll']
config.test_format = lit.formats.ShTest(True)
config.test_source_root = os.path.dirname(__file__)
config.lib_dir = build_dir

config.substitutions.append( ('%loadpass', '-load '
    + config.lib_dir
        + '/libname.so')
            )
```


To apply passes on an IR file and test the output of an analysis or transformation, each file needs to start with a definition of how it should be executed. Here the `%loadpass` substitution is used to load the developed pass and `%s` is a standard substitution for the test file name. Other standard substitution are described in [docs](https://llvm.org/docs/TestingGuide.html#substitutions).

```
; RUN: opt %loadpass -my-pass \
; RUN: -my-pass-option \
; RUN: < %s | FileCheck %s

```

Each test file contains instructions on how to verify the correctness of the output. That's why the last part of `RUN` instruction redirects the output to the `FileCheck` program. In the example below, we test a simple pass which prints basic block information. We check that output contains the size of the block and the very next line in the output contains the number of successors.

```llvm

; CHECK-LABEL: size: 2
; CHECK-NEXT: successors: 0

merge:
    %final = add i8 %c5, %c2
    ret void
```

This works very well for in-source builds. For an out-of-source build the only missing piece is a build directory defined in the `config.lib_dir` variable. This can be easily generalized with CMake to always point to the tests subdirectory for a given build. For that purpose, the original config file is treated as an input template for CMake configuration. Pre-defined symbols are replaced and a new instance of the template is placed in the build directory.


```python
# Path to test suite directory
config.test_source_root = os.path.join('@CMAKE_CURRENT_SOURCE_DIR@', 'tests')
# Path to test suite in build directory where tests are executed
config.test_exec_root = os.path.join('@CMAKE_CURRENT_BINARY_DIR@', 'tests')
# Help variable used to locate compiled library
config.lib_dir = '@CMAKE_CURRENT_BINARY_DIR@'
```

The last modification is to add the following line to the `CMakeLists.txt` file.

```
configure_file(tests/lit.cfg.in tests/lit.cfg @ONLY)
```

This configuration allows for a quick set-up of testing in LLVM-based projects on Linux. Obviously, supporting other platforms would require slight modifications. For example, the shared library file extension `.so` is hardcoded in the file.
