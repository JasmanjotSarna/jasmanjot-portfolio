# Master Asset Checklist for Jasmanjot Singh Sarna's Portfolio

This checklist tracks every missing link, video, benchmark metric, and media asset needed to bring the portfolio to 100% completion.

When `SHOW_PLACEHOLDERS: boolean = false` in `lib/content.ts` (the production default), all unsupplied links, video frames, and metric boxes are automatically hidden from visitors so no "TODO" or placeholder elements ever leak to recruiters.

---

## 1. Resume PDF Update (Crucial)
- [ ] **`/public/resume.pdf`**:
  - The current PDF still reads "CareerForge AI".
  - **Action**: Export an updated PDF from your resume builder with "CareerOS" as the title for the 10-module SaaS project, and place it at `/public/resume.pdf` (replacing the old file).

---

## 2. Project 01: CareerOS (AI Career Operating System)
- [ ] **GitHub Repository URL**:
  - Add to `PROJECTS[0].links.github.url` in `lib/content.ts`.
  - Set `PROJECTS[0].links.github.isTodo = false`.
- [ ] **Live Deployment URL**:
  - Add to `PROJECTS[0].links.live.url` in `lib/content.ts`.
  - Set `PROJECTS[0].links.live.isTodo = false`.
- [ ] **Demo Video / Walkthrough**:
  - Walkthrough recording or MP4/WebM/Loom demonstrating the AI Resume Suite, ATS builder, or Interview Suite.
  - Add link to `PROJECTS[0].links.demoMedia.url` or drop asset in `/public/media/careeros-demo.mp4`.
- [ ] **Architecture Confirmation**:
  - Confirm whether the backend queue uses BullMQ + Redis, and whether PostgreSQL is the primary database.

---

## 3. Project 02: Multi AI Agent Research System
- [ ] **GitHub Repository URL**:
  - Add to `PROJECTS[1].links.github.url` in `lib/content.ts`.
  - Set `PROJECTS[1].links.github.isTodo = false`.
- [ ] **Execution Screen Recording / CLI Demo**:
  - Short GIF or video clip demonstrating the LangChain CLI execution (search, reader, writer, critic agents operating sequentially).
  - Add link to `PROJECTS[1].links.demoMedia.url` in `lib/content.ts`.
- [ ] **Architecture Confirmation**:
  - Confirm message passing format between LangChain agents (e.g., JSON state object vs string piping).

---

## 4. Project 03: Face Emotion Recognition System
- [ ] **GitHub Repository URL**:
  - Add to `PROJECTS[2].links.github.url` in `lib/content.ts`.
  - Set `PROJECTS[2].links.github.isTodo = false`.
- [ ] **Webcam Demo Clip**:
  - Screen recording showing the real-time emotion classifier bounding box and emotion labels via webcam.
  - Add to `PROJECTS[2].links.demoMedia.url` in `lib/content.ts`.
- [ ] **Benchmark Metrics**:
  - Supply the validation accuracy % and inference FPS for TensorFlow vs PyTorch CNN models from training notebooks.
  - Add to `PROJECTS[2].metricTodo` or create an explicit benchmark comparison table.

---

## 5. Project 04: Health Score Predictor
- [ ] **GitHub Repository URL**:
  - Add to `PROJECTS[3].links.github.url` in `lib/content.ts`.
  - Set `PROJECTS[3].links.github.isTodo = false`.
- [ ] **Benchmark Metrics**:
  - Supply $R^2$ score, Mean Absolute Error (MAE), and dataset sample count from regression analysis scripts.
- [ ] **Algorithm Confirmation**:
  - Confirm the exact regression algorithms used (e.g. Ridge Regression, Random Forest Regressor, Gradient Boosting).

---

## 6. Form Notification Provider (Optional Setup)
- The working contact form (`/api/contact`) is pre-wired to:
  - **Formspree**: Set `FORMSPREE_ENDPOINT="https://formspree.io/f/your_id"` in `.env.local` or Vercel environment variables.
  - **Resend**: Set `RESEND_API_KEY="re_..."` in `.env.local` or Vercel environment variables.
  - **Local / Default**: Without any environment variables, it logs submissions cleanly to the server console and safely confirms submission to the visitor.

---

## 7. Draft Problem Statements Approval
If you wish to display problem statements in the project cards:
- Change `SHOW_DRAFT_PROBLEMS = true` in `lib/content.ts` once you have approved the draft copy.
