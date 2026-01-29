# Troubleshooting Guide

This guide covers common issues and their solutions. For more information, see [FAQ.md](FAQ.md) or check [GitHub Discussions](https://github.com/alshedivat/al-folio/discussions).

<!--ts-->

- [Troubleshooting Guide](#troubleshooting-guide)
  - [Deployment Issues](#deployment-issues)
    - [Site fails to deploy on GitHub Pages](#site-fails-to-deploy-on-github-pages)
    - [Custom domain becomes blank after deployment](#custom-domain-becomes-blank-after-deployment)
    - [GitHub Actions: "Unknown tag 'toc'" error](#github-actions-unknown-tag-toc-error)
  - [Local Build Issues](#local-build-issues)
    - [Docker build fails](#docker-build-fails)
    - [Ruby dependency issues](#ruby-dependency-issues)
    - [Port already in use](#port-already-in-use)
  - [Styling &amp; Layout Problems](#styling--layout-problems)
    - [CSS and JS not loading properly](#css-and-js-not-loading-properly)
    - [Site looks broken after deployment](#site-looks-broken-after-deployment)
    - [Theme colors not applying](#theme-colors-not-applying)
  - [Content Not Appearing](#content-not-appearing)
    - [Blog posts not showing up](#blog-posts-not-showing-up)
    - [Publications not displaying](#publications-not-displaying)
    - [Images not loading](#images-not-loading)
  - [Configuration Issues](#configuration-issues)
    - [YAML syntax errors](#yaml-syntax-errors)
    - [Feed (RSS/Atom) not working](#feed-rssatom-not-working)
    - [Search not working](#search-not-working)
  - [Feature-Specific Issues](#feature-specific-issues)
    - [Comments (Giscus) not appearing](#comments-giscus-not-appearing)
    - [Related posts broken](#related-posts-broken)
    - [Code formatting issues](#code-formatting-issues)
  - [Getting Help](#getting-help)

<!--te-->

## Deployment Issues

### Site fails to deploy on GitHub Pages

**Problem:** GitHub Actions shows an error when deploying.

**Solution:**

1. Check your repository **Actions** tab for error messages
2. Ensure you followed [Step 2 of QUICKSTART.md](QUICKSTART.md#step-2-configure-deployment-1-min) (Workflow permissions)
3. Verify your `_config.yml` has correct `url` and `baseurl`:
   - Personal site: `url: https://username.github.io` and `baseurl:` (empty)
   - Project site: `url: https://username.github.io` and `baseurl: /repo-name/`
4. Check that you're pushing to the `main` (or `master`) branch, NOT `gh-pages`
5. Commit and push a small change to trigger redeployment

**For YAML syntax errors:**

- Run `bundle exec jekyll build` locally to see the exact error
- Check for unquoted special characters (`:`, `&`, `#`) in YAML strings

---

### Custom domain becomes blank after deployment

**Problem:** You set a custom domain (e.g., `example.com`), but it resets to blank after deployment.

**Solution:**

1. Create a file named `CNAME` (no extension) in your repository root
2. Add your domain to it: `example.com` (one domain per line)
3. Commit and push
4. The domain will persist after future deployments

(See [DNS configuration instructions in INSTALL.md](INSTALL.md#deployment) for initial custom domain setup.)

---

### GitHub Actions: "Unknown tag 'toc'" error

**Problem:** Local build works, but GitHub Actions fails with `Unknown tag 'toc'`.

**Solution:**

1. Check your **Settings** → **Pages** → **Source** is set to `Deploy from a branch`
2. Ensure the branch is set to `gh-pages` (NOT `main`)
3. Wait 5 minutes and check Actions again
4. The issue usually resolves after you verify the gh-pages branch is set

---

## Local Build Issues

### Docker build fails

**Problem:** `docker compose up` fails or shows errors.

**Solution:**

1. Update Docker: `docker compose pull`
2. Rebuild: `docker compose up --build`
3. If still failing, check your system resources (disk space, RAM)
4. For M1/M2 Mac users, verify you're using a compatible Docker version
5. Check Docker Desktop is running

**For permission issues:**

- Linux users may need to add your user to the docker group: `sudo usermod -aG docker $USER`
- Then log out and log back in

---

### Ruby dependency issues

**Problem:** `Gemfile.lock` conflicts or bundle errors.

**Solution:**

1. Delete `Gemfile.lock`: `rm Gemfile.lock`
2. Update Bundler: `bundle update`
3. Install gems: `bundle install`
4. Try serving again: `bundle exec jekyll serve`

---

### Port already in use

**Problem:** "Address already in use" when running `jekyll serve`.

**Solution - Docker:**

```bash
docker compose down  # Stop the running container
docker compose up    # Start fresh
```

**Solution - Local Ruby:**

```bash
# Find and kill the Jekyll process
lsof -i :4000 | grep LISTEN | awk '{print $2}' | xargs kill

# Or specify a different port
bundle exec jekyll serve --port 5000
```

---

## Styling & Layout Problems

### CSS and JS not loading properly

**Problem:** Site looks broken: no colors, fonts wrong, links don't work.

**Common cause:** Incorrect `url` and `baseurl` in `_config.yml`.

**Solution:**

1. **Personal/organization site:**

   ```yaml
   url: https://username.github.io
   baseurl: # MUST be empty (not deleted)
   ```

2. **Project site:**

   ```yaml
   url: https://username.github.io
   baseurl: /repository-name/ # Must match your repo name
   ```

3. **Clear browser cache:**
   - Chrome: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows/Linux) or `Cmd+R` (Mac)
   - Or open a private/incognito window

4. Redeploy: Make a small change and push to trigger GitHub Actions again

---

### Site looks broken after deployment

**Checklist:**

- [ ] Is `baseurl` correct (and not accidentally deleted)?
- [ ] Did you clear your browser cache?
- [ ] Wait 5 minutes for GitHub Pages to update
- [ ] Check GitHub Actions completed successfully

---

### Theme colors not applying

**Problem:** You changed `_config.yml` color settings but nothing changed.

**Solution:**

1. Check your color name is valid in `_sass/_variables.scss`
2. Clear browser cache (see above)
3. Rebuild: `docker compose up --build` (Docker) or `bundle exec jekyll build` (Ruby)
4. Wait for GitHub Actions to complete
5. Visit the site in a private/incognito window

---

## Content Not Appearing

### Blog posts not showing up

**Problem:** Created a post in `_posts/` but it's not on the blog page.

**Checklist:**

- [ ] Filename format is correct: `YYYY-MM-DD-title.md` (e.g., `2024-01-15-my-post.md`)
- [ ] File is in the `_posts/` directory (not in a subdirectory)
- [ ] Post has required frontmatter:
  ```markdown
  ---
  layout: post
  title: My Post Title
  date: 2024-01-15
  ---
  ```
- [ ] Post date is NOT in the future (Jekyll doesn't publish future-dated posts by default)
- [ ] Blog posts are enabled in `_config.yml`: `blog_page: true`

**To fix:**

1. Check the filename format (uppercase, dashes, no spaces)
2. Verify the date is today or in the past
3. Rebuild: `bundle exec jekyll build` and check for error messages

---

### Publications not displaying

**Problem:** You added a BibTeX entry to `papers.bib` but it's not showing on the publications page.

**Checklist:**

- [ ] File is at `_bibliography/papers.bib`
- [ ] BibTeX syntax is correct (check for missing commas, unmatched braces)
- [ ] Entry has a unique citation key: `@article{einstein1905, ...}`
- [ ] Publication page is enabled: Check `publications_page: true` in `_config.yml`

**To debug BibTeX errors:**

```bash
# Local Ruby setup
bundle exec jekyll build 2>&1 | grep -i bibtex

# Docker
docker compose run --rm web jekyll build 2>&1 | grep -i bibtex
```

---

### Images not loading

**Problem:** Image paths broken or showing as missing.

**Common causes:**

- Wrong path in Markdown (use relative paths)
- Image file doesn't exist at the specified location
- Case sensitivity (Linux/Mac are case-sensitive)

**Solutions:**

1. **Correct path format:**

   ```markdown
   ![Alt text](assets/img/image-name.jpg)
   ```

2. **Check the file exists:**
   - Personal images: `assets/img/`
   - Paper PDFs: `assets/pdf/`
   - Use lowercase filenames, no spaces

3. **For BibTeX PDF links:**
   ```bibtex
   @article{mykey,
     pdf={my-paper.pdf},  % File should be at assets/pdf/my-paper.pdf
   }
   ```

---

## Configuration Issues

### YAML syntax errors

**Problem:** GitHub Actions fails with YAML error, or build is silent.

**Common mistakes:**

```yaml
# ❌ Wrong: Unquoted colons or ampersands
title: My Site: Research & Teaching

# ✅ Correct: Quote special characters
title: "My Site: Research & Teaching"
```

```yaml
# ❌ Wrong: Inconsistent indentation
nav:
- name: Home
  url: /
 - name: About  # Extra space!
  url: /about/

# ✅ Correct: Consistent 2-space indentation
nav:
  - name: Home
    url: /
  - name: About
    url: /about/
```

**To find errors:**

1. Use a YAML validator: [yamllint.com](https://www.yamllint.com/)
2. Run locally: `bundle exec jekyll build` shows the exact error line
3. Check that you didn't delete required lines (like `baseurl:`)

---

### Feed (RSS/Atom) not working

**Problem:** RSS feed at `/feed.xml` is empty or broken.

**Solution:**

1. Verify required `_config.yml` fields:
   ```yaml
   title: Your Site Title
   description: Brief description
   url: https://your-domain.com # MUST be absolute URL
   ```
2. Ensure `baseurl` is correct
3. Check at least one blog post exists (with correct date)
4. Rebuild and wait for GitHub Actions to complete

---

### Search not working

**Problem:** Search box is empty or always returns nothing.

**Solution:**

1. Ensure search is enabled in `_config.yml`:
   ```yaml
   search_enabled: true
   ```
2. Check that `_config.yml` has a valid `url` (required for search)
3. Rebuild the site
4. Search index is generated during build; give it a minute after push

---

## Feature-Specific Issues

### Comments (Giscus) not appearing

**Problem:** You enabled Giscus in `_config.yml` but comments don't show.

**Solution:**

1. Verify you have a GitHub repository for discussions (usually your main repo)
2. Check `_config.yml` has correct settings:
   ```yaml
   disqus_shortname: false # Make sure this is false
   giscus:
     repo: username/repo-name
     repo_id: YOUR_REPO_ID
     category_id: YOUR_CATEGORY_ID
   ```
3. Visit [Giscus.app](https://giscus.app) to get your IDs and verify setup
4. Check the GitHub repo has Discussions enabled (Settings → Features)

---

### Related posts broken

**Problem:** Related posts feature crashes or shows errors.

**Solution:**

1. Related posts requires more gems. If you disabled it in `_config.yml`, that's fine:
   ```yaml
   related_blog_posts:
     enabled: false
   ```
2. If you want to enable it, ensure `Gemfile` has all dependencies installed:
   ```bash
   bundle install
   bundle exec jekyll build
   ```

---

### Code formatting issues

**Problem:** Code blocks don't have syntax highlighting or look wrong.

**Solution:**

1. Use proper markdown syntax:

   ````markdown
   ```python
   # Your code here
   print("hello")
   ```
   ````

2. For inline code:

   ```markdown
   Use `code-here` for inline code.
   ```

3. Check that your language is supported by Pygments (Python, Ruby, JavaScript, etc. are all supported)

---

## Getting Help

If you're stuck:

1. **Check existing documentation:**
   - [QUICKSTART.md](QUICKSTART.md) – Get started in 5 minutes
   - [INSTALL.md](INSTALL.md) – Installation and deployment
   - [CUSTOMIZE.md](CUSTOMIZE.md) – Full customization guide
   - [FAQ.md](FAQ.md) – Frequently asked questions

2. **Search for your issue:**
   - [GitHub Discussions](https://github.com/alshedivat/al-folio/discussions) – Q&A from community
   - [GitHub Issues](https://github.com/alshedivat/al-folio/issues) – Bug reports and feature requests

3. **Get help from AI:**
   - Use the **GitHub Copilot Customization Agent** (requires Copilot subscription) to get step-by-step help
   - See [CUSTOMIZE.md § GitHub Copilot Customization Agent](CUSTOMIZE.md#github-copilot-customization-agent)

4. **Create a new discussion:**
   - [Ask a question](https://github.com/alshedivat/al-folio/discussions/new?category=q-a) on GitHub
   - Include error messages and what you're trying to do

---

**Most issues are resolved by:**

1. Checking `url` and `baseurl` in `_config.yml`
2. Clearing browser cache
3. Waiting for GitHub Actions to complete (~5 minutes)
