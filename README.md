# Jasmanjot Singh Sarna — Engineering Portfolio

A hand-crafted, editorial personal portfolio and systems showcase built for **Jasmanjot Singh Sarna** — Final-year B.Tech CSE (AI & ML) student at JECRC University, specializing in AI/ML engineering, multi-agent pipelines, and full-stack SaaS systems.

Designed mobile-first with an editorial aesthetic, fluid typography, zero layout shifts, and strict adherence to verified resume credentials.

---

## Technical Highlights & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: TypeScript 5 (Strict type checking, zero `any`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with an editorial CSS custom property design system (`#FBF9F5` warm paper, `#141413` obsidian ink, `#B5421E` terracotta accent)
- **Cinematic Loader ("Modules → Network → Me")**:
  - Custom HTML5 2D Canvas component powered by a single `gsap.ticker` loop.
  - **Stage 1 (0–0.9s)**: 14 resume-verified skill nodes (`Python`, `OpenAI API`, `LangChain`, `RAG`, `PyTorch`, `TensorFlow`, `Scikit-Learn`, `OpenCV`, `Pandas`, `SQL`, `Power BI`, `Next.js`, `NestJS`, `PostgreSQL`) awaken with dynamic signal pulses.
  - **Stage 2 (0.9–2.3s)**: Points ease into Poisson-disc sampled portrait coordinates, forming a plexus-style mesh of Jasmanjot's face and silhouette.
  - **Stage 3 (2.3–3.0s)**: Authentic transparent cutout photo dissolves into place, smoothly morphing into the hero position as a shared element while the obsidian curtain vertically splits open.
  - **Performance**: 58 FPS on 4x CPU throttle; 0 Axe-core accessibility violations; instant skip via `[Esc]`, click, or visible button; 0.5s curtain for repeat visits; `prefers-reduced-motion` and `?noloader` fallbacks.
- **Portrait Sampling Pipeline** (`scripts/generate-portrait-points.mjs`):
  - Uses `sharp` to parse `public/profile.png` with alpha channel masking ($\alpha > 35$) and a 2D Sobel edge gradient operator.
  - Generates 1,150 desktop points and 460 mobile points with Poisson-disc spatial constraints, precomputing 1,704 desktop neighbor edges for $O(1)$ runtime rendering.
- **Backend & Database**: Next.js Server Route Handler (`/api/contact`), [Supabase](https://supabase.com/) Postgres for persistent message storage, [Resend](https://resend.com/) for email delivery
- **Validation & Security**: [Zod](https://zod.dev/) schema validation, honeypot spam traps, SHA-256 IP hashing, [Upstash](https://upstash.com/) Redis distributed sliding-window rate limiting with in-memory fallback
- **Accessibility & Devices**: WCAG 2.1 AA compliant; 18-viewport device matrix verified via [Playwright](https://playwright.dev/) across phones, tablets, and ultra-wide desktops

---

## Featured Engineering Projects

1. **CareerOS (AI Career Operating System)**  
   *React, Next.js 15, NestJS, TypeScript, Tailwind CSS, PostgreSQL, Redis, BullMQ, OpenAI API*  
   Full-stack 10-module SaaS platform featuring an AI Resume Suite, ATS score optimizer, automated job tracker, and an AI interview preparation engine with real-time feedback.

2. **Multi AI Agent Research System**  
   *Python, LangChain, OpenAI GPT-4o-mini, Streamlit, Pydantic, Git*  
   Sequential multi-agent research pipeline orchestrating four cooperating LangChain agents (Search, Reader, Writer, and Critic) to synthesize complex research topics with ground-truth citations. Features an interactive pipeline explorer on the live site.

3. **Face Emotion Recognition System**  
   *Python, TensorFlow, PyTorch, OpenCV, MediaPipe, Scikit-Learn, NumPy, Matplotlib*  
   Deep learning computer vision system comparing custom CNN architectures in TensorFlow and PyTorch for real-time webcam facial landmark extraction and seven-class emotion classification.

4. **Health Score Predictor**  
   *Python, Scikit-Learn, Pandas, NumPy, Matplotlib, Seaborn*  
   Supervised regression pipeline analyzing lifestyle, academic, and demographic indicators to predict student health composite scores with multi-model evaluation.

---

## Getting Started Locally

### Prerequisites
- Node.js 18.17+ or 20+
- npm 9+ or pnpm 8+

### Installation & Execution

```bash
# 1. Clone repository
git clone https://github.com/JasmanjotSarna/jasmanjot-portfolio.git
cd jasmanjot-portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000 (or http://localhost:3000?noloader to bypass loader)
```

### Build Scripts & Tooling

```bash
# Re-generate portrait Poisson-disc sampling points from public/profile.png
npm run generate:points

# Run strict TypeScript compilation check
npx tsc --noEmit

# Run production build (guaranteed to succeed without requiring secret keys)
npm run build
```

---

## Production Deployment to Vercel

The application is architected to build statically without requiring secrets at build time (`next build` succeeds with zero environment variables).

1. Push changes to GitHub:
   ```bash
   git push origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New..." &rarr; "Project"**.
3. Select the **`jasmanjot-portfolio`** repository.
4. Framework preset **Next.js** is automatically detected with root directory `./`.
5. *(Optional for contact form backend)*: Add runtime environment variables (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) as documented in [ASSETS_NEEDED.md](./ASSETS_NEEDED.md).
6. Click **Deploy**.

---

## Static Assets & Resume

- **Portrait Cutout**: [`/public/profile.png`](./public/profile.png) — Transparent-background cutout used for the hero portrait and Poisson-disc network formation.
- **Resume Documents**:
  - [`/public/resume.pdf`](./public/resume.pdf) — Standard direct link for all header, hero, and footer download buttons.
  - [`/public/Jasmanjot Resume.pdf`](./public/Jasmanjot%20Resume.pdf) — Master resume copy.
- **Portrait Point Cloud**: [`/public/portrait-points.json`](./public/portrait-points.json) — Precomputed Poisson-disc coordinates and neighbor edges.

---

## Internal Documentation

- [`ASSETS_NEEDED.md`](./ASSETS_NEEDED.md): Personal checklist for resume updates, optional links, and runtime environment variable keys.
- [`BACKEND_SETUP.md`](./BACKEND_SETUP.md): Step-by-step Supabase, Resend, and Upstash setup instructions.
- [`MOTION.md`](./MOTION.md): Motion choreography specifications and easing curves.
- [`supabase/schema.sql`](./supabase/schema.sql): PostgreSQL schema and Row Level Security policies for the contact form messages table.
