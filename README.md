# Jasmanjot Singh Sarna — Engineering Portfolio

A hand-crafted, editorial personal portfolio and systems showcase built for **Jasmanjot Singh Sarna** — Final-year B.Tech CSE (AI & ML) student at JECRC University, specializing in AI/ML engineering, multi-agent pipelines, and full-stack SaaS systems.

Designed mobile-first with an editorial aesthetic, fluid typography, zero layout shifts, and strict adherence to verified resume credentials.

---

## Technical Stack & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: TypeScript 5 (Strict type checking)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a curated CSS custom property design system (`#FBF9F5` warm paper, `#141413` obsidian ink, `#B5421E` terracotta accent)
- **Motion & Physics**: [Framer Motion](https://www.framer.com/motion/) for micro-interactions and stage transitions; [GSAP](https://gsap.com/) for scroll choreography; HTML5 Canvas for the point-cloud silhouette loader
- **Backend & Database**: Next.js Server Route Handler (`/api/contact`), [Supabase](https://supabase.com/) Postgres for persistent message storage, [Resend](https://resend.com/) for email delivery
- **Validation & Rate Limiting**: [Zod](https://zod.dev/) client/server schema validation; [Upstash](https://upstash.com/) Redis distributed sliding-window rate limiter with fallback to database/memory limiters
- **Accessibility & Device Support**: WCAG 2.1 AA compliant (0 Axe-core violations); automated 18-viewport device matrix verification via [Playwright](https://playwright.dev/)

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
# Visit http://localhost:3000
```

### Type Checking & Build Verification

```bash
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
5. *(Optional for contact form backend)*: Add the runtime environment variables (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) as documented in [ASSETS_NEEDED.md](./ASSETS_NEEDED.md).
6. Click **Deploy**.

---

## Internal Documentation

- [`ASSETS_NEEDED.md`](./ASSETS_NEEDED.md): Personal checklist for resume updates, optional links, and runtime environment variable keys.
- [`supabase/schema.sql`](./supabase/schema.sql): PostgreSQL schema and Row Level Security policies for the contact form messages table.
