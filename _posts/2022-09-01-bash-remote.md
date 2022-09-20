---
layout:     post
title:      Remote Bash scripts with SSH
date:       2022-09-01 08:00
summary:    Executing Bash scripts with arguments on a remote node.
categories: linux
tags:       [linux, cli, tips]
---

What is the easiest way of executing a Bash script on remote machines, with support for arbitrary
options and arguments, without having to transmit the code manually? 
Let's say we have a script to invoke that we want to run on a remote machine - in our case, it's
the part of [rFaaS](#/projects/rfaas) that scans network interfaces and RDMA links to generate a device database.

```shell
~ tools/device_generator.sh -d wlp61s0 -o devices.json
```

We want to execute this command on many endpoints in parallel since they will be used to host
rFaaS executors.
While this is trivial in a supercomputer where all nodes can read the script from a shared parallel
filesystem, it is not so simple in the cloud, where virtual machines might not have common storage.
Fortunately, we don't have to copy the code manually - we can feed bash standard input with the script contents:

```shell
~ ssh $node bash < tools/device_generator.sh
```

But what if we want to pass positional arguments? That's why we need the `-s` flag:

```shell
~ ssh $node bash -s $ARG < tools/device_generator.sh
```

But what if we want to support options in our script?
We can't put them here since bash will interpret it as its own option.
So instead, we need a double dash (`--`) to mark the end of bash options
and the start of positional arguments:

```shell
~ ssh $node bash -s -- -d wlp61s0 $ARG < tools/device_generator.sh > $node.json
```

This command can be easily combined with forked processes running in the background, scaling
the query to dozens and even hundreds of machines in parallel.

And what if we are in a supercomputer? Then we do not need such tricks at all.
For example, if we have already allocated a bunch of nodes with SLURM's command `salloc`, then we just need
to use:

```shell
~ srun /bin/bash -c 'tools/device_generator.sh > $(hostname -s).json'
```

Using single quotes prevents variable expansion on the host side. Thus, we will obtain one file
for each node in the allocation.

