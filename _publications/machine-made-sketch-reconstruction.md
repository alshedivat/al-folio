---
title: Reconstruction of Machine-Made Shapes from Bitmap Sketches
layout: paper

description: We fit geometric primitives into a bitmap sketch to form a 3D shape with sharp ridges and occlusion contours aligned with the drawing.
img: /assets/img/paper_mmsketch/nut_mini_min.jpg
teaser: /assets/img/paper_mmsketch/teaser_img.jpg
authors: Ivan Puhachov, Cedric Martens, Paul G. Kry, Mikhail Bessmeltsev
paper_info: SIGGRAPH Asia 2023
date: 2023-09-15

_styles: >
  .bbb {
    border: 1px solid white;
    border-radius: 3px;
    text-align: center;
    margin-bottom: 10px;
  }

#   .bbb:hover {
#     border: 1px solid black;
#   }
---
# Reconstruction of Machine-Made Shapes from Bitmap Sketches

[Ivan Puhachov](/)$$^{1,3}$$, [Cedric Martens](https://github.com/MartensCedric)$$^1$$, [Paul G. Kry](https://www.cs.mcgill.ca/~kry/)$$^{2,3}$$, [Mikhail Bessmeltsev](http://www-labs.iro.umontreal.ca/~bmpix/)$$^1$$

$$^1$$ Université de Montréal \\
$$^2$$ McGill University \\
$$^3$$ Huawei Technologies, Canada

**SIGGRPAPH Asia 2023**

<div class="row justify-content-center">
    <div class="col-sm mt-3 mt-md-0 mx-auto">
        <div class="bbb no-shadow">
            <i class="far fa-file-pdf"></i>
            <a href="http://www-labs.iro.umontreal.ca/~bmpix/pdf/cad_reconstruction.pdf"> PDF</a>
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <div class="bbb">
            <i class="far fa-file-pdf"></i>
            <a href="http://www-labs.iro.umontreal.ca/~bmpix/pdf/cad_reconstruction_suppl.zip">Supplementary</a>
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <div class="bbb">
            <i class="fas fa-quote-left"></i>
            <a href="#citation">BibTeX</a>
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <div class="bbb">
            <i class="fab fa-github"></i>
            <a href=""> Code (TBD) </a>
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <div class="bbb">
            <i class="fas fa-database"></i>
            <a href=""> Data (TBD) </a>
        </div>
    </div>
</div>
<div class="row">
    <img class="img-fluid rounded z-depth-1 tiny-shadow" src="{{ '/assets/img/paper_mmsketch/results_colors.png' | relative_url }}" alt="figure with rendered results" title="Fig 20: gallery of additional results" data-zoomable/>
</div>
<div class="caption">
    Given a bitmap sketch (a), we lift the sketch strokes into 3D by fitting 3D geometric primitives (b, stroke thickness indicates depth) and then create a 3D mesh interpolating these strokes and lying on the primitives while preserving the sketch shape (c). Reference sketch ©️ Eissen and Steur, 2011. 
</div>
<div class="row">
    <img class="img-fluid rounded z-depth-1 no-shadow " src="{{ '/assets/img/paper_mmsketch/teaser_img.jpg' | relative_url }}" alt="Teaser image" title="Teaser image" data-zoomable/>
</div>

***

#### Abstract
We propose a method of reconstructing 3D machine-made shapes from bitmap sketches by separating an input image into individual patches and jointly optimizing their geometry.

We rely on two main observations: \\
(1) human observers interpret sketches of man-made shapes as a collection of simple geometric primitives, and \\
(2) sketch strokes often indicate occlusion contours or sharp ridges between those primitives.

Using these main observations we design a system that takes a single bitmap image of a shape, estimates image depth and segmentation into primitives with neural networks, then fits primitives to the predicted depth while determining occlusion contours and aligning intersections with the input drawing via optimization.

Unlike previous work, our approach does not require additional input, annotation, or templates, and does not require retraining for a new category of man-made shapes. 
Our method produces triangular meshes that display sharp geometric features and are suitable for downstream applications, such as editing, rendering, and shading. 

<!-- <div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <iframe src="https://drive.google.com/file/d/1hrXmsBAb8A1s87whfefnJYw2rOszeyu7/preview" width="640" height="360" allow="autoplay"></iframe>
    </div>
</div> -->

***

##### Citation
```
@article{Puhachov2023ReconMMSketch,
    author = {Ivan Puhachov and Cedric Martens and Paul Kry and Mikhail Bessmeltsev},
    title = {Reconstruction of Machine-Made Shapes from Bitmap Sketches},
    journal = {ACM Transactions on Graphics (Proceedings of SIGGRAPH Asia)},
    volume = {42}, number = {6}, year = {2021}, month = dec,
    doi = {10.1145/3618361}
}
```

<!-- ***
#### Results
 * Original images: TBD
 * SVG: TBD
 * Supplementary material (comparisons): TBD

***
#### Code
 * TBD
 * MATLAB flow: TBD
 * Detector training: TBD

***
#### Datasets
To generate semi-synthetic dataset we used ["Quick, draw!"](https://github.com/googlecreativelab/quickdraw-dataset) and ["Creative Sketch Generation"](https://github.com/facebookresearch/DoodlerGAN) datasets. We thank the authors for collecting and releasing their data in vector format.

SVG files were rasterized using Adobe Illustrator with default artistic brushes.

* Semi-synthetic dataset: TBD
* Semi-synthetic fine-tuning dataset: TBD
* Small dataset of real drawings: TBD -->

***

<!-- <div class="row">
    <img class="img-fluid rounded z-depth-1 no-shadow " src="{{ '/assets/img/paper_vector/comparison_crops.png' | relative_url }}" alt="Comparison_crop" title="Comparison_crop" data-zoomable/>
</div>
<div class="caption">
    Traditional approaches [Noris et al. 2013] suffer from geometrical and topological artifacts around keypoints: junctions, sharp corners, and endpoints. Frame field--based approaches [Bessmeltsev and Solomon 2019; Stanko et al. 2020] resolve directional ambiguities around keypoints, but not their positions, leading to incorrect topology. Our approach addresses all of these challenges (right).
</div>

<div class="row">
    <img class="img-fluid rounded z-depth-1 no-shadow " src="{{ '/assets/img/paper_vector/topology_stages.png' | relative_url }}" alt="Topology stages" title="Topology stages" data-zoomable/>
</div>
<div class="caption">
    Having computed the keypoints (a), we extract the topology in a few steps. First, we map each keypoint to one or two <i>key vertices</i> (red circles) (b) and move them to the keypoint locations. We then find Steiner trees, one for each connected component of the graph, connecting those vertices (c). Note that in this example the graph has two connected components, disconnected at the T-junction ((c), red and blue). We then further extend the Steiner trees forming subgraphs covering the whole drawing (d). Finally, we convert these subgraphs into a set of paths between the key vertices, while keeping the coverage (e).
</div>

<div class="row">
    <img class="img-fluid rounded z-depth-1 no-shadow " src="{{ '/assets/img/paper_vector/comparison2.png' | relative_url }}" alt="Comparison" title="Comparison"/>
</div>
<div class="caption">
    Compared to the previous approaches based on frame fields, our method more robustly captures sharp corners and junctions. Input images `rabbit`, `donkey`, `dog` are from www.easy-drawings-and-sketches.com Ivan Huska.
</div>

<div class="row">
    <img class="img-fluid rounded z-depth-1 no-shadow " src="{{ '/assets/img/paper_vector/additional.png' | relative_url }}" alt="Additional results" title="Additional results"/>
</div>
<div class="caption">
    A gallery of additional results. Input images from www.easy-drawings-and-sketches.com Ivan Huska.
</div>

<div class="row">
    <img class="img-fluid rounded z-depth-1 no-shadow " src="{{ '/assets/img/paper_vector/ablation.png' | relative_url }}" alt="Ablation study" title="Ablation study" data-zoomable/>
</div>
<div class="caption">
    Ablation study: (a) disabling keypoint extraction (Sec. 3), using only the graph and coverage to infer endpoints and junctions; (b) disabling 'extracting final paths' optimization (Sec. 4.2); (c) disabling valence constraints (Sec. 4.2); (d) disabling Polyvector Flow (Sec. 5) leads to both incorrect topology and geometry; (e) Our result.
</div> -->
