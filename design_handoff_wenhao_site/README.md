# Handoff: wenhao-lu.com Redesign

Personal site redesign for **Wenhao Lu** (`wenhao-lu.com`), a high-school AI safety researcher. Combines a warm cream-paper aesthetic with a structured researcher-card layout. Multi-page SPA prototype intended to be **ported into the existing Jekyll / al-folio repo**.

---

## 1. About these files

The files in `design_files/` are a **React + plain HTML/CSS design reference** built as a single-page prototype. They are **not** meant to be dropped into the existing Jekyll repo as-is.

Your task is to **recreate the visual design** inside the existing Jekyll/al-folio site at `~/wenhao-lu.com/`, replacing or overriding al-folio's stock styles with the design tokens, layouts, and components shown here. The content already lives in the repo (`_data/cv.yml`, `_projects/*.md`, `_bibliography/papers.bib`, `_pages/about.md`). Don't re-author it — re-skin and re-template around it.

---

## 2. Fidelity

**High-fidelity (hifi).** Pixel-perfect mockup. All colors, typography, spacing, and interaction states are final and intended to be reproduced exactly. Use the hex values, font names, and CSS declarations from `design_files/styles.css` as the source of truth.

---

## 3. The target codebase

- **Repo:** `~/wenhao-lu.com/`
- **Framework:** Jekyll, [al-folio theme](https://github.com/alshedivat/al-folio)
- **Templating:** Liquid
- **Styling:** SCSS in `_sass/`
- **Content lives in:**
  - `_pages/about.md` — homepage body
  - `_data/cv.yml` — full CV data
  - `_bibliography/papers.bib` — publications
  - `_projects/*.md` — long-form project pages
  - `_news/` — news entries (currently empty)
  - `_posts/` — blog posts (currently empty)

You will primarily be working in:
- `_layouts/` — page templates
- `_includes/` — partials (header, news, projects, etc.)
- `_sass/` — styles
- `_data/socials.yml` (already populated)

---

## 4. The five pages (routes)

The design has a hash router with six routes. In Jekyll these become real URLs / permalinks:

| Route       | Permalink       | Source content                                 | Jekyll page          |
|-------------|-----------------|------------------------------------------------|----------------------|
| `home`      | `/`             | `_pages/about.md` body + summary card grid     | `_pages/about.md`    |
| `research`  | `/publications` | `_bibliography/papers.bib`                     | `_pages/publications.md` |
| `projects`  | `/projects`     | `_projects/*.md`                               | `_pages/projects.md` |
| `cv`        | `/cv`           | `_data/cv.yml`                                 | `_pages/cv.md`       |
| `blog`      | `/blog`         | `_posts/*`                                     | `_pages/blog.md`     |
| `reading`   | `/reading`      | `_books/*.md` and a new `_data/listening.yml`  | new `_pages/reading.md` |
| `contact`   | `/contact`      | `_data/socials.yml`                            | new `_pages/contact.md` |

Topbar links to all of these. Brand mark `/wl` returns home.

---

## 5. Design tokens (copy verbatim)

These are CSS custom properties on `:root`. Put them in `_sass/_themes.scss` (or a new `_sass/_design_tokens.scss`) and import early so they cascade everywhere.

```scss
:root {
  // colors
  --bg:        #f3ede1;    // warm cream paper background
  --bg-2:      #ebe3d4;    // surface (cards, alt rows)
  --bg-3:      #e3dac6;    // deeper surface
  --fg:        #1d1a14;    // warm near-black text
  --fg-2:      #3a3528;    // secondary text
  --muted:     #837866;    // tertiary / labels
  --muted-2:   #a3998a;    // disabled / decorative
  --rule:      #d8cebb;    // hairlines, borders
  --rule-2:    #c8bda7;    // stronger hairlines
  --accent:        #b06a2a; // rust amber (default)
  --accent-soft:   #e8c69a; // soft accent (selection, hovers)
  --accent-tint:   rgba(176, 106, 42, 0.08); // tinted backgrounds

  // typography
  --serif:   'Instrument Serif', 'Cormorant Garamond', Georgia, serif;
  --display: 'Bodoni Moda', 'Didot', 'Times New Roman', serif;
  --body:    'Source Serif 4', Georgia, 'Iowan Old Style', serif;
  --mono:    'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;

  // layout
  --col:   760px;   // reading column width
  --pad-y: 28px;    // section vertical padding
}
```

### Alternate accent palette (for theming)
```
amber  #b06a2a   (default)
ink    #3a5a8a
sage   #5a7a4a
rouge  #9a3a3a
```

### Google Fonts to load
Put in `_includes/head.liquid` (or whatever the head partial is):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600&family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Libre+Caslon+Display&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap">
```

---

## 6. Typography rules

| Element              | Font           | Size  | Weight | Other                    |
|----------------------|----------------|-------|--------|--------------------------|
| Hero name (Wenhao Lu)| `--display`    | 78px  | 500    | letter-spacing -0.015em  |
| Hero name "Lu" italic| `--display`    | 78px  | 500    | italic, color `--accent` |
| Page title (subpage) | `--display`    | 56px  | 500    | letter-spacing -0.015em  |
| Section title (h2)   | `--serif`      | 30px  | 400    |                          |
| Project / pub title  | `--serif`      | 22–24px| 400   |                          |
| Body                 | `--body`       | 17px  | 400    | line-height 1.6          |
| Mono labels / nav    | `--mono`       | 11–13.5px | 400 | letter-spacing 0.3–1.4px |
| Tag chips            | `--mono`       | 11.5px| 400    | uppercase, 1px border    |

On mobile (`max-width: 720px`): hero-name → 56px; page-title → 40px.

---

## 7. Layout per page

### Shell (`.shell`)
- `max-width: 920px`, centered, `padding: 36px 48px 120px`
- Sticky monospace topbar with `/wl` brand, nav links, separator pipes, meta string (`millburn, nj · est. 2007`) right-aligned
- Subtle paper grain via fixed-position `radial-gradient(rgba(60,50,30,0.025) 1px, transparent 1px)` overlay at 3px tile

### Home (`/`)
1. **Hero** — 168×168 photo (rounded 6px) + name + role line with pulsing accent dot
2. **Meta strip** — five mono key/value pairs (loc, mail, scholar, git, in)
3. **About section** — `§ 01 about` head + 3-paragraph summary from `about.md` + tag chips
4. **Now grid** — 2-column card grid for "BUILDING" (NEXT Horizon) and "OPEN SOURCE" (WorldModelLens)
5. **News** — first 4 entries from `_news/`, two-column (date | text)
6. **Dig deeper grid** — 3×2 preview cards linking to deep pages

### Subpages (research / projects / cv / blog / reading / contact)
- **Compact hero**: 80×80 photo + 40px name + role line (no pronounce)
- **Page header**: section-num kicker (`§ 02`) above `--display` title; right side has `← back home` + aside (e.g. `last edited may 2026`); 1px bottom border
- **Page intro paragraph** (max-width: 760px)
- Page-specific content below

### CV page details
Five subsections, each with a mono uppercase h3 header underlined by `--rule`:
1. Education
2. Research Experience
3. Experience
4. Awards
5. Skills

Entry layout: `grid-template-columns: 130px 1fr; gap: 24px`. Left col = mono date, right col = serif company/title + italic role + bulleted list with `·` accent bullets.

### Projects page details
Each project is a `pub-card` with `grid-template-columns: 100px 1fr; gap: 24px`. Left col = mono category + year stacked. Right col = serif title + italic tagline + summary paragraph + a `<details>` collapsible (`+ READ THE LONG VERSION`) revealing Motivation / Novelty / Impact subsections, then mono `#tag` list and footer link row.

### Research page details
Same `pub-card` grid. Left col = venue badge (`Diabetes`, `IEEE`) + year. Right col = paper title + authors (Wenhao Lu highlighted with `--accent-tint` background), venue line with badge chip, abstract paragraph, tags, link row.

### Blog page details
If `_posts/` is empty: a dashed-border empty state with diagonal striped background and serif "nothing here yet" headline. Otherwise: list of `blog-row`s with `grid-template-columns: 120px 1fr auto`.

### Reading page details
Three subsections using the CV section pattern: Currently reading, Listening, Elsewhere. Each book/podcast renders as a `cv-entry` (date col = type label like `book` / `podcast`).

### Contact page details
Two-column `.contact-card` (bg `--bg-2`, 1px border, 4px radius, 28px padding): direct / elsewhere. Below the card, a muted note about the site being a living notebook.

---

## 8. Components (1:1 mapping to the design files)

| Class                | Used in                  | Notes                                    |
|----------------------|--------------------------|------------------------------------------|
| `.topbar`            | top of every page        | sticky, mono                             |
| `.brand-mark`        | topbar                   | `/wl` with slash in `--muted`            |
| `.nav-link`          | topbar                   | underline + `--accent` color on active   |
| `.hero` / `.hero-compact` | home / subpages     | grid w/ photo + info                     |
| `.hero-name`         | hero                     | `--display`, italic "Lu" in accent       |
| `.hero-role .dot`    | hero                     | 6px circle, `pulse` animation 2.4s       |
| `.meta-strip`        | home                     | mono key/value pairs row                 |
| `.section-head`      | home sections            | `§ N` kicker + serif title + flex rule   |
| `.tag`               | about section            | mono chip with `#` prefix in accent      |
| `.now-grid`          | home                     | 2-col card grid w/ 1px gutter            |
| `.now-card`          | now grid                 | bg-2 on hover, `↗` corner arrow          |
| `.news-row`          | news section             | grid 110px / 1fr, dashed bottom border   |
| `.preview-grid`      | dig deeper section       | 3-col card grid                          |
| `.preview-card`      | preview grid             | `→` corner arrow, bg-2 on hover          |
| `.page-header`       | subpages                 | title + back-home crumb                  |
| `.page-title`        | subpages                 | `--display` 56px                         |
| `.pub-card`          | projects / research      | 100px / 1fr grid w/ top border           |
| `.cv-section`        | CV                       | mono header underlined by `--rule`       |
| `.cv-entry`          | CV                       | 130px / 1fr grid, dashed bottom border   |
| `.cv-bullets li`     | CV                       | `·` accent bullet, 18px left padding     |
| `.cv-award`          | CV awards                | 3-col grid: date / title / awarder       |
| `.skill-row`         | CV skills                | 180px label / values                     |
| `.contact-card`      | contact                  | 2-col panel on `--bg-2`                  |
| `.blog-empty`        | blog (no posts)          | dashed border w/ striped background      |
| `.foot`              | bottom of every page     | mono, top border                         |
| `details.proj-details` | projects               | `+ / –` toggle for long-form body        |

---

## 9. Interactions

- **Topbar scroll**: sticky, drops below `1px` rule line at the bottom
- **Nav active**: underlined with `--accent` color when on that route
- **Hero dot pulse**: keyframe `pulse` 2.4s ease-in-out infinite, opacity + scale
- **Now card hover**: `background: var(--bg-2)`, corner `↗` arrow translates `+2, -2` and shifts to accent color
- **Preview card hover**: same pattern, `→` arrow shift
- **Work title hover**: underline draws in via `background-image: linear-gradient(--accent, --accent)` with `background-size` transitioning from `0 1px` to `100% 1px`
- **Page transition**: 0.4s `pageIn` keyframe (opacity 0→1, translateY 8px→0) on route change
- **Hash routing**: window listens to `hashchange`, scrolls to top, swaps page component
- **Project details**: native `<details>` element, `+` becomes `–` when open

---

## 10. Content sources & specifics

### About body
From `_pages/about.md`. **Important: the original had em dashes (`—`); the redesign strips ALL em dashes** and replaces them with commas, periods, or `·` separators. Re-edit `about.md` to match. Example:

> Before: "research experience spans **spectral graph theory**, **mechanistic interpretability**, and **AI4Math** — three corners of the same question"
>
> After: "research experience spans **spectral graph theory**, **mechanistic interpretability**, and **AI4Math**: three corners of the same question"

Do this site-wide.

### Tag chips on home
`ai-safety`, `interpretability`, `world-models`, `llm-alignment`, `ai4math`, `spectral-graph-theory`.

### "Now" cards
Two cards on the home page:
- **NEXT Horizon** (kicker `BUILDING`) → `https://nxthorizon.org`
- **WorldModelLens** (kicker `OPEN SOURCE`) → `https://github.com/Bhavith-Chandra/WorldModelLens`

Stats below each are `→`-prefixed mono items.

### News entries
The current `_news/` folder is empty. The prototype scaffolds 7 entries derived from CV awards / projects (see `design_files/data.js` `SITE.news`). Either:
(a) author real `_news/*.md` files matching these,
(b) keep them inline in `_includes/news.liquid` as a temporary array,
(c) leave the news section empty until you have real announcements.

### Publications
From `_bibliography/papers.bib`. Render each entry with the venue badge derived from `abbr` (e.g. `Diabetes`, `IEEE`), authors line with the user's name wrapped in `<em class="self">`, venue/journal line, abstract block, tags, link row.

### Projects
From `_projects/*.md`. Frontmatter fields used: `title`, `description` (as tagline), `abstract` (as summary), `category`, `tags`, `github`. The long-form body (Motivation / Novelty / Impact) goes into the `<details>` collapsible.

### CV
From `_data/cv.yml`. The data structure is already exactly what we need — iterate `sections.Education`, `sections.Research Experience`, etc.

### Reading
From `_books/*.md` for books. Listening + Elsewhere need a new data file (`_data/listening.yml`) — see `design_files/data.js` `SITE.reading` for the schema.

### Contact
From `_data/socials.yml`. Default text:
> "The fastest way to reach me is LinkedIn. Email works too. I read everything, I reply to most."

---

## 11. Assets

- **Profile photo**: `assets/pfp.png` (already in `_site/assets/img/pfp.png`, ~270×270 square, displayed at 168×168 with 6px radius on home, 80×80 on subpages).
- **No other custom imagery** in the design — all decoration is CSS.
- **No icons / emoji** — the design uses mono `↗`, `→`, `+`, `·`, `§`, `|`, `#` characters for visual texture instead of icon fonts. Remove al-folio's Font Awesome usage from the new templates.

---

## 12. Files in this handoff

```
design_handoff_wenhao_site/
├── README.md                    ← this file
├── PORTING_TO_JEKYLL.md         ← step-by-step Jekyll-specific port plan
└── design_files/
    ├── index.html               ← entry point (React + Babel)
    ├── styles.css               ← all CSS, ~1100 lines, copy-paste into _sass/
    ├── app.jsx                  ← shell, router, hero, tweaks
    ├── pages.jsx                ← deep-page components (Research/Projects/CV/Blog/Reading/Contact)
    ├── data.js                  ← content data (mirrors Jekyll _data/*.yml)
    ├── tweaks-panel.jsx         ← in-design tweak controls (DROP — not needed in Jekyll port)
    └── assets/
        └── pfp.png              ← profile photo
```

Open `index.html` in any browser to view the live prototype. Hash routes (`#cv`, `#research`, etc.) are live and shareable.

---

## 13. What NOT to port

- The **`tweaks-panel.jsx`** and the in-design Tweaks UI are prototype-only. Pick one accent / one name font for production and hard-code them in SCSS.
- **React + hash routing** — Jekyll generates static HTML; each route becomes a real `_pages/*.md` file with its own permalink. No JS routing needed.
- **`data.js`** — content already lives in `_data/`, `_bibliography/`, `_projects/`, `_pages/`. Use those, not the JS mirror.
- **Inline `<style id="__om-edit-overrides">` blocks** — none in this design.

Done.
