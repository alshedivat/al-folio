---
layout: post
title: Python best IDE - RStudio
date: 2023-05-23 11:12:00-0400
description:
header-includes:
   - \usepackage{amsmath}
tags: python programming
categories: python
---

Python is a great programming language. However, it can definitely be a challenge to set up. Fortunately, RStudio is a great integrated development environment (IDE) that makes it easier to work with Python. RStudio is simple, stable, and user-friendly, and additionally offers the ability to easily switch between Python and R. 

And RStudio is FREE!

Here are some helpful tips for getting started (with iOS).

------------------------------------------------------------------------------------------

Two important `R` packages to have installed for Python to work in RStudio are [reticulate](https://rstudio.github.io/reticulate/index.html) and `devtools`.

    library(reticulate)
    library(devtools)
    
With `reticulate` you will have access to many useful functions, starting with `py_` (e.g. `py_version()`, `py_func()`, ...)

You can check the Python version(s) you have installed in your computer within RStudio by running

    system("python3.8 --version")
    system("python3.9 --version")
    
You can switch between Python versions easily in RStudio by typing (inside RStudio)

    use_python("/usr/local/bin/python3.9")
    use_python("/usr/local/bin/python3.10")
    
------------------------------------------------------------------------------------------

Linking the installed libraries to the correct Python version can be very painful in Python.

With the `R` command `py_install` you can easily install and track the libraries you have installed with RStudio
  
For example

    py_install("pandas")

------------------------------------------------------------------------------------------

You can check which Python libraries are installed in RStudio with 

    py_list_packages(
      envname = NULL,
      type = c("auto"),
      python = NULL
    )

------------------------------------------------------------------------------------------

### Pip3

If you're like me and frequently find yourself stuck with multiple Python versions, it's likely that the libraries you're using don't match up with your local Python environment. Trying to determine the version of each Python library can be time consuming and frustrating. (At some point, we have to learn to use virtual environments!)

In your terminal, you can install python libraries with `pip3`. One useful thing to know is that you can install libraries corresponding to the Pythons versions with

    pip3.8 install panda
    pip3.9 install panda

Check which libraries are install with `Pip3.9 list`    

Check out the Python path with `which pip3.9`. 

------------------------------------------------------------------------------------------

### Test

Let's make a test by installing the library called `rottentomatoes-python` ([link](https://pypi.org/project/rottentomatoes-python/)). 

I am working with Python versions 3.9

First, with `pip` in my [terminal](https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac), I would install the library with 

    pip3.9 install rottentomatoes-python

Then in RStudio, I would make sure that I am using this Python version

    library(reticulate)
    library(devtools)
    use_python("/usr/local/bin/python3.9")
    
In RStudio, open a `python` script. File -> New File -> Python Script

Then you should be able to use the newly installed library.
  
    import rottentomatoes as rt
    print(rt.tomatometer("happy gilmore"))  
    print(rt.actors('top gun maverick', max_actors=5))

------------------------------------------------------------------------------------------

Hope this works!
