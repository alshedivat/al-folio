---
layout: post
title: Cobb-Douglas Utility Function with R Optimization
date: 2023-05-18 11:12:00-0400
description:
header-includes:
   - \usepackage{amsmath}
tags: r programming
categories: r
---

In this post, let's see how we can use R optimization function `optim` to calculate the Utility maximization from a Cobb-Douglas utility function.

The Cobb-Douglas utility function takes the following general form

$$U(x,y) = x^a \cdot y^b$$

------------------------------------------------------------------------------------------

Our budget constraint ($$m$$) for two goods ($$x$$ and $$y$$) is defined by the price of $$x$$ ($$p_{x}$$) multiplied by the quantity of $$x$$, plus the price of $$y$$ ($$p_{y}$$) multiplied by the quantity of $$y$$

$$m = p_{x} \cdot x + p_{y} \cdot y$$

We solve for $$y$$ with

$$y = \left(  m - p_{x} \cdot x \right) \frac{1}{p_{y}} $$

------------------------------------------------------------------------------------------

We can define the **objective function** we want to maximize in `R` with 

    # objective function
    # par = x
    
    f = function(par = 1, m = 100, a = 0.5, b = 0.5, px = 1, py = 1){
      y = (m - (px * par))/py # solve for y
      U = (par^a) * (y^b) # cobb-douglas utility function
      return(U)
    }

We simply have to input the quantity of $$x$$ and set the $$a$$ and $$b$$ values of the Cobb-Douglas function. 

For example, if we feed $$x = 1$$, we get a Utility of $$39$$

    # x = 1
    # U is 39 #
    f(par = 1, m = 100, px = 1, py = 1, a = 0.2, b = 0.8)


------------------------------------------------------------------------------------------

Now we can use the optimizer `optim` with this objective function.

The `optim` is searching for the $$x$$ value (`par`) that maximizes Utility. ($$y$$ is calculated automatically given our budget constraint).

    optim(par = c(1), # starting value #
     fn = f, # the objective function we created above
      a = 0.2, # Cobb-Douglas alpha value
      b = 0.8, # Cobb-Douglas beta value
      lower = 1, # lower bound for search
      upper = 100, # upper bound for search #
      method = "L-BFGS-B",
      control = list(fnscale = -1)) # maximize instead of minimize
      
    # optim$par

The result from `optim$par` tell us that $$20$$ is the optimal value for $$x$$. 

------------------------------------------------------------------------------------------

Let's input our function the `optim$par` result.

    out = optim(par = c(1), # starting value #
      fn = f,
      a = 0.2,
      b = 0.8,
      lower = 1, # lower bound for search
      upper = 100, # upper bound for search #
      method = "L-BFGS-B",
      control = list(fnscale = -1)) # maximize instead of minimize

    # optimal x value
    out$par # 20

    # input of optim into our objective function f()
    f(par = out$par, m = 100, px = 1, py = 1, a = 0.2, b = 0.8)
    
The maximum Utility for this budget constraint is $$60$$.

------------------------------------------------------------------------------------------

We can verify with the package `microecon` the result, see the link for the package [https://github.com/giacomovagni/microecon](https://github.com/giacomovagni/microecon).

    library(tidyverse)
    library(ggthemes)
    library(microecon)


    library(microecon)
    cobbs_douglas_utility(I = 100, a = 0.2, b = 0.8, px = 1, py = 1)

------------------------------------------------------------------------------------------

