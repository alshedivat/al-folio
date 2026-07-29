# Analytics Setup Guide

This guide helps you add website analytics to track visitor statistics and behavior.

<!--ts-->

- [Analytics Setup Guide](#analytics-setup-guide)
  - [Overview](#overview)
  - [Supported Analytics Services](#supported-analytics-services)
  - [Google Analytics](#google-analytics)
    - [Setup Steps](#setup-steps)
  - [Privacy-Friendly Alternatives](#privacy-friendly-alternatives)
    - [Pirsch Analytics](#pirsch-analytics)
    - [Openpanel Analytics](#openpanel-analytics)
    - [Cloudflare Web Analytics](#cloudflare-web-analytics)
    - [Simple Analytics](#simple-analytics)
  - [Monitoring &amp; Performance](#monitoring--performance)
    - [Cronitor](#cronitor)
  - [GDPR and Privacy Considerations](#gdpr-and-privacy-considerations)
    - [GDPR Checklist](#gdpr-checklist)
    - [Privacy-first services (No GDPR cookie banner needed)](#privacy-first-services-no-gdpr-cookie-banner-needed)
    - [Services requiring cookie consent](#services-requiring-cookie-consent)
  - [Comparing Analytics Services](#comparing-analytics-services)
  - [Next Steps](#next-steps)

<!--te-->

## Overview

Analytics help you understand your website visitors: where they come from, which pages they visit, and how they interact with your content. al-folio supports several analytics providers that you can enable in `_config.yml`.

Analytics rendering is owned by the [`al_analytics`](https://github.com/al-org-dev/al-analytics) plugin. All providers are configured from one block, and **a provider turns on as soon as you give it a non-empty ID** — there is no separate "enable" step:

```yaml
analytics:
  google: # Google Analytics measurement ID (format: G-XXXXXXXXXX)
  cronitor: # Cronitor RUM analytics site ID
  pirsch: # Pirsch analytics site ID (32 characters)
  openpanel: # Openpanel analytics client ID (UUID)
  cloudflare: # Cloudflare Web Analytics beacon token (32 hex characters)
```

The plugin also accepts flat aliases (`google_analytics`, `cronitor_analytics`, `pirsch_analytics`, `openpanel_analytics`, `cloudflare_analytics`) which take precedence over the block above. The `enable_*_analytics` flags are optional **off-switches**: leave them unset and the provider follows its ID; set one to `false` to disable that provider without deleting the ID. Setting `enable_google_analytics: true` on its own does nothing.

**Simple Analytics is the one exception.** It identifies a site by its domain rather than by an embedded key, so there is no ID to put in the block above and nothing for the plugin to infer intent from. It is therefore controlled by its flag alone and stays off until you turn it on:

```yaml
enable_simple_analytics: true
```

## Supported Analytics Services

Currently implemented in al-folio:

- **Google Analytics** – Free, feature-rich, but collects user data
- **Pirsch Analytics** – GDPR-compliant, free tier available, European servers
- **Openpanel Analytics** – Open-source option, privacy-focused
- **Cloudflare Web Analytics** – Free, cookieless, no sampling
- **Simple Analytics** – Privacy-first, no cookies, paid after trial
- **Cronitor** – Uptime monitoring with Real User Monitoring (RUM) analytics

---

## Google Analytics

Google Analytics is free and widely used. It provides detailed insights into visitor behavior.

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

4. **Enable in your site:**
   - Open `_config.yml` in your repository
   - Set your Measurement ID under the `analytics` block: `analytics.google: G-XXXXXXXXXX`
   - Commit and push

5. **Verify it's working:**
   - Visit your website
   - Go back to Google Analytics → **Real-time** tab
   - You should see your visit appear within a few seconds

**Note:** Google Analytics takes 24-48 hours to start showing data trends.

---

## Privacy-Friendly Alternatives

If you're concerned about user privacy or GDPR compliance, consider these alternatives:

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
4. In `_config.yml`, set your Site ID under the `analytics` block: `analytics.pirsch: YOUR_SITE_ID` (format: 32 characters)
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

**Setup:**

1. Sign up at [Openpanel.dev](https://openpanel.dev)
2. Create a project for your website
3. Get your **Client ID**
4. In `_config.yml`, set your Client ID under the `analytics` block: `analytics.openpanel: YOUR_CLIENT_ID` (format: UUID)
5. Commit and push

---

### Cloudflare Web Analytics

**Best for:** Free, privacy-friendly analytics with no cookies and no sampling

**Features:**

- ✅ Free, with no traffic cap
- ✅ Cookieless — no consent banner required
- ✅ No sampling: every page view is counted
- ✅ Works without putting your site behind Cloudflare's proxy
- ⚠️ Deliberately minimal — no funnels, segments or custom events

**Setup:**

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com) and go to **Analytics & Logs → Web Analytics**
2. Add your site's hostname
3. Cloudflare shows a beacon snippet — copy the **token** value out of `data-cf-beacon='{"token": "..."}'`, not the whole snippet
4. In `_config.yml`, set it under the `analytics` block: `analytics.cloudflare: YOUR_TOKEN` (32 hex characters)
5. Commit and push

You do not need to proxy your DNS through Cloudflare for this to work; the beacon is a plain script tag.

---

### Simple Analytics

**Best for:** Privacy-first analytics where you want nothing stored on the visitor's device

**Features:**

- ✅ No cookies, no fingerprinting, no persistent identifiers
- ✅ GDPR/CCPA compliant, EU-hosted
- ✅ No consent banner required
- ⚠️ Paid after the trial period

**Setup:**

Simple Analytics identifies your site by its domain, so unlike every other provider here there is no ID to configure — which also means the plugin cannot tell you want it on. Turn it on explicitly:

1. Sign up at [SimpleAnalytics.com](https://www.simpleanalytics.com) and add your domain
2. In `_config.yml`, set `enable_simple_analytics: true` (top level, **not** inside the `analytics` block)
3. Commit and push

---

## Monitoring & Performance

### Cronitor

Cronitor is an **uptime monitoring** service with RUM (Real User Monitoring) analytics.

**Best for:** Tracking if your site is online + basic performance metrics

**Setup:**

1. Create account at [Cronitor.io](https://cronitor.io)
2. Get your **Site ID**
3. In `_config.yml`, set your Site ID under the `analytics` block: `analytics.cronitor: YOUR_SITE_ID`
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

- ✅ Pirsch Analytics
- ✅ Openpanel Analytics
- ✅ Cloudflare Web Analytics
- ✅ Simple Analytics

### Services requiring cookie consent

- ❌ Google Analytics (EU users must consent first)
- ❌ Cronitor (collects user data via RUM)

---

## Comparing Analytics Services

| Service              | Free         | GDPR                | Setup  | Features         | Best for                   |
| -------------------- | ------------ | ------------------- | ------ | ---------------- | -------------------------- |
| **Google Analytics** | ✅           | ⚠️ Requires consent | Easy   | Detailed reports | Detailed tracking          |
| **Pirsch**           | ✅ Free tier | ✅                  | Easy   | Balanced         | GDPR compliance            |
| **Openpanel**        | ✅           | ✅                  | Medium | Modern dashboard | Privacy-focused developers |
| **Cloudflare**       | ✅           | ✅                  | Easy   | Minimal          | Free cookieless basics     |
| **Simple Analytics** | Paid         | ✅                  | Easy   | Minimal          | Strict privacy             |
| **Cronitor**         | Paid         | ⚠️ Requires consent | Easy   | Uptime + RUM     | Uptime monitoring          |

---

## Next Steps

1. **Choose a service** based on your needs (privacy, features, budget)
2. **Follow the setup guide** for your chosen service
3. **Verify it's working** by visiting your site and checking the analytics dashboard

For more customization help, see [CUSTOMIZE.md](CUSTOMIZE.md).
