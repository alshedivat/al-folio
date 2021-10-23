---
layout: page
title: Automating ML training
description: ML training using GitHub actions.
img: /assets/img/5.png
importance: 4
category: Data Science
---
*You can find the full code in [here](https://github.com/DanielDaCosta/automate-ml-training)*

Repo used as module for automating ML projects training using GitHub actions.

# Details

- Uses Flake8 for linting. Stop the build if there are Python syntax errors or undefined names
- Runs ```python train.py``` file for training ML model.
- Saves metrix.txt and confusion_matrix.png in GitHub for display.

# Usage
Clone the repository, and update the following script on `.github/workflows/python-app.yml` with your own branches names:
```yml
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
```

# Acknowledgments
- https://github.com/iterative/cml_base_case
- https://towardsdatascience.com/what-data-scientists-need-to-know-about-devops-2f8bc6660284
