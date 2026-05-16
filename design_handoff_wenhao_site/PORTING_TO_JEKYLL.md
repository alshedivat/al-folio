# Porting Guide: Prototype → Jekyll / al-folio

This is a step-by-step plan for taking the React prototype in `design_files/` and implementing it inside the existing Jekyll repo at `~/wenhao-lu.com/`.

Use this as a Claude Code prompt: copy this entire file into the chat, or just say "follow `design_handoff_wenhao_site/PORTING_TO_JEKYLL.md`".

---

## Phase 0 — Verify the repo state

```bash
cd ~/wenhao-lu.com
git status                # should be clean before starting
git checkout -b redesign  # create a branch
bundle install            # ensure Jekyll runs
bundle exec jekyll serve  # confirm baseline builds before touching anything
```

Open `http://localhost:4000` and screenshot the current state for comparison.

---

## Phase 1 — Drop in the design tokens

1. **Create a new SCSS partial** at `_sass/_redesign_tokens.scss`. Copy the entire `:root { ... }` block from section 5 of `README.md` (colors, fonts, layout vars).

2. **Import it FIRST** in the main stylesheet so subsequent rules can use the custom properties. Find `assets/css/main.scss` (or equivalent root stylesheet) and add at the top:
   ```scss
   @import "redesign_tokens";
   ```

3. **Override al-folio's body styles** in a new `_sass/_redesign_base.scss`:
   ```scss
   html, body {
     background: var(--bg) !important;
     color: var(--fg) !important;
     font-family: var(--body) !important;
     font-size: 17px;
     line-height: 1.6;
   }
   ```
   Import after `_redesign_tokens`. The `!important` is to stomp al-folio's Bootstrap utility classes; remove once you've swapped templates fully.

4. **Add Google Fonts** to `_includes/head.liquid`. Inside `<head>`, paste the `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">` block from README section 5.

5. **Build and verify** the warm cream background appears site-wide. Don't worry about layout breakage yet.

---

## Phase 2 — Replace the homepage layout

The home page is `_pages/about.md` which uses `_layouts/about.liquid`.

1. **Back up the original**:
   ```bash
   cp _layouts/about.liquid _layouts/about.liquid.bak
   ```

2. **Rewrite `_layouts/about.liquid`** to match the home structure in `design_files/pages.jsx → HomePage`. Reference `design_files/index.html` + `styles.css` for exact markup classes. Key blocks:
   - `<nav class="topbar">` with `/wl` brand, nav links to `/`, `/publications`, `/projects`, `/cv`, `/blog`, `/reading`, `/contact`
   - `<header class="hero">` with `<img>` from `page.profile.image`, `<h1 class="hero-name">` (split first/last name into spans), role line
   - `<div class="meta-strip">` populated from `site.email`, `site.github_username`, etc. or hard-coded
   - `<section>` for about (Liquid `{{ content }}`), now grid, news (use `_includes/news.liquid`), and dig deeper preview grid

3. **Strip em dashes from `_pages/about.md`** — find every `—` and replace with `,`, `.`, or `:` per context. The README has examples.

4. **Copy `styles.css` rules** into `_sass/_redesign_layout.scss`. Don't copy the whole file blindly — copy in chunks (topbar styles, hero styles, etc.) and verify each renders.

5. **Build and verify** the home page matches the prototype visually.

---

## Phase 3 — Build the CV page

The CV currently lives at `_pages/cv.md` → `_layouts/cv.liquid` → includes from `_includes/cv/*.liquid`. al-folio's stock CV layout is busy; we replace it.

1. **Create a new layout** `_layouts/cv_redesigned.liquid`:
   - Compact hero block (topbar + 80px photo + name + role)
   - `<section class="page-header">` with `§ 04` kicker, `<h1 class="page-title">cv</h1>`, back-home crumb
   - Loop `site.data.cv.cv.sections.Education` → render `cv-entry` divs (130px / 1fr grid)
   - Loop `site.data.cv.cv.sections["Research Experience"]` → same pattern
   - Loop `Experience`, `Awards`, `Skills` similarly
   - Use `dangerouslySetInnerHTML`-equivalent in Liquid: `{{ highlight | markdownify }}` to get bold/italic out of YAML strings

2. **Point `_pages/cv.md`** at the new layout: change `layout: cv` → `layout: cv_redesigned`. Set `permalink: /cv/`.

3. **Strip em dashes from `_data/cv.yml`** — already mostly em-dash-free, double-check.

4. **Build and verify** `/cv` matches the prototype.

---

## Phase 4 — Build the Publications and Projects pages

### Publications (`/publications`)
1. al-folio already renders `_bibliography/papers.bib` via `_layouts/bib.liquid` and `_pages/publications.md`. Replace `_includes/citation.liquid` (or wrap it) to render each entry as a `<article class="pub-card">` matching the prototype.
2. Use the `abbr` bibtex field for the venue badge.
3. Highlight the user's own name (`Lu, Wenhao`) with `<em class="self">` and the accent-tint background.

### Projects (`/projects`)
1. Replace `_layouts/projects.liquid` (or whichever layout `_pages/projects.md` uses) with a single-column list matching the prototype.
2. Iterate `site.projects` collection (al-folio defines `_projects` as a collection in `_config.yml`).
3. For each project, render the `pub-card` shape: category + year tag on left, title + tagline (`description` frontmatter) + summary (`abstract` frontmatter) + `<details>` collapsible containing the markdown body.
4. The collapsible toggle is native `<details>` / `<summary>` — no JS needed.

---

## Phase 5 — Build the Blog, Reading, and Contact pages

### Blog (`/blog`)
1. `_pages/blog.md` already exists with `layout: archive` (al-folio). Replace with a new minimal layout that:
   - Renders the compact hero + page-header
   - Loops `site.posts` rendering each as a `<a class="blog-row">`
   - **If `site.posts` is empty**, render the `.blog-empty` block (dashed border, striped background, serif "nothing here yet" headline)

### Reading (`/reading`)
1. Create `_pages/reading.md` with `permalink: /reading/` and a new layout `_layouts/reading.liquid`
2. Loop `_books/*.md` (al-folio's books collection) for the "Currently reading" section
3. Create `_data/listening.yml` with the same schema as `design_files/data.js → SITE.reading.listening`
4. Loop `site.data.listening` for the "Listening" section
5. Hard-code or add `_data/elsewhere.yml` for the third subsection

### Contact (`/contact`)
1. Create `_pages/contact.md` with `permalink: /contact/`
2. Layout renders the compact hero, page header, and a `.contact-card` panel populated from `_data/socials.yml`

---

## Phase 6 — Topbar and navigation

al-folio renders the nav from `_includes/header.liquid` based on `_pages/dropdown.md` and individual page frontmatter. Rewrite to render the design's mono topbar:

```liquid
<nav class="topbar">
  <a class="brand-mark" href="{{ '/' | relative_url }}"><span class="slash">/</span>wl</a>
  <span class="nav-group">
    <a class="nav-link {% if page.permalink == '/' %}active{% endif %}" href="{{ '/' | relative_url }}">home</a>
    <a class="nav-link {% if page.permalink == '/publications/' %}active{% endif %}" href="{{ '/publications/' | relative_url }}">research</a>
    <a class="nav-link {% if page.permalink == '/projects/' %}active{% endif %}" href="{{ '/projects/' | relative_url }}">projects</a>
    <a class="nav-link {% if page.permalink == '/cv/' %}active{% endif %}" href="{{ '/cv/' | relative_url }}">cv</a>
    <span class="nav-sep">|</span>
    <a class="nav-link {% if page.permalink == '/blog/' %}active{% endif %}" href="{{ '/blog/' | relative_url }}">blog</a>
    <a class="nav-link {% if page.permalink == '/reading/' %}active{% endif %}" href="{{ '/reading/' | relative_url }}">reading</a>
    <a class="nav-link {% if page.permalink == '/contact/' %}active{% endif %}" href="{{ '/contact/' | relative_url }}">contact</a>
  </span>
  <span class="topbar-spacer"></span>
  <span class="topbar-meta">millburn, nj · est. 2007</span>
</nav>
```

Wire this into `_layouts/default.liquid` (which all other layouts extend) so it appears on every page.

---

## Phase 7 — Footer

Replace `_includes/footer.liquid` with the design's `.foot` block (mono, top border, four social links + "© 2026 · powered by curiosity & black coffee" right-aligned). Remove al-folio's stock Jekyll / Powered-By line.

---

## Phase 8 — Cleanup

1. **Remove Font Awesome** from `_includes/head.liquid` if no template uses it any more (the design uses only Unicode characters: `↗`, `→`, `+`, `·`, `§`, `|`, `#`).
2. **Remove Bootstrap** if you don't need its grid/utility classes elsewhere. al-folio bundles it; the redesign uses CSS grid + flex directly.
3. **Remove `_includes/distill_scripts.liquid`** if not using distill posts.
4. **Strip em dashes site-wide**:
   ```bash
   grep -rn '—' _pages _data _projects _bibliography _includes _layouts 2>/dev/null
   ```
   Replace each remaining instance.
5. **Test responsive** — open dev tools, set viewport to 375×667. The prototype has a mobile breakpoint at 720px; verify the same breakpoint behavior in the Jekyll build.

---

## Phase 9 — Test

```bash
bundle exec jekyll build
bundle exec jekyll serve
```

Click through every nav link. Verify against the prototype side-by-side:

| Prototype URL                    | Jekyll URL                       |
|----------------------------------|----------------------------------|
| `file://.../index.html`          | `http://localhost:4000`          |
| `file://.../index.html#research` | `http://localhost:4000/publications` |
| `file://.../index.html#projects` | `http://localhost:4000/projects` |
| `file://.../index.html#cv`       | `http://localhost:4000/cv`       |
| `file://.../index.html#blog`     | `http://localhost:4000/blog`     |
| `file://.../index.html#reading`  | `http://localhost:4000/reading`  |
| `file://.../index.html#contact`  | `http://localhost:4000/contact`  |

Check the four big things:
1. Fonts loaded (Bodoni Moda for name, Source Serif 4 for body, JetBrains Mono for labels)
2. Background is warm cream (`#f3ede1`), not white
3. Accent is rust amber (`#b06a2a`) on links, dot, badges, underlines
4. No em dashes anywhere visible

---

## Phase 10 — Deploy

1. Commit:
   ```bash
   git add .
   git commit -m "Redesign: warm-cream researcher card aesthetic"
   ```
2. Push the branch:
   ```bash
   git push origin redesign
   ```
3. Verify the GitHub Pages preview build (al-folio sites typically deploy via Actions). Once green:
   ```bash
   git checkout main
   git merge redesign
   git push
   ```

---

## Common gotchas

- **al-folio uses Liquid + Bootstrap + Bootstrap-Icons + MathJax + lightbox**. The redesign needs none of those. If something looks off, the al-folio default styles are probably winning specificity — use the browser inspector to find which `_sass/*.scss` file is leaking through and either disable that partial in `main.scss` or override with `!important` temporarily.
- **Image `src` paths**: prototype uses `assets/pfp.png` (relative). In Jekyll use `{{ '/assets/img/pfp.png' | relative_url }}`.
- **Hash routing → no hash routing**: every prototype hash route is a real Jekyll page with a `permalink:` in the frontmatter. The "back home" crumb on subpages is a plain `<a href="{{ '/' | relative_url }}">← back home</a>`.
- **al-folio dark mode**: the redesign is light-only. Either remove al-folio's dark-mode toggle or stub it out. (Adding a dark variant would be a future task.)
- **Tweaks panel**: leave it out. It was prototype-only.
