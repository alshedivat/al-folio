---
layout:     post
title:      Between fglrx and AMDGU&#58; AMD devices on Linux
date:       2016-11-02 8:00
summary:    Driver hell on Linux
categories: opencl gpu linux
tags:       [amd, gpu, linux, rocm, opencl]
---

GPU drivers, whether they have been designed by NVIDIA or AMD, have always been a nightmare on Linux and users have been forced to use badly performing opensource drivers or propietary drivers which could easily crash due to dependencies, different kernel versions or bugs.
It seems that at least AMD wants to change this sorry state, by introducing a new, unified and mostly open-source Linux driver stack known as [AMDGPU.](http://andrew.technology/amd-unified-linux-driver-amdgpu/) Although this change is definitely very exciting and I hope that RadeonOpenCompute is going to improve current situation with GPGPU on Linux, it won't really happen until 2017. So what is the situation now?

If you have an older AMD GPU, a pre-GCN (Graphics Core Next), you are stuck with deprecated fglrx. It simply won't compile with a newer kernel. Fortunately, long time supports OS can give you lifetime till at least 2019, for example Ubuntu 14.04 LTS. This Ubuntu version is quite important here because we are stuck with our server on this Ubuntu 14.04.4 because currently it is the only Debian-based distro supported by ROCm, support for 16.04 is *experimental*. Our experience so far suggests that even stable release may generate a lot of problems and that's why I want to avoid any possible upgrades.

I have had a lot of fun with Radeon Open Compute and one of results of my internship at the [STE\|\|AR Group](http://stellar.cct.lsu.edu/) were many opened issues regarding compiler [hcc](https://github.com/RadeonOpenCompute/hcc). [One of them](https://github.com/RadeonOpenCompute/hcc/issues/99) stopped further progress but I could make use of our GPUs for OpenCL development until it's fixed. [OpenCL support won't come to ROCm before December](https://github.com/RadeonOpenCompute/ROCm/issues/31) which forced me to switch kernels and use traditional GPU driver.

Here starts the fun part! With Ubuntu 14.04.4 running on 4.4.x kernel, fgrlx is already gone. AMDGPU can be found in repository but it seems to not provide OpenCL support for device; simply device can't be located by AMD APP. But we still have AMDGPU-PRO, right? Even driver download on AMD webpage, for our R9 Nano running Ubuntu 14.04.4, forwards to this driver... which has only download version for 16.04! And it is simply not a typo. The driver package depends on libvdpau1 in version >= 1.1 which [can't be satisfied in this release](http://packages.ubuntu.com/trusty-updates/libvdpau1). Polluting distribution with packages from next release usually ends with a dependency hell and a disaster during upgrade. And judging by Internet discussions, I can only join other confused and disappointed users.

Fortunately there is a hero [who patched the old driver](https://community.amd.com/thread/202821) and obtained a compatibility with newer kernels. To be honest, I didn't expect any luck with this driver but it works! So far, so good, OpenCL applications don't crash and I can continue my work, meanwhile hopefully waiting for a stable release of ROCm supporting OpenCL. 

Once again, open source saves the day.

*Edit at 21th January, 2016*: according to documentation from [ComputeCpp Community Edition 0.1.2](https://www.codeplay.com/products/computesuite/computecpp/), AMDPGPU-PRO comes with no support for OpenCL SPIR 1.2. It is a significant regression when compared to fglrx. My SYCL code runs fine with the previous driver on Fiji GPUs.
