# Costeleta Dourada — Audit Report

**Date:** 2026-04-07
**Auditor:** Claude (Full Audit)
**Live URL:** https://costeleta-dourada.vercel.app/
**Overall Score:** 80/100 ✅ Good

---

## Progress Since Last Audit (2026-01-17)

| Item | Before | Now |
|------|--------|-----|
| Image format | PNG (2–2.6 MB each, ~15 MB total) | WebP (136–232 KB each, ~1.5 MB total) ✅ |
| Apple Touch Icons | Missing | Present (180×180 + 152×152) ✅ |
| icon.png size | 1.3 MB | 8 KB ✅ |
| Domain reference | `costeletadourada.pt` | Still pointing to `costeletadourada.pt` ⚠️ |

---

## Summary Table

| # | Severity | Type | Description |
|---|----------|------|-------------|
| 1 | 🔴 Critical | Bug | Social share (OG/Twitter) images will be broken — wrong domain in `metadataBase` |
| 2 | 🔴 Critical | Bug | `canonical`, `sitemap.xml`, `robots.txt` all still reference `costeletadourada.pt` |
| 3 | 🟡 Minor | Bug | No HTTP security headers configured in `next.config.ts` |
| 4 | 🟡 Minor | Bug | BookingWidget lies to users: "Enviámos um email" — no email is actually sent |
| 5 | 🟡 Minor | Accessibility | No `prefers-reduced-motion` check — testimonials carousel always animates |
| 6 | 🟡 Minor | Accessibility | Accordion buttons missing `aria-expanded` attribute |
| 7 | 🟡 Minor | Accessibility | Daily special modal does not trap focus (keyboard users can tab behind it) |
| 8 | 🟢 Low | Missing Feature | No analytics — can't measure portfolio engagement |
| 9 | 🟢 Low | Bug | Footer social links are placeholder `href="#"` |
| 10 | 🟢 Low | Nice-to-have | 6 dead assets in `public/` (dish_1.webp + Next.js boilerplate SVGs) |
| 11 | 🟢 Low | Performance | Header logo missing `priority` prop (above-the-fold, should preload) |
| 12 | 🟢 Low | Performance | Hero BG is CSS `background-image` — Next.js can't preload or optimize it |
| 13 | 🟢 Low | Nice-to-have | README is default create-next-app boilerplate, doesn't describe the project |
| 14 | 🟢 Low | Nice-to-have | Missing `<meta name="theme-color">` for mobile browser chrome tinting |

---

## 🔴 Critical Issues

### 1. Social Share Previews Are Broken

**File:** `src/app/layout.tsx:19`

`metadataBase` is set to `https://costeletadourada.pt`:

```ts
metadataBase: new URL('https://costeletadourada.pt'),
```

Next.js uses `metadataBase` to resolve relative OG/Twitter image paths. So when crawlers (LinkedIn, Twitter/X, WhatsApp, Slack) fetch the page, the OG image resolves to:

```
https://costeletadourada.pt/images/hero_bg.webp  ← domain doesn't exist
```

**Result:** All social share previews show a broken image. Since this is a portfolio showcase and you'll be sharing the Vercel link with clients, this is a significant problem.

**Fix:** Change `metadataBase` (and `canonical` and `url` fields) to the Vercel URL:
```ts
metadataBase: new URL('https://costeleta-dourada.vercel.app'),
```

---

### 2. `canonical`, `sitemap.xml`, and `robots.txt` Reference Wrong Domain

Three separate files still reference `costeletadourada.pt`:

| File | Line | Value |
|------|------|-------|
| `src/app/layout.tsx:51` | `canonical` | `https://costeletadourada.pt` |
| `public/sitemap.xml` | all `<loc>` tags | `https://costeletadourada.pt/...` |
| `public/robots.txt:3` | `Sitemap:` | `https://costeletadourada.pt/sitemap.xml` |

For a showcase project without a custom domain, these should all point to `https://costeleta-dourada.vercel.app`.

---

## 🟡 Minor Issues

### 3. No Security Headers

**File:** `next.config.ts`

The config is completely empty beyond `reactCompiler: true`. No security headers are set. Vercel adds a few defaults, but missing:
- `X-Frame-Options: DENY` (clickjacking protection)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

**Fix:** Add a `headers()` export to `next.config.ts`:
```ts
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ],
  }]
}
```

---

### 4. BookingWidget Claims to Send Email (But Doesn't)

**File:** `src/components/BookingWidget.tsx:222-224`

The confirmation screen says:
```tsx
<p>Enviámos um email de confirmação para {formData.email}.</p>
```

But `confirmBooking()` is a pure `setTimeout` simulation — no fetch, no API, no email. If you show this to clients as a demo, it creates a false impression of functionality.

**Fix:** Either add a disclaimer label ("Demo — sem integração real") or remove the email sentence and replace with a neutral message like "Reserva registada com sucesso."

---

### 5. Testimonials Carousel Ignores `prefers-reduced-motion`

**File:** `src/components/TestimonialsSection.tsx:51-57`

The infinite carousel runs a 40-second `Framer Motion` animation unconditionally. Users who have enabled "Reduce Motion" in their OS accessibility settings will still get the continuous scroll.

**Fix:** Use Framer Motion's `useReducedMotion` hook:
```tsx
import { useReducedMotion } from 'framer-motion';
const shouldReduce = useReducedMotion();
// If shouldReduce → render static list instead of animated scroller
```

---

### 6. Accordion Buttons Missing `aria-expanded`

**File:** `src/components/MenuSection.tsx:156-163`

```tsx
<button className={...} onClick={() => toggleCategory(idx)}>
  <span>{cat.category}</span>
  <span>{expandedCategory === idx ? '−' : '+'}</span>
</button>
```

The `+`/`−` is a visual cue, but screen readers won't know the accordion state. The button needs `aria-expanded`:

```tsx
<button aria-expanded={expandedCategory === idx} ...>
```

---

### 7. Daily Special Modal Does Not Trap Focus

**File:** `src/components/MenuSection.tsx:123-151`

When the dish modal opens, keyboard users can Tab behind the overlay into the page content. There's no focus trap, no `inert` attribute on the background, and focus isn't moved into the modal on open.

This breaks WCAG 2.1 SC 2.1.2 (No Keyboard Trap). Ironic — the issue is the opposite of "trapping" — users can escape *into* background content.

**Fix:** Add `autoFocus` to the close button, and set `inert` on the background when modal is open, or use a `focus-trap-react` library.

---

## 🟢 Low Priority

### 8. No Analytics

No analytics are integrated (no Vercel Analytics, Google Analytics, Plausible, or similar). For a showcase project, you can't measure how many potential clients visited, where they came from, which section they engaged with, etc.

**Recommendation:** Add Vercel Analytics — it's free, zero-config for Vercel-hosted projects, and privacy-friendly:
```bash
npm install @vercel/analytics
```
Then add `<Analytics />` to `layout.tsx`.

---

### 9. Footer Social Links Are Placeholders

**File:** `src/components/Footer.tsx:13-14`

```tsx
<Link href="#" aria-label="Facebook"><Facebook size={24} /></Link>
<Link href="#" aria-label="Instagram"><Instagram size={24} /></Link>
```

Both links go nowhere. Either link to real/demo social pages or remove the icons. Broken links on a portfolio piece look unfinished.

---

### 10. Dead Assets in `public/`

The following files exist in `public/` but are not referenced anywhere in the codebase:

| File | Reason |
|------|--------|
| `public/images/dish_1.webp` | Unused — no component references it |
| `public/next.svg` | Default `create-next-app` boilerplate |
| `public/file.svg` | Default `create-next-app` boilerplate |
| `public/globe.svg` | Default `create-next-app` boilerplate |
| `public/window.svg` | Default `create-next-app` boilerplate |
| `public/vercel.svg` | Default `create-next-app` boilerplate |

Delete them — they add noise and inflate the deployment artifact.

---

### 11. Header Logo Missing `priority` Prop

**File:** `src/components/Header.tsx:26`

```tsx
<Image src="/images/costeleta-logo.webp" alt="Costeleta Dourada" width={55} height={55} />
```

This is above the fold and visible on page load. Without `priority`, Next.js lazy-loads it, which can cause a visible pop-in on first render. Add `priority`.

---

### 12. Hero Background Can't Be Preloaded by Next.js

**File:** `src/components/Hero.module.css:5`

```css
background-image: url('/images/hero_bg.webp');
```

Because the hero background is a CSS rule, not a `<Image>` component, Next.js has no way to inject a `<link rel="preload">` for it. The hero image (232KB, the largest on the page) is a LCP candidate and will be fetched late.

**Recommendation:** Either add a manual preload in `layout.tsx`:
```tsx
// In <head> via Next.js metadata or a custom <link> tag
```
Or restructure the hero to use a `<Image>` component with `fill` and `priority` as the background layer.

---

### 13. README Is Boilerplate

`README.md` is the default `create-next-app` content. For a portfolio piece, this is the first thing someone sees on the repo. Add a proper description: what the project is, the tech stack, how to run it, and a screenshot.

---

### 14. Missing `theme-color` Meta Tag

No `<meta name="theme-color">` is set. On mobile Chrome/Safari, the browser's URL bar won't match the site's dark earth aesthetic. A small polish item:
```tsx
// In metadata:
themeColor: '#2C241B',
```

---

## ✅ What's Working Well

| Category | Status | Notes |
|----------|--------|-------|
| Images | ✅ Excellent | All WebP, 136–232 KB, ~90% reduction from Jan audit |
| Apple Icons | ✅ Pass | Both 180×180 and 152×152 present |
| Favicon | ✅ Pass | `icon.png` is 8 KB (was 1.3 MB) |
| Legal Pages | ✅ Pass | RGPD-compliant Privacy + Terms |
| Font Loading | ✅ Pass | `display: swap` on both fonts |
| Mobile Nav | ✅ Pass | `aria-label` + `aria-expanded` on toggle |
| JSON-LD Schema | ✅ Pass | Restaurant schema present in `<head>` |
| React Compiler | ✅ Pass | `reactCompiler: true` enabled |
| Scroll Restoration | ✅ Pass | `scroll-behavior: smooth` in globals.css |
| Cookie Consent | ✅ Pass | Accept/Decline with `localStorage` persistence |
| Maps Embed | ✅ Pass | `title` attribute present on iframe |

---

## Recommended Fix Order

1. **Fix `metadataBase` + `canonical` + `sitemap.xml` + `robots.txt`** → all to the Vercel URL (30 min, high impact)
2. **Fix BookingWidget confirmation text** → remove the false email claim (5 min)
3. **Add security headers to `next.config.ts`** (15 min)
4. **Add `aria-expanded` to accordion buttons** (5 min)
5. **Add `priority` to header logo** (2 min)
6. **Add Vercel Analytics** (10 min, free)
7. **Delete dead assets in `public/`** (5 min)
8. **Add `prefers-reduced-motion` to testimonials** (15 min)
9. **Fix modal focus trap** (20 min)
10. **Add `theme-color` meta** (2 min)
11. **Update README** (15 min)

---

## Tech Stack
- **Framework:** Next.js 16.1.1 + React 19.2.3
- **Animations:** Framer Motion 12.26.2
- **Icons:** Lucide React 0.562.0
- **Fonts:** Cinzel (headings), Inter (body) via `next/font/google`
- **Deployment:** Vercel
- **Build:** Static Site Generation (SSG), 5 routes
