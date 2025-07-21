# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an **al-folio** academic website template - a Jekyll-based static site generator designed for academics to showcase their work, publications, CV, projects, and blog posts. The site uses Jekyll with Ruby gems and follows academic website conventions.

## Development Commands

### Local Development (Docker - Recommended)

```bash
# Pull and run the site locally
docker compose pull
docker compose up

# Alternative slim version (~100MB vs 400MB)
docker compose -f docker-compose-slim.yml up

# Build custom Docker image if needed
docker compose up --build
```

Site will be available at `http://localhost:8080`

### Local Development (Ruby/Bundler)

```bash
# Install dependencies
bundle install
pip install jupyter

# Serve locally
bundle exec jekyll serve
```

Site will be available at `http://localhost:4000`

### Build and Deploy

```bash
# Build static site
bundle exec jekyll build

# Purge unused CSS (after build)
purgecss -c purgecss.config.js

# Manual deployment script (interactive)
./bin/deploy

# Simple CI build
./bin/cibuild  # Just runs: bundle exec jekyll build
```

### Code Formatting

```bash
# Format Liquid templates and other supported files
npm run prettier
```

## Architecture Overview

### Directory Structure

- **`_config.yml`**: Main Jekyll configuration - site metadata, plugins, collections, scholar settings
- **`_pages/`**: Main website pages (about, blog, projects, publications, CV, etc.)
- **`_posts/`**: Blog posts following Jekyll naming convention (YYYY-MM-DD-title.md)
- **`_projects/`**: Project showcases with markdown frontmatter
- **`_news/`**: News/announcements displayed on homepage
- **`_bibliography/`**: BibTeX files for publications (papers.bib)
- **`_data/`**: YAML data files (CV, repositories, social links, coauthors)
- **`_includes/`**: Reusable Liquid template components
- **`_layouts/`**: Page layouts (about, post, cv, distill, etc.)
- **`_sass/`**: SCSS stylesheets and theme variables
- **`assets/`**: Static assets (images, CSS, JS, JSON, PDFs)

### Key Configuration Files

- **`_config.yml`**: Central configuration - modify for site customization
- **`_data/cv.yml`**: CV content in YAML format (fallback if assets/json/resume.json missing)
- **`assets/json/resume.json`**: CV in JSON Resume standard (takes precedence)
- **`_data/repositories.yml`**: GitHub repos and users to display
- **`_data/socials.yml`**: Social media links and contact info
- **`_bibliography/papers.bib`**: BibTeX bibliography for publications page

### Jekyll Collections

The site uses Jekyll collections for organized content:
- **`posts`**: Blog posts (default Jekyll collection)
- **`projects`**: Project portfolio items
- **`news`**: Homepage announcements
- **`books`**: Bookshelf/reading list (if enabled)

### Publications System

Uses **Jekyll Scholar** plugin for bibliography management:
- Add entries to `_bibliography/papers.bib`
- Supports custom fields: `pdf`, `code`, `website`, `slides`, `poster`, `arxiv`, etc.
- Auto-generates publication page with search and filtering
- Author highlighting based on `scholar.first_name` and `scholar.last_name` in config

## Content Management

### Adding Content

- **Blog posts**: Add `.md` files to `_posts/` with format `YYYY-MM-DD-title.md`
- **Projects**: Add `.md` files to `_projects/` with project frontmatter
- **Publications**: Add BibTeX entries to `_bibliography/papers.bib`
- **CV**: Edit `assets/json/resume.json` or `_data/cv.yml`
- **News**: Add `.md` files to `_news/`

### Images and Assets

- Store images in `assets/img/`
- PDFs go in `assets/pdf/`
- The site uses responsive WebP image generation (requires ImageMagick)

### Customization

- **Theme colors**: Edit `--global-theme-color` in `_sass/_themes.scss`
- **Styling**: Modify SCSS files in `_sass/`
- **Site metadata**: Update `_config.yml`
- **Navigation**: Edit page frontmatter and `_data/` files

## Deployment

### GitHub Pages (Automatic)

1. Push to `main` branch
2. GitHub Actions builds and deploys to `gh-pages` branch automatically
3. Ensure repository has proper permissions for GitHub Actions

### Manual Deployment

Use `./bin/deploy` script which:
1. Builds the site with `JEKYLL_ENV=production`
2. Purges unused CSS
3. Pushes to `gh-pages` branch

## Development Notes

- The site supports both light and dark themes
- MathJax enabled for mathematical content
- Supports Jupyter notebooks, charts, diagrams, and rich media
- Uses modern JS libraries (loaded via CDN with integrity checks)
- Responsive design with Bootstrap-based grid system
- Search functionality powered by `ninja-keys`

## Plugin Ecosystem

Key Jekyll plugins used:
- `jekyll-scholar`: Bibliography management
- `jekyll-jupyter-notebook`: Jupyter notebook support
- `jekyll-imagemagick`: Responsive image generation
- `jekyll-feed`: RSS feed generation
- `jekyll-sitemap`: Automatic sitemap
- Various optimization plugins (minifier, terser)