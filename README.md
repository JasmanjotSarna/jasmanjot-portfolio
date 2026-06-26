# Jasmanjot Singh Sarna — Portfolio

A from-scratch Next.js 14 (App Router) portfolio for an AI/ML Engineer & Data Analyst,
built with TypeScript, Tailwind CSS, and Framer Motion.

## Design direction

- **Palette** — near-black `#090B0F`, off-white `#ECEEF2`, signal blue `#4C8DFF` (primary
  accent / interactive), amber `#FFB454` (secondary accent / featured & highlight data).
- **Type** — bold geometric display face for headlines, clean body sans, and a monospace
  face for section indices, stats, and tech tags — a deliberate "engineering notebook /
  systems dashboard" identity instead of a generic gradient-and-glassmorphism template.
- **Signature element** — an animated canvas node-graph in the hero (`components/NodeField.tsx`):
  ambient drifting nodes that connect when close, plus a cursor-reactive amber link, meant to
  evoke a live model/network rather than decorative particles.
- Section headers use a `// 0N` index + kicker, since the content genuinely is a sequence of
  sections in a single-page narrative.
- No emoji anywhere — icons are from `lucide-react`, tags/stats are monospace text.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom design tokens in `tailwind.config.js`)
- Framer Motion (scroll reveals, role ticker)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> Note: this was built in a sandboxed environment without registry access, so the native
> SWC binary for `next build` couldn't be downloaded here — `npx tsc --noEmit` passes clean,
> and `npm install` in your own machine/CI will fetch the correct platform binary automatically.

## Structure

```
app/
  layout.tsx        — root layout, metadata/SEO
  page.tsx           — section composition
  globals.css        — design tokens, base styles
components/
  Navbar.tsx          Hero.tsx            About.tsx
  Projects.tsx        Skills.tsx          Experience.tsx
  Achievements.tsx    Contact.tsx         Footer.tsx
  NodeField.tsx       — signature canvas background
  Reveal.tsx          — scroll-reveal wrapper
  SectionHeader.tsx   — shared section header
public/
  profile.png, resume.pdf
```

## Content you should swap/check

- `public/resume.pdf` — already in place, linked from Navbar/Hero/Footer.
- `components/Contact.tsx` — the contact form currently simulates sending. Wire `handleSubmit`
  to a real email service (Resend, Formspree, or your own API route) before going live.
- Project `live` links in `components/Projects.tsx` are empty strings — add live demo URLs
  as projects go online; the external-link icon only renders when one is present.
- GitHub stats images in `components/Skills.tsx` assume username `JasmanjotSarna` — already
  correct, but confirm if you rename the account.

## Deploying

Push to GitHub and import into Vercel — zero config needed, this is a standard Next.js app.
