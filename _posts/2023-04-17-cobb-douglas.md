---
layout: post
title: Interactive Cobb-Douglas Utility Function
date: 2023-04-16 11:12:00-0400
description:
header-includes:
   - \usepackage{amsmath}
tags: r programming
categories: r
---

The Cobb-Douglas utility function is a commonly used functional form to model consumer behavior.

The Cobb-Douglas utility function takes the general form

$$U(x,y) = x^a \cdot y^b$$

Through the ShinyApp provided below, users can interactively explore two Cobb-Douglas utility functions for two goods, namely *x* and *y*. The blue line depicts the first budget and utility function, while the red line represents the second budget and utility function.

By utilizing the **budget** widget, users can set the first budget constraint. The second widget, **budget (new)**, enables the selection of the second budget. Additionally, users can manipulate the prices of both goods, *x* and *y*, through the **Price X** and **Price Y** functions.

The **alpha** and **beta** widgets, let you play with the $$a$$ and $$b$$ of the utility function ($$x^a \cdot y^b$$).

The table below the Figure gives you the optimal choice given the Budget. 

You can find the ShinyApp here:
[https://giacomovagni.shinyapps.io/cobbs_douglas/](https://giacomovagni.shinyapps.io/cobbs_douglas/)

--------------------------------------------------------------------------------

<iframe height="1000" width="150%" frameborder="no" src="https://giacomovagni.shinyapps.io/cobbs_douglas/"> </iframe>

--------------------------------------------------------------------------------

For more information about the Cobb-Douglas function see **Hal R. Varian** "Intermediate Microeconomics, A Modern Approach Eighth Edition"
