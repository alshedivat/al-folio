---
layout: post
title: Adobe ExtendScript
date: 2022-10-12 13:20:00-0400
tags: code
description: Running scripts for ADobe Illustrator
---

So Adobe offers a possibility to write scripts for their products: [Extendscript docs](https://extendscript.docsforadobe.dev/introduction/extendscript-overview.html)

I used it for my project on sketch vectorization, to get a large dataset of drawings. The idea is to take simple drawings in vector format and render (rasterize) them with artistic brushes from Adobe Illustrator.

<div class="row justify-content-sm-center">
    <div class="col-sm-4">
        <img class="img-fluid rounded centered" src="https://raw.githubusercontent.com/ivanpuhachov/line-drawing-vectorization-polyvector-flow-dataset/main/png/test_50_8.png" alt="" title="" data-zoomable/>
    </div>
</div>

They even offer a debug environment, although it's quite old: [ExtendScript Toolkit](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ExtendScript-Toolkit)

> Warning: Illustrator gives no respect to `svg` files. I ended up adding invisible frame (with width 0 and transparent color) to know the exact dimensions of svg file to center it properly in script itself.

Last year I was generating that data by manually clicking "run" once every 500 images. Awful decision.

Now I'm old and wise, I wrote a ~~bash~~ batch script to do it for me. Was it nice? No.

To run your script from shell command use `"path_to_toolkit.exe" -run "path_to_script.jsx"`
```batch
"C:\Adobe ExtendScript Toolkit CC\ExtendScript Toolkit.exe" -run "C:\style.jsx"
```

<div class="row justify-content-sm-center">
    <div class="col-sm-4">
        <img class="img-fluid rounded" src="{{ '/assets/img/adobe_toolkit_complains.png' | relative_url }}" alt="" title="" data-zoomable/>
    </div>
</div>
<div class="caption">
    You should only run scripts from a trusted source.
</div>

Now in order to prevent Illustrator asking "You sure you want to run it?" you need to place your script in a *trusted* directory.

Just move ".jsx" file with script to `Documents/Adobe Scripts`. So reliable, so trustworthy, have fun with paths. 

Finally, batch script. Long story short:
```batch
@echo off
for /L %%n in (1,1,10) do (
    echo %%n
    START /WAIT "" "C:\Adobe ExtendScript Toolkit CC\ExtendScript Toolkit.exe" -run "C:\Users\ivanp\Documents\Adobe Scripts\stylize.jsx"""
    timeout 120
)
```
* `START /WAIT ""` required so that this command at least waits until Illustrator is opening before running to the next line 
* `timeout 120` waits for 120 seconds before contunuing loop. Why 120? Manual measure. Batch scripts are wild.


Maybe in a year I will become even wiser and find a better solution.
