# Project Overview

This repository contains **al-folio**, a responsive and customizable Jekyll theme designed for academic websites, personal portfolios, and blogs. It is a static site generated using Jekyll and Ruby. The project's target users are academics, researchers, and professionals who may not have a coding background.

Content is primarily written in Markdown and configuration is managed through YAML files, allowing for easy updates without modifying the core theme structure. The project is data-driven, with key information like CV details, publications, and social media links stored in the `_data` and `_bibliography` directories.

The repository is heavily automated with GitHub Actions for CI/CD, and includes detailed instructions for AI agents (like this one) to understand the architecture, conventions, and common tasks.

# Tech Stack

- **Core:** Jekyll 4.x (static site generator)
- **Language:** Ruby 3.3.5, with some Python 3.13 for scripts (e.g., Jupyter notebook conversion).
- **Frontend:**
  - Liquid templating for dynamic content.
  - SCSS/SASS for styling, built on Bootstrap for responsive layout.
  - JavaScript for interactive features (search, dark mode, galleries).
  - Third-party libraries (jQuery, Chart.js, etc.) are loaded via CDN, configured in `_config.yml`.
- **Dependencies:**
  - **Ruby Gems:** Managed by `Gemfile` via Bundler. Key plugins include `jekyll-scholar` (for publications), `jekyll-archives-v2`, `jekyll-paginate-v2`, and `jekyll-toc`.
  - **Node.js:** Managed by `package.json` via npm, used exclusively for development tooling, specifically `prettier` for code formatting.

# Building and Running

### Docker (Recommended)

The recommended method for local development is Docker, as it ensures a consistent environment matching the CI/CD setup.

1.  **Prerequisites:** Install Docker and Docker Compose.
2.  **Start the server:**
    ```bash
    docker compose pull  # Pull the latest pre-built image
    docker compose up    # Start the development server
    ```
3.  **Access:** The site will be running at `http://localhost:8080`. File changes will trigger a live reload.
4.  **Rebuild image (if needed):**
    ```bash
    docker compose up --build
    ```

### Native Ruby/Jekyll Setup (Legacy)

This method requires a local Ruby environment.

1.  **Prerequisites:** Install Ruby (v3.3.5 recommended), Bundler, and Python.
2.  **Install Dependencies:**
    ```bash
    bundle install
    ```
3.  **Run the Server:**
    ```bash
    bundle exec jekyll serve --livereload
    ```
4.  **Access:** The site will be running at `http://localhost:4000`.

# Project Layout & Key Files

- `_config.yml`: **Primary configuration file.** Controls site metadata, URLs, feature flags, navigation, and plugin settings.
- `_data/`: Contains structured data in YAML files.
  - `cv.yml`: CV content in RenderCV format.
  - `socials.yml`: Social media and contact links.
  - `repositories.yml`: GitHub repositories to feature.
  - `coauthors.yml`, `venues.yml`: Data for publications.
- `_bibliography/papers.bib`: All publications in BibTeX format. `jekyll-scholar` processes this file.
- `_layouts/`: Main HTML structure templates (e.g., `default.liquid`, `post.liquid`, `cv.liquid`).
- `_includes/`: Reusable Liquid template components (e.g., `header.liquid`, `footer.liquid`).
- `_pages/`: Top-level static pages (e.g., `about.md`, `cv.md`, `publications.md`).
- **Collections**:
  - `_posts/`: Blog posts (filename format: `YYYY-MM-DD-title.md`).
  - `_projects/`: Project showcase pages.
  - `_news/`: Announcements shown on the homepage.
  - `_teachings/`: Course pages.
- `_sass/`: SCSS files for styling. Customize theme colors in `_themes.scss` and variables in `_variables.scss`.
- `assets/`: Static files like images (`img/`), PDFs (`pdf/`), and JSON (`json/`).
- `.github/`: Contains all GitHub-specific configurations.
  - `workflows/`: GitHub Actions for deployment, CI, and code quality checks.
  - `agents/`: Detailed instructions for specialized AI agents (customization, documentation).
  - `instructions/`: Granular, path-specific instructions for AI agents.

# Development & Customization Workflow

This project has a well-defined workflow for making changes.

### Quick Reference for Customization

| User wants to...        | Files to modify                                                     | Key documentation                  |
| ----------------------- | ------------------------------------------------------------------- | ---------------------------------- |
| Change personal info    | `_config.yml`, `_pages/about.md`                                    | CUSTOMIZE.md § Configuration       |
| Add profile picture     | `assets/img/prof_pic.jpg`                                           | CUSTOMIZE.md § About page          |
| Update CV               | `_data/cv.yml` (RenderCV) or `assets/json/resume.json` (JSONResume) | CUSTOMIZE.md § Modifying CV        |
| Add publications        | `_bibliography/papers.bib`                                          | CUSTOMIZE.md § Adding publications |
| Add blog post           | `_posts/YYYY-MM-DD-title.md`                                        | CUSTOMIZE.md § Blog posts          |
| Create project          | `_projects/name.md`                                                 | CUSTOMIZE.md § Projects            |
| Add news item           | `_news/announcement.md`                                             | CUSTOMIZE.md § Adding news         |
| Change theme color      | `_sass/_themes.scss`                                                | CUSTOMIZE.md § Theme color         |
| Add social links        | `_data/socials.yml`                                                 | CUSTOMIZE.md § Social media        |
| Enable/disable features | `_config.yml` (look for `enabled: true/false`)                      | CUSTOMIZE.md § Configuration       |
| Fix deployment issues   | `_config.yml` (check `url`/`baseurl`)                               | FAQ.md, TROUBLESHOOTING.md         |

### Pre-Commit Checklist

Before committing any changes, you **must** run these steps:

1.  **Format Code with Prettier:**
    This is mandatory for all pull requests and contributions.

    ```bash
    # Install prettier and the liquid plugin if you haven't already
    npm install --save-dev prettier @shopify/prettier-plugin-liquid

    # Format all files
    npx prettier . --write
    ```

    _Note: The `_scripts/` directory is ignored by Prettier due to mixed Liquid/JS syntax._

2.  **Test Build Locally:**
    Ensure the site builds without errors using the recommended Docker method.

    ```bash
    docker compose up
    ```

    Wait for the build to complete and check the terminal for any YAML or Liquid errors.

3.  **Verify Site:**
    Open `http://localhost:8080` in your browser and navigate through the site to visually confirm that your changes work as expected and haven't broken anything.

# CI/CD Pipeline (GitHub Actions)

The repository uses several GitHub Actions workflows located in `.github/workflows/`:

- `deploy.yml`: The main workflow that triggers on a push to the `main` branch. It builds the Jekyll site with `JEKYLL_ENV=production`, optimizes CSS with PurgeCSS, and deploys the final static site to the `gh-pages` branch.
- `prettier.yml`: A mandatory check that fails if committed code is not formatted correctly with Prettier.
- `broken-links.yml`: Checks for broken links within the repository files.
- `render-cv.yml`: Automatically generates a PDF version of the CV from the `_data/cv.yml` file.
- Other workflows for accessibility (`axe.yml`), security (`codeql.yml`), and citation updates.

# Common Pitfalls & Workarounds

- **CSS/JS Not Loading After Deploy:** This is almost always caused by an incorrect `url` and `baseurl` configuration in `_config.yml`.
  - **For a personal site (`username.github.io`):** Set `url: https://username.github.io` and leave `baseurl:` completely empty.
  - **For a project site (`username.github.io/repo-name`):** Set `url: https://username.github.io` and `baseurl: /repo-name/`.
  - After fixing, you may need to clear your browser cache.

- **YAML Syntax Errors:** Jekyll builds will fail if `_config.yml` or files in `_data/` have syntax errors.
  - **Solution:** Always wrap strings containing special characters (like `:`, `&`, `#`) in quotes (e.g., `title: "My: Cool Site"`). Ensure indentation is correct (2 spaces, no tabs). Run the local server to get detailed error messages.

- **Prettier Formatting Failures:** The `prettier.yml` action will fail if your code isn't formatted.
  - **Solution:** Run `npx prettier . --write` before you commit.

- **Post Not Appearing:** Check the blog post's filename (`YYYY-MM-DD-title.md`) and ensure the `date` in the frontmatter is not in the future.
