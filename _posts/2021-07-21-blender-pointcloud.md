---
layout: post
title: Naive pointcoud visualization in Blender
date: 2021-07-21 11:12:00-0400
description: Piece of code to load a pointcloud data in Blender
tags: blender
---

There is a point cloud vidualizer for Blender - [uhlik/bpy](https://github.com/uhlik/bpy). You can follow along with this short youtube tutorial.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/eXct_7k779Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

However, I received errors when tring to render the pointcloud in Blender-2.91. Apparently, only paid version from blendermarket [is supported](https://github.com/uhlik/bpy/issues/47). 

***
## Roundabout

Dirty way to render a pointcloud - use a Python script to place spheres. Simply run a script (`Shift-F11`), then the spheres can be rendered as usual. 

![](/assets/img/bunnypoints.png)

> Warning: it is slow. Let me know what goes wrong here and how to improve it.

### Code

```python
import bpy
import bmesh
import mathutils
import numpy as np
import sys

mymesh = bpy.data.meshes.new('PointCloud')
myobj  = bpy.data.objects.new('PointCloud', mymesh)
bpy.context.collection.objects.link(myobj)
bpy.context.view_layer.objects.active = myobj

filepath = "/folder/bunny_pointcloud.txt" # path to your data file. 
scale = 25 # scaling the point cloud


with open(filepath, "r") as f:
    data = np.loadtxt(f)

print(data.shape)

bm = bmesh.new()

# this cycle will take time, progress is reported in the console
for i in range(data.shape[0]):
    point = data[i,:3]
    mat = mathutils.Matrix.Translation(point*scale) # setting the translation matrix
    # creating a sphere in the origin, moving it by translation matrix
    mesh = bmesh.ops.create_uvsphere(bm, u_segments=12, v_segments=12,
                    diameter=0.04, matrix=mat ) 
    # progress console output
    msg = f"point {i} of {data.shape[0]-1}"
    sys.stdout.write(msg + chr(8) * len(msg))
    sys.stdout.flush()

bm.to_mesh(mymesh)
bm.free()

sys.stdout.write("DONE" + " "*len(msg)+"\n")
sys.stdout.flush()
```

### Input
Input is similar to the usual `ply` or `obj` format, except that we only leave vertices locations. For example:

```
-0.0369122 0.127512 0.00276757 0.850855 0.5 
-0.0457707 0.130327 0.00306785 0.900159 0.5 
-0.0708847 0.149834 0.0388672 0.398443 0.5 
-0.00331557 0.130403 0.0212208 0.85268 0.5 
...

```