# Accessibility Guide

This guide helps you ensure your al-folio website is accessible to all visitors, including people with disabilities.

<!--ts-->

- [Accessibility Guide](#accessibility-guide)
  - [Overview](#overview)
  - [Why Accessibility Matters](#why-accessibility-matters)
  - [Built-in Accessibility](#built-in-accessibility)
  - [Accessibility Checking](#accessibility-checking)
    - [Run Automated Tests Locally](#run-automated-tests-locally)
    - [Manual Testing](#manual-testing)
  - [Common Accessibility Issues \& Fixes](#common-accessibility-issues--fixes)
    - [Images Missing Alt Text](#images-missing-alt-text)
    - [Links Not Descriptive](#links-not-descriptive)
    - [Color Contrast Too Low](#color-contrast-too-low)
    - [Keyboard Navigation Not Working](#keyboard-navigation-not-working)
    - [Missing Form Labels](#missing-form-labels)
    - [Heading Hierarchy Broken](#heading-hierarchy-broken)
  - [Accessibility Best Practices](#accessibility-best-practices)
    - [Writing Content](#writing-content)
    - [Images and Media](#images-and-media)
    - [Links](#links)
    - [Code and Math](#code-and-math)
    - [PDFs and Documents](#pdfs-and-documents)
  - [Testing Tools](#testing-tools)
  - [Resources](#resources)
  - [Quick Checklist](#quick-checklist)
  - [Need Help?](#need-help)

<!--te-->

## Overview

Accessibility means ensuring your website works for everyone, regardless of ability. This includes:

- **Visual impairments** – Screen reader users, low vision
- **Hearing impairments** – Captions for video, transcripts for audio
- **Motor impairments** – Keyboard navigation, large buttons
- **Cognitive impairments** – Clear language, simple navigation
- **Other** – Slow connections, old devices, non-native speakers

---

## Why Accessibility Matters

1. **Ethical:** Making your research accessible to everyone
2. **Legal:** Some jurisdictions require web accessibility (ADA in US, AODA in Canada, WCAG in EU)
3. **SEO:** Accessible sites rank better in search engines
4. **Usability:** Accessible sites are easier for everyone to use
5. **Academic integrity:** More people can read and build on your research

---

## Built-in Accessibility

al-folio includes several accessibility features out of the box:

- ✅ **Semantic HTML** – Proper heading structure, landmarks
- ✅ **Responsive design** – Works on phones, tablets, desktops
- ✅ **Color contrast** – Meets WCAG AA standards
- ✅ **Keyboard navigation** – Navigate without a mouse
- ✅ **Screen reader support** – Works with NVDA, JAWS, VoiceOver
- ✅ **Dark mode** – Reduces eye strain for some users
- ✅ **Focus indicators** – Clear focus states for keyboard users

---

## Accessibility Checking

### Run Automated Tests Locally

al-folio includes **axe (automated testing)** to check for accessibility issues.

**Using GitHub Actions (easiest):**

1. Push changes to your repository
2. Go to **Actions** tab
3. Look for the **"Axe - a11y tests"** workflow
4. Click on the completed run to see results
5. Expand any failures to see details and fixes

**Running locally:**

```bash
# Check a specific file
axe _pages/about.md

# Or use the GitHub Actions workflow
# Results are posted as a comment on pull requests
```

**Interpreting results:**

- 🔴 **Critical** – Must fix (breaks functionality)
- 🟠 **Serious** – Should fix (impacts many users)
- 🟡 **Moderate** – Nice to fix (affects some users)
- 🔵 **Minor** – Polish (edge cases)

---

### Manual Testing

Automated tools catch ~30% of issues. Manual testing catches the rest.

**Test keyboard navigation:**

1. Hide your mouse/trackpad
2. Use **Tab** to navigate through all interactive elements
3. Use **Enter** or **Space** to activate buttons/links
4. Use arrow keys for dropdown menus
5. Ensure you can access all features

**Test with a screen reader:**

**Windows:**

- Use built-in **Narrator**: `Windows + Ctrl + N`

**Mac:**

- Use built-in **VoiceOver**: `Cmd + F5`

**Linux:**

- Use **NVDA** (free download): https://www.nvaccess.org/

**Checklist:**

- [ ] All page content is readable
- [ ] Links are descriptive (screen reader reads link text)
- [ ] Images have alt text
- [ ] Headings make sense when read aloud
- [ ] Form fields have labels

**Test color contrast:**

- Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Ensure text is readable (especially on custom theme colors)
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text

---

## Common Accessibility Issues & Fixes

### Images Missing Alt Text

**Problem:** Images have no description for screen reader users.

**Fix in Markdown:**

```markdown
# Bad ❌

![](assets/img/my-photo.jpg)

# Good ✅

![A group of researchers presenting at a conference](assets/img/my-photo.jpg)
```

**Fix in BibTeX:**

```bibtex
# Add descriptions for paper thumbnails
@article{mykey,
  # ... other fields ...
  alt={Diagram showing the three-layer neural network architecture}
}
```

**Good alt text:**

- Describes the content and purpose
- About 125 characters max
- Doesn't say "image of" (screen readers already say that)
- For charts: describe the data, not just "chart"

**Examples:**

```markdown
❌ "Photo"
✅ "Alice Chen presenting her research on climate modeling"

❌ "Graph of results"
✅ "Bar chart showing publication counts by year from 2015 to 2024"

❌ "Logo"
✅ "University of Example logo"
```

---

### Links Not Descriptive

**Problem:** Links like "click here" don't make sense to screen reader users.

**Fix:**

```markdown
# Bad ❌

See my paper [here](assets/pdf/paper.pdf).

# Good ✅

Read my [analysis of climate policy](assets/pdf/paper.pdf).
```

**Why this matters:** Screen reader users often skip through links quickly. Links must be meaningful out of context.

---

### Color Contrast Too Low

**Problem:** Text is hard to read against background color.

**Fix:**

1. Use the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
2. Enter your text color and background color
3. Ensure ratio is at least **4.5:1** (normal text) or **3:1** (large text)
4. Adjust colors in `_config.yml` or `_sass/_themes.scss`

**al-folio default colors meet WCAG AA standards**, so this is usually only an issue if you customize colors heavily.

---

### Keyboard Navigation Not Working

**Problem:** Some buttons or links can't be accessed with keyboard.

**Fix:**

- Ensure all interactive elements use semantic HTML: `<button>`, `<a>`, `<input>`
- Don't use `<div>` or `<span>` as buttons
- JavaScript-powered buttons need `tabindex="0"` and keyboard handlers

**Example (bad):**

```html
<!-- ❌ Not keyboard accessible -->
<div onclick="doSomething()">Click me</div>
```

**Example (good):**

```html
<!-- ✅ Keyboard accessible -->
<button onclick="doSomething()">Click me</button>
```

---

### Missing Form Labels

**Problem:** Form fields (search, contact forms) don't have associated labels.

**Fix in HTML/Liquid:**

```html
<!-- ❌ No label -->
<input type="text" placeholder="Search..." />

<!-- ✅ Proper label -->
<label for="search">Search publications:</label>
<input id="search" type="text" placeholder="Search..." />
```

---

### Heading Hierarchy Broken

**Problem:** Headings skip levels (H1 → H3, missing H2) confusing screen reader users.

**Fix:**

```markdown
# ✅ Correct hierarchy

# Main Title (H1)

## Section 1 (H2)

### Subsection (H3)

## Section 2 (H2)

# ❌ Broken hierarchy

# Main Title (H1)

### Subsection (H3) — should be H2!

## Section 2 (H2)
```

**Rule:** Always use sequential heading levels; don't skip.

---

## Accessibility Best Practices

### Writing Content

- **Use clear language** – Short sentences, common words
- **Avoid jargon** – Explain technical terms
- **Use lists** – Easier to scan than paragraphs
- **Short paragraphs** – 3-4 lines max
- **Descriptive headings** – Say what the section is about

### Images and Media

- **Alt text for images** – Describe the content
- **Captions for videos** – Include transcript too
- **Audio transcripts** – Full text of spoken content
- **Color alone is not enough** – Use patterns, labels too

### Links

- **Descriptive link text** – Don't use "click here"
- **Visible focus states** – Already in al-folio by default
- **External links** – Indicate they open in new window
- **Avoid misleading links** – Don't link email addresses to mailto (confuses readers)

### Code and Math

**Code blocks:**

````markdown
# ✅ Good: Language specified for syntax highlighting

```python
def hello():
    print("Hello world")
```
````

````

**Math equations:**
```markdown
# ✅ Include alt text for complex equations
The equation $E = mc^2$ (energy equals mass times light speed squared)
represents mass-energy equivalence.
````

### PDFs and Documents

- **Accessible PDFs** – Use proper headings, alt text in PDF itself
- **Link to PDF content** – Offer plain text or HTML version too
- **Avoid scanned images as PDFs** – Use OCR to make text selectable

---

## Testing Tools

| Tool                        | Purpose                            | Cost | Type                       |
| --------------------------- | ---------------------------------- | ---- | -------------------------- |
| **axe DevTools**            | Automated accessibility testing    | Free | Browser extension          |
| **WAVE**                    | Identify accessibility errors      | Free | Browser extension          |
| **NVDA**                    | Screen reader testing              | Free | Windows screen reader      |
| **VoiceOver**               | Screen reader testing              | Free | Mac screen reader          |
| **WebAIM Contrast Checker** | Color contrast validation          | Free | Web tool                   |
| **Lighthouse**              | Performance & accessibility audits | Free | Built into Chrome DevTools |
| **JAWS**                    | Premium screen reader (testing)    | Paid | Windows screen reader      |

---

## Resources

- **[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** – Official web accessibility standards
- **[WebAIM](https://webaim.org/)** – Practical accessibility guides
- **[A11y Project](https://www.a11yproject.com/)** – Community accessibility resource
- **[MDN Accessibility Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility)** – Technical reference
- **[Inclusive Components](https://inclusive-components.design/)** – Design patterns for accessibility

---

## Quick Checklist

Before publishing content, ensure:

- [ ] All images have alt text
- [ ] All links are descriptive
- [ ] Heading hierarchy is correct (no skipping levels)
- [ ] Color contrast is sufficient (test with contrast checker)
- [ ] Navigation works with keyboard only
- [ ] No autoplay video/audio
- [ ] Forms have proper labels
- [ ] Your site passes axe accessibility tests

---

## Need Help?

- **GitHub Copilot Customization Agent** – Ask for help making specific changes accessible
- **[GitHub Discussions](https://github.com/alshedivat/al-folio/discussions)** – Ask the community
- **[WebAIM](https://webaim.org/)** – Detailed guidance on accessibility techniques

---

**Remember:** Accessibility is an ongoing process, not a one-time task. Test regularly, fix issues as you find them, and keep your content accessible as you update it.
