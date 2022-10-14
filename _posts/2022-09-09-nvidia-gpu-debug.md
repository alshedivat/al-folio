---
layout: post
title: Debugging Ubuntu / NVidia / CUDA / PyTorch relations 
date: 2022-09-09 13:20:00-0400
tags: code cuda
description: My notes on debugging GPU-related issues
---
Personal story: got a weird issue right in the middle of the training: `Unable to determine the device handle for GPU 0000:01:00.0:Unknow Error`. Never happened to me before, had been training successfully for few month on this machine, long training sessions. Even worse, the process `python training.py` got stuck, unresponsive to `kill`, while GPU fans are ramping full-speed and stuck.

Here are my notes on resolving these issues.

## PyTorch
Since recently (?), PyTorch comes with its own cuda libs. Unless you compile custom layers, you don't need to have local cuda or cudnn. **GPU drivers** are required still.

```bash
conda install pytorch torchvision torchaudio cudatoolkit=11.3 -c pytorch
```

Source: 
> **ptrblck**: *binaries ship with their own libraries and will not use your locally installed CUDA toolkit unless you build PyTorch from source or a custom CUDA extension*
> [discuss.pytorch.org](https://discuss.pytorch.org/t/is-it-required-to-set-up-cuda-on-pc-before-installing-cuda-enabled-pytorch/60181/27)

Handy info from PyTorch:
```python
print(torch.__version__)
print(torch.version.cuda)
print(torch.backends.cudnn.version())
print(torch.cuda.get_device_name(0))
print(torch.cuda.get_device_properties(0))
```

## Drivers
There are plenty of instruction on driver installation. Basically, you have 3 options:

1. Install drivers with Ubuntu software update (by far the easiest way, available in 20.04)
2. Install with `sudo ubuntu-drivers autoinstall` or `sudo apt install nvidia-driver-440`
3. Download and install with CUDA runfile (they come with driver now)

It is recommended to get rid of installed drivers with `purge`, however my runfile (I chose option 3) still complained that it found something previously installed.


Handy commands:
 * `ubuntu-drivers devices` shows device specs and available drivers

### Note on nvidia-smi
`nvidia-smi` (stands for [System Management Interface](https://developer.nvidia.com/nvidia-system-management-interface)) reports "Driver Version" and "CUDA Version" even if no cuda is installed. It is simply a cuda version that the driver supports. Source: [nvidia dev support](https://forums.developer.nvidia.com/t/nvidia-smi-doesnt-show-cuda-version-even-after-installation/68738)

 * [Useful nvidia-smi queries](https://enterprise-support.nvidia.com/s/article/Useful-nvidia-smi-Queries-2)
 * `sudo nvidia-smi --gpu-reset` to reset gpu memory from [pytorch forum](https://discuss.pytorch.org/t/when-i-shut-down-the-pytorch-program-by-kill-i-encountered-the-problem-with-the-gpu/6315/2)

## CUDA
After installing, add to `.bashrc`:
```bash
export PATH="/usr/local/cuda-11.6/bin:$PATH"
export LD_LIBRARY_PATH="/usr/local/cuda-11.6/lib64:$LD_LIBRARY_PATH"
```

## My issue
I'll jump right to the solution: it's either overheating or lack of power. Similar issue was discussed on [developer forum](https://forums.developer.nvidia.com/t/gpu-fans-go-to-max-and-graphics-drivers-hang/222069)

* `dmesg` to read system reports
* `sudo nvidia-bug-report.sh` to get full report. decompress file and enjoy.

> **generix**: `Jul 27 16:39:09 emano kernel: NVRM: Xid (PCI:0000:1a:00): 79, pid=1370, GPU has fallen off the bus.` ([docs](https://docs.nvidia.com/deploy/xid-errors/index.html#topic_4)) One of the gpus is shutting down. Since it’s not always the same one, I guess they’re not damaged but either overheating or lack of power occurs. Please monitor temperatures, check PSU, try limiting clocks using nvidia-smi -lgc.

### Solution
I limited both power consumption and clock speed and (I hope) it works now. Hope to find the exact problem and solve it (more cooling or better power unit).

* `nvidia-smi -lgc 1500` to set clockspeed (note[^bignote])
* `sudo nvidia-smi -pl 200` to limit power consumption to 200 w
* `nvidia-smi -q -d CLOCK` to check clock speed 

> Note that those limits are not permanent and will be reset after reboot.

### Also

 * [Fan maxed out because two other are stuck](https://forums.developer.nvidia.com/t/fans-are-locked-to-max-speed-very-noisy-please-help/140158)
 * some reported issues between motherboard and gpus (pcie lanes for multi-gpu setup) [https://forums.developer.nvidia.com/t/unable-to-determine-the-device-handle-for-gpu-000000-0-gpu-is-lost-reboot-the-system-to-recover-this-gpu/176891/6]
 * more discussion on error `XID 79` dev forum [1](https://forums.developer.nvidia.com/t/unable-to-determine-the-device-handle-for-gpu/171155/14) [2](https://forums.developer.nvidia.com/t/unable-to-determine-the-device-handle-for-gpu-000000-0-unknown-error/205143) [3](https://forums.developer.nvidia.com/t/unable-to-determine-the-device-handle-for-gpu-gpu-is-lost/57641/11)

[^bignote]: reports that [nvidia removed support of clock limits for commercial cards](https://forums.developer.nvidia.com/t/fans-are-locked-to-max-speed-very-noisy-please-help/140158)