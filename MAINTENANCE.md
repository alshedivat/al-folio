# Maintenance & Updates Guide

This guide helps you maintain your al-folio website and keep it up-to-date with the latest features and security patches.

<!--ts-->

- [Maintenance & Updates Guide](#maintenance--updates-guide)
  - [Overview](#overview)
  - [Dependency Management](#dependency-management)
    - [Understanding Dependencies](#understanding-dependencies)
    - [Checking for Updates](#checking-for-updates)
    - [Updating Gems (Ruby)](#updating-gems-ruby)
    - [Updating Node Packages (JavaScript)](#updating-node-packages-javascript)
  - [Annual Site Review](#annual-site-review)
    - [Content Review](#content-review)
    - [Technical Review](#technical-review)
    - [SEO Review](#seo-review)
    - [Performance Review](#performance-review)
    - [Security Review](#security-review)
  - [Upgrading Jekyll](#upgrading-jekyll)
    - [Before Upgrading](#before-upgrading)
    - [Major Version Upgrades](#major-version-upgrades)
    - [Testing After Upgrade](#testing-after-upgrade)
  - [Backup and Disaster Recovery](#backup-and-disaster-recovery)
    - [What to Back Up](#what-to-back-up)
    - [Disaster Recovery Checklist](#disaster-recovery-checklist)
  - [Monitoring and Alerts](#monitoring-and-alerts)
    - [GitHub Notifications](#github-notifications)
    - [Website Monitoring](#website-monitoring)
    - [Uptime Monitoring](#uptime-monitoring)
  - [Common Maintenance Tasks](#common-maintenance-tasks)
    - [Updating Your CV](#updating-your-cv)
    - [Adding Publications](#adding-publications)
    - [Archiving Old Posts](#archiving-old-posts)
    - [Updating Broken Links](#updating-broken-links)
  - [Breaking Changes to Watch For](#breaking-changes-to-watch-for)
  - [Maintenance Schedule](#maintenance-schedule)
  - [Resources](#resources)
  <!--te-->

## Overview

Maintenance keeps your site secure, fast, and up-to-date. This guide provides:

- When and how to update dependencies
- Annual review checklist
- How to handle major upgrades
- Disaster recovery procedures

Most maintenance is minimal—usually just dependency updates 2-3 times per year.

---

## Dependency Management

### Understanding Dependencies

Your site depends on external libraries:

**Ruby (Backend):**

- Located in `Gemfile`
- Includes Jekyll, jekyll-scholar, plugins, etc.
- Installed via Bundler

**JavaScript (Frontend):**

- Located in `package.json`
- Includes build tools, code formatters, etc.
- Installed via npm

**External Libraries (via CDN):**

- Bootstrap, MathJax, Font Awesome, etc.
- Versions specified in `_config.yml`

---

### Checking for Updates

**Check Ruby gems:**

```bash
bundle outdated
```

Shows all outdated gems with current and latest versions.

**Check Node packages:**

```bash
npm outdated
```

Shows all outdated packages.

**Check for security vulnerabilities:**

```bash
bundle audit     # Check gems for security issues
npm audit        # Check packages for security issues
```

---

### Updating Gems (Ruby)

**Safe update (minor versions only):**

```bash
bundle update --conservative
```

Updates to latest patch versions (e.g., 4.1.0 → 4.1.5) but not major versions.

**Full update (all versions):**

```bash
bundle update
```

Updates to latest version including major versions (e.g., 4.x → 5.x).

**After updating:**

1. Test locally: `bundle exec jekyll serve`
2. Check for errors in terminal output
3. Visit your site and test all features
4. Deploy: `git add Gemfile.lock && git commit -m "Update dependencies"`

**If something breaks:**

- See [Breaking Changes section](#breaking-changes-to-watch-for)
- Revert with `git revert <commit>`
- Ask for help in [GitHub Discussions](https://github.com/alshedivat/al-folio/discussions)

---

### Updating Node Packages (JavaScript)

**Check for updates:**

```bash
npm outdated
```

**Update all packages:**

```bash
npm update
```

**Update a specific package:**

```bash
npm install package-name@latest
```

**After updating:**

1. Test locally: `npm run build` or `docker compose up`
2. Check for TypeScript/linting errors
3. Test your site
4. Commit: `git add package.json package-lock.json && git commit -m "Update packages"`

---

## Annual Site Review

### Content Review

**Every year, review:**

- [ ] Is your bio still accurate?
- [ ] Are your research interests current?
- [ ] Have you added recent publications?
- [ ] Are past events still listed (or archived)?
- [ ] Do old projects still represent your work?
- [ ] Are social media links still active?

**Content updates:**

```bash
# Edit your bio in _pages/about.md
# Update your CV in _data/cv.yml or assets/json/resume.json
# Add new publications to _bibliography/papers.bib
```

---

### Technical Review

**Every year, check:**

- [ ] All external links still work (use browser extensions or CI tools)
- [ ] Images load properly
- [ ] PDFs are accessible
- [ ] No deprecated code or plugins used
- [ ] Site works on modern browsers
- [ ] Mobile view is responsive

**Run automated tests:**

```bash
# Broken links test (in GitHub Actions)
# Lighthouse performance audit
# Accessibility tests (axe)
```

---

### SEO Review

**Every year, review:**

- [ ] Page titles and descriptions are still accurate
- [ ] Alt text is on all images
- [ ] No broken links that hurt SEO
- [ ] Site speed hasn't degraded
- [ ] Search Console shows no errors
- [ ] Publications indexed on Google Scholar

**Check in Google Search Console:**

- Impressions and click-through rate (are you visible?)
- Any crawl errors or coverage issues
- Mobile usability warnings

---

### Performance Review

**Every year, run:**

- [ ] Google PageSpeed Insights: `https://pagespeed.web.dev/`
- [ ] Lighthouse audit (built into Chrome)
- [ ] Check site load time

**Typical targets:**

- Load time: < 3 seconds
- Lighthouse score: > 90
- Mobile friendly: Yes

**If performance degraded:**

- Check image sizes (compress if needed)
- Review page complexity
- Check for unused CSS/JS
- See al-folio performance guide

---

### Security Review

**Every year:**

- [ ] Run `bundle audit` for gem vulnerabilities
- [ ] Run `npm audit` for package vulnerabilities
- [ ] Update Gemfile and package.json if issues found
- [ ] Check GitHub Security tab for alerts
- [ ] Review GitHub Actions permissions

**Security checklist:**

- [ ] No secrets (API keys, tokens) in code
- [ ] All dependencies up-to-date
- [ ] GitHub token permissions are minimal (read-only by default)
- [ ] Site uses HTTPS (GitHub Pages default)

---

## Upgrading Jekyll

### Before Upgrading

**Check current version:**

```bash
jekyll --version
```

**Read release notes:**

- Check [Jekyll releases](https://jekyllrb.com/news/)
- Check [al-folio releases](https://github.com/alshedivat/al-folio/releases)
- Look for breaking changes

**Backup your site (see [Disaster Recovery](#backup-and-disaster-recovery)):**

```bash
git branch backup-current-version
```

---

### Major Version Upgrades

**Example: Upgrading Jekyll 4.x → 5.x**

1. **Update Gemfile:**

   ```bash
   bundle update jekyll
   ```

2. **Update other gems:**

   ```bash
   bundle update
   ```

3. **Test locally:**

   ```bash
   bundle exec jekyll serve
   ```

4. **Look for errors:**
   - Check terminal output for warnings
   - Visit `http://localhost:4000` and test features

5. **If major issues:**

   ```bash
   git revert HEAD  # Undo the update
   bundle install  # Restore old version
   ```

6. **If successful:**
   ```bash
   git add Gemfile.lock
   git commit -m "Upgrade Jekyll to 5.x"
   ```

---

### Testing After Upgrade

**Comprehensive testing:**

```bash
# 1. Build the site locally
bundle exec jekyll build

# 2. Check for errors
echo "Check for error messages above"

# 3. Start local server
bundle exec jekyll serve

# 4. Test key features:
# - Blog posts display correctly
# - Publications show up
# - Navigation works
# - Styling looks right
# - Search works
# - Comments work (if enabled)
```

**Before deploying:**

- Test on mobile
- Test on different browsers (Chrome, Firefox, Safari)
- Test keyboard navigation
- Check all external links

---

## Backup and Disaster Recovery

### What to Back Up

**Your content (most important):**

- `_posts/` – Blog posts
- `_projects/` – Project pages
- `_pages/` – Custom pages
- `_data/` – CV, social links, publications metadata
- `_bibliography/papers.bib` – Your publications
- `assets/` – Your images, PDFs, documents

**Configuration:**

- `_config.yml` – Site settings
- `Gemfile`, `package.json` – Dependencies

**Everything else is auto-generated** (themes, layouts, built site).

### Disaster Recovery Checklist

**If your repository gets corrupted:**

1. **Check GitHub:** Is the current version safe?

   ```bash
   git status
   ```

2. **Revert to a previous commit:**

   ```bash
   git log --oneline | head -20  # See recent commits
   git revert <commit-hash>      # Undo a specific commit
   # OR
   git reset --hard <commit-hash> # Go back to a specific point
   ```

3. **If GitHub is corrupted, restore locally:**

   ```bash
   # You have local backups in your git history
   git reflog  # See all actions you've done
   git reset --hard <reference>
   ```

4. **Nuclear option (last resort):**

   ```bash
   # Clone a fresh copy of the repo
   git clone https://github.com/yourusername/yourrepo.git new-copy

   # Your content in _posts/, _projects/, _data/ is safe
   # Just copy those folders to the new clone
   ```

**To prevent loss:**

- GitHub keeps your full history
- Regular pushes = automatic backups
- Consider exporting your content periodically

---

## Monitoring and Alerts

### GitHub Notifications

**Watch your repository for:**

- Dependabot alerts (automatic security updates)
- Issues and pull requests
- GitHub Actions failures

**Configuration:**

- Go to repository **Settings** → **Notifications**
- Set how and when you want alerts

**Recommended:**

- Email for security alerts (critical)
- No email for regular notifications (too noisy)

---

### Website Monitoring

**Monitor broken links:**

- al-folio includes a GitHub Actions workflow for link checking
- Results posted to pull requests
- Fix before merging

**Monitor accessibility:**

- The axe accessibility workflow runs automatically
- Review results in GitHub Actions tab

---

### Uptime Monitoring

**Optional: Monitor if your site is down**

Tools:

- [Cronitor](https://cronitor.io) – Simple uptime monitoring
- [Uptimerobot](https://uptimerobot.com) – Free tier available
- [Statuspage.io](https://www.statuspage.io/) – Public status page

**Setup (example with Cronitor):**

1. Create free account
2. Add your site URL
3. Get notified if it's down
4. Typical response time: 5 minutes

---

## Common Maintenance Tasks

### Updating Your CV

**Option 1: JSON Resume format (recommended):**

- Edit `assets/json/resume.json`
- Update education, experience, skills
- Format follows [JSON Resume standard](https://jsonresume.org/)

**Option 2: YAML format:**

- Edit `_data/cv.yml`
- If this file exists, it's used instead of JSON
- More human-readable than JSON

**After updating:**

```bash
git add assets/json/resume.json  # or _data/cv.yml
git commit -m "Update CV"
git push
```

---

### Adding Publications

**Add to BibTeX:**

```bash
# Edit _bibliography/papers.bib
# Add a new entry:

@article{newpaper2024,
  title={Your Paper Title},
  author={Your Name and Others},
  journal={Journal Name},
  year={2024},
  volume={1},
  pages={1-10},
  doi={10.1234/doi},
  pdf={newpaper.pdf}  # If you have a PDF
}
```

**If you have a PDF:**

1. Save to `assets/pdf/newpaper.pdf`
2. Add `pdf={newpaper.pdf}` to BibTeX entry

**After updating:**

```bash
git add _bibliography/papers.bib assets/pdf/
git commit -m "Add new paper"
git push
```

---

### Archiving Old Posts

**Move to archive (don't delete):**

```bash
# Don't delete posts, just move them
# Old posts stay indexed in search engines this way

# Option 1: Add to frontmatter
---
layout: post
title: Old Post (Archived)
date: 2015-01-01
hidden: true
---

# Option 2: Create an archive page
# See _pages/blog.md for archive configuration
```

---

### Updating Broken Links

**Find broken links:**

- Use [Broken Link Checker](https://www.brokenlinkcheck.com/)
- Or use al-folio's broken-link GitHub Actions workflow
- Or browser extension like Checklinks

**Fix them:**

```bash
# Find and replace in files
grep -r "broken-url.com" .

# Update in:
# - Blog posts (_posts/)
# - Pages (_pages/)
# - Data files (_data/)
# - BibTeX entries (_bibliography/)
```

---

## Breaking Changes to Watch For

### Jekyll Major Version Updates

Watch for breaking changes in:

- **Liquid syntax** – How templates work
- **Plugin compatibility** – Some plugins may not work
- **Configuration changes** – New or deprecated options
- **Folder structure** – Where files go

**Check al-folio releases** before upgrading Jekyll. Major Jekyll updates may require al-folio changes too.

---

### Theme Updates

If you customize CSS/layouts:

- Backup your customizations
- Test updates carefully
- Watch for file renames or structure changes

---

## Maintenance Schedule

### Weekly (Automated)

- ✅ GitHub Actions tests (automated)
- ✅ Lighthouse performance (automated)
- ✅ Accessibility checks (automated)

### Monthly

- Check GitHub Dependabot alerts
- Review GitHub Actions log for errors
- Quick visual inspection (is site still working?)

### Quarterly (Every 3 months)

- Update dependencies: `bundle update --conservative`
- Test local build thoroughly
- Check Google Search Console for errors

### Annually (Every year)

- Full content review (see [Annual Site Review](#annual-site-review))
- Security audit (`bundle audit`, `npm audit`)
- Performance review (Google PageSpeed)
- Technology update assessment
- Consider major version upgrades

---

## Resources

- **[Jekyll Documentation](https://jekyllrb.com/)** – Official Jekyll docs
- **[Bundler Guide](https://bundler.io/)** – Ruby dependency management
- **[npm Documentation](https://docs.npmjs.com/)** – JavaScript package manager
- **[GitHub Pages Help](https://docs.github.com/en/pages)** – GitHub Pages docs
- **[al-folio Releases](https://github.com/alshedivat/al-folio/releases)** – Track updates
- **[al-folio Discussions](https://github.com/alshedivat/al-folio/discussions)** – Ask for help

---

## Quick Maintenance Checklist

**Monthly:**

- [ ] Check GitHub notifications
- [ ] Review any Dependabot alerts

**Quarterly:**

```bash
bundle outdated     # Check for updates
bundle update --conservative  # Update minor versions
bundle exec jekyll build      # Test locally
```

**Annually:**

- [ ] Run full annual review (see above)
- [ ] Update major dependencies if needed
- [ ] Security audit
- [ ] Review and update CV/publications
- [ ] Update bio if changed

**When deploying:**

- [ ] Test locally first
- [ ] Check GitHub Actions log
- [ ] Verify site looks correct
- [ ] Test on mobile

---

**Remember:** The best maintenance is regular testing and staying aware of updates. Spend 30 minutes every month checking for updates—it's easier than fixing major issues later!
