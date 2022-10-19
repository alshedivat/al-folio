---
layout: post
title: "Setting up Docker on WSL2"
date: 2022-08-29 04:00:00
description: Quick tutorial to ease up using Docker on WSL without Docker Desktop
tags: WSL
---
- [1. A bit of context](#1-a-bit-of-context)
- [2. Setting up Docker on WSL2](#2-setting-up-docker-on-wsl2)
- [3. Bonus](#3-bonus)

# 1. A bit of context

So, it has been a journey to use a Windows 11 machine again and leave Linux behind (used mostly Ubuntu in my dev/machine learning experience). Although in the beginning, the Windows Subsystem for Linux (WSL) had many problems, today it is in a useable state (all the engineering team I work on uses Windows with WSL and we all develop in "Linux"). If you don't know the tool or maybe dismissed it in the past I advise you to give it a try, just go to the [Microsoft docs](https://docs.microsoft.com/en-us/windows/wsl/about). PS: Today you can even lunch Linux applications that have UI ([link](https://docs.microsoft.com/en-us/windows/wsl/tutorials/gui-apps)).

<div style="position:relative;padding-bottom:56.25%;">
    <iframe style="width:100%;height:100%;position:absolute;left:0px;top:0px;" width="100%" height="100%" src="https://www.youtube.com/embed/MrZolfGm8Zk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="text-align:center; margin-top:0.15cm;">
Video 1: A good intro to the capabilities of WSL2 with VSCode.
</p>

In the development world, using containers (see Video 2) is usually the go-to standard for delivering applications, not just that but when deploying and training machine learning models too as we can use container images to spin up Spark clusters (see Video 3) and Dask clusters (see Video 4). With that in mind, a famous engine used for containers is [Docker](https://www.docker.com/), which we can use to build and run container images and test our applications. With that in mind, for a development environment to work properly on WSL we need an engine, and we will be using Docker for it.

<div style="position:relative;padding-bottom:56.25%;">
    <iframe style="width:100%;height:100%;position:absolute;left:0px;top:0px;" width="100%" height="100%" src="https://www.youtube.com/embed/0qotVMX-J5s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="text-align:center; margin-top:0.15cm;">
    Video 2: Containerization Explained.
</p>

<div style="position:relative;padding-bottom:56.25%;">
    <iframe style="width:100%;height:100%;position:absolute;left:0px;top:0px;" width="100%" height="100%" src="https://www.youtube.com/embed/ymtq8yjmD9I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="text-align:center; margin-top:0.15cm;">
Video 3: A good intro to Spark.
</p>

<div style="position:relative;padding-bottom:56.25%;">
    <iframe style="width:100%;height:100%;position:absolute;left:0px;top:0px;" width="100%" height="100%" src="https://www.youtube.com/embed/nnndxbr_Xq4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="text-align:center; margin-top:0.15cm;">
Video 4: A good intro to Dask.
</p>


# 2. Setting up Docker on WSL2

If you can/plan to use [Docker Desktop](https://www.docker.com/products/docker-desktop/) on Windows to manage your containers, it is pretty straightforward, just follow this [tutorial](https://docs.docker.com/desktop/windows/wsl/). But, be aware that Docker Desktop is changing its [license agreement](https://docs.docker.com/subscription/#docker-desktop-license-agreement) and you become paid for large organizations, although the docker engine will remain free.

So, if you want to remain using docker for free you can install the Docker engine and Docker compose as you would in a Linux machine (links below).

[How to install Docker Engine/CLI](https://docs.docker.com/engine/install/)

[How To install docker-compose](https://docs.docker.com/compose/install/)



The problem of WSL will appear while trying to run a docker image. You would get an error like that:

```bash
$ docker run hello-world 
docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?. See 'docker run --help'.
```

For docker to properly work on WSL you will need to start the service with:
```bash
$ sudo service docker start
```

Then docker should work fine. But it would suck for every time WSL restarts you need to run the sudo command. What can you do?
You can update the `/etc/wsl.conf` file on your Linux distribution to run the boring command at startup. As an example:

```conf
# /etc/wsl.conf
[boot]
command="service docker start"
```

That's it! Docker will be ready to run every time you start WSL.

# 3. Bonus

You can add more commands to start services at WSL startup, as an example, you could add cron:

```conf
# /etc/wsl.conf
[boot]
command="service docker start; service cron start"
```

For more configuration options go to [Microsoft's doc page](https://docs.microsoft.com/en-us/windows/wsl/wsl-config).