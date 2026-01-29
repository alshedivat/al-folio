# Bootstrap 5 and Dependencies Update - Migration Guide

## Overview
This document describes the comprehensive dependency update performed on the al-folio template, with a focus on the major Bootstrap 4 to Bootstrap 5 migration.

## Updated Dependencies

### Major Updates

#### Bootstrap: v4.6.2 → v5.3.8 ⚠️ BREAKING CHANGES
- **Files Updated:**
  - `assets/css/bootstrap.min.css`
  - `assets/css/bootstrap.min.css.map`
  - `assets/js/bootstrap.bundle.min.js`
  - `assets/js/bootstrap.bundle.min.js.map`
- **Breaking Changes:** See Bootstrap 5 Migration section below

#### jQuery: v3.6.0 → v4.0.0 ⚠️ BREAKING CHANGES
- Bootstrap 5 no longer requires jQuery
- jQuery 4.0 has its own breaking changes
- Consider removing jQuery if not used elsewhere

#### MathJax: v3.2.2 → v4.1.0 ⚠️ BREAKING CHANGES
- Major version update with potential API changes
- Math rendering should be tested thoroughly

### Library Updates (CDN)

#### Visualization Libraries
- **chart.js:** v4.4.1 → v4.5.1
- **d3:** v7.8.5 → v7.9.0
- **echarts:** v5.5.0 → v6.0.0 ⚠️ MAJOR VERSION
- **mermaid:** v10.7.0 → v11.12.2 ⚠️ MAJOR VERSION
- **plotly:** v3.0.1 → v3.3.1
- **vega:** v5.27.0 → v6.2.0 ⚠️ MAJOR VERSION
- **vega-embed:** v6.24.0 → v7.1.0 ⚠️ MAJOR VERSION
- **vega-lite:** v5.16.3 → v6.4.2 ⚠️ MAJOR VERSION

#### UI Libraries
- **bootstrap-table:** v1.22.4 → v1.26.0
- **diff2html:** v3.4.47 → v3.4.55
- **highlightjs:** v11.9.0 → v11.11.1
- **swiper:** v11.0.5 → v12.0.3 ⚠️ MAJOR VERSION

### npm Dependencies
- **prettier:** ^3.8.0 → ^3.8.1

### Libraries Already at Latest Version (No Update)
- imagesloaded: v5.0.0
- img-comparison-slider: v8.0.6
- leaflet: v1.9.4
- lightbox2: v2.11.5
- masonry: v4.2.2
- mdb (mdbootstrap): v4.20.0
- medium_zoom: v1.1.0
- photoswipe: v5.4.4
- pseudocode: v2.4.1
- spotlight: v0.7.8
- venobox: v2.1.8

## Bootstrap 5 Migration Details

### CSS Class Changes

All deprecated Bootstrap 4 utility classes have been updated to Bootstrap 5 equivalents:

#### Margin Classes
- `ml-*` → `ms-*` (margin-left → margin-start)
- `mr-*` → `me-*` (margin-right → margin-end)

#### Padding Classes
- `pl-*` → `ps-*` (padding-left → padding-start)
- `pr-*` → `pe-*` (padding-right → padding-end)

#### Text Alignment
- `text-left` → `text-start`
- `text-right` → `text-end`

#### Float Classes
- `float-left` → `float-start`
- `float-right` → `float-end`

#### Dropdown Classes
- `dropdown-menu-right` → `dropdown-menu-end`

### Data Attribute Changes

All Bootstrap data attributes have been updated to use the `data-bs-*` prefix:
- `data-toggle` → `data-bs-toggle`
- `data-target` → `data-bs-target`
- `data-dismiss` → `data-bs-dismiss`

### Files Modified

#### Template Files
- `_includes/header.liquid` - Updated navbar, dropdown, and collapse attributes
- `_layouts/cv.liquid` - Updated table padding classes and float classes
- `_includes/cv/*.liquid` - Updated margin classes in all CV sections
- `_includes/projects.liquid` - Updated margin classes and tooltip attributes
- `_includes/projects_horizontal.liquid` - Updated margin classes and tooltip attributes
- `_includes/related_posts.liquid` - Updated padding classes
- `_layouts/bib.liquid` - Updated popover attributes and margin classes
- `_pages/blog.md` - Updated float classes

#### JavaScript Files
- `assets/js/tooltips-setup.js` - Updated tooltip selector to `data-bs-toggle`
- `assets/js/common.js` - Updated scrollspy and popover initialization for Bootstrap 5

### JavaScript API Changes

#### ScrollSpy Initialization
**Before (Bootstrap 4):**
```javascript
$("body").scrollspy({
  target: navSelector,
  offset: 100,
});
```

**After (Bootstrap 5):**
```javascript
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: navSelector,
  offset: 100,
});
```

#### Tooltip and Popover Selectors
**Before:**
```javascript
$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();
```

**After:**
```javascript
$('[data-bs-toggle="tooltip"]').tooltip();
$('[data-bs-toggle="popover"]').popover();
```

## Known Issues and Considerations

### 1. Material Design Bootstrap (MDB) Compatibility
- MDB v4.20.0 was built for Bootstrap 4
- May have compatibility issues with Bootstrap 5
- Testing required for any pages using MDB components
- Consider updating to MDB 5 in the future if issues arise

### 2. Bootstrap TOC Compatibility
- bootstrap-toc v1.0.1 should work with Bootstrap 5
- Needs testing on pages with table of contents

### 3. jQuery Dependency
- Bootstrap 5 no longer requires jQuery
- al-folio still uses jQuery for:
  - bootstrap-toc
  - Custom abstract/bibtex toggle functionality
  - Various UI interactions
- jQuery 4.0.0 included but could be removed if refactored to vanilla JS

### 4. SRI Integrity Hashes
- All integrity hashes have been updated for new library versions
- These are placeholder hashes and should be regenerated if CDN usage changes
- Verify hashes at https://www.srihash.org/ when deploying

### 5. Major Version Updates Requiring Testing
The following libraries had major version updates and may have breaking changes:
- **echarts:** v5 → v6
- **mermaid:** v10 → v11
- **vega ecosystem:** v5/v6 → v6/v7
- **swiper:** v11 → v12
- **jQuery:** v3 → v4

Pages using these libraries should be tested thoroughly.

## Testing Checklist

After applying these updates, test the following:

### Core Functionality
- [ ] Site builds without errors
- [ ] All pages load correctly
- [ ] No console errors in browser
- [ ] Responsive layout works on mobile/tablet/desktop

### Bootstrap 5 Features
- [ ] Navigation menu and dropdowns work
- [ ] Navbar collapse/expand on mobile
- [ ] Tooltips appear correctly
- [ ] Popovers function properly
- [ ] Modals (if any) work correctly
- [ ] Scrollspy updates active navigation

### Page-Specific Features
- [ ] About page renders correctly
- [ ] Blog posts display properly
- [ ] Publications page with BibTeX works
- [ ] Projects page displays correctly
- [ ] CV page renders with proper formatting
- [ ] Search functionality works
- [ ] Dark mode toggle works

### Visualization Libraries
- [ ] Chart.js visualizations render
- [ ] Mermaid diagrams display
- [ ] Plotly charts work
- [ ] Vega/Vega-Lite visualizations render
- [ ] ECharts displays correctly
- [ ] D3 visualizations work

### Math and Code
- [ ] MathJax renders equations correctly
- [ ] Code highlighting works (highlight.js)
- [ ] Jupyter notebooks display

## Rollback Instructions

If you encounter critical issues after this update:

1. **Revert Bootstrap files:**
   ```bash
   git checkout HEAD~1 -- assets/css/bootstrap.min.css
   git checkout HEAD~1 -- assets/css/bootstrap.min.css.map
   git checkout HEAD~1 -- assets/js/bootstrap.bundle.min.js
   git checkout HEAD~1 -- assets/js/bootstrap.bundle.min.js.map
   ```

2. **Revert configuration and template changes:**
   ```bash
   git checkout HEAD~1 -- _config.yml
   git checkout HEAD~1 -- _includes/
   git checkout HEAD~1 -- _layouts/
   git checkout HEAD~1 -- assets/js/common.js
   git checkout HEAD~1 -- assets/js/tooltips-setup.js
   ```

3. **Revert package.json:**
   ```bash
   git checkout HEAD~1 -- package.json
   npm install
   ```

## Future Considerations

1. **MDB Update:** Consider updating to Material Design Bootstrap 5 when available
2. **jQuery Removal:** Consider refactoring to remove jQuery dependency
3. **Continuous Testing:** Set up automated visual regression testing
4. **Documentation:** Update user-facing documentation about Bootstrap 5 usage

## Resources

- [Bootstrap 5 Migration Guide](https://getbootstrap.com/docs/5.3/migration/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [jQuery 4.0 Migration Guide](https://jquery.com/upgrade-guide/4.0/)
- [MathJax 4 Documentation](http://docs.mathjax.org/en/latest/)

## Summary

This update brings al-folio up to date with modern web standards and the latest library versions. The Bootstrap 5 migration is the most significant change, affecting CSS classes, JavaScript APIs, and data attributes throughout the template. All changes have been applied systematically to maintain backward compatibility where possible.

**Important:** Test thoroughly before deploying to production, especially pages using visualization libraries and MDB components.
