---
applyTo: "**/*.bib,_bibliography/**"
excludeAgent: "code-review"
---

# BibTeX Bibliography Instructions

## BibTeX Format Basics

The al-folio repository uses BibTeX for managing publications. All entries are stored in `_bibliography/papers.bib`.

### Standard BibTeX Entry Types

```bibtex
@article{key,
  title={Title},
  author={Author, A. and Author, B.},
  journal={Journal Name},
  volume={10},
  pages={1--20},
  year={2023},
  publisher={Publisher Name}
}

@inproceedings{key,
  title={Title},
  author={Author, A.},
  booktitle={Proceedings of Conference},
  year={2023}
}

@book{key,
  title={Book Title},
  author={Author, A.},
  publisher={Publisher Name},
  year={2023}
}
```

## al-folio Custom BibTeX Keywords

Beyond standard BibTeX fields, al-folio supports custom keywords for rich publications display:

### Available Custom Keywords

- **abstract:** Full abstract text (multi-line text in curly braces)
- **award:** Award or distinction (`award: Best Paper Award`)
- **code:** URL to source code repository (`code: https://github.com/user/repo`)
- **dimensions:** Dimensions badge ID for citation metrics
- **doi:** Digital Object Identifier (`doi: 10.1234/example`)
- **html:** URL to full text or project page (`html: https://example.com`)
- **pdf:** URL or path to PDF file (`pdf: /assets/papers/2023-paper.pdf`)
- **poster:** URL to conference poster (`poster: /assets/posters/poster.pdf`)
- **preview:** URL to preview image (`preview: /assets/img/papers/paper-preview.jpg`)
- **selected:** Boolean to feature on publications page (`selected: true`)
- **slides:** URL to presentation slides (`slides: /assets/slides/2023.pdf`)

### Example Entry with Custom Keywords

```bibtex
@article{smith2023important,
  title={Important Research},
  author={Smith, John and Doe, Jane},
  journal={Nature},
  volume={100},
  pages={1--10},
  year={2023},
  publisher={Nature Publishing Group},
  abstract={This is the full abstract text. It can span multiple lines.},
  pdf={smith2023.pdf},
  code={https://github.com/example/repo},
  preview={smith2023.jpg},
  doi={10.1234/nature.12345},
  selected={true}
}
```

## Formatting Rules

### Key Considerations

1. **Unique keys:** Each entry must have a unique key (first parameter)
2. **Author names:** Separate multiple authors with `and`
3. **Curly braces:** Protect capitalized words in titles with `{Curly Braces}` to preserve capitalization
4. **Special characters:** Use LaTeX escape sequences (`{\`e}`for é,`{\~n}` for ñ)
5. **URLs:** Place URLs in `{curly braces}` to prevent issues
6. **Alphabetical order:** Keep entries alphabetically sorted by key

### Common Mistakes to Avoid

- ❌ `author=Smith, John` → ✅ `author={Smith, John}`
- ❌ `journal=Science` → ✅ `journal={Science}` or `journal = "Science"`
- ❌ `title=Deep Learning` (loses capitalization) → ✅ `title={Deep Learning}` or `title={{D}eep {L}earning}`
- ❌ `pdf=http://...` → ✅ `pdf={http://...}`

## Jekyll-Scholar Integration

The `jekyll-scholar` plugin processes BibTeX and generates bibliography pages.

### How it Works

1. Entries in `_bibliography/papers.bib` are read
2. Pages marked with `layout: bib` render the bibliography
3. Posts/pages can reference entries using `{% cite key %}`
4. Custom keywords control what displays on publication entries

### Displaying Publications

In pages/posts, use:

- `{% cite key %}` – Cite an entry inline
- `{% bibliography %}` – Display full bibliography

## File Paths in BibTeX

When using `pdf`, `poster`, `preview`, or similar fields:

- **PDF files:** Use just the filename (automatically resolved to `assets/pdf/`)
  - Example: `pdf={smith2023.pdf}` → resolves to `assets/pdf/smith2023.pdf`
- **Preview images:** Use just the filename (automatically resolved to `assets/img/publication_preview/`)
  - Example: `preview={smith2023.jpg}` → resolves to `assets/img/publication_preview/smith2023.jpg`
- **Absolute URLs:** Include full URL for external resources
  - Example: `code={https://github.com/user/repo}`
  - Example: `html={https://example.com/paper}`

## Validation

### Before Committing BibTeX Changes

1. **Syntax check:** Verify no unclosed braces or quotes
2. **Build test:**
   ```bash
   docker compose down
   docker compose up
   # Check output for "ERROR" or "Invalid bibtex"
   # Publications should render at http://localhost:8080/publications/
   ```
3. **Publication page:** Open publications page and verify entries display correctly

### Common BibTeX Build Errors

- `Invalid bibtex reference 'key'` – Key doesn't exist in papers.bib
- `Unmatched braces` – Missing closing brace in entry
- `Unknown entry type` – Entry type (after @) is misspelled
- `PDF not found` – Path in pdf field is incorrect

## Editing and Maintenance

### Adding New Entries

1. Add entry to `_bibliography/papers.bib`
2. Use consistent key naming (e.g., `LastnameYear` or `Lastname2023details`)
3. Ensure all required fields are present
4. Test build: `docker compose up`

### Modifying Existing Entries

- Can change any BibTeX field without breaking Jekyll
- Adding custom keywords (pdf, code, etc.) enriches display
- Test build after modifications to verify display

### Removing Entries

- Delete or comment out (prefix with `%`) the entire entry
- No broken reference check needed; Jekyll-Scholar handles missing keys gracefully

## Trust These Instructions

When working with BibTeX:

- Follow the standard format shown in examples above
- Always test locally with `docker compose up` after changes
- Check the publications page at http://localhost:8080/publications to verify display
- Only search for additional details if encountering error messages not mentioned here
