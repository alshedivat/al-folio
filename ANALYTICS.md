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

## Supported Analytics Services

Currently implemented in al-folio:

- **Google Analytics** – Free, feature-rich, but collects user data
- **Pirsch Analytics** – GDPR-compliant, free tier available, European servers
- **Openpanel Analytics** – Open-source option, privacy-focused
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
   - Set `enable_google_analytics: true`
   - Add your Measurement ID: `google_analytics: G-XXXXXXXXXX`
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
4. In `_config.yml`, set `enable_pirsch_analytics: true`
5. Add your Site ID: `pirsch_analytics: YOUR_SITE_ID` (format: 32 characters)
6. Commit and push

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
4. In `_config.yml`, set `enable_openpanel_analytics: true`
5. Add your Client ID: `openpanel_analytics: YOUR_CLIENT_ID` (format: UUID)
6. Commit and push

---

## Monitoring & Performance

### Cronitor

Cronitor is an **uptime monitoring** service with RUM (Real User Monitoring) analytics.

**Best for:** Tracking if your site is online + basic performance metrics

**Setup:**

1. Create account at [Cronitor.io](https://cronitor.io)
2. Get your **Site ID**
3. In `_config.yml`, set `enable_cronitor_analytics: true`
4. Add your Site ID: `cronitor_analytics: YOUR_SITE_ID`
5. Commit and push

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
| **Cronitor**         | Paid         | ⚠️ Requires consent | Easy   | Uptime + RUM     | Uptime monitoring          |

---

## Next Steps

1. **Choose a service** based on your needs (privacy, features, budget)
2. **Follow the setup guide** for your chosen service
3. **Verify it's working** by visiting your site and checking the analytics dashboard

For more customization help, see [CUSTOMIZE.md](CUSTOMIZE.md).
