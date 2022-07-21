---
layout: post
title: Render mesh with per-vertex color
date: 2022-07-19 11:12:00-0400
tags: blender
description: Suppose you want to render a mesh with per-vertex data (e.g. temperature). The simplest way to do so is to use "vertex color" property and plug it in the BSDF settings in Blender. Let me show you how.
---
Suppose you want to render a mesh with per-vertex data (e.g. temperature). The simplest way to do so is to use "vertex colr" property and plug it in the BSDF settings in Blender. Let me show you how.

> TLDR: you can download blender file: [color-homer.blend](/assets/img/blender/color-homer.blend)

<div class="row justify-content-sm-center">
    <div class="col-sm-8 ">
        <img class="img-fluid rounded" src="{{ '/assets/img/blender/homer-eigen.png' | relative_url }}" alt="" title="Homer mesh with its Laplacian eigenvector" data-zoomable/>
    </div>
</div>
<div class="caption">
    By the way, this is a visualization of mesh Laplacian eigenvector.
</div>

### 0. Setup
You have an `.obj` file and some numerical per-vertex data to visualize. 

In my case, I have a `homer.obj` mesh with 6002 vertices, and a numpy array of 6002 numbers: 
```
-0.01354811  0.01384337 -0.01091743 -0.00612948 -0.00262014 -0.01210054
  0.01073517  0.00721383 -0.00989255 -0.0104049 ...
```

I will convert them to colors right now with this python script:
```python
import numpy as np
import matplotlib

data = np.loadtxt("data.txt")
norm = matplotlib.colors.Normalize(vmin=np.min(data), vmax=np.max(data))
cmap = matplotlib.cm.get_cmap('coolwarm')
datacolors = cmap(norm(data))

np.savetxt("data_colors.txt", datacolors)
```

My `data_colors.txt` file is now: 
```
4.199907090352941186e-01 5.529885453176470733e-01 9.426303421882352707e-01 1.000000000000000000e+00
9.476541841529411148e-01 5.659764341686274181e-01 4.474781480392157063e-01 1.000000000000000000e+00
5.000305645176470470e-01 6.385084675764706175e-01 9.810701241058823463e-01 1.000000000000000000e+00
6.513978391568626680e-01 7.681214866470587044e-01 9.958911501294117619e-01 1.000000000000000000e+00
...
```

### 1. Importing mesh
`File` -> `Import` -> `Wavefront (.obj)`

> Important: opt-in for `Keep Vert Order` in `Geometry` import settings. Otherwise, Blender will reshuffle vertices for its convenience, and your data will not be visualized properly.


<div class="row justify-content-sm-center">
    <div class="col-sm-5">
        <img class="img-fluid rounded" src="{{ '/assets/img/blender/keep-vertex-order.png' | relative_url }}" alt="" title="Keep vertex order in import settings"/>
    </div>
</div>

### 2. Creating Vertex Colors
First, we need to create a vertex color property associated with this mesh. While having it selected, go to `Object Data Properties` -> `Vertex Colors` and create an empty layer (default name is `Col`).

<div class="row justify-content-sm-center">
    <div class="col-sm-5">
        <img class="img-fluid rounded" src="{{ '/assets/img/blender/homer-vertex-colors.png' | relative_url }}" alt="" title="Keep vertex order in import settings"/>
    </div>
</div>

In order for renderer to use this color, we need to add it to shader. Keep your mesh selected, go to `Shader Editor` (`Shift F3`) viewer and add a `Vertex Color` node (`Shift A` to add, then search). Make sure to connect its output to the BSDF node `Base Color`.

<div class="row justify-content-sm-center">
    <div class="col-md-9">
        <img class="img-fluid rounded" src="{{ '/assets/img/blender/homer-shader.png' | relative_url }}" alt="" title="Keep vertex order in import settings" data-zoomable/>
    </div>
</div>

### 3. Filling color values

Finally, run a script to set the values from `data_colors.txt` file to the mesh. Either in `Text Editor` (`Shift F11`) or in `Python Console` (`Shift F4`) run this:

```python
import bpy
from collections import defaultdict
import numpy as np

nppath = f"data_colors.txt"

datacolors = np.loadtxt(nppath)

obj = bpy.data.objects['homer']
col = obj.data.vertex_colors['Col']
polygons = obj.data.polygons

vertex_map = defaultdict(list)
for poly in polygons:
    for v_ix, l_ix in zip(poly.vertices, poly.loop_indices):
        vertex_map[v_ix].append(l_ix)

for v_ix, l_ixs in vertex_map.items():
    for l_ix in l_ixs:
        col.data[l_ix].color = eigencolors[v_ix]
```

#### Tip

You can view vertex colors in viewport shading by changing its color settings to `Vertex`:
<div class="row justify-content-sm-center">
    <div class="col-md-6">
        <img class="img-fluid rounded" src="{{ '/assets/img/blender/homer-viewport.png' | relative_url }}" alt="" title="Keep vertex order in import settings"/>
    </div>
</div>

### Bonus: animating vertex colors

To animate transitioning between two sets of vertex colors, create and fill corresponding properties. Then, in shader editor, add `Mix RGB` node and connect them.

<div class="row justify-content-sm-center">
    <div class="col-md-9">
        <img class="img-fluid rounded" src="{{ '/assets/img/blender/homer-color-mix.png' | relative_url }}" alt="" title="Keep vertex order in import settings" data-zoomable/>
    </div>
</div>

Now the mixing factor `Fac` can be animated with adding keyframes (right-click menu or `I`) for the animation frames. You might need to have a `Timeline` editor open to do that properly.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 ">
        <img class="img-fluid rounded" src="{{ '/assets/img/blender/2homereigen.gif' | relative_url }}" alt="" title="Homer mesh with its Laplacian eigenvector"/>
    </div>
</div>
<div class="caption">
    Sorry for the color flickering, GIF format has limited color depth.
</div>

```bash
# adding white color to transparent renderings
for f in homer_seq/*.png                                                  
convert $f -background white -alpha remove -alpha off 2$f
```

```bash
# composing into a gif, color filter to remove artifacts on the bounary
ffmpeg -f image2 -framerate 12 -i 2homer_seq/%04d.png -filter_complex "split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 homereigen.gif
```