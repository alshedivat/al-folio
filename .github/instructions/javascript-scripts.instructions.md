---
applyTo: "_scripts/**/*.js"
---

# JavaScript Scripts Instructions

## Overview

The `_scripts/` directory contains JavaScript files that provide frontend functionality for the al-folio website. These scripts handle:

- **Search functionality** – Ninja-keys integration for search bar
- **Analytics setup** – Google Analytics, Cronitor, Open Panel integrations
- **Gallery functionality** – PhotoSwipe lightbox initialization
- **Liquid template processing** – Files with `.liquid.js` extension process Jekyll Liquid syntax

## Key Script Files

### `search.liquid.js`

- **Purpose:** Generates searchable navigation data for the Ninja-keys search component
- **Type:** Liquid + JavaScript hybrid (Jekyll processes `.liquid.js` files)
- **Output:** Compiled to `/assets/js/search-data.js` via permalink frontmatter
- **Content:** Builds `ninja.data` array from site pages, posts, and navigation structure
- **Usage:** Included in `_includes/scripts.liquid` and loaded in layouts

### `photoswipe-setup.js`

- **Purpose:** Initializes PhotoSwipe lightbox for image galleries
- **Type:** Pure JavaScript with ES6 imports
- **Output:** Compiled to `/assets/js/photoswipe-setup.js`
- **Dependencies:** PhotoSwipe library (referenced via `site.third_party_libraries`)
- **Functionality:** Automatically converts `.pswp-gallery` elements into interactive lightbox galleries

### `google-analytics-setup.js`, `cronitor-analytics-setup.js`, `open-panel-analytics-setup.js`

- **Purpose:** Initialize third-party analytics services
- **Type:** Conditional setup scripts (may be excluded from production builds)
- **Usage:** Loaded conditionally based on `_config.yml` feature flags
- **Integration:** Each sets up tracking code for respective analytics platforms

## File Structure & Frontmatter

All scripts in `_scripts/` may include Jekyll frontmatter:

```javascript
---
permalink: /assets/js/filename.js
---
// JavaScript code here
```

**Key frontmatter fields:**

- `permalink:` – Specifies output path in compiled site (e.g., `/assets/js/search-data.js`)
- Comments/empty – Files with only JavaScript and no frontmatter are processed as-is

**Processing:**

- `.liquid.js` files – Processed by Jekyll's Liquid engine before JavaScript compilation
- `.js` files – Processed normally, passed through to assets directory
- **Note:** Files in `_scripts/` are ignored by Prettier (see `.prettierignore`) because `.liquid.js` files mix Liquid template syntax with JavaScript, which Prettier doesn't support

## JavaScript Patterns in al-folio

### Liquid + JavaScript Mixing (in `.liquid.js` files)

Example from `search.liquid.js`:

```javascript
---
permalink: /assets/js/search-data.js
---
// Regular JavaScript
const ninja = document.querySelector('ninja-keys');

// Liquid processing - Jekyll loops and variables
ninja.data = [
  {%- for page in site.pages -%}
    {
      id: "nav-{{ page.title | slugify }}",
      title: "{{ page.title }}",
      handler: () => {
        window.location.href = "{{ page.url | relative_url }}";
      },
    },
  {%- endfor -%}
];
```

**Important:**

- Use Liquid filters (`| slugify`, `| relative_url`, `| escape`) to process Jekyll variables
- Curly braces `{{ }}` output variables
- Use `{%- -%}` (with hyphens) to control whitespace in generated output
- Keep JSON structures valid after Liquid processing

### ES6 Modules & Imports

Scripts use modern JavaScript with ES6 imports:

```javascript
import PhotoSwipeLightbox from "{{ site.third_party_libraries.photoswipe-lightbox.url.js }}";
import PhotoSwipe from "{{ site.third_party_libraries.photoswipe.url.js }}";
```

- Import third-party libraries via `site.third_party_libraries` configuration
- Libraries resolved from `_config.yml` CDN or local paths

### DOM Manipulation & Event Handlers

Scripts attach to specific DOM elements:

```javascript
const element = document.querySelector(".selector");
element.addEventListener("click", (event) => {
  // Handle event
});
```

## Common Modification Patterns

### Adding a New Analytics Service

1. Create new file `_scripts/myservice-setup.js`:

```javascript
---
permalink: /assets/js/myservice-setup.js
---
(function() {
  // Initialize your service
  if (window.myService) {
    console.log('MyService loaded');
  }
})();
```

2. Add conditional loading to `_includes/scripts.liquid`:

```liquid
{% if site.myservice_enabled %}
  <script src="{{ '/assets/js/myservice-setup.js' | relative_url }}"></script>
{% endif %}
```

3. Add feature flag to `_config.yml`:

```yaml
myservice_enabled: false
```

### Modifying Search Data Structure

In `search.liquid.js`:

1. Identify the Liquid loop building `ninja.data` array
2. Add new properties to each object:

```javascript
{
  id: "nav-{{ title | slugify }}",
  title: "{{ title }}",
  newField: "{{ page.new_property }}",  // Add new field
  handler: () => { ... }
}
```

3. Rebuild: `docker compose up` will regenerate `/assets/js/search-data.js`

### Updating Gallery Functionality

In `photoswipe-setup.js`:

1. Modify gallery selector or initialization options
2. Reference [PhotoSwipe documentation](https://photoswipe.com/) for available options
3. Update any CSS classes used in gallery markup

## Code Style Notes

**Prettier and \_scripts/:**

Files in `_scripts/` are **excluded from Prettier formatting** (defined in `.prettierignore`) because:

- `.liquid.js` files contain mixed Liquid template syntax and JavaScript
- Prettier doesn't understand or support this hybrid format
- Manual formatting consistency is required for these files

**When modifying \_scripts/ files:**

- Follow existing code style in the file (indentation, spacing, quotes)
- Maintain readability for Liquid + JavaScript mixed code
- Do NOT run Prettier on the `_scripts/` directory
- **DO run Prettier on the rest of the project** when making other changes: `npx prettier . --write`

## Validation & Testing

### Local Build Test

```bash
docker compose up
# Wait 30 seconds for Jekyll to build
# Check for errors in terminal output
# Visit http://localhost:8080 and verify functionality
```

### Checking Generated Output

After `docker compose up`, verify scripts compiled correctly:

```bash
# Check if script files exist in _site/assets/js/
ls _site/assets/js/

# Verify no Liquid syntax in generated output (should be pure JavaScript)
cat _site/assets/js/search-data.js | head -20
```

### Debugging Script Issues

**Script not loading:**

- Check browser DevTools Console for HTTP 404 errors
- Verify `permalink:` frontmatter matches script inclusion paths
- Check that script is actually in `_site/assets/js/` after build

**Liquid syntax errors:**

- Jekyll build will fail with "Liquid Exception" messages
- Check file for unclosed `{% %}` or `{{ }}` tags
- Ensure Liquid filters exist (`| relative_url`, `| slugify`, etc.)

**JavaScript errors:**

- Check browser console for runtime errors
- Verify all imported libraries are defined in `site.third_party_libraries` in `_config.yml`
- Test in both Chrome and Firefox for compatibility

## Trust These Instructions

When modifying JavaScript scripts:

- `.liquid.js` files must have valid Liquid syntax AND valid JavaScript that remains valid after Jekyll processes the Liquid
- Do NOT run Prettier on `_scripts/` files (they are in `.prettierignore` because of Liquid + JavaScript mixing)
- Test locally with `docker compose up` to verify build succeeds and scripts work
- For site-wide script inclusion, modify `_includes/scripts.liquid`
- For configuration (feature flags, third-party URLs), see yaml-configuration.instructions.md
- Reference the actual script files in `_scripts/` as examples when adding new functionality
- Only search for additional details if errors occur during build or testing
