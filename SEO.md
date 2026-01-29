# SEO Best Practices Guide

This guide helps you optimize your al-folio website for search engines so your research and work are discoverable.

<!--ts-->

- [SEO Best Practices Guide](#seo-best-practices-guide)
  - [Overview](#overview)
  - [Basic SEO Setup](#basic-seo-setup)
    - [Sitemap and Robots](#sitemap-and-robots)
    - [Site URL and Metadata](#site-url-and-metadata)
  - [Enabling Open Graph (Social Media Previews)](#enabling-open-graph-social-media-previews)
    - [What is Open Graph?](#what-is-open-graph)
    - [Enable in al-folio](#enable-in-al-folio)
  - [Schema.org Markup](#schemaorg-markup)
    - [What is Schema.org?](#what-is-schemaorg)
    - [Enable in al-folio](#enable-in-al-folio-1)
    - [What Gets Marked Up](#what-gets-marked-up)
  - [Search Console Setup](#search-console-setup)
    - [Google Search Console](#google-search-console)
    - [Bing Webmaster Tools](#bing-webmaster-tools)
  - [Publication Indexing](#publication-indexing)
    - [Google Scholar](#google-scholar)
    - [DBLP (Computer Science)](#dblp-computer-science)
    - [arXiv](#arxiv)
  - [Content Optimization](#content-optimization)
    - [Page Titles and Descriptions](#page-titles-and-descriptions)
    - [Heading Structure](#heading-structure)
    - [Image Optimization](#image-optimization)
    - [Internal Linking](#internal-linking)
  - [RSS Feed for Discovery](#rss-feed-for-discovery)
  - [Performance &amp; Mobile](#performance--mobile)
  - [SEO Checklist](#seo-checklist)
  - [Resources](#resources)

<!--te-->

## Overview

SEO (Search Engine Optimization) makes your website discoverable on Google, Bing, and other search engines. For academics, this means:

- Your research becomes discoverable when people search for your work
- Your CV/bio appears in search results
- Your publications rank higher
- More citations and collaborations

al-folio includes SEO basics, but you can optimize further.

---

## Basic SEO Setup

### Sitemap and Robots

al-folio auto-generates a `sitemap.xml` and `robots.txt` for you. These tell search engines what pages exist.

**Verify they exist:**

- Visit `https://your-site.com/sitemap.xml` – Should show an XML list of pages
- Visit `https://your-site.com/robots.txt` – Should show instructions for search engines

If they're missing:

1. Check `_config.yml` has a valid `url`
2. Rebuild: `bundle exec jekyll build`
3. Check `_site/` directory has both files

**No configuration needed** – al-folio handles this automatically.

---

### Site URL and Metadata

Ensure `_config.yml` has correct metadata:

```yaml
title: Your Full Name or Site Title
description: > # Brief description (1-2 sentences)
  A description of your research and expertise.
  This appears in search results.
author: Your Name
keywords: machine learning, research, academia, etc.
url: https://your-domain.com
lang: en
```

All fields are important for SEO. **Avoid leaving fields blank.**

---

## Enabling Open Graph (Social Media Previews)

### What is Open Graph?

When someone shares your page on Twitter, Facebook, LinkedIn, etc., Open Graph controls what preview appears.

**Without Open Graph:**

- Generic title
- No image
- Ugly preview

**With Open Graph:**

- Your custom title
- Your custom image (photo, diagram, etc.)
- Custom description
- Professional preview

### Enable in al-folio

Open Graph is disabled by default. To enable:

1. **Edit `_config.yml`:**

   ```yaml
   serve_og_meta: true # Change from false to true
   og_image: /assets/img/og-image.png # Path to your image (1200x630px recommended)
   ```

2. **Create your OG image:**
   - Size: 1200x630 pixels
   - Format: PNG or JPG
   - Content: Your name/logo + key info
   - Save to: `assets/img/og-image.png`

3. **Commit and deploy**

4. **Test it:**
   - Use [Facebook's Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)
   - Paste your site URL
   - You should see your custom image and title

**Per-page OG images:**

Add to the frontmatter of a blog post or page:

```markdown
---
layout: post
title: My Research Paper
og_image: /assets/img/paper-diagram.png
---
```

---

## Schema.org Markup

### What is Schema.org?

Schema.org is structured data that tells search engines what kind of content is on your page:

- "This is a Person" (your bio page)
- "This is a Publication" (your paper)
- "This is a BlogPosting" (your article)

Benefits:

- Rich snippets in search results
- Better knowledge graph information
- Schema validation helps Google understand your site

### Enable in al-folio

Enable in `_config.yml`:

```yaml
serve_schema_org: true # Change from false to true
```

That's it! al-folio automatically marks up:

- **Author info** (Person schema with name, URL, photo)
- **Blog posts** (BlogPosting schema with date, title, description)
- **Publications** (CreativeWork/ScholarlyArticle schema)

### What Gets Marked Up

**Homepage (Person):**

- Your name, photo, description
- Links to your profiles (LinkedIn, GitHub, etc.)

**Blog posts (BlogPosting):**

- Title, date, author, description
- Content
- Publication date and modified date

**Publications (ScholarlyArticle):**

- Title, authors, abstract
- Publication date, venue
- URL and PDF links

---

## Search Console Setup

### Google Search Console

**Google Search Console** lets you monitor how your site appears in Google search results.

**Setup:**

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your website:
   - Click **"URL prefix"**
   - Enter your site URL: `https://your-domain.com`
3. Verify ownership (choose one method):
   - **HTML file upload** – Download file, add to repository root
   - **HTML tag** – Copy meta tag to `_config.yml` → redeploy
   - **Google Analytics** – If you already use Google Analytics
   - **DNS record** – Advanced (if you own the domain)

**Add to `_config.yml`:**

```yaml
google_site_verification: YOUR_VERIFICATION_CODE
```

(Replace `YOUR_VERIFICATION_CODE` with the code from Search Console.)

**Monitor in Search Console:**

- **Performance** – Which queries bring traffic, your ranking position
- **Coverage** – Any indexing errors
- **Enhancements** – Schema.org validation
- **Sitemaps** – Your sitemap status

---

### Bing Webmaster Tools

Similar to Google Search Console but for Bing search:

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify (usually auto-verifies if you verified Google)
4. Add to `_config.yml`:
   ```yaml
   bing_site_verification: YOUR_BING_CODE
   ```

**Note:** Bing commands are optional but recommended. Check both console dashboards regularly.

---

## Publication Indexing

### Google Scholar

**Goal:** Get your publications listed on Google Scholar so they show up in scholar search results.

**Google Scholar auto-crawls:**

- Your website automatically (if publicly accessible)
- Your publications page if it has proper markup
- PDFs linked from your site

**To improve Scholar indexing:**

1. **Ensure BibTeX has proper format:**

   ```bibtex
   @article{mykey,
     title={Your Paper Title},
     author={Your Name and Co-Author},
     journal={Journal Name},
     year={2024},
     volume={1},
     pages={1-10},
     doi={10.1234/doi}
   }
   ```

2. **Add PDFs to BibTeX:**

   ```bibtex
   @article{mykey,
     # ... other fields ...
     pdf={my-paper.pdf}  # File at assets/pdf/my-paper.pdf
   }
   ```

3. **Submit to Google Scholar (optional):**
   - Go to [Google Scholar Author Profile](https://scholar.google.com/citations)
   - Create a profile
   - Google will find your papers automatically within weeks

4. **Wait 3-6 months** – Google Scholar takes time to index

---

### DBLP (Computer Science)

If your research is computer science related:

1. Go to [DBLP](https://dblp.org/)
2. Search for yourself or your papers
3. If missing, [Submit via DBLP](https://dblp.org/db/contrib/) (requires account)
4. DBLP will verify and add your work

---

### arXiv

If you have preprints:

1. Go to [arXiv.org](https://arxiv.org/)
2. Submit your preprint
3. Once listed, arXiv automatically indexes it across search engines

**Add arXiv link to BibTeX:**

```bibtex
@article{mykey,
  # ... other fields ...
  arxiv={2024.12345}  # arXiv ID
}
```

---

## Content Optimization

### Page Titles and Descriptions

Every page needs a title and description. These show in search results.

**In `_config.yml`:**

```yaml
title: Jane Smith - Computer Science Researcher
description: >
  Academic website of Jane Smith, focusing on machine learning and AI ethics.
```

**In page/post frontmatter:**

```markdown
---
layout: post
title: Novel Deep Learning Architecture for Climate Modeling
description: A new approach to improving climate model accuracy with deep learning
---
```

**Checklist:**

- [ ] Title under 60 characters (so it doesn't get cut off)
- [ ] Description 120-160 characters
- [ ] Include your name in the site title
- [ ] Include keywords naturally

---

### Heading Structure

Use proper HTML heading hierarchy for both SEO and accessibility:

```markdown
# H1: Main Page Title

Use one H1 per page, usually your blog post or page title

## H2: Section Heading

### H3: Subsection

### H3: Another subsection

## H2: Another Section
```

**Benefits:**

- Search engines understand your content structure
- Screen readers can navigate better
- Visitors can scan your content

---

### Image Optimization

**For SEO:**

- Use descriptive filenames: `neural-network-architecture.png` (not `img1.png`)
- Add alt text (also helps accessibility):
  ```markdown
  ![Neural network showing three layers with training accuracy of 95%](assets/img/neural-network.png)
  ```

**For performance:**

- Optimize image file size (use tools like TinyPNG)
- Use modern formats (WebP instead of large JPGs)
- Responsive images (different sizes for mobile vs desktop)

---

### Internal Linking

Link between your own pages strategically:

```markdown
See my [publication on climate AI](./publications/) or my [blog post on neural networks](/blog/2024/neural-networks/).
```

**Benefits:**

- Search engines crawl through your links
- Users discover more of your content
- Distributes "authority" across your site

---

## RSS Feed for Discovery

al-folio auto-generates an RSS feed at `/feed.xml`.

**Why RSS matters:**

- Content aggregators pick up your posts
- Researchers can subscribe to your updates
- Improves discoverability

**Ensure your feed works:**

```yaml
# In _config.yml
title: Your Site
description: Your site description
url: https://your-domain.com # MUST be complete URL
```

**Test your feed:**

- Visit `https://your-site.com/feed.xml`
- Should show XML with your recent posts
- Try subscribing in a feed reader (Feedly, etc.)

---

## Performance & Mobile

Search engines favor fast, mobile-friendly sites.

**Check your site:**

- Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Enter your site URL
- Review recommendations
- al-folio already optimizes for performance, but you can improve further:
  - Compress images
  - Minimize CSS/JS (enabled by default)
  - Use lazy loading (already enabled)

**Mobile optimization:**

- al-folio is responsive by default
- Test on phones/tablets
- Ensure buttons are large enough to tap
- Check readability on small screens

---

## SEO Checklist

Before considering your site "SEO optimized":

**Basic Setup:**

- [ ] `_config.yml` has `title`, `description`, `author`, `url`
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] Mobile-friendly (test on phone)

**Search Console:**

- [ ] Google Search Console linked
- [ ] Bing Webmaster Tools linked (optional but recommended)
- [ ] No major indexing errors
- [ ] Sitemaps submitted

**Schema/Open Graph:**

- [ ] `serve_og_meta: true` (for social sharing)
- [ ] `serve_schema_org: true` (for structured data)
- [ ] Test OG with [Facebook Debugger](https://developers.facebook.com/tools/debug/sharing/)
- [ ] Validate schema at [Schema.org Validator](https://validator.schema.org/)

**Content:**

- [ ] Every page has unique title (under 60 chars)
- [ ] Every page has description (120-160 chars)
- [ ] Blog posts have proper dates
- [ ] Images have descriptive alt text
- [ ] Headings follow proper hierarchy

**Publications:**

- [ ] BibTeX entries have proper format
- [ ] PDFs linked from BibTeX
- [ ] Submitted to Google Scholar (optional)
- [ ] Indexed on DBLP or arXiv (if applicable)

**Performance:**

- [ ] Site loads under 3 seconds (check PageSpeed)
- [ ] No broken links (use lighthouse or similar)
- [ ] RSS feed works (check `/feed.xml`)

---

## Resources

- **[Google Search Central](https://developers.google.com/search)** – Official SEO guide
- **[Moz SEO Checklist](https://moz.com/beginners-guide-to-seo)** – Beginner-friendly guide
- **[Google PageSpeed Insights](https://pagespeed.web.dev/)** – Performance analysis
- **[Schema.org](https://schema.org/)** – Structured data reference
- **[WebAIM](https://webaim.org/)** – Accessibility (helps SEO too)
- **[Lighthouse Audit](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpombljlkpstvnztVTNyZe)** – Browser extension

---

**Next Steps:**

1. Enable Open Graph and Schema.org in `_config.yml`
2. Set up Google Search Console and Bing Webmaster Tools
3. Optimize your page titles and descriptions
4. Add alt text to images and PDFs to your BibTeX
5. Monitor search console regularly for indexing issues

Your research will be more discoverable with these optimizations! 🔍
