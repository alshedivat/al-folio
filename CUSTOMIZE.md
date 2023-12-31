# Customize

Here we will give you some tips on how to customize the website.

## Table of Contents

## Project structure

The project is structured as follows, focusing on the main components:

```
.
├── 404.html: 404 page
├── assets/: contains the assets that are displayed in the website
├── _bibliography/
│   └── papers.bib: bibliography in BibTeX format
├── _config.yml: the configuration file of the template
├── _data/: contains some of the data used in the template
│   ├── cv.yml: CV in YAML format
│   └── repositories.yml: repositories in YAML format
├── _includes/: contains HTML code parts that are included in the main HTML file
├── _layouts/: contains the layouts to choose from in the frontmatter of the Markdown files
├── _news/: the news that will appear in the news section in the about page
├── news.html: the HTML file that defines the news section in the about page
├── _pages/: contains the pages of the website that are shown in the header
├── _posts/: contains the blog posts in Markdown format
├── _projects/: contains the projects in Markdown format
└── _sass/: contains the SASS files that define the style of the website
    ├── _base.scss: defines the base style of the website
    ├── _cv.scss: defines the style of the CV
    ├── _distill.scss: defines the style of the Distill articles
    ├── _layout.scss: defines the style of the layout
    ├── _themes.scss: defines the style of the themes, like colors
    └── _variables.scss: defines the variables used in the SASS files
```

```mermaid
.
├── 404.html <- 404 page
├── assets/ <- contains the assets that are displayed in the website
├── _bibliography/
│   └── papers.bib <- bibliography in BibTeX format
├── _config.yml <- the configuration file of the template
├── _data/ <- contains some of the data used in the template
│   ├── cv.yml <- CV in YAML format
│   └── repositories.yml <- repositories in YAML format
├── _includes/ <- contains HTML code parts that are included in the main HTML file
├── _layouts/ <- contains the layouts to choose from in the frontmatter of the Markdown files
├── _news/ <- the news that will appear in the news section in the about page
├── news.html <- the HTML file that defines the news section in the about page
├── _pages/ <- contains the pages of the website that are shown in the header
├── _posts/ <- contains the blog posts in Markdown format
├── _projects/ <- contains the projects in Markdown format
└── _sass/ <- contains the SASS files that define the style of the website
    ├── _base.scss <- defines the base style of the website
    ├── _cv.scss <- defines the style of the CV
    ├── _distill.scss <- defines the style of the Distill articles
    ├── _layout.scss <- defines the style of the layout
    ├── _themes.scss <- defines the style of the themes, like colors
    └── _variables.scss <- defines the variables used in the SASS files
```

## Configuration


## Creating new blog posts

[frontmatter](https://jekyllrb.com/docs/front-matter/)