# Jasmanjot Singh Sarna — Personal Portfolio & Projects

A from-scratch, editorial personal portfolio and project showcase built for **Jasmanjot Singh Sarna** (AI/ML Engineer, Full Stack Developer, and Data Analyst).

> **Architectural Justification (Next.js 14 vs React + Vite):**  
> Next.js 14 App Router was selected over React+Vite to provide zero-waterfall server font loading (eliminating layout shifts for serif display typography), built-in dynamic Open Graph image generation via `@vercel/og`, native API routes for the contact form, and automated SEO sitemap/robots generation without separate backend infrastructure.

---

## ⚠️ Action Item for Jasmanjot

> **TODO: Swap `/public/resume.pdf`**  
> The existing PDF at `/public/resume.pdf` still references the project as "CareerForge AI". Replace this file with your updated resume PDF reflecting the official name **"CareerOS"**. The site is already configured to download `/resume.pdf` directly.

---

## Design Philosophy & Aesthetics

- **Editorial, Project-First**: Designed with an editorial perspective. Rather than dark-mode glowing neon cards or generic templates, the site uses a warm paper palette (`#FBF9F5` light, `#131211` dark), high-contrast ink typography, and terracotta accenting (`#C04A26`).
- **Strict Source of Truth**: All facts, dates, roles, and technologies derive strictly from Jasmanjot's Master Resume. No invented claims or synthetic metrics.
- **Interactive Proof Piece**: Features an interactive 4-stage Multi-Agent Pipeline Explorer (LangChain + Python architecture) allowing recruiters to step through search, reader, writer, and critic agents with keyboard or mouse navigation.
- **Typography**:
  - **Display / Headlines**: *Newsreader* (editorial serif from Google Fonts)
  - **Body**: *IBM Plex Sans*
  - **Technical Labels & Payloads**: *IBM Plex Mono*

---

## Featured Projects

1. **CareerOS** — AI Career Operating System (10-Module Full-Stack SaaS platform built with React, Next.js 15, NestJS, and OpenAI API).
2. **Multi AI Agent Research System** — Sequential multi-agent pipeline using LangChain and GPT-4o-mini with search, reader, writer, and critic agents.
3. **Face Emotion Recognition System** — Comparative CNN deep learning models in TensorFlow vs PyTorch for real-time webcam classification.
4. **Health Score Predictor** — Student health score regression model analyzing demographic, academic, and lifestyle factors in Scikit-Learn.

---

## How to Add Missing Links, Videos & Screenshots

All portfolio data is centralized in `lib/content.ts`. A full checklist is maintained in [`ASSETS_NEEDED.md`](./ASSETS_NEEDED.md).

### 1. Adding GitHub & Live Links
Open `lib/content.ts`, locate the project in `PROJECTS`, and update the `links` object:
```ts
links: {
  github: {
    label: 'Source Code',
    url: 'https://github.com/JasmanjotSarna/your-repo-name',
    isTodo: false,
  },
  live: {
    label: 'Live Platform',
    url: 'https://careeros.app',
    isTodo: false,
  },
}
```

### 2. Adding Walkthrough Videos & Screenshots
- Place your video file or animated GIF in `/public/media/` (e.g. `/public/media/careeros-demo.mp4`).
- Update `demoMedia` in `lib/content.ts`:
```ts
demoMedia: {
  label: 'Walkthrough Video',
  url: '/media/careeros-demo.mp4',
  isTodo: false,
}
```

### 3. Hiding Placeholders in Production
In `lib/content.ts`, `SHOW_PLACEHOLDERS` is set to `process.env.NODE_ENV !== 'production'`. In production builds, any item without a valid URL is completely hidden so recruiters never see "TODO" markers.

---

## Working Contact Form API (`/api/contact`)

The portfolio includes a working Next.js App Router API route at `/app/api/contact/route.ts` with server-side validation.

### Recommended Providers:
1. **Formspree** (Easiest):
   - Create a free form at [formspree.io](https://formspree.io)
   - Add your endpoint to environment variables:
     ```env
     FORMSPREE_ENDPOINT="https://formspree.io/f/your_form_id"
     ```
2. **Resend**:
   - Create a free account at [resend.com](https://resend.com)
   - Add your API key:
     ```env
     RESEND_API_KEY="re_123456789"
     ```
3. **Development / Local Fallback**:
   - If neither variable is set, submissions are validated, logged to the server console, and the client displays a success message.

---

## Deployment to Vercel (Step-by-Step)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Rebuild personal portfolio with CareerOS and projects"
   git push origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New..." -> "Project"**.
3. Select your `portfolio-ai-os` repository and click **Import**.
4. Configure Project Settings:
   - **Framework Preset**: Next.js (automatically detected)
   - **Root Directory**: `./`
   - **Environment Variables** (optional):
     - `FORMSPREE_ENDPOINT` or `RESEND_API_KEY` (for contact form)
5. Click **Deploy**. Vercel will build and assign your production URL (or link your custom domain `jasmanjotsarna.dev`).

---

## Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run TypeScript type-checking
npx tsc --noEmit
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
