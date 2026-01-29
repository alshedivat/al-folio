# Quick Start Guide

**Get your al-folio site running in 5 minutes.** This guide is for users who just want a working website quickly without deep customization.

> **Video Tutorial:** Watch a walkthrough of these steps [here](assets/video/tutorial_al_folio.mp4)

<!--ts-->

- [Quick Start Guide](#quick-start-guide)
  - [Step 1: Create Your Repository (1 min)](#step-1-create-your-repository-1-min)
  - [Step 2: Configure Deployment (1 min)](#step-2-configure-deployment-1-min)
  - [Step 3: Personalize (2 min)](#step-3-personalize-2-min)
  - [Step 4: View Your Site (1 min)](#step-4-view-your-site-1-min)
  - [What's Next?](#whats-next)
    - [Add Your Content](#add-your-content)
    - [Customize Appearance](#customize-appearance)
    - [Learn More](#learn-more)
    - [Get Help from AI](#get-help-from-ai)

<!--te-->

## Step 1: Create Your Repository (1 min)

1. Click **[Use this template](https://github.com/new?template_name=al-folio&template_owner=alshedivat)** on the al-folio repository page
2. Name your repository:
   - **Personal/Organization site:** `username.github.io` (replace `username` with your GitHub username)
   - **Project site:** Any name (e.g., `my-research-website`)
3. Click **Create repository from template**

## Step 2: Configure Deployment (1 min)

1. Go to your new repository → **Settings** → **Actions** → **General** → **Workflow permissions**
2. Select **Read and write permissions**
3. Click **Save**

## Step 3: Personalize (2 min)

1. Open `_config.yml` in your repository
2. Update these fields:
   ```yaml
   title: My Website
   first_name: Your
   last_name: Name
   url: https://your-username.github.io # or your custom domain
   baseurl: # Leave this empty (do NOT delete it)
   ```
3. Click **Commit changes** (at the bottom of the page)

## Step 4: View Your Site (1 min)

1. Go to your repository → **Actions** tab
2. Wait for the "Deploy site" workflow to complete (look for a green checkmark, ~4 minutes)
3. Go to **Settings** → **Pages** → **Build and deployment**
4. Make sure **Source** is set to **Deploy from a branch**
5. Set the branch to **gh-pages** (NOT main)
6. Wait for the "pages-build-deployment" workflow to complete (~45 seconds)
7. Visit `https://your-username.github.io` in your browser

**That's it!** Your site is live. You now have a working al-folio website.

---

## What's Next?

Once your site is running, explore these customization options:

### Add Your Content

- **Profile picture:** Replace `assets/img/prof_pic.jpg` with your photo
- **About page:** Edit `_pages/about.md` to write your bio
- **Publications:** Add entries to `_bibliography/papers.bib`
- **Blog posts:** Create files in `_posts/` with format `YYYY-MM-DD-title.md`

### Customize Appearance

- **Theme color:** Edit `_config.yml`, search for `theme_color`
- **Enable/disable sections:** In `_config.yml`, look for `enabled: false/true` options
- **Social media links:** Edit `_data/socials.yml`

### Learn More

- Installation and local setup options: [INSTALL.md](INSTALL.md)
- Full customization guide: [CUSTOMIZE.md](CUSTOMIZE.md)
- Frequently asked questions: [FAQ.md](FAQ.md)
- Troubleshooting: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Get Help from AI

Use the **GitHub Copilot Customization Agent** (if you have Copilot) to:

- Get step-by-step help with customizations
- Understand how to modify specific features
- Apply changes directly to your site

See [CUSTOMIZE.md § GitHub Copilot Customization Agent](CUSTOMIZE.md#github-copilot-customization-agent) for details.

---

**Common first steps:**

- Change the theme color in `_config.yml`
- Add your social media links in `_data/socials.yml`
- Upload your profile picture to `assets/img/prof_pic.jpg`
- Write a short bio in `_pages/about.md`

Happy customizing! 🎉
