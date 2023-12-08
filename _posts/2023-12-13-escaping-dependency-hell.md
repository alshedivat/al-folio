---
layout: post
title: "Escaping Dependency Hell: An Introduction to Devcontainers"
date: 2023-12-11 04:00:00
description: ""
tags: ['WSL', 'MLOps', 'Devcontainers']
---

- [1. Introduction](#1-introduction)
- [2. What are Devcontainers?](#2-what-are-devcontainers)
- [3. Why Devcontainers?](#3-why-devcontainers)
- [4. How do Devcontainers Compare?](#4-how-do-devcontainers-compare)
- [5. Advantages and Disadvantages of Devcontainers](#5-advantages-and-disadvantages-of-devcontainers)
  - [5.1. Advantages](#51-advantages)
  - [5.2. Disadvantages](#52-disadvantages)
- [6. Devcontainer in a web scraping project](#6-devcontainer-in-a-web-scraping-project)
  - [6.1. The `devcontainer.json` file](#61-the-devcontainerjson-file)
  - [6.2. The Dockerfile](#62-the-dockerfile)
  - [6.3. Comparison with a non-devcontainer setup](#63-comparison-with-a-non-devcontainer-setup)
- [7. Using Devcontainers in VS Code](#7-using-devcontainers-in-vs-code)
  - [7.1. Essential Commands for Devcontainers](#71-essential-commands-for-devcontainers)
    - [7.1.1. Troubleshooting Common Errors](#711-troubleshooting-common-errors)
- [8. Conclusion](#8-conclusion)
- [Appendix A: Devcontainers and WSL](#appendix-a-devcontainers-and-wsl)
- [Apendix B: How do Devcontainers REALLY Compare?](#apendix-b-how-do-devcontainers-really-compare)


# 1. Introduction

Development containers, or **devcontainers**, are standardized, isolated environments that developers can use to build, test, and deploy software. As an [open standard](https://containers.dev/), they support use across different Integrated Development Environments (IDEs), such as [Visual Studio Code](https://code.visualstudio.com/) and [PyCharm](https://www.jetbrains.com/pycharm/).

# 2. What are Devcontainers?

Devcontainers is a tool powered by Docker that offers reliable development environments for projects. It's worth noting that while Docker is the primary container runtime used, other runtimes such as Podman can also be utilized, though it may not be as straightforward. Devcontainers ensure that all dependencies and settings needed for a project are encapsulated and can be easily replicated. With the `devcontainer.json` configuration file, you can define the environment down to the detail, setting up a specific version of a programming language, the necessary libraries, or even particular code editor settings.

<div style="text-align: center">
    {% include figure.html path="assets/img/posts/2023-12-13-escaping-dependency-hell/architecture-containers.png" class="img-fluid rounded z-depth-1" zoomable="true"
    caption = "Figure 1 - Architecture of devcontainers in VSCode.<br>Source: https://code.visualstudio.com/docs/devcontainers/containers"
    %}
</div>

<style>
    /* For desktops and larger tablets */
    @media (min-width: 768px) {
        .img-fluid {
            width: 80%;
        }
    }

    /* For mobile phones and smaller devices */
    @media (max-width: 767px) {
        .img-fluid {
            width: 100%;
        }
    }
</style>


# 3. Why Devcontainers?

One of the significant challenges in software development and data science is maintaining consistency in development environments. A funny common chorus you might hear is: "But it works on my machine!" This inconsistency becomes even more of a headache when you're switching between projects that require different versions of the same language, or different package managers.

Imagine one project using Python 3.7 with pip, while another one uses Python 3.9 with [Poetry](https://python-poetry.org/). Switching between these projects without some form of isolation could quickly lead to version conflicts and a lot of frustration.

That's where devcontainers are useful. They isolate each project's environment into its container, solving the inconsistencies and making it easier to switch between projects (and rebuild a broken environment from scratch!). All the while, you maintain your familiar IDE setup.

# 4. How do Devcontainers Compare?

Other solutions to the problem of environment consistency exist, such as virtual machines or manual dependency installations. But these methods come with their challenges - virtual machines are resource-intensive and slow, while manual setups require careful documentation and sometimes a lot of time to configure correctly (notice that this problem may arise only after setting up multiple projects in the same machine).

Devcontainers, in contrast, offer a more lightweight and efficient solution. They start up quickly, require fewer system resources, and above all, they are easily reproducible, thanks to Docker and the open standard defined by `devcontainer.json`.

# 5. Advantages and Disadvantages of Devcontainers

## 5.1. Advantages
* **Consistency**: Devcontainers ensure that every developer is working in an identical environment, eliminating the classic "it works on my machine" problem;
* **Isolation**: Each project's dependencies are kept separate, which minimizes the risk of conflicts between different projects that might require different versions of the same package or software;
* **Reproducibility**: The entire environment can be easily replicated and shared among team members, making the onboarding process for new developers much smoother. Also, the environment can be easily deleted and rebuilt again;
* **Flexibility**: Devcontainers adhere to an open standard, meaning they work across different IDEs, including Visual Studio Code and PyCharm;
* **Automation**: With the use of a `devcontainer.json` file, the setup of a development environment can be automated, which saves time for developers.

## 5.2. Disadvantages
* **Dependency on Docker**: Since devcontainers rely on Docker, developers need to have Docker installed and running on their machine. This might pose challenges in certain operating systems or in environments where Docker is not preferred;
* **Learning Curve**: Though not steep, there is still a learning curve associated with understanding Docker and the concept of devcontainers. This can pose an initial hurdle, particularly for developers who are not familiar with containerization.

In the following sections, we'll explore how to use devcontainers in a practical example and provide some tips based on personal experience.

# 6. Devcontainer in a web scraping project

In the upcoming section, a practical example will be provided, demonstrating how to set up a devcontainer in a web scraping project. The configuration process primarily involves two key files: `devcontainer.json` and `Dockerfile`. However, in simpler projects, it might be feasible to configure the devcontainer using only the `devcontainer.json` file. 


## 6.1. The `devcontainer.json` file

The devcontainer.json file sets the foundation for our containerized development environment. Here's what it looks like:

```json
{
	"name": "scrapest",
	"build": {
		"dockerfile": "Dockerfile"
	},
	"postCreateCommand": "make install",
}
```

The "build" field points to the Dockerfile that defines the container. Upon creation of the container, the `make install` command is run, which installs our project's dependencies based on a command defined on a `Makefile`, in a simple Python project it could be simply a `poetry install`.


## 6.2. The Dockerfile

The `Dockerfile` outlines how to build the Docker container:

```Dockerfile
FROM mcr.microsoft.com/devcontainers/python:1-3.9-buster

RUN sudo apt update && \
    wget <https://github.com/mozilla/geckodriver/releases/download/v0.33.0/geckodriver-v0.33.0-linux64.tar.gz> && \
    tar -xvzf geckodriver* && \
    chmod +x geckodriver && \
    mv geckodriver /usr/local/bin/ && \
    sudo apt install -y \
    firefox-esr  \
    pip install poetry==1.5.0
```

This container starts from a base image preloaded with Python 3.9. We then install `geckodriver` and `firefox-esr` to perform browser tasks. 

Most importantly, we install Poetry using pip, **explicitly specifying version 1.5.0** to ensure consistent behavior across all environments. Given that different projects may require different versions of Poetry and Python (Poetry itself doesn't handle Python versions the same way [Conda](https://docs.conda.io/projects/conda/en/stable/) does), isolating the Poetry and Python versions within each project's devcontainer helps avoid compatibility issues and headaches with setup.

## 6.3. Comparison with a non-devcontainer setup

Without devcontainers, each project's environment setup can become a complex task. You would need to manage different Python, Poetry, and web driver versions manually, resolve potential dependency conflicts between projects, and spend valuable time ensuring the machine is correctly set up. By adopting devcontainers, we isolate each project in its environment with the correct dependency versions, providing a consistent, reproducible setup.

# 7. Using Devcontainers in VS Code

When utilizing devcontainers within Visual Studio Code, familiarity with a few key commands and best practices can enhance your workflow. To access these commands, open the Command Palette by pressing `Ctrl + Shift + P`. All the commands listed in this section start with the prefix "`Dev Containers:`". This section will elaborate on these essentials based on my own experiences.

## 7.1. Essential Commands for Devcontainers

Some commands are important when working with devcontainers:

* `Reopen in Container`: Once your devcontainer configuration is in place, you can start your development environment using this command. This command interprets your `devcontainer.json` file and builds the Docker container accordingly. If the container was already built previously, it just opens the IDE connected to the container;
* `Reopen Folder Locally`: If you need to switch back to your local environment, this command allows you to quickly transition out of the devcontainer setup.
* `Reopen Folder on WSL`: For those using Windows Subsystem for Linux (WSL), this command comes in handy when you want to reopen your project within WSL.
* `Rebuild Container`: When changes are made to your `devcontainer.json` or Dockerfile, use this command to ensure your new settings are applied.
* `Rebuild Without Cache and Reopen in Container`: If you want to ensure a clean rebuild of your container, bypassing Docker's layer caching, use this command. This is especially useful when you want to avoid any artifacts from previous builds.

### 7.1.1. Troubleshooting Common Errors

As you work with devcontainers, you might encounter certain issues. Here are a couple of the most common errors and their potential solutions:
* **Container build failures**: These can arise from errors in your `Dockerfile` or `devcontainer.json`. Check these files for any potential errors.
* **Connectivity problems**: If you're having trouble connecting to the container, ensure that Docker is running correctly. Often, a simple restart of Docker can resolve these issues.

# 8. Conclusion

Devcontainers represent a key shift in software development and data science, addressing the perennial challenge of environment inconsistency, also known as the "it works on my machine" problem. By leveraging Docker's containerization, devcontainers ensure uniformity, isolation, and reproducibility in development environments, simplifying project setups.

While they come with a learning curve and a dependency on Docker, the advantages they offer in streamlining development workflows are significant. They not only facilitate a hassle-free setup for diverse projects but also ensure that team members can easily collaborate with identical setups.

As the adoption of devcontainers grows, their role in modern development practices is becoming increasingly essential. They aren't just a tool to solve current challenges but a strategic asset for future-proofing development environments.

# Appendix A: Devcontainers and WSL

If you're running on Windows Subsystem for Linux (WSL) and require audio output for your applications, you may add the following lines under "mounts" and "containerEnv". This will direct the container to use your system's Pulse Server for sound. I use this often because I rely on audio output to know when a long process has finished (`speech-dispatcher` commands inside the container will work properly).

```json
{
	"name": "scrapest",
	"build": {
		"dockerfile": "Dockerfile"
	},
	"postCreateCommand": "make install",
	"mounts": [
		"source=/mnt/wslg,target=/mnt/wslg,type=bind"
	],
	"containerEnv": {
		"PULSE_SERVER": "${localEnv:PULSE_SERVER}"
	},
}
```

Another pain point you may have is with your SSH keys that are on WSL and not on the container. For that you will need an SSH agent when building the container, you can do so by adding the following lines to your `.zshrc`/`.bashrc`:

```bash
if [ -z "$SSH_AUTH_SOCK" ]; then
   # Check for a currently running instance of the agent
   RUNNING_AGENT="`ps -ax | grep 'ssh-agent -s' | grep -v grep | wc -l | tr -d '[:space:]'`"
   if [ "$RUNNING_AGENT" = "0" ]; then
        # Launch a new instance of the agent
        ssh-agent -s &> $HOME/.ssh/ssh-agent
   fi
   { eval `cat $HOME/.ssh/ssh-agent`; ssh-add ~/.ssh/id_ed25519 >> /dev/null } &> /dev/null
fi
```


# Apendix B: How do Devcontainers REALLY Compare?

Addressing the challenge of environment consistency in development, various tools and methods have been employed, each with its advantages and limitations. Let's consider the traditional approaches like virtual machines and manual dependency installations, alongside package managers like pip, pipx, Conda, and Poetry, before delving into how devcontainers offer a comprehensive solution.

Virtual machines (VMs) are a common approach for environment isolation. They provide complete OS-level separation but at a significant cost in terms of resource intensity and speed. VMs often consume considerable system resources and can be slow to start and operate, making them less efficient for rapid development cycles.

Manual dependency installations, on the other hand, offer more control but come with the challenge of meticulous documentation and time-consuming setup processes. This approach becomes increasingly complex with multiple projects, each requiring different versions of dependencies, leading to a high maintenance overhead (i.e. dependency hell).

In the realm of Python development, tools like pip, pipx, Conda, and Poetry have been widely adopted for managing packages and dependencies. Pip is the standard package manager, but it does not inherently solve the problem of environment isolation due to the need to have multiple Python versions. Pipx steps in to provide a layer of isolation for Python-based command-line tools. Conda extends these capabilities further, offering package management across multiple languages and environments (you can isolate Node.js and (Cuda)[https://blogs.nvidia.com/blog/what-is-cuda-2/] versions on a Conda environment). However, Conda's approach can sometimes lead to bulky environments due to its extensive package repository and lack of reproducibility due to not natively supporting .lock files.

Poetry, a relatively newer entrant, simplifies dependency management and packaging in Python. It combines package management and environment management, aiming to provide a unified tool for Python projects. Despite its benefits, Poetry alone cannot eliminate the issues arising from system-wide package installations and environment configurations, especially when different projects require different Python versions or dependencies (you could use [pyenv](https://github.com/pyenv/pyenv) for different Python versions, but honestly, devcontainers make the job much easier).

This is where devcontainers come into the picture, addressing the gaps left by these tools and methods. Unlike virtual machines, devcontainers are just containers: lightweight and quick to start, requiring far fewer system resources. They provide an isolated, Docker-powered environment for each project, eliminating the complexities associated with manual setups. You could have different web scraping/automation software using different versions of the `geckodriver`, with no interference between them. The `devcontainer.json` file, adhering to an open standard, allows for easy replication and sharing of development environments across teams (you could also push the container image so the team uses exactly the same environment in development).

Devcontainers essentially encapsulate the entire development setup — including specific versions of languages, libraries, and even IDE settings — in a containerized environment. This ensures that all developers work in an identical environment, regardless of their local machine setup. This level of consistency and isolation is hard to achieve with traditional tools like pip, pipx, Conda, or even Poetry.

In summary, while tools like pip, pipx, Conda, and Poetry offer solutions to parts of the environment consistency problem, devcontainers provide a comprehensive answer. They bring together the benefits of isolation, lightweight operation, and reproducibility in a way that other methods and tools cannot, making them an invaluable asset in modern software development workflows.