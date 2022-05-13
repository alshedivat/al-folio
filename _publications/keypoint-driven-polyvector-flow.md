---
title: Keypoint-Driven Line Drawing Vectorization via PolyVector Flow
layout: paper

description: We vectorize line drawings by detecting stroke keypoints, then inferring correct connectivity between them via optimization and, finally, resolving stroke shape with novel polyvector flow.
img: /assets/img/paper_vector/mini-min.png
teaser: /assets/img/paper_vector/teaser-min.png
authors: Ivan Puhachov, William Neveu, Edward Chien, Mikhail Bessmeltsev
paper_info: SIGGRAPH Asia 2021

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
# Keypoint-Driven Line Drawing Vectorization via PolyVector Flow

[Ivan Puhachov](/)$$^1$$, [William Neveu](https://wwwnev.github.io/)$$^1$$, [Edward Chien](https://cs-people.bu.edu/edchien/)$$^2$$, [Mikhail Bessmeltsev](http://www-labs.iro.umontreal.ca/~bmpix/)$$^1$$

$$^1$$ Université de Montréal \\
$$^2$$ Boston University

**SIGGRPAPH Asia 2021**

<div class="row justify-content-center">
    <div class="col-sm mt-3 mt-md-0 mx-auto">
        <div class="bbb no-shadow">
            <i class="far fa-file-pdf"></i>
            <a href="http://www-labs.iro.umontreal.ca/~bmpix/pdf/polyvector_flow.pdf"> PDF</a>
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <div class="bbb">
            <i class="far fa-file-pdf"></i>
            <a href="https://drive.google.com/file/d/1UlV73XXFZWpBlQz2VEowgZZN-qC15dzH/view?usp=sharing">Supplementary (105MB) </a>
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
            <a href="https://github.com/ivanpuhachov/line-drawing-vectorization-polyvector-flow"> Code </a>
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <div class="bbb">
            <i class="fas fa-database"></i>
            <a href="https://github.com/ivanpuhachov/line-drawing-vectorization-polyvector-flow-dataset"> Data </a>
        </div>
    </div>
</div>
<div class="row">
    <img class="img-fluid rounded z-depth-1 tiny-shadow" src="{{ '/assets/img/paper_vector/dog.png' | relative_url }}" alt="dog image" title="dog image" data-zoomable/>
</div>
<div class="caption">
    Given a greyscale bitmap drawing, we use deep learning--based machinery to extract keypoints: junctions, curve endpoints, and sharp corners. We then compute a frame field aligned to the drawing and extract the drawing topology finding curves connecting the keypoints. Finally, we use our novel PolyVector flow that aligns those curves to the frame field, robustly disambiguating directions around keypoints. Input image is from www.easy-drawings-and-sketches.com (c) Ivan Huska.
</div>
<div class="row">
    <img class="img-fluid rounded z-depth-1 no-shadow " src="{{ '/assets/img/paper_vector/teaser-min.png' | relative_url }}" alt="Teaser image" title="Teaser image" data-zoomable/>
</div>

***

#### Abstract
Line drawing vectorization is a daily task in graphic design, computer animation, and engineering, necessary to convert raster images to a set of curves for editing and geometry processing. Despite recent progress in the area, automatic vectorization tools often produce spurious branches or incorrect connectivity around curve junctions; or smooth out sharp corners. These issues detract from the use of such vectorization tools, both from an aesthetic viewpoint and for feasibility of downstream applications (e.g., automatic coloring or inbetweening). We address these problems by introducing a novel line drawing vectorization algorithm that splits the task into three components: (1) finding keypoints, i.e., curve endpoints, junctions, and sharp corners; (2) extracting drawing topology, i.e., finding connections between keypoints; and (3) computing the geometry of those connections. We compute the optimal geometry of the connecting curves via a novel geometric flow --- *PolyVector Flow* --- that aligns the curves to the drawing, disambiguating directions around Y-, X-, and T-junctions. We show that our system robustly infers both the geometry and topology of detailed complex drawings. We validate our system both quantitatively and qualitatively, demonstrating that our method visually outperforms previous work.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1 no-shadow" src="{{ '/assets/img/paper_vector/pipeline.png' | relative_url }}" alt="pipeline" title="pipeline" data-zoomable/>
    </div>
</div>
***

##### Citation
```
@article{Puhachov2021KeypointPolyvector,
    author = {Ivan Puhachov and William Neveu and Edward Chien and Mikhail Bessmeltsev},
    title = {Keypoint-Driven Line Drawing Vectorization via PolyVector Flow},
    journal = {ACM Transactions on Graphics (Proceedings of SIGGRAPH Asia)},
    volume = {40}, number = {6}, year = {2021}, month = dec,
    doi = {10.1145/3478513.3480529}
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
