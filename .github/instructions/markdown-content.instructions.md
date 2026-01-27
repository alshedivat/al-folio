---
applyTo: "_books/**/*.md,_news/**/*.md,_pages/**/*.md,_posts/**/*.md,_projects/**/*.md,_teachings/**/*.md"
---

# Content Files (Markdown) Instructions

## File Organization

Content in al-folio is organized by type:

- **\_books/** – Book reviews and summaries
- **\_news/** – News/announcements
- **\_pages/** – Static pages (about, CV, publications, projects, etc.)
- **\_posts/** – Blog posts (format: `YYYY-MM-DD-title.md`)
- **\_projects/** – Project showcase entries
- **\_teachings/** – Course and teaching information

## Frontmatter Structure

Every markdown file requires YAML frontmatter at the top. The structure varies by content type.

### Book Frontmatter (\_books/)

```yaml
---
layout: book-review
title: Book Title
author: Book Author Name
publisher: Publisher Name
year: 2023
rating: 8/10
img: /assets/img/book-cover.jpg
---
```

### News Frontmatter (\_news/)

```yaml
---
layout: post
title: News Title
date: YYYY-MM-DD
---
```

### Page Frontmatter (\_pages/)

```yaml
---
layout: page
title: Page Title
permalink: /pathname/
description: Brief description for metadata
---
```

### Blog Post Frontmatter (\_posts/)

```yaml
---
layout: post
title: Post Title
date: YYYY-MM-DD
categories: category-name
description: Brief description
---
```

**Important:** Post filenames MUST follow format: `YYYY-MM-DD-title.md` (hyphen-separated words)

### Project Frontmatter (\_projects/)

```yaml
---
layout: page
title: Project Name
description: Short description
img: /assets/img/project-image.jpg
importance: 1
---
```

### Teaching/Course Frontmatter (\_teachings/)

```yaml
---
layout: page
title: Course Title
description: Course description
---
```

## Special Frontmatter Fields

### For Books

- **author:** Author name or comma-separated list
- **publisher:** Publisher name
- **year:** Publication year
- **rating:** Personal rating (e.g., `8/10`)
- **img:** Path to book cover image (`/assets/img/...`)

### For Blog Posts

- **categories:** Tag for post organization (single word, no spaces)
- **related_posts:** Set to `false` to disable related posts display (useful for short posts)

### For Projects

- **importance:** Integer (1, 2, 3...) – higher = featured first
- **img:** Path to thumbnail image (`/assets/img/...`)
- **featured:** Set to `true` to display on main projects section

### Date Format

Always use ISO 8601: `YYYY-MM-DD` (e.g., `2023-12-25`)

## Markdown Content

### Basic Markdown Syntax

```markdown
# Heading 1

## Heading 2

### Heading 3

**bold text**
_italic text_
`inline code`

- List item 1
- List item 2

[Link text](https://url.com)

![Image alt text](/path/to/image.jpg)
```

### al-folio-Specific Features

#### Includes/Shortcodes

- `{% include figure.liquid ... %}` – Responsive images with captions
- `{% include audio.liquid ... %}` – Audio player
- `{% include video.liquid ... %}` – Video player
- `{% include bib_search.liquid ... %}` – Bibliography search
- `{% include calendar.liquid ... %}` – Event calendar

#### Math Support

```markdown
Inline: $E = mc^2$

Display mode:
$$\int_0^1 f(x) dx$$
```

#### Code Blocks

````markdown
```python
def hello():
    print("Hello, world!")
```
````

#### Blockquotes

```markdown
> This is a quote
>
> > Nested quote
```

### Jekyll Features Available

- **Liquid variables:** `{{ site.title }}`, `{{ page.title }}`
- **Collections:** `{{ site.posts }}`, `{{ site.projects }}`
- **Filters:** `| date: format`, `| where: key value`
- **Tags:** `{% if condition %} ... {% endif %}`

## Common Content Patterns

### Creating a Blog Post

1. Create file: `_posts/YYYY-MM-DD-my-post.md`
2. Add frontmatter with `layout: post`, `title`, `date`, `categories`
3. Write markdown content
4. Test: `docker compose up` → http://localhost:8080/blog
5. Post will appear in reverse chronological order

### Creating a Project Entry

1. Create file: `_projects/project-name.md`
2. Add frontmatter with `layout: page`, `title`, `description`, `img`, `importance`
3. Write markdown content describing the project
4. Test: `docker compose up` → http://localhost:8080/projects

### Adding Images

```markdown
{% include figure.liquid path="/assets/img/example.jpg" title="Image caption" %}
```

### Linking to Other Pages

```markdown
[About Me](/about/)
[My CV](/cv/)
[Blog Post]({% link _posts/2023-01-15-my-post.md %})
```

## Testing & Validation

### Before Committing

1. **Frontmatter syntax:** Verify YAML is valid (no unclosed quotes, proper indentation)
2. **Date format:** Check `YYYY-MM-DD` format is correct
3. **Build test:**
   ```bash
   docker compose down
   docker compose up
   # Wait for "Server running" message
   # Navigate to your content in browser
   # Verify formatting, images, and links work
   ```

### Common Issues

- **Post not appearing:** Check `date` is today or earlier, filename format is correct
- **Images not loading:** Verify path starts with `/assets/`, file exists
- **Related posts error:** Content has no meaningful words; add more text or set `related_posts: false`

## File Naming Conventions

### Blog Posts

- Format: `YYYY-MM-DD-title-with-hyphens.md`
- Example: `2023-12-25-christmas-post.md`
- Words separated by hyphens, no spaces

### Projects

- Format: `project-name.md`
- Example: `my-research-project.md`
- Use hyphens for readability

### Pages

- Format: `descriptive-name.md`
- Example: `about.md`, `teaching.md`, `cv.md`

## Markdown Linting & Formatting

The Prettier formatter applies to markdown files:

- **Line length:** Soft wrap at 88 characters
- **Lists:** Consistent bullet formatting
- **Code blocks:** Proper fence syntax
- **Spacing:** Consistent blank lines

**Always run before committing:**

```bash
npx prettier --write .
```

## Trust These Instructions

When creating or editing content:

- Follow the frontmatter structure for your content type
- Test locally with `docker compose up` to verify appearance
- Check date format, filename format, and image paths
- Only search for advanced features if frontmatter or markdown error messages appear
