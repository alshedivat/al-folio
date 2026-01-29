# Analytics Setup Guide

This guide helps you add website analytics to track visitor statistics and behavior.

<!--ts-->

- [Analytics Setup Guide](#analytics-setup-guide)
  - [Overview](#overview)
  - [Google Analytics](#google-analytics)
    - [Setup Steps](#setup-steps)
    - [Configuration](#configuration)
  - [Privacy-Friendly Alternatives](#privacy-friendly-alternatives)
    - [Plausible Analytics](#plausible-analytics)
    - [GoAccess (Self-hosted)](#goaccess-self-hosted)
    - [Pirsch Analytics](#pirsch-analytics)
    - [Openpanel Analytics](#openpanel-analytics)
  - [Other Analytics Services](#other-analytics-services)
    - [Cronitor](#cronitor)
  - [GDPR and Privacy Considerations](#gdpr-and-privacy-considerations)
  - [Comparing Analytics Services](#comparing-analytics-services)
  <!--te-->

## Overview

Analytics help you understand your website visitors: where they come from, which pages they visit, and how they interact with your content. al-folio supports multiple analytics providers.

**Available analytics in al-folio:**

- **Google Analytics** (free, feature-rich, but privacy concerns)
- **Plausible Analytics** (paid, privacy-first, GDPR-compliant)
- **Pirsch Analytics** (freemium, GDPR-compliant, European servers)
- **Openpanel Analytics** (open-source, self-hosted option)
- **Cronitor** (uptime monitoring + RUM analytics)

---

## Google Analytics

Google Analytics is free and widely used. It provides detailed insights into visitor behavior but collects more user data.

### Setup Steps

1. **Create a Google Analytics account:**
   - Visit [Google Analytics](https://analytics.google.com)
   - Sign in with your Google account
   - Click **Start measuring** → **Create account**

2. **Create a property for your website:**
   - Enter your website name and URL
   - Accept terms and continue
   - Choose your timezone and currency

3. **Get your Measurement ID:**
   - In the left sidebar, go to **Admin** → **Properties**
   - Click **Data Streams** → **Web** (or your existing stream)
   - Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

4. **Add to your site:**
   - Open `_config.yml` in your repository
   - Find the `google_analytics:` line and add your ID:
     ```yaml
     google_analytics: G-XXXXXXXXXX
     ```
   - Commit and push
   - Wait for deployment to complete

5. **Verify it's working:**
   - Visit your website
   - Go back to Google Analytics → **Real-time** tab
   - You should see your visit appear within a few seconds

### Configuration

Google Analytics is auto-injected into your site once you set `google_analytics` in `_config.yml`. No additional code needed.

**Note:** Google Analytics takes 24-48 hours to start showing data trends.

---

## Privacy-Friendly Alternatives

If you're concerned about user privacy or GDPR compliance, consider these alternatives:

### Plausible Analytics

**Best for:** Privacy-conscious academics and researchers

**Features:**

- ✅ GDPR and privacy laws compliant
- ✅ No cookie consent banner needed
- ✅ Clear, simple dashboard
- ✅ Email reports
- ❌ Paid service ($9-20/month)

**Setup:**

1. Create an account at [Plausible.io](https://plausible.io)
2. Add your domain
3. Add this script to your site's `<head>` tag
4. Plausible provides installation instructions for Jekyll

**For al-folio:**

- Edit `_includes/head.liquid`
- Add the Plausible script before the closing `</head>` tag (around line 185)
- Or use a custom analytics integration (see below)

---

### GoAccess (Self-hosted)

**Best for:** Cost-conscious users with access to server logs

**Features:**

- ✅ Completely free
- ✅ No privacy concerns (analyze your own logs)
- ✅ Self-hosted
- ❌ Requires server/GitHub Pages access
- ❌ Less user-friendly than cloud services

**How it works:**

- Analyzes your web server access logs
- Generates HTML dashboard
- Run locally on your machine
- Script available in `_scripts/` directory

**See also:** [GoAccess documentation](https://goaccess.io/)

---

### Pirsch Analytics

**Best for:** GDPR-compliant analytics without complex setup

**Features:**

- ✅ GDPR compliant
- ✅ European servers
- ✅ Free tier available
- ✅ Simple integration
- ✅ No cookie consent needed

**Setup:**

1. Sign up at [Pirsch.io](https://pirsch.io)
2. Add your domain
3. Copy the tracking code
4. In `_config.yml`, add:
   ```yaml
   pirsch_analytics: YOUR_SITE_ID # Format: 32 characters
   ```
5. Commit and push

(The site ID appears in your Pirsch dashboard.)

---

### Openpanel Analytics

**Best for:** Open-source and privacy-conscious developers

**Features:**

- ✅ Open-source
- ✅ Self-hosted option available
- ✅ Privacy-focused
- ✅ Modern dashboard
- ❌ Younger project (fewer features)

**Setup:**

1. Sign up at [Openpanel.dev](https://openpanel.dev)
2. Create a project for your website
3. Get your **Client ID**
4. In `_config.yml`, add:
   ```yaml
   openpanel_analytics: YOUR_CLIENT_ID # Format: UUID
   ```
5. Commit and push

---

## Other Analytics Services

### Cronitor

Cronitor is an **uptime monitoring** service with RUM (Real User Monitoring) analytics.

**Best for:** Tracking if your site is online + basic performance metrics

**Setup:**

1. Create account at [Cronitor.io](https://cronitor.io)
2. Get your **Site ID**
3. In `_config.yml`, add:
   ```yaml
   cronitor_analytics: YOUR_SITE_ID
   ```
4. Commit and push

---

## GDPR and Privacy Considerations

If you're in the European Union or serve EU visitors, consider GDPR requirements:

### GDPR Checklist

- [ ] If using Google Analytics: Add cookie consent banner
- [ ] Display a privacy policy explaining what analytics you use
- [ ] Allow users to opt-out if using tracking cookies
- [ ] Use privacy-first alternatives when possible

### Privacy-first services (No GDPR cookie banner needed)

- ✅ Plausible Analytics
- ✅ Pirsch Analytics
- ✅ Openpanel Analytics
- ✅ GoAccess

### Services requiring cookie consent

- ❌ Google Analytics (EU users must consent first)

### Simple Privacy Policy Template

Add a privacy policy page at `_pages/privacy.md`:

```markdown
---
layout: page
title: Privacy Policy
permalink: /privacy/
---

## Analytics

This website uses [Service Name] to understand visitor behavior. [Service Name] is GDPR-compliant and does not use cookies.

For more information, see [Service Name's privacy policy](link-to-privacy-policy).
```

---

## Comparing Analytics Services

| Service              | Free         | GDPR                | Setup  | Features         | Best for        |
| -------------------- | ------------ | ------------------- | ------ | ---------------- | --------------- |
| **Google Analytics** | ✅           | ⚠️ Requires consent | Easy   | Detailed reports | Large sites     |
| **Plausible**        | ❌           | ✅                  | Easy   | Simple, clear    | Privacy-focused |
| **Pirsch**           | ✅ Free tier | ✅                  | Easy   | Balanced         | GDPR compliance |
| **Openpanel**        | ✅           | ✅                  | Medium | Modern dashboard | Developers      |
| **Cronitor**         | Paid         | ✅                  | Easy   | Uptime + RUM     | Monitoring      |
| **GoAccess**         | ✅           | ✅                  | Hard   | Self-hosted logs | Cost-conscious  |

---

## Next Steps

1. **Choose a service** based on your needs (privacy, features, budget)
2. **Follow the setup guide** for your chosen service
3. **Verify it's working** by visiting your site and checking the analytics dashboard
4. **(Optional) Add a privacy policy** to your website

For more customization help, see [CUSTOMIZE.md](CUSTOMIZE.md) or use the **GitHub Copilot Customization Agent**.
