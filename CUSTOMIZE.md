# Customize

Here we will give you some tips on how to customize the website. One important thing to note is that **ALL** the changes you make should be done on the **main** branch of your repository. The `gh-pages` branch is automatically overwritten every time you make a change to the main branch.

> **Note for users without coding experience:** You do **not** need to understand the technology stack or have any coding background to create and customize your own website with al-folio. This template was specifically designed to be accessible to academics and researchers from all backgrounds. You can create a fully functional website by simply editing configuration files and adding content in Markdown, no coding required.

<!--ts-->

- [Customize](#customize)
  - [Project structure](#project-structure)
  - [Configuration](#configuration)
  - [GitHub Copilot Customization Agent](#github-copilot-customization-agent)
    - [What the Agent Can Help With](#what-the-agent-can-help-with)
    - [How to Use the Agent](#how-to-use-the-agent)
    - [Important: Verify Agent Output](#important-verify-agent-output)
  - [Understanding the Codebase with Code Wiki and DeepWiki](#understanding-the-codebase-with-code-wiki-and-deepwiki)
    - [What are these tools?](#what-are-these-tools)
    - [When to use them](#when-to-use-them)
  - [Technology Stack](#technology-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Build and Deployment](#build-and-deployment)
    - [Key Integration Points](#key-integration-points)
  - [Modifying the CV information](#modifying-the-cv-information)
    - [RenderCV Format (Recommended)](#rendercv-format-recommended)
    - [JSONResume Format](#jsonresume-format)
    - [Using Both Formats Simultaneously](#using-both-formats-simultaneously)
    - [Automatic PDF Generation (RenderCV only)](#automatic-pdf-generation-rendercv-only)
  - [Modifying the user and repository information](#modifying-the-user-and-repository-information)
    - [Configuring external service URLs](#configuring-external-service-urls)
  - [Creating new pages](#creating-new-pages)
  - [Creating new blog posts](#creating-new-blog-posts)
  - [Creating new projects](#creating-new-projects)
  - [Adding some news](#adding-some-news)
  - [Adding Collections](#adding-collections)
    - [Creating a new collection](#creating-a-new-collection)
    - [Using frontmatter fields in your collection](#using-frontmatter-fields-in-your-collection)
    - [Creating a teachings collection](#creating-a-teachings-collection)
      - [Course file format](#course-file-format)
      - [Important course collection notes](#important-course-collection-notes)
      - [Required fields](#required-fields)
      - [Optional fields](#optional-fields)
    - [Collections with categories and tags](#collections-with-categories-and-tags)
    - [Creating custom metadata groups and archive pages](#creating-custom-metadata-groups-and-archive-pages)
      - [Understanding Jekyll's special handling of fields](#understanding-jekylls-special-handling-of-fields)
      - [Example: Adding a custom "adaptations" field](#example-adding-a-custom-adaptations-field)
      - [Field naming best practices](#field-naming-best-practices)
      - [Complete example: Book reviews with custom adaptations field](#complete-example-book-reviews-with-custom-adaptations-field)
  - [Adding a new publication](#adding-a-new-publication)
    - [Author annotation](#author-annotation)
    - [Buttons (through custom bibtex keywords)](#buttons-through-custom-bibtex-keywords)
  - [Changing theme color](#changing-theme-color)
  - [Customizing layout and UI](#customizing-layout-and-ui)
  - [Adding social media information](#adding-social-media-information)
  - [Adding a newsletter](#adding-a-newsletter)
  - [Configuring search features](#configuring-search-features)
  - [Social media previews](#social-media-previews)
    - [How to enable](#how-to-enable)
    - [Configuring preview images](#configuring-preview-images)
    - [Preview image best practices](#preview-image-best-practices)
  - [Related posts](#related-posts)
    - [How it works](#how-it-works)
    - [Configuration](#configuration-1)
    - [Disable related posts for a specific post](#disable-related-posts-for-a-specific-post)
    - [Additional configuration in \_config.yml](#additional-configuration-in-_configyml)
  - [Managing publication display](#managing-publication-display)
  - [Adding a Google Calendar](#adding-a-google-calendar)
    - [Basic usage](#basic-usage)
    - [Enable the calendar script for your page](#enable-the-calendar-script-for-your-page)
    - [Optional: Customize the calendar style](#optional-customize-the-calendar-style)
  - [Updating third-party libraries](#updating-third-party-libraries)
  - [Removing content](#removing-content)
    - [Removing the blog page](#removing-the-blog-page)
    - [Removing the news section](#removing-the-news-section)
    - [Removing the projects page](#removing-the-projects-page)
    - [Removing the publications page](#removing-the-publications-page)
    - [Removing the repositories page](#removing-the-repositories-page)
    - [You can also remove pages through commenting out front-matter blocks](#you-can-also-remove-pages-through-commenting-out-front-matter-blocks)
  - [Adding Token for Lighthouse Badger](#adding-token-for-lighthouse-badger)
    - [Personal Access Token (fine-grained) Permissions for Lighthouse Badger:](#personal-access-token-fine-grained-permissions-for-lighthouse-badger)
  - [Customizing fonts, spacing, and more](#customizing-fonts-spacing-and-more)
  - [Scheduled Posts](#scheduled-posts)
    - [Name Format](#name-format)
    - [Important Notes](#important-notes)
  - [GDPR Cookie Consent Dialog](#gdpr-cookie-consent-dialog)
    - [How it works](#how-it-works-1)
    - [When to use](#when-to-use)
    - [How to enable](#how-to-enable-1)
    - [Customizing the consent dialog](#customizing-the-consent-dialog)
    - [Supported analytics providers](#supported-analytics-providers)
    - [How it integrates with analytics](#how-it-integrates-with-analytics)
    - [For developers](#for-developers)
  - [Setting up a Personal Access Token (PAT) for Google Scholar Citation Updates](#setting-up-a-personal-access-token-pat-for-google-scholar-citation-updates)
    - [Why is a PAT required?](#why-is-a-pat-required)
    - [How to set up the PAT](#how-to-set-up-the-pat)

<!--te-->

## Project structure

The project is structured as follows, focusing on the main components that you will need to modify:

```txt
.
├── 📂 assets/: contains the assets that are displayed in the website
│   └── 📂 json/
    │   └── 📄 resume.json: CV in JSON format (https://jsonresume.org/)
├── 📂 _bibliography/
│   └── 📄 papers.bib: bibliography in BibTeX format
├── 📂 _books/: contains the bookshelf pages
├── 📄 _config.yml: the configuration file of the template
├── 📂 _data/: contains some of the data used in the template
│   ├── 📄 cv.yml: CV in YAML format, used when assets/json/resume.json is not found
│   ├── 📄 repositories.yml: users and repositories info in YAML format
│   └── 📄 socials.yml: your social media and contact info in YAML format
├── 📂 _includes/: contains code parts that are included in the main HTML file
│   └── 📄 news.liquid: defines the news section layout in the about page
├── 📂 _layouts/: contains the layouts to choose from in the frontmatter of the Markdown files
├── 📂 _news/: the news that will appear in the news section in the about page
├── 📂 _pages/: contains the pages of the website
|   └── 📄 404.md: 404 page (page not found)
├── 📂 _posts/: contains the blog posts
├── 📂 _projects/: contains the projects
└── 📂 _sass/: contains the SASS files that define the style of the website
    ├── 📂 font-awesome/: contains the SCSS files for Font Awesome
    ├── 📄 _blog.scss: blog post, tags, and pagination styles
    ├── 📄 _components.scss: reusable component styles (cards, profiles, CV, projects)
    ├── 📄 _cv.scss: style of the CV page
    ├── 📄 _distill.scss: style of the Distill articles
    ├── 📄 _footer.scss: footer styles
    ├── 📄 _layout.scss: overall layout styles
    ├── 📄 _navbar.scss: navigation bar and dropdown menu styles
    ├── 📄 _publications.scss: publication list and bibliography styles
    ├── 📄 _tabs.scss: tabbed content styles
    ├── 📄 _teachings.scss: course and teaching styles
    ├── 📄 _themes.scss: theme colors and icons
    ├── 📄 _typograms.scss: typogram diagram styles
    ├── 📄 _typography.scss: text, headings, links, tables, and blockquote styles
    ├── 📄 _utilities.scss: utility styles (code highlighting, forms, modals, animations)
    └── 📄 _variables.scss: variables used in the SASS files
```

## Configuration

The configuration file [\_config.yml](_config.yml) contains the main configuration of the website. Most of the settings is self-explanatory and we also tried to add as much comments as possible. If you have any questions, please check if it was not already answered in the [FAQ](FAQ.md).

> Note that the `url` and `baseurl` settings are used to generate the links of the website, as explained in the [install instructions](INSTALL.md).

All changes made to this file are only visible after you rebuild the website. That means that you need to run `bundle exec jekyll serve` again if you are running the website locally or push your changes to GitHub if you are using GitHub Pages. All other changes are visible immediately, you only need to refresh the page.

If changes don't appear after refreshing, try:

- **Hard refresh** to reload the page ignoring cached content:
  - [Shift + F5 on Chromium-based browsers](https://support.google.com/chrome/answer/157179#zippy=%2Cwebpage-shortcuts)
  - [Ctrl + F5 on Firefox-based browsers](https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly)
- **Clear your browser cache** completely
- **Use a private/incognito session** to ensure no cached content:
  - [Chrome](https://support.google.com/chrome/answer/95464)
  - [Firefox](https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history)

## GitHub Copilot Customization Agent

This repository includes a specialized GitHub Copilot agent (`.github/agents/customize.agent.md`) designed to help you customize your al-folio website. The agent acts as an expert assistant that can:

- Guide you through common customization tasks step-by-step
- Modify configuration files, add content, and update your website
- Explain technical concepts in plain language (especially helpful if you're not familiar with Jekyll or web development)
- Apply changes directly to your repository files
- Answer questions about how to customize specific features

### What the Agent Can Help With

The customization agent can assist with tasks such as:

- Changing basic site information (title, author name, contact details)
- Updating your CV or resume
- Adding and managing publications from BibTeX files
- Creating blog posts, projects, and news items
- Customizing theme colors and styling
- Managing social media links
- Enabling or disabling features in `_config.yml`
- Adding profile pictures and other assets
- Troubleshooting configuration issues

### How to Use the Agent

To use the customization agent:

1. Ensure you have a [GitHub Copilot](https://github.com/features/copilot) subscription
2. Open your repository in an editor with GitHub Copilot support (such as VS Code with the GitHub Copilot extension)
3. Interact with GitHub Copilot and ask questions or request changes. For more information, check [Using custom agents in your IDE](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents#using-custom-agents-in-your-ide)
4. The agent will guide you through the customization process and can make changes directly to your files

For example, you can ask:

- "How do I change my website's theme color to blue?"
- "Help me add a new blog post about my research"
- "Update my profile information with my new university email"
- "How do I add a publication to my website?"

The agent is designed to be patient and helpful, explaining each step clearly so you understand what's being changed and why.

### Important: Verify Agent Output

**The customization agent can make mistakes or produce incorrect information.** Always review and verify the agent's suggestions and changes before applying them to your repository:

- **Review all changes** – Before applying any modifications, carefully read what the agent suggests and ensure it makes sense for your needs
- **Test locally first** – Before pushing changes to GitHub, test them locally using Docker or native setup (see the [Installation instructions](INSTALL.md))
- **Check syntax** – Make sure any YAML, Markdown, or BibTeX files have correct syntax. Incorrect syntax can break your website
- **Verify configuration** – If the agent modifies `_config.yml` or other configuration files, check that the changes align with your intentions
- **Preview on your site** – Run your site locally and navigate through it to ensure everything displays correctly and works as expected
- **Don't blindly apply changes** – Understand what's being changed and why before committing to your repository

**Example scenarios where verification is important:**

- If the agent suggests a BibTeX entry, verify the syntax matches existing entries in your `_bibliography/papers.bib` file
- If the agent modifies your `_config.yml`, check that indentation is correct (YAML is very sensitive to spacing)
- If the agent creates a new blog post or page, verify the frontmatter (the metadata at the top) is correct
- If the agent suggests changes to theme colors or styling, preview your site locally to ensure the changes look as intended

> **Note:** The customization agent requires GitHub Copilot to be enabled. For more information about GitHub Copilot and its features, see the [GitHub Copilot documentation](https://docs.github.com/en/copilot).

## Understanding the Codebase with Code Wiki and DeepWiki

If you're interested in learning more about how al-folio works under the hood, or want to understand specific aspects of the codebase for deeper customization, you can use Code Wiki and DeepWiki as supplementary resources.

### What are these tools?

**Code Wiki** and **DeepWiki** are AI-powered tools that help you explore and understand GitHub repositories through interactive documentation:

- **Code Wiki** (powered by Google Gemini) generates interactive documentation from the repository code. You can browse the project structure, search for specific functions or modules, view architecture diagrams, and understand how different components interact.

- **DeepWiki** provides an AI chat interface where you can ask natural language questions about the codebase, similar to having an engineer available 24/7. You can ask how features work, search for code patterns, or get explanations of complex logic.

### When to use them

Use Code Wiki and DeepWiki **only after**:

- You have reviewed the relevant sections in this `CUSTOMIZE.md` file
- You have checked the [project structure](#project-structure) section above
- You have explored the [main documentation files](README.md) (README.md, INSTALL.md, FAQ.md)
- You have checked the [GitHub Discussions Q&A section](https://github.com/alshedivat/al-folio/discussions/categories/q-a)

These tools are best used for:

- Understanding the architecture and how different parts of the codebase work together
- Finding where specific functionality is implemented
- Learning about the Jekyll template structure and Liquid syntax used in the theme
- Exploring how specific features are implemented (e.g., how publications are rendered, how search works, etc.)

**Access these tools:**

- **Code Wiki**: [Code Wiki for al-folio](https://codewiki.google/github.com/alshedivat/al-folio)
- **DeepWiki**: [DeepWiki for al-folio](https://deepwiki.com/alshedivat/al-folio)

## Technology Stack

Understanding al-folio's technology stack will help you better customize and extend the theme. This section provides an overview of the key technologies and frameworks used in the project.

### Frontend

- **Markdown**: Content is written in Markdown format for pages, blog posts, and collections. This makes it easy to create and maintain content without worrying about HTML.
- **Liquid templating**: [Liquid](https://shopify.github.io/liquid/) is used for dynamic template generation. Liquid templates are used in the `_layouts/` and `_includes/` directories to define how your content should be displayed.
- **HTML & CSS**: The theme uses semantic HTML5 and modern CSS for styling and layout.
- **SCSS**: Stylesheets are written in [SCSS (Sass)](https://sass-lang.com/), a CSS preprocessor that provides variables, mixins, and functions for more maintainable styling. SCSS files are located in `_sass/` and compiled to CSS during the build process.
- **Bootstrap**: [Bootstrap 4.6](https://getbootstrap.com/docs/4.6/) is used for responsive grid layout and base styling components.
- **JavaScript**: Minimal JavaScript is used for interactive features like the dark mode toggle, search functionality, and dynamic content rendering.
- **MathJax**: For rendering mathematical equations in LaTeX format on your pages and blog posts.
- **Mermaid**: For creating diagrams (flowcharts, sequence diagrams, etc.) directly in Markdown.
- **Font Awesome, Academicons, and Scholar Icons**: Icon libraries used throughout the theme for visual elements.

### Backend

- **Jekyll 4.x**: [Jekyll](https://jekyllrb.com/) is a static site generator written in Ruby that transforms your Markdown files and templates into a static website. Jekyll is used to:
  - Convert Markdown files to HTML
  - Process Liquid templates
  - Manage collections (posts, projects, news, books, etc.)
  - Generate archives and pagination
  - Minify CSS and JavaScript

- **Ruby Gems** (Jekyll plugins): The project uses several Ruby plugins to extend Jekyll's functionality:
  - `classifier-reborn`: Used for categorizing and finding related blog posts
  - `jekyll-archives-v2`: Creates archive pages for posts and collections organized by category, tag, or date
  - `jekyll-feed`: Generates an Atom (RSS-like) feed for your content
  - `jekyll-jupyter-notebook`: Integrates Jupyter notebooks into your site
  - `jekyll-minifier`: Minifies HTML, CSS, and JavaScript for better performance
  - `jekyll-paginate-v2`: Handles pagination for blog posts and archives
  - `jekyll-scholar`: Manages bibliography files (BibTeX) and generates publication pages with citations
  - `jekyll-tabs`: Adds tabbed content support
  - `jekyll-toc`: Automatically generates table of contents for pages with headers
  - `jemoji`: Converts emoji shortcodes to emoji images
  - Other utilities: `jekyll-link-attributes`, `jekyll-imagemagick`, `jekyll-twitter-plugin`, `jekyll-get-json`, and more

- **Python**: Used for utility scripts like citation updates via Google Scholar (located in `bin/`)

### Build and Deployment

- **GitHub Actions**: Automated workflows for building, testing, and deploying your site. Workflows are defined in `.github/workflows/`:
  - **Deploy**: Automatically builds and deploys your site to GitHub Pages when you push changes to the main branch
  - **Link checking**: Validates that all links in your site are not broken
  - **Code formatting**: Ensures code follows the Prettier code style
  - **Accessibility testing**: Checks for accessibility issues using Axe
  - **Lighthouse**: Measures site performance and best practices
  - **Citation updates**: Automatically fetches citation counts from Google Scholar

- **GitHub Pages**: Free hosting for your static website built by Jekyll
- **Docker**: Optional containerization for local development (provides a consistent environment across different machines)
- **Prettier**: Code formatter for Markdown, YAML, and Liquid files to maintain consistent formatting

### Key Integration Points

Understanding how these technologies work together will help you customize al-folio effectively:

1. **Content Creation**: Write content in Markdown
2. **Template Processing**: Jekyll processes Markdown through Liquid templates
3. **Styling**: SCSS files are compiled to CSS, with Bootstrap providing the responsive layout framework
4. **Bibliography**: BibTeX files are processed by jekyll-scholar to generate publication pages
5. **Static Site Generation**: Jekyll builds all files into static HTML
6. **Deployment**: GitHub Actions automatically deploys the built site to GitHub Pages

## Modifying the CV information

Your CV can be created using one of two formats. Choose the format that works best for you, or use both simultaneously by switching between them:

### RenderCV Format (Recommended)

[`_data/cv.yml`](_data/cv.yml) uses the [RenderCV](https://rendercv.com/) YAML format, which is human-readable and designed specifically for generating professional resumes. This format also enables optional automatic PDF generation via GitHub Actions.

**If you choose this format:**

1. Edit your CV data in [`_data/cv.yml`](_data/cv.yml)
2. Optionally customize how the PDF is styled by editing:
   - [`assets/rendercv/design.yaml`](assets/rendercv/design.yaml) — Design and styling
   - [`assets/rendercv/locale.yaml`](assets/rendercv/locale.yaml) — Localization and formatting
   - [`assets/rendercv/settings.yaml`](assets/rendercv/settings.yaml) — RenderCV settings
3. To display only this format, delete [`assets/json/resume.json`](assets/json/resume.json) (optional)

### JSONResume Format

[`assets/json/resume.json`](assets/json/resume.json) uses the [JSONResume](https://jsonresume.org/) standard format, which is compatible with other tools and services.

**If you choose this format:**

1. Edit your CV data in [`assets/json/resume.json`](assets/json/resume.json)
2. To display only this format, delete [`_data/cv.yml`](_data/cv.yml) (optional)

### Using Both Formats Simultaneously

You can keep both [`_data/cv.yml`](_data/cv.yml) and [`assets/json/resume.json`](assets/json/resume.json) in your repository and switch between them on your website by setting the `cv_format` frontmatter variable in [`_pages/cv.md`](_pages/cv.md):

```yaml
---
layout: cv
cv_format: rendercv # options: rendercv or jsonresume
---
```

Change `rendercv` to `jsonresume` to display the JSONResume format instead.

### Automatic PDF Generation (RenderCV only)

If you use the RenderCV format, a GitHub Actions workflow can automatically generate a PDF version of your CV whenever you push changes to [`_data/cv.yml`](_data/cv.yml). The PDF is saved to `assets/rendercv/rendercv_output/`.

**To link the auto-generated PDF to your CV page:**

Set the `cv_pdf` variable in the frontmatter of [`_pages/cv.md`](_pages/cv.md) to point to the generated PDF:

```yaml
---
layout: cv
cv_pdf: /assets/rendercv/rendercv_output/CV.pdf
cv_format: rendercv
---
```

This will add a download button on your CV page that links to the PDF. (The exact filename depends on your RenderCV settings—check the output directory after the first workflow run to see the generated PDF name.)

**To disable automatic PDF generation:**

Delete or comment out the [`.github/workflows/render-cv.yml`](.github/workflows/render-cv.yml) workflow file.

## Modifying the user and repository information

The user and repository information is defined in [\_data/repositories.yml](_data/repositories.yml). You can add as many users and repositories as you want. Both informations are used in the `repositories` section.

### Configuring external service URLs

The repository page uses external services to display GitHub statistics and trophies. By default, these are:

- `github-readme-stats.vercel.app` for user stats and repository cards
- `github-profile-trophy.vercel.app` for GitHub profile trophies

**Important:** These default services are hosted by third parties and may not be available 100% of the time. For better reliability, privacy, and customization, you can self-host these services and configure your website to use your own instances.

To use your own instances of these services, configure the URLs in [\_config.yml](_config.yml):

```yaml
external_services:
  github_readme_stats_url: https://github-readme-stats.vercel.app
  github_profile_trophy_url: https://github-profile-trophy.vercel.app
```

To self-host these services, follow the deployment instructions in their respective repositories:

- [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
- [github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy)

Once deployed, update the URLs above to point to your custom deployment.

## Creating new pages

You can create new pages by adding new Markdown files in the [\_pages](_pages/) directory. The easiest way to do this is to copy an existing page and modify it. You can choose the layout of the page by changing the [layout](https://jekyllrb.com/docs/layouts/) attribute in the [frontmatter](https://jekyllrb.com/docs/front-matter/) of the Markdown file, and also the path to access it by changing the [permalink](https://jekyllrb.com/docs/permalinks/) attribute. You can also add new layouts in the [\_layouts](_layouts/) directory if you feel the need for it.

## Creating new blog posts

To create a new blog post, you can add a new Markdown file in the [\_posts](_posts/) directory, which is the [default location for posts in Jekyll](https://jekyllrb.com/docs/posts/). The [name of the file must follow](https://jekyllrb.com/docs/posts/#creating-posts) the format `YYYY-MM-DD-title.md`. The easiest way to do this is to copy an existing blog post and modify it. Note that some blog posts have optional fields in the [frontmatter](https://jekyllrb.com/docs/front-matter/) that are used to enable specific behaviors or functions.

If you want to create blog posts that are not ready to be published, but you want to track it with git, you can create a [\_drafts](https://jekyllrb.com/docs/posts/#drafts) directory and store them there.

Note that `posts` is also a collection, but it is a default collection created automatically by Jekyll. To access the posts, you can use the `site.posts` variable in your templates.

## Creating new projects

You can create new projects by adding new Markdown files in the [\_projects](_projects/) directory. The easiest way to do this is to copy an existing project and modify it.

## Adding some news

You can add news in the about page by adding new Markdown files in the [\_news](_news/) directory. There are currently two types of news: inline news and news with a link. News with a link take you to a new page while inline news are displayed directly in the about page. The easiest way to create yours is to copy an existing news and modify it.

## Adding Collections

This Jekyll theme implements [collections](https://jekyllrb.com/docs/collections/) to let you break up your work into categories. The theme comes with three default collections: `news`, `projects`, and `books`. Items from the `news` collection are automatically displayed on the home page, while items from the `projects` collection are displayed on a responsive grid on the projects page, and items from the `books` collection are displayed on its own `bookshelf` page inside `submenus`.

You can easily create your own collections for any type of content—teaching materials, courses, apps, short stories, or whatever suits your needs.

### Creating a new collection

To create a new collection, follow these steps. We will create a `courses` collection, but you can replace `courses` with any name you prefer:

1. **Add the collection to `_config.yml`**

   Open the `collections` section in [\_config.yml](_config.yml) and add your new collection:

   ```yaml
   collections:
     news:
       defaults:
         layout: post
       output: true
     projects:
       output: true
     courses:
       output: true
       permalink: /courses/:path/
   ```

   - `output: true` makes the collection items accessible as separate pages
   - `permalink` defines the URL path for each collection item (`:path` is replaced with the filename)
     - Note: You can customize the [permalink structure](https://jekyllrb.com/docs/permalinks/#collections) as needed. If not set, it uses `/COLLECTION_NAME/:name/`.

2. **Create a folder for your collection items**

   Create a new folder in the root directory with an underscore prefix, matching your collection name. For a `courses` collection, create `_courses/`:

   ```text
   _courses/
   ├── course_1.md
   ├── course_2.md
   └── course_3.md
   ```

3. **Create a landing page for your collection**

   Add a Markdown file in `_pages/` (e.g., `courses.md`) that will serve as the main page for your collection. You can use [\_pages/projects.md](_pages/projects.md) or [\_pages/books.md](_pages/books.md) as a template and adapt it for your needs.

   In your landing page, access your collection using the `site.COLLECTION_NAME` variable:

   ```liquid
   {% assign course_items = site.courses | sort: 'date' | reverse %}

   {% for item in course_items %}
     <h3>{{ item.title }}</h3>
     <p>{{ item.content }}</p>
   {% endfor %}
   ```

4. **Add a navigation link to your collection page**

   Update [\_pages/dropdown.md](_pages/dropdown.md) or the navigation configuration of your page. In the frontmatter of your collection landing page (e.g., `_pages/courses.md`), add:

   ```yaml
   nav: true
   nav_order: 5
   ```

   - `nav: true` makes the page appear in the navigation menu
   - `nav_order` sets the position in the menu (1 = first, 2 = second, etc.)

5. **Create collection items**

   Add Markdown files in your new collection folder (e.g., `_courses/`) with appropriate frontmatter and content.

For more information regarding collections, check [Jekyll official documentation](https://jekyllrb.com/docs/collections/) and [step-by-step guide](https://jekyllrb.com/docs/step-by-step/09-collections/).

### Using frontmatter fields in your collection

When creating items in your collection, you can define custom frontmatter fields and use them in your landing page. For example:

```markdown
---
layout: page
title: Introduction to Research Methods
importance: 1
category: methods
---

Course description and content here...
```

Then in your landing page template:

```liquid
{% if item.category == 'methods' %}
  <span class="badge">{{ item.category }}</span>
{% endif %}
```

### Creating a teachings collection

The al-folio theme includes a pre-configured `_teachings/` collection for course pages. Each course is represented by a markdown file with frontmatter metadata. Here's how to add or modify courses:

#### Course file format

Create markdown files in `_teachings/` with the following structure:

```yaml
---
layout: course
title: Course Title
description: Course description
instructor: Your Name
year: 2023
term: Fall
location: Room 101
time: MWF 10:00-11:00
course_id: course-id # This should be unique
schedule:
  - week: 1
    date: Jan 10
    topic: Introduction
    description: Overview of course content and objectives
    materials:
      - name: Slides
        url: /assets/pdf/example_pdf.pdf
      - name: Reading
        url: https://example.com/reading
  - week: 2
    date: Jan 17
    topic: Topic 2
    description: Description of this week's content
---
Additional course content, information, or resources can be added here as markdown.
```

#### Important course collection notes

1. Each course file must have a unique `course_id` in the frontmatter
2. Course files will be grouped by `year` on the teaching page
3. Within each year, courses are sorted by `term`
4. The content below the frontmatter (written in markdown) will appear on the individual course page
5. The schedule section will be automatically formatted into a table

#### Required fields

- `layout: course` — Must be set to use the course layout
- `title` — The course title
- `year` — The year the course was/will be taught (used for sorting)
- `course_id` — A unique identifier for the course

#### Optional fields

- `description` — A brief description of the course
- `instructor` — The course instructor's name
- `term` — The academic term (e.g., Fall, Spring, Summer)
- `location` — The course location
- `time` — The course meeting time
- `schedule` — A list of course sessions with details

### Collections with categories and tags

If you want to add category and tag support (like the blog posts have), you need to configure the `jekyll-archives` section in [\_config.yml](_config.yml). See how this is done with the `books` collection for reference. For more details, check the [jekyll-archives-v2 documentation](https://george-gca.github.io/jekyll-archives-v2/).

### Creating custom metadata groups and archive pages

Beyond the built-in `categories` and `tags` fields, you can create custom metadata fields for your collections to organize content in new ways. For example, if you have a book review collection, you might want to organize books by their **adaptations** (movies, TV shows, video games, etc.).

#### Understanding Jekyll's special handling of fields

Jekyll has **special built-in support** for only two fields:

- **`categories`** – Automatically splits space-separated values into arrays
- **`tags`** – Automatically splits space-separated values into arrays

Custom fields (any field name you create) remain as **strings** and require explicit handling in your Liquid templates.

#### Example: Adding a custom "adaptations" field

1. **Add the field to your collection frontmatter**

   In your collection item (e.g., `_books/the_godfather.md`):

   ```yaml
   ---
   layout: book-review
   title: The Godfather
   author: Mario Puzo
   categories: classics crime historical-fiction
   adaptations: movie TV-series video-game novel-adaptation
   ---
   ```

2. **Handle the custom field in your layout template**

   In your layout file (e.g., `_layouts/book-review.liquid`), custom fields must be **split** into arrays before you can loop over them:

   ```liquid
   {% if page.adaptations %}
     {% assign page_adaptations = page.adaptations | split: ' ' %}
     {% for adaptation in page_adaptations %}
       <a href="{{ adaptation | slugify | prepend: '/books/adaptation/' | relative_url }}">
         <i class="fa-solid fa-film fa-sm"></i> {{ adaptation }}
       </a>
     {% endfor %}
   {% endif %}
   ```

   **Why the `split: ' '` filter?** Because `adaptations` is a custom field, Jekyll doesn't automatically convert it to an array like it does for `categories` and `tags`. The `split: ' '` filter breaks the space-separated string into individual items.

3. **Enable archive pages for your custom field**

   Add your custom field to the `jekyll-archives` configuration in [\_config.yml](_config.yml):

   ```yaml
   jekyll-archives:
     posts:
       enabled:
         - year
         - tags
         - categories
     books:
       enabled:
         - year
         - tags
         - categories
         - adaptations # Add your custom field here
       permalinks:
         year: "/:collection/:year/"
         tags: "/:collection/:type/:name/"
         categories: "/:collection/:type/:name/"
         adaptations: "/:collection/:type/:name/" # Add permalink pattern here
   ```

4. **Test your archive pages**

   After configuration, rebuild your site:

   ```bash
   docker compose down
   docker compose up
   ```

   Your archive pages will be generated at:
   - `/books/adaptations/movie/`
   - `/books/adaptations/tv-series/` (slugified from `TV-series`)
   - `/books/adaptations/video-game/` (slugified from `video-game`)

   Each page will automatically display all items with that adaptation value.

#### Field naming best practices

- Use **lowercase** words separated by **hyphens** for multi-word values: `live-action`, `video-game`, `TV-series`
- Choose **meaningful names** that describe the grouping: `genres`, `adaptations`, `media-types`, `settings`, etc.
- Keep field values **short and consistent** across all items in your collection
- Document custom fields in a README or comments for other contributors to understand

#### Complete example: Book reviews with custom adaptations field

**File: `_books/the_godfather.md`**

```yaml
---
layout: book-review
title: The Godfather
author: Mario Puzo
categories: classics crime historical-fiction
tags: top-100
adaptations: movie TV-series video-game
---
```

**File: `_layouts/book-review.liquid` (partial)**

```liquid
{% if page.adaptations %}
  <div class="adaptations">
    <strong>Adaptations:</strong>
    {% assign page_adaptations = page.adaptations | split: ' ' %}
    {% for adaptation in page_adaptations %}
      <a href="{{ adaptation | slugify | prepend: '/books/adaptation/' | relative_url }}">
        {{ adaptation }}
      </a>
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  </div>
{% endif %}
```

**File: `_config.yml` (jekyll-archives section)**

```yaml
jekyll-archives:
  books:
    enabled:
      - year
      - categories
      - tags
      - adaptations
    permalinks:
      year: "/:collection/:year/"
      categories: "/:collection/:type/:name/"
      tags: "/:collection/:type/:name/"
      adaptations: "/:collection/:type/:name/"
```

After rebuilding, users can browse books by adaptation at `/books/adaptations/movie/`, etc.

## Adding a new publication

To add publications create a new entry in the [\_bibliography/papers.bib](_bibliography/papers.bib) file. You can find the BibTeX entry of a publication in Google Scholar by clicking on the quotation marks below the publication title, then clicking on "BibTeX", or also in the conference page itself. By default, the publications will be sorted by year and the most recent will be displayed first. You can change this behavior and more in the `Jekyll Scholar` section in [\_config.yml](_config.yml) file.

You can add extra information to a publication, like a PDF file in the `assets/pdfs/` directory and add the path to the PDF file in the BibTeX entry with the `pdf` field. Some of the supported fields are: `abstract`, `altmetric`, `annotation`, `arxiv`, `bibtex_show`, `blog`, `code`, `dimensions`, `doi`, `eprint`, `hal`, `html`, `isbn`, `pdf`, `pmid`, `poster`, `slides`, `supp`, `video`, and `website`.

### Author annotation

In publications, the author entry for yourself is identified by string array `scholar:last_name` and string array `scholar:first_name` in [\_config.yml](_config.yml). For example, if you have the following entry in your [\_config.yml](_config.yml):

```yaml
scholar:
  last_name: [Einstein]
  first_name: [Albert, A.]
```

If the entry matches one form of the last names and the first names, it will be underlined. Keep meta-information about your co-authors in [\_data/coauthors.yml](_data/coauthors.yml) and Jekyll will insert links to their webpages automatically. The co-author data format is as follows, with the last names lower cased and without accents as the key:

```yaml
"adams":
  - firstname: ["Edwin", "E.", "E. P.", "Edwin Plimpton"]
    url: https://en.wikipedia.org/wiki/Edwin_Plimpton_Adams

"podolsky":
  - firstname: ["Boris", "B.", "B. Y.", "Boris Yakovlevich"]
    url: https://en.wikipedia.org/wiki/Boris_Podolsky

"rosen":
  - firstname: ["Nathan", "N."]
    url: https://en.wikipedia.org/wiki/Nathan_Rosen

"bach":
  - firstname: ["Johann Sebastian", "J. S."]
    url: https://en.wikipedia.org/wiki/Johann_Sebastian_Bach

  - firstname: ["Carl Philipp Emanuel", "C. P. E."]
    url: https://en.wikipedia.org/wiki/Carl_Philipp_Emanuel_Bach
```

If the entry matches one of the combinations of the last names and the first names, it will be highlighted and linked to the url provided. Note that the keys **MUST BE** lower cased and **MUST NOT** contain accents. This is because the keys are used to match the last names in the BibTeX entries, considering possible variations (see [related discussion](https://github.com/alshedivat/al-folio/discussions/2213)).

### Buttons (through custom bibtex keywords)

There are several custom bibtex keywords that you can use to affect how the entries are displayed on the webpage:

- `abbr`: Adds an abbreviation to the left of the entry. You can add links to these by creating a venue.yaml-file in the \_data folder and adding entries that match.
- `abstract`: Adds an "Abs" button that expands a hidden text field when clicked to show the abstract text
- `altmetric`: Adds an [Altmetric](https://www.altmetric.com/) badge (Note: if DOI is provided just use `true`, otherwise only add the altmetric identifier here - the link is generated automatically)
- `annotation`: Adds a popover info message to the end of the author list that can potentially be used to clarify superscripts. HTML is allowed.
- `arxiv`: Adds a link to the Arxiv website (Note: only add the arxiv identifier here - the link is generated automatically)
- `bibtex_show`: Adds a "Bib" button that expands a hidden text field with the full bibliography entry
- `blog`: Adds a "Blog" button redirecting to the specified link
- `code`: Adds a "Code" button redirecting to the specified link
- `dimensions`: Adds a [Dimensions](https://www.dimensions.ai/) badge (Note: if DOI or PMID is provided just use `true`, otherwise only add the Dimensions' identifier here - the link is generated automatically)
- `hal`: Adds a link to the HAL website (Note: only add the hal identifier (hal-xxx or tel-xxx) here - the link is generated automatically)
- `html`: Inserts an "HTML" button redirecting to the user-specified link
- `pdf`: Adds a "PDF" button redirecting to a specified file (if a full link is not specified, the file will be assumed to be placed in the /assets/pdf/ directory)
- `poster`: Adds a "Poster" button redirecting to a specified file (if a full link is not specified, the file will be assumed to be placed in the /assets/pdf/ directory)
- `slides`: Adds a "Slides" button redirecting to a specified file (if a full link is not specified, the file will be assumed to be placed in the /assets/pdf/ directory)
- `supp`: Adds a "Supp" button to a specified file (if a full link is not specified, the file will be assumed to be placed in the /assets/pdf/ directory)
- `website`: Adds a "Website" button redirecting to the specified link

You can implement your own buttons by editing the [\_layouts/bib.liquid](_layouts/bib.liquid) file.

## Changing theme color

A variety of beautiful theme colors have been selected for you to choose from. The default is purple, but you can quickly change it by editing the `--global-theme-color` variable in the [\_sass/\_themes.scss](_sass/_themes.scss) file. Other color variables are listed there as well. The stock theme color options available can be found at [\_sass/\_variables.scss](_sass/_variables.scss). You can also add your own colors to this file assigning each a name for ease of use across the template.

## Customizing layout and UI

You can customize the layout and user interface in [\_config.yml](_config.yml):

```yaml
back_to_top: true
footer_fixed: true
max_width: 930px
navbar_fixed: true
```

- `back_to_top`: Displays a "back to top" button in the footer. When clicked, it smoothly scrolls the page back to the top.
- `footer_fixed`: When `true`, the footer remains fixed at the bottom of the viewport. When `false`, it appears at the end of the page content.
- `max_width`: Controls the maximum width of the main content area in pixels. The default is `930px`. You can adjust this to make your content wider or narrower.
- `navbar_fixed`: When `true`, the navigation bar stays fixed at the top of the page when scrolling. When `false`, it scrolls with the page content.

## Adding social media information

Social media information is managed through the [`jekyll-socials` plugin](https://github.com/george-gca/jekyll-socials). To add your social media links:

1. Edit [`_data/socials.yml`](_data/socials.yml) to add your social profiles
2. The plugin will automatically display the social icons based on the order they are defined in the file (see the comments at the top of `_data/socials.yml`)

The template supports icons from:

- [Academicons](https://jpswalsh.github.io/academicons/)
- [Font Awesome](https://fontawesome.com/)
- [Scholar Icons](https://louisfacun.github.io/scholar-icons/)

Social media links will appear at the bottom of the `About` page and in the search results by default. You can customize this behavior in [`_config.yml`](_config.yml):

- `enable_navbar_social: true` – Display social links in the navigation bar
- `socials_in_search: false` – Remove social links from search results

For more details, see the [`jekyll-socials` documentation](https://github.com/george-gca/jekyll-socials).

## Adding a newsletter

You can add a newsletter subscription form by adding the specified information at the `newsletter` section in the [\_config.yml](_config.yml) file. To set up a newsletter, you can use a service like [Loops.so](https://loops.so/), which is the current supported solution. Once you have set up your newsletter, you can add the form [endpoint](https://loops.so/docs/forms/custom-form) to the `endpoint` field in the `newsletter` section of the [\_config.yml](_config.yml) file.

Depending on your specified footer behavior, the sign up form either will appear at the bottom of the `About` page and at the bottom of blogposts if `related_posts` are enabled, or in the footer at the bottom of each page.

## Configuring search features

The theme includes a powerful search functionality that can be customized in [\_config.yml](_config.yml):

```yaml
bib_search: true
posts_in_search: true
search_enabled: true
socials_in_search: true
```

- `bib_search`: Enables search within your publications/bibliography. When enabled, a search box appears on the publications page, allowing visitors to filter publications by title, author, venue, or year.
- `posts_in_search`: Includes blog posts in the search index. Users can search for posts by title, content, or tags.
- `search_enabled`: Enables the site-wide search feature. When enabled, a search box appears in the navigation bar, allowing users to search across your site content.
- `socials_in_search`: Includes your social media links and contact information in search results. This makes it easier for visitors to find ways to connect with you.

All these search features work in real-time and do not require a page reload.

## Social media previews

**al-folio** supports Open Graph (OG) meta tags, which create rich preview objects when your pages are shared on social media platforms like Twitter, Facebook, LinkedIn, and others. These previews include your site's image, title, and description.

### How to enable

To enable social media previews:

1. Open `_config.yml` and set:

   ```yaml
   serve_og_meta: true
   ```

2. Rebuild your site:
   ```bash
   docker compose down && docker compose up
   # or
   bundle exec jekyll serve
   ```

Once enabled, all your site's pages will automatically include Open Graph meta tags in the HTML head element.

### Configuring preview images

You can configure what image displays in social media previews on a per-page or site-wide basis.

**Site-wide default image:**

Add the following to `_config.yml`:

```yaml
og_image: /assets/img/your-default-preview-image.png
```

Replace the path with your actual image location in `assets/img/`.

**Per-page custom image:**

To override the site-wide default for a specific page, add `og_image` to the page's frontmatter:

```yaml
---
layout: page
title: My Page
og_image: /assets/img/custom-preview-image.png
---
```

### Preview image best practices

- **Dimensions:** Use 1200×630 pixels for optimal display on most social media platforms
- **Format:** PNG or JPG formats work best
- **Size:** Keep file size under 5MB
- **Content:** Ensure the image clearly represents your page content

When a page is shared on social media, the platform will display your configured image along with the page title, description (from your site title or page description), and URL.

---

## Related posts

The theme can automatically display related posts at the bottom of each blog post. These are selected by finding the most recent posts that share common tags with the current post.

### How it works

- By default, the most recent posts that share at least one tag with the current post are displayed
- You can customize how many posts are shown and how many tags must match
- You can disable related posts for individual posts or across your entire site

### Configuration

To customize related posts behavior, edit the `related_blog_posts` section in `_config.yml`:

```yaml
related_blog_posts:
  enabled: true
  max_related: 5
```

- `enabled`: Set to `true` (default) to show related posts, or `false` to disable them site-wide
- `max_related`: Maximum number of related posts to display (default: 5)

The theme also uses tags to find related content. Make sure your blog posts include relevant tags in their frontmatter:

```yaml
---
layout: post
title: My Blog Post
tags: machine-learning python
---
```

### Disable related posts for a specific post

To hide related posts on an individual blog post, add this to the post's frontmatter:

```yaml
---
layout: post
title: My Blog Post
related_posts: false
---
```

### Additional configuration in \_config.yml

You can also customize related posts behavior with these settings:

```yaml
related_blog_posts:
  enabled: true
  max_related: 5
```

These settings control:

- Which posts are considered "related" (based on shared tags)
- How many related posts to display
- The algorithm used to calculate post similarity (uses the `classifier-reborn` gem)

---

## Managing publication display

The theme offers several options for customizing how publications are displayed:

```yaml
enable_publication_thumbnails: true
max_author_limit: 3
more_authors_animation_delay: 10
```

- `enable_publication_thumbnails`: When `true`, displays preview images for publications (if specified in the BibTeX entry with the `preview` field). Set to `false` to disable thumbnails for all publications.
- `max_author_limit`: Sets the maximum number of authors shown initially for each publication. If a publication has more authors, they are hidden behind a "more authors" link. Leave blank to always show all authors.
- `more_authors_animation_delay`: Controls the animation speed (in milliseconds) when revealing additional authors. A smaller value means faster animation.

To add a thumbnail to a publication, include a `preview` field in your BibTeX entry:

```bibtex
@article{example2024,
  title={Example Paper},
  author={Author, First and Author, Second},
  journal={Example Journal},
  year={2024},
  preview={example_preview.png}
}
```

Place the image file in `assets/img/publication_preview/`.

## Adding a Google Calendar

You can embed a Google Calendar on any page by using the `calendar.liquid` include.

### Basic usage

Add the following to your page's Markdown file (for example, in `_pages/teaching.md`):

```liquid
{% include calendar.liquid calendar_id='your-calendar-id@group.calendar.google.com' timezone='Your/Timezone' %}
```

Replace:

- `your-calendar-id@group.calendar.google.com` with your actual Google Calendar ID (found in Google Calendar Settings → Integrate calendar → Calendar ID)
- `Your/Timezone` with your timezone (e.g., `UTC`, `Asia/Shanghai`, `America/New_York`). The default is `UTC`.

### Enable the calendar script for your page

To enable the calendar on your page, add `calendar: true` to the frontmatter:

```yaml
---
layout: page
title: teaching
calendar: true
---
```

This setting prevents unnecessary script loading for pages that don't display a calendar.

### Optional: Customize the calendar style

You can optionally customize the iframe styling using the `style` parameter:

```liquid
{% include calendar.liquid calendar_id='your-calendar-id@group.calendar.google.com' timezone='UTC' style='border:0; width:100%; height:800px;' %}
```

The default style is `border:0; width:100%; height:600px;`.

## Updating third-party libraries

The theme uses various third-party JavaScript and CSS libraries. You can manage these in the `third_party_libraries` section of [\_config.yml](_config.yml):

```yaml
third_party_libraries:
  download: false
  bootstrap-table:
    version: "1.22.4"
    url:
      css: "https://cdn.jsdelivr.net/npm/bootstrap-table@{{version}}/dist/bootstrap-table.min.css"
      js: "https://cdn.jsdelivr.net/npm/bootstrap-table@{{version}}/dist/bootstrap-table.min.js"
    integrity:
      css: "sha256-..."
      js: "sha256-..."
```

- `download`: When `false` (default), libraries are loaded from CDNs. When `true`, the specified library versions are downloaded during build and served from your site. This can improve performance but increases your repository size.
- `version`: Specifies which version of each library to use. Update this to use a newer version.
- `url`: Template URLs for loading the library. The `{{version}}` placeholder is replaced with the version number automatically.
- `integrity`: [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) hashes ensure that the library hasn't been tampered with. When updating a library version, you should also update its integrity hash.

To update a library:

1. Change the `version` number
2. Obtain the new integrity hash for the updated library version and update the `integrity` field with the new hash. You can:
   - Check if the CDN provider (e.g., jsDelivr, cdnjs, unpkg) provides the SRI hash for the file. Many CDN sites display the SRI hash alongside the file URL.
   - Generate the SRI hash yourself using a tool such as [SRI Hash Generator](https://www.srihash.org/) or by running the following command in your terminal:

     ```bash
     curl -sL [FILE_URL] | openssl dgst -sha384 -binary | openssl base64 -A
     ```

     Replace `[FILE_URL]` with the URL of the library file. Then, prefix the result with `sha384-` and use it in the `integrity` field.
     For detailed instructions on updating specific libraries, see the FAQ:
     - [How can I update Academicons version](FAQ.md#how-can-i-update-academicons-version-on-the-template)
     - [How can I update Font Awesome version](FAQ.md#how-can-i-update-font-awesome-version-on-the-template)

## Removing content

Since this template has a lot of content, you may want to remove some of it. The easiest way to achieve this and avoid merge conflicts when updating your code (as [pointed by CheariX ](https://github.com/alshedivat/al-folio/pull/2933#issuecomment-2571271117)) is to add the unwanted files to the `exclude` section in your `_config.yml` file instead of actually deleting them, for example:

```yml
exclude:
  - _news/announcement_*.md
  - _pages/blog.md
  - _posts/
  - _projects/?_project.md
  - assets/jupyter/blog.ipynb
```

Here is a list of the main components that you may want to delete, and how to do it. Don't forget if you delete a page to update the `nav_order` of the remaining pages.

### Removing the blog page

To remove the blog, you have to:

- delete [\_posts](_posts/) directory
- delete blog page [\_pages/blog.md](_pages/blog.md)
- remove reference to blog page in our [\_pages/dropdown.md](_pages/dropdown.md)
- remove the `latest_posts` part in [\_pages/about.md](_pages/about.md)
- remove the `Blog` section in the [\_config.yml](_config.yml) file and the related parts, like the `jekyll-archives`

You can also:

- delete [\_includes/latest_posts.liquid](_includes/latest_posts.liquid)
- delete [\_includes/related_posts.liquid](_includes/related_posts.liquid)
- delete [\_layouts/archive.liquid](_layouts/archive.liquid) (unless you have a custom collection that uses it)
- delete [\_plugins/external-posts.rb](_plugins/external-posts.rb)
- remove the `jekyll-archives-v2` gem from the [Gemfile](Gemfile) and the `plugins` section in [\_config.yml](_config.yml) (unless you have a custom collection that uses it)
- remove the `classifier-reborn` gem from the [Gemfile](Gemfile)

### Removing the news section

To remove the news section, you can:

- delete the [\_news](_news/) directory
- delete the file [\_includes/news.liquid](_includes/news.liquid) and the references to it in the [\_pages/about.md](_pages/about.md)
- remove the `announcements` part in [\_pages/about.md](_pages/about.md)
- remove the news part in the `Collections` section in the [\_config.yml](_config.yml) file

### Removing the projects page

To remove the projects, you can:

- delete the [\_projects](_projects/) directory
- delete the projects page [\_pages/projects.md](_pages/projects.md)
- remove reference to projects page in our [\_pages/dropdown.md](_pages/dropdown.md)
- remove projects part in the `Collections` section in the [\_config.yml](_config.yml) file

You can also:

- delete [\_includes/projects_horizontal.liquid](_includes/projects_horizontal.liquid)
- delete [\_includes/projects.liquid](_includes/projects.liquid)

### Removing the publications page

To remove the publications, you can:

- delete the [\_bibliography](_bibliography/) directory
- delete the publications page [\_pages/publications.md](_pages/publications.md)
- remove reference to publications page in our [\_pages/dropdown.md](_pages/dropdown.md)
- remove `Jekyll Scholar` section in the [\_config.yml](_config.yml) file

You can also:

- delete the [\_layouts/bib.liquid](_layouts/bib.liquid) file
- delete [\_includes/bib_search.liquid](_includes/bib_search.liquid)
- delete [\_includes/citation.liquid](_includes/citation.liquid)
- delete [\_includes/selected_papers.liquid](_includes/selected_papers.liquid)
- delete [\_plugins/google-scholar-citations.rb](_plugins/google-scholar-citations.rb)
- delete [\_plugins/hide-custom-bibtex.rb](_plugins/hide-custom-bibtex.rb)
- delete [\_plugins/inspirehep-citations.rb](_plugins/inspirehep-citations.rb)
- remove the `jekyll-scholar` gem from the [Gemfile](Gemfile) and the `plugins` section in [\_config.yml](_config.yml)

### Removing the repositories page

To remove the repositories, you can:

- delete the repositories page [\_pages/repositories.md](_pages/repositories.md)
- delete [\_includes/repository/](_includes/repository/) directory

### You can also remove pages through commenting out front-matter blocks

For `.md` files in [\_pages](_pages/) directory, if you do not want to completely edit or delete them but save for later use, you can temporarily disable these variables. But be aware that Jekyll only recognizes front matter when it appears as uncommented. The layout, permalink, and other front-matter behavior are disabled for that file.

For example, books.md do:

```md
<!-- ---
layout: book-shelf
title: bookshelf
permalink: /books/
nav: true
collection: books
--- -->

> What an astonishing thing a book is. It's a flat object made from a tree with flexible parts on which are imprinted lots of funny dark squiggles. But one glance at it and you're inside the mind of another person, maybe somebody dead for thousands of years. Across the millennia, an author is speaking clearly and silently inside your head, directly to you. Writing is perhaps the greatest of human inventions, binding together people who never knew each other, citizens of distant epochs. Books break the shackles of time. A book is proof that humans are capable of working magic.
>
> -- Carl Sagan, Cosmos, Part 11: The Persistence of Memory (1980)

## Books that I am reading, have read, or will read
```

## Adding Token for Lighthouse Badger

To add secrets for [lighthouse-badger](https://github.com/alshedivat/al-folio/actions/workflows/lighthouse-badger.yml), create a [personal access token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) and add it as a [secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-encrypted-secrets-for-a-repository) named `LIGHTHOUSE_BADGER_TOKEN` to your repository. The [lighthouse-badger documentation](https://github.com/MyActionWay/lighthouse-badger-workflows#lighthouse-badger-easyyml) specifies using an environment variable, but using it as a secret is more secure and appropriate for a PAT.

Also In case you face the error: "Input required and not supplied: token" in the Lighthouse Badger action, this solution resolves it.

### Personal Access Token (fine-grained) Permissions for Lighthouse Badger:

- **contents**: access: read and write
- **metadata**: access: read-only

Due to the necessary permissions (PAT and others mentioned above), it is recommended to use it as a secret rather than an environment variable.

## Customizing fonts, spacing, and more

The `_sass/` directory contains specialized SCSS files organized by feature and usage. To customize fonts, spacing, colors, and other styles, edit the relevant file based on what you're modifying:

- **Typography:** Edit `_typography.scss` to change fonts, heading styles, links, tables, and blockquotes.
- **Navigation:** Edit `_navbar.scss` to customize the navigation bar and dropdown menus.
- **Colors and themes:** Edit `_themes.scss` to change theme colors and `_variables.scss` for global variables.
- **Blog styles:** Edit `_blog.scss` to customize blog post listings, tags, and pagination.
- **Publications:** Edit `_publications.scss` to modify bibliography and publication display styles.
- **Components:** Edit `_components.scss` to customize reusable components like cards, profiles, and projects.
- **Code and utilities:** Edit `_utilities.scss` for code highlighting, forms, modals, and animations.
- **Layout:** Edit `_layout.scss` for overall page layout styles.

The easiest way to preview changes in advance is by using [Chrome dev tools](https://developer.chrome.com/docs/devtools/css) or [Firefox dev tools](https://firefox-source-docs.mozilla.org/devtools-user/). Inspect elements to see which styles apply and experiment with changes before editing the SCSS files. For more information on how to use these tools, check [Chrome](https://developer.chrome.com/docs/devtools/css) and [Firefox](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_and_edit_css/index.html) how-tos, and [this tutorial](https://www.youtube.com/watch?v=l0sgiwJyEu4).

## Scheduled Posts

`al-folio` contains a workflow which automatically publishes all posts scheduled at a specific day, at the end of the day (23:30). By default the action is disabled, and to enable it you need to go to `.github/workflows/` and find the file called `schedule-posts.txt`. This is the workflow file. For GitHub to recognize it as one (or to enable the action), you need to rename it to `schedule-posts.yml`.

In order to use this you need to save all of your "Completed" blog posts which are scheduled to be uploaded on a specific date, in a folder named `_scheduled/` in the root directory.

> Incomplete posts should be saved in `_drafts/`

### Name Format

In this folder you need to store your file in the same format as you would in `_posts/`

> Example file name: `2024-08-26-This file will be uploaded on 26 August.md`

### Important Notes

- The scheduler uploads posts everyday at 🕛 23:30 UTC
- It will only upload posts at 23:30 UTC of their respective scheduled days, It's not uploaded in 23:59 in case there are a lot of files as the scheduler must finish before 00:00
- It will only upload files which follow the pattern `yyyy-mm-dd-title.md`
  - This means that only markdown files will be posted
  - It means that any markdown which do not follow this pattern will not be posted
- The scheduler works by moving posts from the `_scheduled/` directory to `_posts/`, it will not post to folders like `_projects/` or `_news/`
- The date in the name of the file is the day that file will be uploaded on
  - `2024-08-27-file1.md` will not be posted before or after 27-August-2024 (Scheduler only works for posts scheduled on the present day)
  - `2025-08-27-file2.md` will be posted exactly on 27-August-2025
  - `File3.md` will not be posted at all
  - `2026-02-31-file4.md` is supposed to be posted on 31-February-2026, but there is no 31st in February hence this file will never be posted either

## GDPR Cookie Consent Dialog

**al-folio** includes a built-in GDPR-compliant cookie consent dialog to help you respect visitor privacy and comply with privacy regulations (GDPR, CCPA, etc.). The feature is powered by [Vanilla Cookie Consent](https://cookieconsent.orestbida.com/) and integrates with all analytics providers.

### How it works

- A consent dialog appears on the visitor's first visit to your site
- Visitors can **accept all**, **reject all**, or **customize preferences** for analytics cookies
- Analytics scripts (Google Analytics, Cronitor, Pirsch, Openpanel) are **blocked by default** and only run after explicit consent
- Google Consent Mode ensures Google services operate in privacy mode before consent is granted
- User preferences are saved in their browser and respected on subsequent visits
- The dialog is mobile-responsive and supports multiple languages

### When to use

- ✅ **Required** if your site serves EU visitors and uses any analytics
- ✅ Recommended for any website using analytics, tracking, or marketing tools
- ❌ Not needed if your site doesn't use any analytics providers

### How to enable

1. Open `_config.yml` and locate the following line:

   ```yaml
   enable_cookie_consent: false
   ```

2. Change it to:

   ```yaml
   enable_cookie_consent: true
   ```

3. Rebuild your site:

   ```bash
   docker compose down && docker compose up
   # or
   bundle exec jekyll serve
   ```

4. The consent dialog will automatically appear on your site's homepage on first visit

### Customizing the consent dialog

The consent dialog configuration and messages are defined in [`_scripts/cookie-consent-setup.js`](_scripts/cookie-consent-setup.js). You can customize:

- Dialog titles and button labels
- Cookie categories and descriptions
- Contact information links (points to `#contact` by default)
- Language translations

To modify the dialog, edit the `language.translations.en` section in `_scripts/cookie-consent-setup.js`. For example, to change the consent dialog title:

```javascript
consentModal: {
  title: 'Your custom title here',
  description: 'Your custom description...',
  // ... other options
}
```

### Supported analytics providers

When cookie consent is enabled, these analytics providers are automatically blocked until the user consents:

- **Google Analytics (GA4)** – Uses Google Consent Mode for privacy-first operation before consent
- **Cronitor RUM** – Real User Monitoring for performance tracking
- **Pirsch Analytics** – GDPR-compliant analytics alternative
- **Openpanel Analytics** – Privacy-focused analytics platform

Each provider only collects data if:

1. It's enabled in `_config.yml` (e.g., `enable_google_analytics: true`)
2. The user has granted consent to the "analytics" category in the consent dialog

### How it integrates with analytics

When `enable_cookie_consent: true`, the template automatically:

1. Adds `type="text/plain" data-category="analytics"` to all analytics script tags
2. This tells the cookie consent library to block these scripts until consent is granted
3. Loads the consent library and initializes Google Consent Mode
4. Updates consent preferences when the user changes them in the dialog

You don't need to modify any analytics configuration—it works automatically.

### For developers

If you want to programmatically check consent status or react to consent changes, the library exposes the following:

```javascript
// Check if user has granted analytics consent
window.CookieConsent.getCategories().analytics; // returns true or false

// Listen for consent changes
window.CookieConsent.onChange(function (consentData) {
  // Handle consent change
});
```

For more API details, see [Vanilla Cookie Consent documentation](https://cookieconsent.orestbida.com/).

---

## Setting up a Personal Access Token (PAT) for Google Scholar Citation Updates

> [!TIP]
> After setting up al-folio you may want to run `python3 bin/update_citations.py` to fill the `_data/citations.yml` file with your Google Scholar citation counts.

This project includes an automated workflow to update the citation counts for your publications using Google Scholar.
The workflow commits changes to `_data/citations.yml` directly to the `main` branch.
By default, the `GITHUB_TOKEN` will be used to commit the changes.
However, this token does not have permission to trigger subsequent workflows, such as the site rebuild workflow.
In order to deploy the changes from `main`, you can manually trigger the `deploy` workflow.

> [!TIP]
> To ensure that these commits can trigger further GitHub Actions workflows (such as site rebuilds), you can use a Personal Access Token (PAT) instead of the default GitHub Actions token.
> If you have set up a PAT, citation updates will trigger further workflows (such as site rebuilds) after committing changes. In order to run the action with a PAT, you need to uncomment the following lines from the workflow file (`update-citations.yml`):
>
> ```yaml
> with:
>   token: ${{ secrets.PAT }}
> ```

### Why is a PAT required?

GitHub restricts the default `GITHUB_TOKEN` from triggering other workflows when a commit is made from within a workflow. Using a PAT overcomes this limitation and allows for full automation.

### How to set up the PAT

1. **Create a Personal Access Token**
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens).
   - Click "Generate new token" (classic or fine-grained).
   - Grant at least the following permissions:
     - `repo` (for classic tokens if repo is private), `public_repo` (for classic tokens if repo is public) or `contents: read/write` (for fine-grained tokens)
   - Save the token somewhere safe.

2. **Add the PAT as a repository secret**
   - Go to your repository on GitHub.
   - Navigate to `Settings` > `Secrets and variables` > `Actions` > `New repository secret`.
   - Name the secret `PAT` (must match the name used in the workflow).
   - Paste your PAT and save.

3. **Workflow usage**
   The workflow `.github/workflows/update-citations.yml` uses this PAT to commit updates to `_data/citations.yml`.
