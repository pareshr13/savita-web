# Trading AI Software — Website

Production website for **Trading AI Software** (tradingaisoftware.com), an AI-first custom software development company building trading software for stock, crypto and currency markets.

Built with **React 19 + Next.js 16 (App Router) + TypeScript**. Every page is pre-rendered to static HTML for fast loading and full search-engine visibility. The only server code is the lead-collection API.

---

## Quick start

```bash
npm install
cp .env.example .env      # then fill in your details
npm run dev               # http://localhost:3000
npm run build && npm start  # production
```

Requires Node.js 20.9 or newer.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero terminal, signature technology, services, all three products, product screens, portfolio, architecture, integrations, engagement models, FAQ, contact |
| `/technology` | 16 signature innovations under four pillars, plus the facts band |
| `/products/trading-yantra` | Trading Yantra — 4 interactive screens and the filterable 24-module catalogue |
| `/products/options-intelligence` | TradingYantra AI — Nifty OI Pro, 9 terminal modules, 5-tool research agent |
| `/products/forex-ai` | 18-agent forex & commodities platform |
| `/services` | Services, architecture, stack, engagement models, FAQ |
| `/integrations` | 38 filterable broker, exchange and data integrations |
| `/about` | Company and portfolio |
| `/contact` | Lead form + FAQ |
| `/privacy-policy`, `/terms`, `/disclaimer` | Legal drafts — **have a lawyer review before launch** |

## Where to edit

| What | File |
|---|---|
| Company name, URL, email, phone, city, social links | `src/lib/site.ts` or `.env` (`NEXT_PUBLIC_*`) |
| All copy: services, modules, integrations, FAQs, plans, portfolio | `src/lib/data.ts` |
| Sample chart data for product previews | `src/lib/charts.ts` |
| Colours, typography, spacing, responsive breakpoints | `src/app/globals.css` |
| Page sections | `src/components/Sections.tsx` |
| Interactive screens | `Terminal.tsx`, `Gallery.tsx`, `Yantra.tsx`, `IntegrationGrid.tsx` |

## SEO built in

- Static HTML for every page (Google reads full content without running JavaScript)
- Unique `<title>`, meta description, keywords and canonical URL per page
- Open Graph and Twitter cards with a 1200×630 share image (`public/og-image.png`)
- `sitemap.xml`, `robots.txt` and web manifest generated automatically
- schema.org JSON-LD: Organization, WebSite, Service, FAQPage, SoftwareApplication (each product), BreadcrumbList
- Semantic headings (one `h1` per page), breadcrumbs, descriptive link text, `lang="en-IN"`
- Self-hosted fonts (no Google Fonts request), no layout shift, security headers
- Optional Google Search Console verification (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) and GA4 (`NEXT_PUBLIC_GA_ID`, fires a `generate_lead` event on form success)

**After launch:** submit `https://yourdomain/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Lead collection (`POST /api/contact`)

The contact form collects name, email, phone/WhatsApp, company, market, project type, budget and message, plus the page, referrer and UTM campaign tags so you know where each lead came from.

**Protection:** server-side validation (zod), required consent, honeypot field, minimum fill-time check, per-IP rate limit (5 per 10 minutes) and HTML-escaped emails.

**Delivery** — configure one or more in `.env`:

1. **File** (default): appended to `data/leads.jsonl`. Works on a VPS or Docker (mounted volume). Not durable on serverless hosts.
2. **Email**: set `SMTP_*` and `LEAD_NOTIFY_TO`. Works with Gmail/Google Workspace (app password), Zoho, Amazon SES, Brevo and others. `SEND_AUTOREPLY=true` sends the enquirer a confirmation.
3. **Webhook**: set `LEAD_WEBHOOK_URL` to push each lead as JSON into Google Sheets (Apps Script), Zapier, Make, n8n, Slack or your CRM.

The API returns success if at least one channel delivered the lead.

## Deployment

### GitHub Pages (live: https://tradingaisoftware.com)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds a static export (`STATIC_EXPORT=true`, output in `./out`) and publishes it to GitHub Pages on the custom domain in `public/CNAME`.

- GitHub Pages serves static files only, so the workflow leaves out `src/app/api`. The contact form then sends enquiries through **Web3Forms**: create a free access key at https://web3forms.com with your inbox address, and add it as a repository variable named `WEB3FORMS_KEY` (Settings → Secrets and variables → Actions → Variables). Until that's set, the form opens the visitor's email app with the enquiry pre-filled.
- Optional repository variables: `GA_ID` (Google Analytics 4), `GOOGLE_SITE_VERIFICATION` (Search Console), `FORM_ENDPOINT` (any other JSON form endpoint).
- One-time setup: Settings → Pages → Source: **GitHub Actions**; Custom domain: `tradingaisoftware.com`; tick **Enforce HTTPS** once the certificate is issued.
- DNS at GoDaddy: four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` record for `www` → `pareshr13.github.io`.

Local static build: `STATIC_EXPORT=true NEXT_PUBLIC_STATIC_SITE=true npm run build`, then serve `./out`.

### Server hosting (keeps the built-in /api/contact route)

**Vercel (simplest):** import the repo, add the `.env` values in Project Settings, deploy. Use email and/or webhook delivery, because the file system is read-only there.

**Docker / any VPS (AWS EC2, DigitalOcean, Hostinger):**

```bash
cp .env.example .env   # fill it in
docker compose up -d --build    # serves on port 3000; leads persist in the "leads" volume
```

Put Nginx or Caddy in front for HTTPS, or use the standalone build directly: `npm run build && node .next/standalone/server.js` (copy `.next/static` to `.next/standalone/.next/static`).

## Before going live — checklist

- [ ] Set real domain, email, phone, WhatsApp and city in `.env`
- [ ] Configure SMTP or a webhook and send a test enquiry
- [ ] Review the legal pages with a lawyer
- [ ] Keep only the integrations you can actually deliver (`src/lib/data.ts`)
- [ ] Confirm the claims in the "Signature technology" section match what is live in production
- [ ] Add GA4 and Search Console IDs, then submit the sitemap

## Notes

- Product previews use deterministic **sample data**, clearly labelled. They are not live prices, real trades or performance claims.
- Third-party names are shown only to indicate API compatibility, not partnership.
- Fonts: Inter, Plus Jakarta Sans and JetBrains Mono, under the SIL Open Font License.
