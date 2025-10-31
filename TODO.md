# TODO for Issue #3328: Can't clear search field in bib search

## Tasks
- [x] Fix the setTimeout bug in `assets/js/bibsearch.js` to properly debounce the search filtering
- [x] Add a clear button to the bib search input in `_includes/bib_search.liquid`
- [x] Add CSS styles for the clear button in `_sass/_base.scss`
- [ ] Test the changes (optional, as user can do this)

## Details
- The bib search input field does not have a clear button, making it hard to clear the search.
- The setTimeout in the input event listener is incorrectly implemented, causing immediate filtering instead of debounced.
- Add a clear button that appears when the input has text, and clears the field on click.
- Follow the pattern of other form inputs in the theme.
