# EVL Bibliography Directory

## Important Note
Do not make changes to this file, if you have additions or corrections to the EVL master bibliography make them in its repo ([https://github.com/uic-evl/evl_biblio](https://github.com/uic-evl/evl_biblio))

## Files in this Directory

### Bibliography Files
- **papers.bib** - Main bibliography file containing all EVL publications in BibTeX format. This is synchronized from the EVL bibliography repository.
- **papers-enhanced.bib** - Enhanced version of papers.bib with additional fields (bibtex_show, selected) added by enhanceBib.py for website display purposes
- **sage3.bib** - SAGE3-specific bibliography file for SAGE3-related publications

### Scripts
- **enhanceBib.py** - Python script that processes BibTeX files to add website-specific fields:
  - `bibtex_show = {true}` - enables BibTeX display on website
  - `selected = {false}` - marks papers as selected/featured
  - Usage: `python enhanceBib.py <bibtex_file>`
  - Outputs: `<filename>-enhanced.bib`

- **cleanbib.py** - Python script that cleans BibTeX files:
  - Removes fields with empty values
  - Converts abbreviated month names to full names (e.g., apr → April, jan → January)
  - Handles both braced and unbraced month formats
  - Usage: `python cleanbib.py <bibtex_file>`
  - Outputs: `<filename>-updated.bib`

- **checkBranches.sh** - Shell script to compare papers.bib across all git branches
  - Shows which branches have identical versions to master
  - Identifies branches with different versions
  - Lists branches missing the file
  - Useful for tracking bibliography synchronization across branches

- **tidyBib.sh** - BibTeX formatting and cleanup script using bibtex-tidy
  - Formats BibTeX files with EVL-specific configuration
  - Removes duplicates, empty fields, and standardizes formatting
  - Sorts entries by year and applies consistent field ordering
  - Setup: `npm install -g bibtex-tidy`
  - Usage: `./tidyBib.sh <file.bib>`

### Documentation
- **README-bib.md** - This file, explaining the directory structure and file purposes 