# Lexinodix — Website

The official website for **Lexinodix**, an AI empire. Pure static site — HTML, CSS, and vanilla JavaScript. No build step, no backend.

## Structure

```
index.html                 Home
about/index.html           About (Founder & CEO — Abdallah Omran)
products/index.html        Products overview
products/nodex/index.html   Nodex — market intelligence (with pricing)
products/flow/index.html    Flow — knowledge & productivity
products/edu/index.html     Edu — smart learning
insights/index.html         Blog / Insights
insights/articles/...       3 published articles
contact/index.html          Contact (email only)
terms/index.html            Terms of Use
privacy/index.html          Privacy Policy
disclaimer/index.html       Disclaimer
404.html                    Custom 404

assets/css/style.css        Design system
assets/js/main.js           Interactions (theme, nav, reveals, counters, ...)
assets/img/                 Logo, mark, favicons, OG image
robots.txt · sitemap.xml · manifest.webmanifest · vercel.json
```

## Design

- Font: **Sora** (Google Fonts).
- Palette: warm cream background (`#F5F1EC`), deep-navy accent (`#072A40`), dusty-rose soft accent (`#BFACA4`).
- Light mode by default, with a full **dark mode** (toggled in the header, remembered in `localStorage`).
- Responsive, animated scroll reveals, count-up stats, sticky blurred header, mobile drawer, reading-progress bar on articles.
- SEO: per-page titles/descriptions, Open Graph + Twitter cards, JSON-LD (Organization / Breadcrumbs / Article / Blog), `sitemap.xml`, `robots.txt`.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repo in Vercel (Framework preset: *Other*).
3. `vercel.json` already handles clean URLs (`/about`, `/products/nodex`, …) and cache/security headers.
4. Add a **custom domain** (e.g. `lexinodix.com`) in the Vercel dashboard, then verify the site in Google Search Console / Bing Webmaster Tools and submit `sitemap.xml`.

> There is **no Vercel default icon**: every page declares a custom SVG favicon (`/assets/img/mark.svg`), Apple touch icon, and manifest icon, so the site never appears with the Vercel logo in search results or browser tabs.

## Things to update

- **Domain:** the site points canonical tags, Open Graph URLs, `sitemap.xml`, and JSON-LD at `https://lexinodix.vercel.app`. To get that exact URL on Vercel, name the project **`lexinodix`** (Project → Settings → General → Project Name). If you later add a custom domain (e.g. `lexinodix.com`), run the same find/replace to swap `lexinodix.vercel.app` → your domain.
- **Edu link:** Edu currently points to `/contact` for early access — replace with the real product URL once it's live (update it in `products/edu/index.html` and `products/index.html`).
- **Logo:** the SVG mark (`assets/img/mark.svg`) and lockup (`assets/img/logo.svg`) are AI/network-themed placeholders. Swap them for the final brand logo when ready.
- **Emails & names:** `abdallahaliomran@gmail.com` and "Abdallah Omran — Founder & CEO" appear across pages; update in one place if they change.

## Local preview

```
python3 -m http.server 8000
# open http://localhost:8000
```
