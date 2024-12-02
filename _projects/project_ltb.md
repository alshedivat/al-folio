---
layout: page
title: ltb
description:
img: assets/img/poster/project_ltb.png
importance: 2
category: work
related_publications: false
---

Project Title: CURENT Large-scale Testbed

Date: 2015 – Now

Affiliation: University of Tennessee, Knoxville

Advisors: Fangxing Fran Li, Kevin Tomsovic

|                           | ANDES                                                                                                                                                                                                                                                    | AMS                                                                                                                                                                                                                      | AGVis                                                                                                                                                                                                                         | DiME                                                                                                                                                                                                                   |
|--------------------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|              Codacy Grade | [ ![Grade-ANDES]( https://api.codacy.com/project/badge/Grade/17b8e8531af343a7a4351879c0e6b5da ) ]( https://app.codacy.com/app/cuihantao/andes?utm_source=github.com&utm_medium=referral&utm_content=cuihantao/andes&utm_campaign=Badge_Grade_Dashboard ) | [![Grade-AMS]( https://app.codacy.com/project/badge/Grade/69456da1b8634f2f984bd769e35f0050 ) ]( https://app.codacy.com/gh/CURENT/ams/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade ) | [ ![Grade-AGVis]( https://app.codacy.com/project/badge/Grade/8fbf0bc95f784af09c3dc5ce36b20a04 ) ]( https://app.codacy.com/gh/CURENT/agvis/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade ) | [ ![Grade-DiME](https://app.codacy.com/project/badge/Grade/a43bcec26c544c7e82355d01571020d6)](https://app.codacy.com/gh/CURENT/dime/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade) |
|            Conda Download | [![Conda ANDES](https://anaconda.org/conda-forge/andes/badges/version.svg)](https://anaconda.org/conda-forge/andes)| [![Anaconda-Server Badge](https://anaconda.org/conda-forge/ltbams/badges/version.svg)](https://anaconda.org/conda-forge/ltbams) |                                                                                                                                                                                                                               |                                                                                                                                                                                                                        |
|             PyPI Download | [![PyPI-ANDES](https://img.shields.io/pypi/v/andes)](https://pypi.org/project/andes/)                                                                                                                                                                    | [![PyPI-AMS](https://img.shields.io/pypi/v/ltbams)](https://pypi.org/project/ltbams/)                                                                                                                                    | [![PyPI-AGVis](https://img.shields.io/pypi/v/agvis)](https://pypi.org/project/agvis/)                                                                                                                                         |                                                                                                                                                                                                                        |
| Documentation | [ ![Doc-ANDES]( https://readthedocs.org/projects/andes/badge/?version=latest ) ]( https://andes.readthedocs.io/en/latest/?badge=latest )                                                                                                                 | [ ![Doc-AMS]( https://readthedocs.org/projects/ams/badge/?version=latest ) ]( https://ltb.readthedocs.io/projects/ams/en/latest/?badge=latest )                                                                          | [ ![Doc AGVis]( https://readthedocs.org/projects/agvis/badge/?version=latest ) ]( https://ltb.readthedocs.io/projects/agvis/en/latest/?badge=latest )                                                                        | [ ![Doc-DiME]( https://readthedocs.org/projects/ltbdime/badge/?version=latest ) ]( https://ltb.readthedocs.io/projects/dime/en/latest/?badge=latest )                                                                  |
|             GitHub Action | [ ![GA-ANDES]( https://github.com/curent/andes/workflows/Python%20application/badge.svg ) ]( https://github.com/curent/andes/actions )                                                                                                                   | [ ![GA-AMS]( https://github.com/CURENT/ams/workflows/Python%20application/badge.svg ) ]( https://github.com/curent/ams/actions )                                                                                         |                                                                                                                                                                                                                               |                                                                                                                                                                                                                        |

The [CURENT Large-scale Testbed (LTB)][LTB] is an advanced research facility designed for experimenting with power systems.
It consists of four main parts:
[ANDES][ANDES] for dynamic simulations,
[AMS][AMS] for economic dispatch and market simulations,
[AGVis][AGVis] for visualizing the grid,
and [DiME][DiME] for messaging.

Jinning has been coordinating LTB development since 2021.
His contributions include assisting Dr. Hantao Cui with ANDES maintenance and model development and helping Nick West and Nicholas Parsly with DiME and AGVis development.
Starting in spring 2023, Jinning started the development of AMS, a package for economic dispatch and market simulations.
AMS can work alongside ANDES, enabling co-simulation of economic dispatch and dynamic simulations, making it a versatile tool for comprehensive prototyping and validation in power systems.

More details can be found in the project homepage [LTB][LTB Web].

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/poster/poster_ltb_2023.jpg" title="poster" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

[LTB Web]: https://ltb.curent.org
[LTB]: https://github.com/CURENT
[ANDES]: https://github.com/CURENT/andes
[AMS]: https://github.com/CURENT/ams
[AGVis]: https://github.com/CURENT/agvis
[DiME]: https://github.com/CURENT/dime
