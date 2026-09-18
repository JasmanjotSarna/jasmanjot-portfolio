# Master Action Items & Assets Checklist for Jasmanjot

This document contains all developer-side action items, assets to supply, and production deployment configuration for **jasmanjot-portfolio**.

---

## 1. Resume PDF (Immediate Action Item)

- [ ] **Replace `/public/resume.pdf`**:
  - The file currently at `/public/resume.pdf` still refers to the SaaS platform as "CareerForge AI".
  - **Action**: Export an updated PDF from your resume builder with the official name **"CareerOS"**, rename the file to `resume.pdf`, and place it in `/public/resume.pdf` (overwriting the existing file).
  - The website's master download buttons, hero links, and mobile action bars are already wired to `/resume.pdf`.

---

## 2. Vercel Environment Variables Configuration

Add these environment variables in your **Vercel Project Dashboard** under **Settings &rarr; Environment Variables**:

| Variable Name | Required? | Description & Where to Get It |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical production URL (e.g. `https://jasmanjot-portfolio.vercel.app` or `https://jasmanjotsarna.dev`). |
| `SUPABASE_URL` | **Required for DB** | Supabase Project URL (`https://<project>.supabase.co`). Found in **Supabase Dashboard &rarr; Project Settings &rarr; API &rarr; Project URL**. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Required for DB** | Supabase secret service role key (server-only). Found in **Supabase Dashboard &rarr; Project Settings &rarr; API &rarr; service_role**. |
| `RESEND_API_KEY` | **Required for Email** | Resend API key (`re_...`). Found in **Resend Dashboard &rarr; API Keys &rarr; Create API Key**. |
| `CONTACT_TO_EMAIL` | Optional | Destination email address. Defaults to `jasmanjotsinghsarna@gmail.com`. |
| `CONTACT_FROM_EMAIL` | Optional | Sender email. Defaults to `Portfolio Contact <onboarding@resend.dev>`. Set to `contact@yourdomain.com` once your domain is verified in Resend. |
| `UPSTASH_REDIS_REST_URL` | Optional | Distributed Redis URL for rate limiting. Found in **Upstash Console &rarr; Redis Database &rarr; REST API**. |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Distributed Redis REST Token. Found in **Upstash Console &rarr; Redis Database &rarr; REST API**. |
| `IP_HASH_SALT` | Optional | Random string for cryptographic IP hashing (prevents rainbow table lookups). Any random string. |

> **Note on Build Time**: The application is designed with zero build-time secret dependencies. `next build` will succeed even if none of these environment variables are provided during build.

---

## 3. Project Links & Media Assets

All project metadata is centralized in [`lib/content.ts`](./lib/content.ts). When you are ready to publish links or recordings, update the respective objects:

### Project 01: CareerOS
- [ ] **GitHub Repo URL**: Set `PROJECTS[0].links.github.url = 'https://github.com/JasmanjotSarna/careeros'` and `isTodo = false`.
- [ ] **Live Platform URL**: Set `PROJECTS[0].links.live.url = 'https://careeros.app'` and `isTodo = false`.
- [ ] **Demo Video / Loom**: Add link to `PROJECTS[0].links.demoMedia.url` or drop MP4 in `/public/media/careeros-demo.mp4`.

### Project 02: Multi AI Agent Research System
- [ ] **GitHub Repo URL**: Set `PROJECTS[1].links.github.url` and `isTodo = false`.
- [ ] **Execution Screen Recording**: Short recording of CLI/pipeline execution to attach to `PROJECTS[1].links.demoMedia.url`.

### Project 03: Face Emotion Recognition System
- [ ] **GitHub Repo URL**: Set `PROJECTS[2].links.github.url` and `isTodo = false`.
- [ ] **Webcam Demo Clip**: Screen recording showing emotion classification bounding boxes.
- [ ] **Benchmark Metrics**: Supply validation accuracy % and inference FPS for TensorFlow vs PyTorch.

### Project 04: Health Score Predictor
- [ ] **GitHub Repo URL**: Set `PROJECTS[3].links.github.url` and `isTodo = false`.
- [ ] **Benchmark Metrics**: Supply $R^2$ score and Mean Absolute Error (MAE) from regression analysis.

---

## 4. Draft Copy Approvals
- [ ] **Problem Statements**: To display concise problem statements above each project, set `SHOW_DRAFT_PROBLEMS = true` in `lib/content.ts`.
- [ ] **Leadership Experience**: To display the AIESEC Jaipur leadership section, set `SHOW_LEADERSHIP = true` in `lib/content.ts`.
