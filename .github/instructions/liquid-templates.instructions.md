---
applyTo: "**/*.liquid"
---

# Liquid Templates Instructions

## Liquid Template Basics

This al-folio repository uses Liquid templating extensively. When modifying `.liquid` files:

### Key Directories

- `_includes/` – Reusable template components (imported with `{% include %}`)
- `_layouts/` – Page layout templates (specified in frontmatter with `layout: name`)

### Common Liquid Tags in al-folio

- `{% include filename.liquid %}` – Includes template component
- `{% for item in collection %}...{% endfor %}` – Loops
- `{% if condition %}...{% endif %}` – Conditionals
- `{{ variable }}` – Output variable
- `{% assign var = value %}` – Assign variable
- `{% capture %}...{% endcapture %}` – Capture output to variable
- `| date: format` – Date filtering
- `| where: "key", "value"` – Collection filtering

### Important al-folio Liquid Components

- `_includes/citation.liquid` – Bibliography entry rendering
- `_includes/distill_scripts.liquid` – Distill.pub specific scripts
- `_includes/footer.liquid` – Site footer
- `_includes/head.liquid` – Page <head> section
- `_includes/header.liquid` – Site header/navigation
- `_includes/projects.liquid` – Project display
- `_includes/scripts.liquid` – Global scripts
- `_includes/selected_papers.liquid` – Featured publications display

### Prettier Formatting for Liquid

Prettier with `@shopify/prettier-plugin-liquid` enforces formatting:

- Single quotes around strings in Liquid tags
- Consistent spacing
- Indentation with 2 spaces
- Run `npx prettier . --write` before committing

## Common Modification Patterns

### Modifying Site Header/Navigation

- Edit `_includes/header.liquid`
- Add links to navigation array in `_config.yml` (see yaml-configuration.instructions.md)
- Test by viewing site in browser: `docker compose up` → http://localhost:8080

### Adding a New Component Include

1. Create new file in `_includes/mycomponent.liquid`
2. Use Liquid syntax for conditionals, loops, and variable output
3. Call it from templates: `{% include mycomponent.liquid %}`
4. Test: `docker compose up`

### Adjusting Styling with Liquid

- Some SCSS variables can be controlled via Liquid logic
- Avoid mixing complex Liquid with CSS; keep templates focused

## Validation Before Committing

**Always run these checks:**

1. **Prettier format check:**

   ```bash
   npx prettier _includes/ _layouts/ --check
   npx prettier . --write  # Fix formatting
   ```

2. **Build test:**

   ```bash
   docker compose down
   docker compose up
   # Wait 30 seconds, check for errors in output
   # No "Unknown tag" messages should appear
   ```

3. **Visual verification:**
   - Open http://localhost:8080
   - Check that your changes rendered correctly
   - Verify no broken layout or missing content

## Trust These Instructions

When working with Liquid templates:

- Use `_includes/` and `_layouts/` as reference for syntax patterns
- Follow existing formatting in files (Prettier will enforce consistency)
- Always test locally before pushing (build must succeed)
- For configuration changes, see yaml-configuration.instructions.md
- Only search for additional details if error messages reference unfamiliar Liquid tags or Jekyll concepts
