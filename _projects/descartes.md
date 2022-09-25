---
layout: page
title: A 128-bit Feistel Cipher
project_page: true
description: Descartes
img: assets/img/Descartes_Cover.png
importance: 4
category: Class Projects
github: https://github.com/saikumarysk/Descartes
---

This project is part of my graduate applied cryptography course taught by Prof. Chester Rebeiro in Jan-May 2017 semester.
In this project, I wrote a new cipher called "Descartes," named after the French mathematician and philosopher René Descartes.
The cipher is a Feistel cipher that uses a 128-bit key and runs in 7 rounds.
The cipher also uses four different 16-by-4 strongly-linear compression s-boxes.
These s-boxes take 96-bit sub-key as input and do not obey the SAC property.
The cipher also utilizes a 96-by-64 diffusion layer.

<div class="row">
    <div class="col-sm mt-md-0">
        {% include figure.html path="assets/img/descartes_round.png" title="Feistel Round" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A single round in Descartes
</div>

Looking at the picture, each round in the encryption layer uses $$L_{i+1} = R_i$$ & $$R_{i+1} = L_i \oplus F(R_i, K_i)$$, whereas the decryption layer uses $$R_i = L_{i+1}$$ & $$L_i = R_{i+1} \oplus F(L_{i+1}, K_i)$$.
I implemented the cipher and checked the non-linearity of s-boxes by calculating its similarity with any affine transformations.
The linear approximations, differential approximations, and timing attack information are also present in the repo.

<div class='social'>
<div class="contact-icons">
  Source Code: <a href="{{ page.github }}" title="GitHub"><i class="fab fa-github"></i></a>
</div>
</div>
