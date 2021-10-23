---
layout: page
title: Natural Language Generator
description: Generates sentences based on numerical inputs
img: 
importance: 6
category: Others
---

*You can find the full code in [here](https://github.com/DanielDaCosta/sentence-generator)*

Generates sentences based on numerical inputs, taking into account: sensitiveness and intensity of the data.

With this project you can build sentences like:
- Input: "number of people", 
- Old Data
- New Data
- Settings: object containing settings informations:
   * sensitiveness: sensitiveness of data,
   * threshold: minimum value to change level of data
   * precision: desired decimal places
   * dataType: group of the inserted data


Example: 
```
- Today, the number of people decreased reasonably to 2. Decrease of 60% in comparison to yestarday.
- There was an increase of 60% in the number of people counted today in comparison to yestarday. A variation from 5 to 8.
- There wasn't any considerable change in the number of people today. Stayed constant on 5 in comparison to yestarday.
```

## Usage
You can build your own senteces own the *senteces.json* file, choosing your own variables.
You then can set the values of each variables, and changing the NLG intensity.

## Development

All contributors of all levels are welcome to help in any possible away.

The project has a MIT license.

**Souce Code**

```
git clone https://github.com/DanielDaCosta/sentence-generator.git
```

## References & Acnknoledgments

Special Thanks to @Jitta and his [Git Rebo](https://github.com/jitta/Natural-Language-Generation), for the base idea of this project.