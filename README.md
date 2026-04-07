# Costeleta Dourada

Portfolio showcase website for a fictional traditional Alentejo restaurant based in Évora, Portugal.

**Live:** https://costeleta-dourada.vercel.app/

---

## About

A fully static marketing site built as a front-end portfolio piece. Demonstrates real-world restaurant website patterns: hero section, interactive menu with daily specials, animated testimonials carousel, multi-step booking widget, and RGPD-compliant legal pages.

## Tech Stack

- **Framework:** Next.js 16 (App Router, SSG)
- **React:** 19
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Cinzel + Inter via `next/font/google`
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## Features

- Sticky header with scroll-aware styling and mobile menu
- Full-screen hero with CSS parallax background
- Interactive "Prato do Dia" grid with animated modal per day
- Accordion-based full menu (7 categories)
- Multi-step booking widget with availability simulation
- Auto-scrolling testimonials carousel (respects `prefers-reduced-motion`)
- Cookie consent banner with localStorage persistence
- Privacy Policy + Terms & Conditions pages (RGPD-compliant)
- JSON-LD Restaurant schema for SEO
- Security headers via `next.config.ts`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- The booking widget is a UI-only simulation — no backend or email service is connected.
- All restaurant data (name, address, phone, menu prices) is fictional.
