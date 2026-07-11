---
layout: post
title: Deploying large language models on Ubuntu servers
date: 2025-07-21
last_updated: 2025-07-21
description: how to large language models with ollama and open-webui on Ubuntu servers
tags: deployment LLM Ubuntu
categories: computer
featured: true
toc:
  sidebar: left
---

Go to [this page](https://ollama.com/download/linux) and run the command on your server as root.

## Change path to read the models

```text
Environment="OLLAMA_MODELS=/path/to/models"
```

Note that the owner of the model folder must be `ollama`.

## Check port usage

```bash
sudo apt install net-tools
```

```bash
sudo netstat -ntlp
```
