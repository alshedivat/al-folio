---
layout: post
title:  Tutorial - Running andes in a Docker container
date:   2020-03-25 16:40:16
description: Docker lets you run andes without installation. Here's a few notes on folder mounting.
comments: true
---

## Introduction

Docker container saves the efforts for setting up Python and installing dependent packages. A Docker container of andes is available if you prefer to use it in a container without installation.

There are excellent tutorial on the internet for getting started with Docker. For example, checkout the Docker installation guide at <https://docs.docker.com/install/>.

Please continue reading after installing Docker.

## Getting the Docker Image
To pull the Docker image from DockerHub, run

```bash
docker pull cuihantao/andes:latest
```

## Mounting Folders
When you run andes inside a docker, it is executed inside a container. Andes in the container only has access to files within the container. 

To run andes for a file in the local file system, one needs to mount the folder containing the file to the container. Mounting is done with `-v` or `--volume`, followed by the source directory and destination directory followed by colon. The destination directory must be `/andes` for andes containers.

For the source folder, It is recommended to create a folder specifically for andes test cases. For example, my folder is at `/Users/hcui7/notebooks` (this location is specific to your system and user name). 

Next, copy andes test cases into the folder. In the example, I'm using `kundur_full.xlsx`.

## Running ANDES
To run andes using docker, run

```bash
docker run -v /Users/hcui7/notebooks:/andes cuihantao/andes run kundur_full.xlsx
```

where `-v /Users/hcui7/notebooks:/andes` does the folder mounting, `cuihantao/andes` is the image name, and `run kundur_full.xlsx` is the command and argument passed to `andes` within the container.

As is seen in the example, commands and arguments are passed to the container in the same way as to a local andes. For example, to enable verbose logging, run

```bash
docker run -v /Users/hcui7/notebooks:/andes cuihantao/andes -v 10 run kundur_full.xlsx
```

The output files will be written to the source folder in your local machine. In my example, outputs are saved to `/Users/hcui7/notebooks`.

## Prepare and Config

The latest Andes docker image contains pre-generated numerical calls stored in `/home/cui/.andes/calls.pkl`. One does not need to wait for code generation.

To use a custom Config file, place the `andes.rc` in the folder that you are mounting. To check which config file is being used, turn on debugging messages with `andes -v 10`.

## Make an alias - the easiest way

One might want to use a shorter command to run Andes from docker. The solution in Bash (or zsh, or others) is to create an alias command.

```bash
alias andesd='docker run -v `pwd`:/andes cuihantao/andes:latest'
```

Run the above command to create an alias called `andesd` that automatically mounts the current folder.
One can add this command to the shell profile (`~/.bashrc` or others) to create the alias automatically upon login.

Once completed, using Andes from docker is as simple as that from the host - simply replace `andes` with `andesd`:

```
andesd run kundur_full.xlsx
```
where `kundur_full.xlsx` should exist in the current host folder. Note that Andes will search for the `andes.rc` config file in the sequence of 1) current folder, and 2) the default one in the container at `/home/cui/.andes/andes.rc`.
