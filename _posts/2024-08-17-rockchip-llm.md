---
layout: post
title: LLM (Large Language-Models) on Rockchip
date: 2024-08-17 13:00:00+0800
description: a journey of running LLM on Rockchip Device (Orange pi 5 - RK3588)
tags: llm rockchip
categories: Rockchip
giscus_comments: false
related_posts: true
---

{% include video.liquid path="assets/video/livellm_qwen2_1.5b.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}

<span style="font-size:8vw"> LLM </span>  | Large Language-Model, a very familiar topic nowadays that throws community into frenzy due to its potential in smart assistant, AGI etc. However, despite the hype, the harware requirements are also HUGE, to say the least. Simply, we could say goodbye to below 500 USD GPU if we want to run higher LLM specs (> 13B LLM model). 

Luckily, smaller LLM models are also available albeits on the lesser accuracy sides. In this post, I am trying to port a recent small LLM from Huggingface that achieves SOTA accuracy, called [Qwen2_1.5B](https://huggingface.co/Qwen/Qwen2-1.5B-Instruct), to the cheapest RK3588 device to test whether below 100 USD devices are still capable ebough to run smaller LLMs locally, which it is!

So, in this post, I would like to share the happy LLM experiment on the edge device, which also thanks to the [helpful recommendation](https://github.com/Pelochus/ezrknn-llm/issues/13#issuecomment-2285851663).

{% include figure.liquid path="assets/img/rkcomparison.png" class="img-fluid rounded z-depth-1" zoomable=true %}

<div class="caption">
    Orange Pi 5 Comparison with Rock 5B, Raspberry Pi 4, and Raspberry Pi 5.
</div>

In this test, I am using Orange Pi 5 4GB, a 75 USD (2400 NTD) edge device that has 6 TOPS with RK3588 Rockchip [that blows other edge devices](https://youtu.be/nBtOEmUqASQ?t=595) such as my old Jetson Nano 2G (50 USD) and  4G (100 USD), Raspberry Pi 4, and Raspberry Pi 5 with its chipset. I have tested this device last year, albeit with conversion output issues on other models other than their predefined working models that finally gets much better with the recent version. 

Back to the LLM topic, to run Qwen2_1.5B on Orange Pi 5, there are 2 steps in different devices which need to be done:

*  Step 1. LLM Model Convertion (AMD64 Device)
  1. Install Python3.8.
  2. Download  the RKLLM Repository
  3. Install RKLLM and Necessary Packages.
  4. Download desired LLM from Huggingface.
  5. Export Pytorch LLM to RKLLM model.
* Step 2. Edge Inference (RK3588 Orange Pi 5)
  1. Build RKLLM-Runtime packages and Resources.
  2. Execute the LLM model.

# Step 1. LLM Model Convertion (AMD64 Device)
---

## Install Python3.8.

Note that the only reason for me to use Python3.8 is that it is the only supported Python version by RKLLM. However, don't fret, we don't need to do similar thing to the edge device since Python3.8 is only required to convert LLM, not to run it on edge device. There are several ways to install Python3.8, but the easiest and safest way is to use built-in package that is registered by the device. In Orange Pi 5, we can run:

```bash
sudo snap install python38
```

## Download the RKLLM Repository

In this test, I use ezrknn-llm from [Pelochus](https://github.com/Pelochus/ezrknn-llm), and also a shout out to [the helpful recommendation](https://github.com/Pelochus/ezrknn-llm/issues/13#issuecomment-2285851663) on the usable LLM model on my resource constrained device. You can clone the repository below

```bash
git clone https://github.com/Pelochus/ezrknn-llm.git
```

## Install RKLLM and Necessary Packages

Because installing Python3.8 using snap, the package is going to be in read-only mode. Hence, we can tackle the issue by installing it in other directory as the following:

```bash
python38 -m pip install rkllm-toolkit/packages/rkllm_toolkit-1.0.1-cp38-cp38-linux_x86_64.whl -t "local_pkg"
```

## Download desired LLM from Huggingface

To download the LLM, you can simplify clone it by the following way:

```
git clone https://huggingface.co/Qwen/Qwen2-1.5B-Instruct
```
> ##### REMINDER
>
> After cloning, you still need to install required packages of Huggingface
{: .block-warning }


## Export Pytorch LLM to RKLLM model

You can create a file in the folder with your local_pkg packages and your cloned LLM model, paste the code below, and run it ([ref code here](https://github.com/airockchip/rknn-llm/blob/main/rkllm-toolkit/examples/huggingface/test.py))

```python
import sys
# add your local packages to the path, so that it could be imported in the code
sys.path.append("local_pkg")
from rkllm.api import RKLLM


llm_folder_path = "Qwen2-1.5B-Instruct"

modelpath = '/path/to/your/model'
llm = RKLLM()

# Load model
ret = llm.load_huggingface(model = llm_folder_path)
if ret != 0:
    print('Load model failed!')
    exit(ret)

# Build model
ret = llm.build(do_quantization=True, optimization_level=1, quantized_dtype='w8a8', target_platform='rk3588')
if ret != 0:
    print('Build model failed!')
    exit(ret)

# Export rknn model
ret = llm.export_rkllm("./qwen.rkllm")
if ret != 0:
    print('Export model failed!')
    exit(ret)

```

And then run the code

```bash
# Format -> python38 [YOUR_SCRIPT_NAME].py 
python38 test.py
```


> After getting the RKLLM model, 
> don't forget to copy it to the edge device.

# Step 2. Edge Inference (RK3588 Orange Pi 5)
---

## Build RKLLM-Runtime packages and Resources

Re-clone the RKLLM repo, and run the script in the install.sh

```bash
git clone https://github.com/Pelochus/ezrknn-llm.git
cd ezrknn-llm
sudo bash install.sh
```

## Execute the LLM model

Final step, let's start our LLM, and you should see similar prompt as in the beginning video, have a nice chat!
```
# format -> rkllm [YOUR_LLM_NAME].rkllm
rkllm qwen.rkllm
```

> ##### Congratulations!
>
> We have successfully run the LLM 
> with quite a reasonable speed.
{: .block-tip }
