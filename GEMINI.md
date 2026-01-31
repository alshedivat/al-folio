# Project Overview

This is **al-folio**, a responsive and customizable Jekyll theme designed for academic websites, personal portfolios, and blogs. It is a static site generated using Jekyll and Ruby, with content primarily written in Markdown.

The project is highly configurable and data-driven. Key information like user identity, publications, CV details, and social media links are managed in YAML (`.yml`) and BibTeX (`.bib`) files located in the `_data` and `_bibliography` directories, respectively. This separation of content and presentation allows for easy updates without touching the site's layout and styling.

The theme uses a minimal set of Node.js dependencies (managed via `package.json`), primarily for code formatting with Prettier. Frontend libraries (like Bootstrap, jQuery, and Chart.js) are loaded from a CDN as specified in `_config.yml`.

## Building and Running

There are two primary ways to build and run this project locally:

### 1. Docker (Recommended)

The project provides a Docker configuration for a consistent development environment.

1.  **Prerequisites:** Ensure you have Docker and Docker Compose installed.
2.  **Run the container:** Execute the following command in the project root:
    ```bash
    docker-compose up
    ```
3.  **Access the site:** The website will be available at `http://localhost:8080`. Changes to local files will trigger an automatic rebuild.

### 2. Native Ruby/Jekyll Setup

This method requires a local Ruby development environment.

1.  **Prerequisites:** Install Ruby, RubyGems, and Bundler.
2.  **Install Dependencies:** Run the following command to install the required gems specified in the `Gemfile`:
    ```bash
    bundle install
    ```
3.  **Run the Server:** Start the Jekyll development server:
    ```bash
    bundle exec jekyll serve --livereload
    ```
4.  **Access the site:** The website will be available at `http://localhost:4000` (by default).

## Development Conventions

- **Configuration:** The main site configuration is handled in `_config.yml`. This file controls site metadata, navigation, enabled features (like dark mode, analytics, comments), and build settings.
- **Content Structure:**
  - **`_posts`**: Contains Markdown files for blog posts.
  - **`_pages`**: Contains Markdown files for top-level pages like "About", "CV", and "Publications".
  - **Collections (`_projects`, `_news`, etc.)**: These directories hold specific content types. They are defined in `_config.yml` and function like organized groups of documents.
  - **`_data`**: Holds structured data in `.yml` files (e.g., `cv.yml`, `socials.yml`). These files are used to populate various parts of the site.
  - **`_bibliography`**: Contains `.bib` files for managing publication lists via the Jekyll Scholar plugin.
- **Layout and Styling:**
  - **`_layouts`**: Defines the main HTML structure for different page types (e.g., `default`, `post`, `cv`).
  - **`_includes`**: Contains reusable HTML snippets (e.g., `header.liquid`, `footer.liquid`) that are included in layouts.
  - **`_sass`**: Contains the Sass/SCSS files for styling. The main theme variables and colors can be customized in `_sass/_themes.scss` and `_sass/_variables.scss`.
- **Code Formatting:** The project uses `prettier` to maintain a consistent code style for Markdown, Liquid, and other source files. Before committing, you can format your code using:
  ```bash
  npx prettier --write .
  ```
- **External Libraries:** Client-side JavaScript and CSS libraries are managed via CDN links defined in the `third_party_libraries` section of `_config.yml`. They are not included in `package.json`.
