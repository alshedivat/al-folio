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

To run andes for a file in the local file system, one needs to mount the folder containing the file to the container. Mounting is done with `-v` or `--volume`, followed by the source directory and destination directory followed by colon. The destination directory must be `/root` for andes containers.

For the source folder, It is recommended to create a folder specifically for andes test cases. For example, my folder is at `/Users/hcui7/notebooks` (this location is specific to your system and user name). 

Next, copy andes test cases into the folder. In the example, I'm using `kundur_full.xlsx`.

## Running ANDES
To run andes using docker, run

```bash
docker run -v /Users/hcui7/notebooks:/root cuihantao/andes run kundur_full.xlsx
```

where `-v /Users/hcui7/notebooks:/root` does the folder mounting, `cuihantao/andes` is the image name, and `run kundur_full.xlsx` is the command and argument passed to `andes` within the container.

As is seen in the example, commands and arguments are passed to the container in the same way as to a local andes. For example, to enable verbose logging, run

```bash
docker run -v /Users/hcui7/notebooks:/root cuihantao/andes -v 10 run kundur_full.xlsx
```

The output files will be written to the source folder in your local machine. In my example, outputs are saved to `/Users/hcui7/notebooks`.

## Prepare and Config

Andes in the Docker container also needs to generate code from symbolically defined models. The path to store the generated `calls.pkl` file is in the `.andes` folder (note the dot) in the source directory for mounting. Likewise, the config file can be saved to the same `.andes` folder.

Note that the files saved from the Docker container is owned by root. This is because the user inside the container to run andes was `root`. If you need to modify the files, use `chown` to change the owner. 

```bash
sudo chown USER:GROUP .andes
```

where USER is your user name, and GROUP is your desired group. This operation requires the super user privilege (sudo) in your system. 


