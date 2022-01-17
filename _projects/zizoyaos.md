---
layout: page
title: ZiZoyaOS
description: 32-Bit Operating System
img: assets/img/proj_zizoyaos.jpg
importance: 2
category: 2020
---

:mag: NASM Assembly，C
- Developed a bootloader that reads disk sectors, switches the operating system into 32-bit protected mode, loads the kernel, and initializes the GDT using NASM Assembly.
- Implemented a kernel using C, which has the following functionalities and components: IDT, ISR, IRQ initialization, ports communication, CPU interrupts handler for capturing, processing and giving feedback,
display driver, keyboard driver(allows key combinations).
- Designed a command-line interface and some functionalities, which include a calculator allowing simple
operations.
- TODOs: File system, more drivers, GUI...

ZiZoyaOS runs on QEMU virtual machine/(qemu-system-i386)emulator:
{% include figure.html path="assets/img/proj_zizoyaos_qemu.jpg" title="example image" class="img-fluid rounded z-depth-1" %}

ZiZoyaOS runs on real PC(Old SONY VAIO):
{% include figure.html path="assets/img/proj_zizoyaos_sony.jpg" title="example image" class="img-fluid rounded z-depth-1" %}