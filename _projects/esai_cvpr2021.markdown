---
layout: page
title: E-SAI
description: Event-based Synthetic Aperture Imaging
img: /assets/img/esai_proj/in-recon-03.gif
importance: 1
category: Principal investigator
---
<style>
.styled_img{
          border:1px solid rgba(0,0,0,1);
          width: 128px;
          height: 128px;
        }
</style>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-0" src="{{ '/assets/img/esai_proj/pipeline.png' | relative_url }}" alt="" title="Pipeline of E-SAI"/>
    </div>
</div>



# Abstract

Synthetic aperture imaging (SAI) is able to achieve the see through effect by blurring out the off-focus foreground occlusions and reconstructing the in-focus occluded targets from multi-view images. However, very dense occlusions and extreme lighting conditions may bring significant disturbances to the SAI based on conventional frame-based cameras, leading to performance degeneration. To address these problems, we propose a novel SAI system based on the event camera which can produce asynchronous events with extremely low latency and high dynamic range. Thus, it can eliminate the interference of dense occlusions by measuring with almost continuous views, and simultaneously tackle the over/under exposure problems. To reconstruct the occluded targets, we propose a hybrid encoder-decoder network composed of spiking neural networks (SNNs) and convolutional neural networks (CNNs). In the hybrid network, the spatio-temporal information of the collected events is first encoded by SNN layers, and then transformed to the visual image of the occluded targets by a style-transfer CNN decoder. Through experiments, the proposed method shows remarkable performance in dealing with very dense occlusions and extreme lighting conditions, and high quality visual images can be reconstructed using pure event data. 

Related works have been published in {% cite zhang2021 %}.



<div class="row justify-content-sm-center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/a81xBe2ZX_8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<!-- ![](/assets/img/esai_proj/pipeline.png) -->

# Results
Here are the results on our event-based SAI dataset including indoor scenes, outdoor scenes and extreme lighting scenes, and we show the reconstruction process as the number of input events increases. The dataset will be released soon.  

## Indoor Scenes
<div class="row">
<table align="left" border="0" width="750" style="padding-left: 20px;padding-right: 20px;">
      <tbody><tr> 
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-gt-04.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-occ-04.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-recon-04.gif"></td>
        <td width="120" align="center"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-gt-05.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-occ-05.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-recon-05.gif"></td>
      </tr>
      <!-- <TR> 
        <TD width="150" align="center" class="caption_p">Reference</TD>
        <TD width="150" align="center" class="caption_p">Occluded view</TD>
        <TD width="150" align="center" class="caption_p">Reconstruction</TD>
        <TD width="120" align="center" class="caption_p">  </TD>
        <TD width="150" align="center" class="caption_p">Reference</TD>
        <TD width="150" align="center" class="caption_p">Occluded view</TD>
        <TD width="150" align="center" class="caption_p">Reconstruction</TD>
      </TR> -->
    </tbody></table>

<table align="left" border="0" width="750" style="padding-left: 50px;padding-right: 50px;">
      <tbody><tr> 
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-gt-01.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-occ-01.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-recon-01.gif"></td>
        <td width="120" align="center"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-gt-02.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-occ-02.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-recon-02.gif"></td>
      </tr>
      <!-- <TR> 
        <TD width="150" align="center" class="caption_p">Reference</TD>
        <TD width="150" align="center" class="caption_p">Occluded view</TD>
        <TD width="150" align="center" class="caption_p">Reconstruction</TD>
        <TD width="120" align="center" class="caption_p">  </TD>
        <TD width="150" align="center" class="caption_p">Reference</TD>
        <TD width="150" align="center" class="caption_p">Occluded view</TD>
        <TD width="150" align="center" class="caption_p">Reconstruction</TD>
      </TR> -->
    </tbody></table>

<table align="left" border="0" width="750" style="padding-left: 50px;padding-right: 50px;">
      <tbody><tr> 
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-gt-06.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-occ-06.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-recon-06.gif"></td>
        <td width="120" align="center"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-gt-03.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-occ-03.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/in-recon-03.gif"></td>
      </tr>
      <tr> 
        <td width="150" align="center" class="caption_p">Reference</td>
        <td width="150" align="center" class="caption_p">Occluded view</td>
        <td width="150" align="center" class="caption_p">Reconstruction</td>
        <td width="120" align="center" class="caption_p">  </td>
        <td width="150" align="center" class="caption_p">Reference</td>
        <td width="150" align="center" class="caption_p">Occluded view</td>
        <td width="150" align="center" class="caption_p">Reconstruction</td>
      </tr>
    </tbody></table>

<p class="empty_line"> &nbsp;</p>
<h3 align="center" class="subtitle_h3"> Outdoor Scenes </h3>
<table align="left" border="0" width="750" style="padding-left: 50px;padding-right: 50px;">
      <tbody><tr> 
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-gt-01.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-occ-01.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-recon-01.gif"></td>
        <td width="120" align="center"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-gt-02.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-occ-02.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-recon-02.gif"></td>
      </tr>
      <!-- <TR> 
        <TD width="150" align="center" class="caption_p">Reference</TD>
        <TD width="150" align="center" class="caption_p">Occluded view</TD>
        <TD width="150" align="center" class="caption_p">Reconstruction</TD>
        <TD width="120" align="center" class="caption_p">  </TD>
        <TD width="150" align="center" class="caption_p">Reference</TD>
        <TD width="150" align="center" class="caption_p">Occluded view</TD>
        <TD width="150" align="center" class="caption_p">Reconstruction</TD>
      </TR> -->
    </tbody></table>
<table align="left" border="0" width="750" style="padding-left: 50px;padding-right: 50px;">
      <tbody><tr> 
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-gt-03.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-occ-03.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-recon-03.gif"></td>
        <td width="120" align="center"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-gt-05.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-occ-05.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-recon-05.gif"></td>
      </tr>
      <!-- <TR> 
        <TD width="150" align="center" class="caption_p">Reference</TD>
        <TD width="150" align="center" class="caption_p">Occluded view</TD>
        <TD width="150" align="center" class="caption_p">Reconstruction</TD>
        <TD width="120" align="center" class="caption_p">  </TD>
        <TD width="150" align="center" class="caption_p">Reference</TD>
        <TD width="150" align="center" class="caption_p">Occluded view</TD>
        <TD width="150" align="center" class="caption_p">Reconstruction</TD>
      </TR> -->
    </tbody></table>
<table align="left" border="0" width="750" style="padding-left: 50px;padding-right: 50px;">
      <tbody><tr> 
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-gt-04.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-occ-04.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-recon-04.gif"></td>
        <td width="120" align="center"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-gt-06.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-occ-06.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/out-recon-06.gif"></td>
      </tr>
      <tr> 
        <td width="150" align="center" class="caption_p">Reference</td>
        <td width="150" align="center" class="caption_p">Occluded view</td>
        <td width="150" align="center" class="caption_p">Reconstruction</td>
        <td width="120" align="center" class="caption_p">  </td>
        <td width="150" align="center" class="caption_p">Reference</td>
        <td width="150" align="center" class="caption_p">Occluded view</td>
        <td width="150" align="center" class="caption_p">Reconstruction</td>
      </tr>
    </tbody></table>



<h3 class="subtitle_h3">Extreme Lighting Scenes </h3>
<table align="left" border="0" width="750" style="padding-left: 50px;padding-right: 50px;">
      <tbody><tr> 
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/ex-gt-01.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/ex-occ-01.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/ex-recon-01.gif"></td>
        <td width="120" align="center"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/ex-gt-02.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/ex-occ-02.png"></td>
        <td width="150" align="center"><img class="styled_img" src="/assets/img/esai_proj/ex-recon-02.gif"></td>
      </tr>
      <tr> 
        <td width="150" align="center" class="caption_p">Reference</td>
        <td width="150" align="center" class="caption_p">Occluded view</td>
        <td width="150" align="center" class="caption_p">Reconstruction</td>
        <td width="120" align="center" class="caption_p">  </td>
        <td width="150" align="center" class="caption_p">Reference</td>
        <td width="150" align="center" class="caption_p">Occluded view</td>
        <td width="150" align="center" class="caption_p">Reconstruction</td>
      </tr>
    </tbody></table>
</div>




<!-- <div class="row"> -->
<!-- <h2 class="styled_h2"> Citation </h2> -->

<!-- # Citation -->

<div class="publications">
      <h2>Related Publications</h2>
      {% bibliography --style ieee --cited %}
</div>
<!-- 
```bibtex
 @inproceedings{zhang2021event,
    title={Event-based Synthetic Aperture Imaging with a Hybrid Network},
    author={Zhang, Xiang and Liao, Wei and Yu, Lei and Yang, Wen and Xia, Gui-Song},
    year={2021},
    booktitle={CVPR},
    }
```     -->
<!-- </div> -->

<!-- Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
Make your photos 1/3, 2/3, or full width.

To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="styled_img rounded z-depth-1" src="{{ '/assets/img/1.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="styled_img rounded z-depth-1" src="{{ '/assets/img/3.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="styled_img rounded z-depth-1" src="{{ '/assets/img/5.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="styled_img rounded z-depth-1" src="{{ '/assets/img/5.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, *bled* for your project, and then... you reveal it's glory in the next row of images.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <img class="styled_img rounded z-depth-1" src="{{ '/assets/img/6.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        <img class="styled_img rounded z-depth-1" src="{{ '/assets/img/11.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>


The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/" target="_blank">Bootstrap Grid</a> system).
To make images responsive, add `styled_img` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

```html
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <img class="styled_img rounded z-depth-1" src="{{ '/assets/img/6.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        <img class="styled_img rounded z-depth-1" src="{{ '/assets/img/11.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
``` -->
