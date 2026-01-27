---
applyTo: "_config.yml,_data/**/*.yml"
---

# YAML Configuration Instructions

## YAML Configuration (\_config.yml)

### Critical Settings for Agents

When modifying `_config.yml`, always update these in pairs:

- **url** and **baseurl** must be consistent:
  - Personal site: `url: https://username.github.io`, `baseurl:` (leave empty)
  - Project site: `url: https://username.github.io`, `baseurl: /projectname/`
- **title, first_name, last_name** – Site header and metadata
- **description** – Used in RSS feeds and metadata
- **lang** – Language code (e.g., "en", "fr")

### Feature Flags in \_config.yml

Look for `enabled: false/true` patterns. Common ones:

- `blog.enabled`
- `projects.enabled`
- `publications.enabled`
- `news.enabled`
- `related_blog_posts`
- `profile.show_social_links`
- `profile.image_circular`

### YAML Syntax Rules

- Quote string values containing special characters: `":"`
- Use `>` for multi-line strings (ignore newlines)
- Use `|` for multi-line strings (preserve newlines)
- Indentation matters: always use spaces (2 spaces), never tabs
- No tabs allowed; use only spaces

### Testing YAML Syntax

If you modify `_config.yml`, verify syntax by running:

```bash
docker compose up
# Site should start without YAML parse errors
# Check output for "YAML parse error" or "valid YAML"
```

## Data Files (\_data/\*.yml)

Data files provide structured content that templates can access via Liquid. Each file serves a specific purpose.

### socials.yml

Defines social media links displayed on the site.

**Format:** Alphabetically sorted list of social platforms

**Each entry requires:**

- `name:` – Social platform name
- `icon:` – Icon identifier (from Academicons or Font Awesome)
- `url:` – Profile URL or user identifier

**Example:**

```yaml
github:
  name: GitHub
  icon: fab fa-github
  url: https://github.com/username

twitter:
  name: Twitter
  icon: fab fa-twitter
  url: https://twitter.com/username
```

### cv.yml

CV content in YAML format (for simple CV structure, not RenderCV format).

**Sections:** education, experience, skills, certifications, etc.

**Usage:** Used by `cv.liquid` layout to render CV page

**Format:** Depends on your CV structure; see existing file for examples

### citations.yml

Social media citation counts and metrics.

**Format:** Varies by platform (Google Scholar, ORCID, etc.)

**Example:**

```yaml
scholar_userid: YOUR_SCHOLAR_ID
```

### repositories.yml

GitHub repository listing for the repositories page.

**Format:** List of repository information

**Usage:** Used by repositories page to display GitHub projects

### coauthors.yml

Co-author information for bibliography/publications.

**Mapping:** Author names to profile URLs and affiliations

**Format:** Maps full names to contact info

**Example:**

```yaml
"Einstein, Albert":
  url: https://en.wikipedia.org/wiki/Albert_Einstein
  affiliation: Princeton University
```

## Common Modification Patterns

### Adding a New Feature Flag

1. Add to `_config.yml`:

   ```yaml
   my_feature:
     enabled: true
   ```

2. In Liquid templates use:

   ```liquid
   {% if site.my_feature.enabled %}
     ... content ...
   {% endif %}
   ```

3. Document the flag in CUSTOMIZE.md

### Updating Social Media Links

1. Edit `_data/socials.yml`
2. Keep entries alphabetically sorted
3. Ensure `icon` identifiers match available icons (Academicons or Font Awesome)
4. Use full profile URLs in `url` field
5. Test: `docker compose up` → check social icons on site

### Modifying Site Metadata

Update these in `_config.yml`:

- **title** – Site name
- **first_name, last_name** – Your name
- **email** – Contact email
- **description** – Site tagline (used in RSS, metadata)
- **keywords** – Search keywords

### Adding Co-authors

1. Edit `_data/coauthors.yml`
2. Add entry with author name as key
3. Include `url:` and `affiliation:` fields
4. This maps author names in BibTeX to profile links

## Validation Before Committing

**Always run these checks:**

1. **YAML syntax check:**

   ```bash
   # Run Jekyll build to validate YAML
   docker compose down
   docker compose up
   # Wait for "Server running" message
   # Check output for "YAML parse error" messages
   ```

2. **Prettier format check:**

   ```bash
   npx prettier _config.yml _data/ --check
   npx prettier . --write  # Fix formatting
   ```

3. **Visual verification:**
   - Open http://localhost:8080
   - Check that your changes appear correctly
   - Verify navigation, social links, and metadata work
   - Check site title and description in page source

## Common Issues

### "YAML parse error"

- Check for unquoted special characters (`:`, `&`, `#`, `|`, `>`)
- Verify indentation uses only spaces (2 spaces per level)
- Ensure closing quotes and braces are present

### Feature flag not working

- Check syntax: `feature: enabled: true` (colon after feature name)
- Verify spelling in Liquid template: `{% if site.feature.enabled %}`
- Clear browser cache if using old cached pages

### Social links not appearing

- Verify `_data/socials.yml` has correct entries
- Check icon identifiers exist in Font Awesome or Academicons
- Ensure `url:` field is not empty

## Trust These Instructions

When working with YAML configuration:

- Always test locally with `docker compose up` after changes
- Quote any string containing special characters
- Keep indentation consistent (2 spaces)
- Check output for YAML parse errors before committing
- Only search for additional details if encountering error messages not mentioned here
