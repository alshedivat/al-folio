---
layout: single
comments: true
title: ['Container']
date: 2023-01-28 00:00:00-0000
categories: ['Cloud']
---


#### Linux Process
* Fundamental unit of work on Linux System
* Created by `clone(2)` System call
    * `fork(2)` is a wrapper of `clone(2)`
* Have own ID, address space, stack, heap, file descriptiors ...
* Arrenged in hierarchy, PID 1 is the root ("init" -typically systemd)
* `ps` shows table of processes
* `pstree` shows the tree
