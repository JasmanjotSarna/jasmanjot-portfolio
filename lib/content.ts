/**
 * SINGLE SOURCE OF TRUTH FOR PORTFOLIO CONTENT
 * Sourced strictly from Jasmanjot_Sarna_Master_Resume.pdf.
 *
 * All non-resume text (such as problem hypotheses and architecture flows)
 * is explicitly flagged as draft copy.
 */

export const SHOW_PLACEHOLDERS: boolean = process.env.NODE_ENV !== 'production'
export const SHOW_DRAFT_PROBLEMS: boolean = false
export const SHOW_LEADERSHIP: boolean = false

export interface ProjectLink {
  label: string
  url?: string
  isTodo?: boolean
  todoNote?: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  timeline: string
  role: string
  featured?: boolean
  inDevelopment?: boolean
  // Draft contextual lines (not on resume, marked draft: true)
  problem?: {
    text: string
    draft: true
  }
  // What was built: STRICTLY from the resume
  whatIBuilt: string[]
  // Architecture schematic: labeled as simplified overview pending confirmation
  architectureOverview?: {
    label: string
    draft: true
    nodes: { id: string; label: string; sub: string }[]
    connections: { from: string; to: string; label?: string }[]
    confirmationNote: string
  }
  stack: string[]
  links: {
    github: ProjectLink
    live?: ProjectLink
    demoMedia?: ProjectLink
  }
  metricTodo?: string
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface Certification {
  title: string
  issuer: string
  platform: string
}

export const PERSONAL_INFO = {
  name: 'Jasmanjot Singh Sarna',
  headlineRoles: 'AI/ML Engineer • Full Stack Developer • Data Analyst/Scientist',
  status: 'Final-year B.Tech Computer Science Engineering (AI & ML) Student',
  institution: 'JECRC University, Jaipur (2023–2027)',
  location: 'Jaipur, Rajasthan, India',
  email: 'jasmanjotsinghsarna@gmail.com',
  github: 'https://github.com/JasmanjotSarna',
  linkedin: 'https://www.linkedin.com/in/jasmanjot-singh-sarna-0a2539286/',
  resumePdf: '/Jasmanjot%20Resume.pdf',
  photo: '/profile.png',
  lastUpdated: 'September 2026',
  summary:
    "I work across the pipeline: data cleaning and EDA, statistical modeling, LLM/agentic workflows, and full-stack software engineering. I've worked as an AI Full Stack Developer building LLM chatbots and as a Data Analyst Intern building KPI dashboards.",
}

export const LAST_UPDATED = 'September 2026'

export const PROJECTS: Project[] = [
  {
    id: 'careeros',
    title: 'CareerOS',
    subtitle: 'AI Career Operating System (10-Module SaaS Platform)',
    timeline: 'May 2026 – Present',
    role: 'Full Stack & AI Developer',
    featured: true,
    inDevelopment: true,
    problem: {
      text: 'Job seekers face fragmented tools for resume tailoring, interview preparation, and application tracking, frequently encountering automated screening hurdles.',
      draft: true,
    },
    whatIBuilt: [
      'Built both the frontend (React/Next.js 15) and backend (NestJS) for a 10-module SaaS platform, including the AI Resume Suite, Interview Suite, and Job Tracker modules.',
      'Integrated the OpenAI API with prompt engineering to power an AI ATS Resume Builder module.',
    ],
    architectureOverview: {
      label: 'Simplified Overview (In Development)',
      draft: true,
      nodes: [
        { id: 'client', label: 'Frontend', sub: 'React / Next.js 15' },
        { id: 'api', label: 'Backend API', sub: 'NestJS' },
        { id: 'queue', label: 'Async Queue', sub: 'BullMQ + Redis' },
        { id: 'llm', label: 'AI Engine', sub: 'OpenAI API' },
        { id: 'db', label: 'Database', sub: 'PostgreSQL' },
      ],
      connections: [
        { from: 'client', to: 'api', label: 'API requests' },
        { from: 'api', to: 'queue', label: 'Background jobs' },
        { from: 'queue', to: 'llm', label: 'Prompt payloads' },
        { from: 'llm', to: 'api', label: 'Structured response' },
        { from: 'api', to: 'db', label: 'Persist state' },
      ],
      confirmationNote: 'Currently in active development with backend queue and database schema wiring.',
    },
    stack: ['React', 'Next.js 15', 'NestJS', 'PostgreSQL', 'Redis', 'BullMQ', 'OpenAI API'],
    links: {
      github: {
        label: 'Source Code',
        isTodo: true,
        todoNote: 'CareerOS is currently in development',
      },
      live: {
        label: 'Live Platform',
        isTodo: true,
        todoNote: 'CareerOS is currently in development',
      },
    },
  },
  {
    id: 'multi-ai-agent-research',
    title: 'Multi AI Agent Research System',
    subtitle: 'Autonomous Multi-Agent Research Pipeline',
    timeline: '2026',
    role: 'AI Engineer',
    inDevelopment: true,
    problem: {
      text: 'Single-prompt queries struggle to independently retrieve diverse sources, verify facts, draft multi-section chapters, and critique content.',
      draft: true,
    },
    whatIBuilt: [
      'Built a multi-agent research pipeline using LangChain and GPT-4o-mini, with search and reader agents collecting data and writer and critic agents producing the final report.',
    ],
    architectureOverview: {
      label: 'Autonomous Agent Topology (In Development)',
      draft: true,
      nodes: [
        { id: 'search', label: 'Search Agent', sub: 'Data collection' },
        { id: 'reader', label: 'Reader Agent', sub: 'Data collection' },
        { id: 'writer', label: 'Writer Agent', sub: 'Report production' },
        { id: 'critic', label: 'Critic Agent', sub: 'Report production' },
      ],
      connections: [
        { from: 'search', to: 'reader', label: 'Raw sources' },
        { from: 'reader', to: 'writer', label: 'Parsed data' },
        { from: 'writer', to: 'critic', label: 'Draft output' },
        { from: 'critic', to: 'writer', label: 'Review pass' },
      ],
      confirmationNote: 'Agent message-passing protocol and tool-calling loop in active development.',
    },
    stack: ['Python', 'LangChain', 'GPT-4o-mini', 'Vector DB', 'Multi-Agent'],
    links: {
      github: {
        label: 'Source Code',
        isTodo: true,
        todoNote: 'Multi AI Agent Research System is in active development',
      },
    },
  },
  {
    id: 'cardiodetectai',
    title: 'Cardio Detect AI',
    subtitle: 'Clinical Intelligence & Cardiovascular Risk Classification Platform',
    timeline: '2026',
    role: 'ML & Full Stack Developer',
    problem: {
      text: 'Traditional diagnostic tools often lack transparent interpretability, making it difficult for researchers and clinicians to understand the underlying clinical indicators behind cardiovascular risk predictions.',
      draft: true,
    },
    whatIBuilt: [
      'Engineered a medical-technology web platform exploring cardiovascular disease risk classification through radical algorithmic interpretability.',
      'Trained a reproducible Scikit-Learn K-Nearest Neighbors pipeline (k=5, AUC = 0.9269, 86.41% accuracy) over historical clinical cohorts (918 cases), served via FastAPI.',
      'Developed a high-precision React 19 / Vite frontend with real-time canvas ECG telemetry, 5 nearest neighbor consensus, and an interactive What-If sensitivity simulator.',
    ],
    architectureOverview: {
      label: 'Clinical ML Inference Flow',
      draft: true,
      nodes: [
        { id: 'intake', label: 'Patient Vitals', sub: '11 Clinical Biomarkers' },
        { id: 'api', label: 'FastAPI Backend', sub: 'Uvicorn ASGI' },
        { id: 'knn', label: 'KNN Pipeline', sub: 'Scikit-Learn (k=5)' },
        { id: 'explain', label: 'Interpretability', sub: '5 Neighbor Consensus' },
        { id: 'ui', label: 'Clinical Console', sub: 'React 19 + Real-time ECG' },
      ],
      connections: [
        { from: 'intake', to: 'api', label: 'Telemetry POST' },
        { from: 'api', to: 'knn', label: 'Normalized feature vector' },
        { from: 'knn', to: 'explain', label: 'Euclidean nearest neighbors' },
        { from: 'explain', to: 'ui', label: 'Risk & sensitivity verdict' },
      ],
      confirmationNote: 'Production model deployed and validated against holdout clinical cohorts.',
    },
    stack: ['React 19', 'Vite', 'Python', 'FastAPI', 'Scikit-Learn', 'Tailwind CSS', 'Recharts'],
    links: {
      github: {
        label: 'Source Code',
        url: 'https://github.com/JasmanjotSarna/cardiodetectai',
        isTodo: false,
      },
      live: {
        label: 'Live Platform',
        url: 'https://cardiodetectai.vercel.app/',
        isTodo: false,
      },
    },
  },
  {
    id: 'mind-scroll-ai',
    title: 'Mind Scroll AI',
    subtitle: 'Student Social Media & Mental Health Impact Predictor',
    timeline: '2026',
    role: 'ML & Full Stack Developer',
    problem: {
      text: 'Excessive daily screen time, fragmented sleep cycles, and unregulated social media usage heavily strain student mental health, yet students lack actionable insights into how their specific habits impact cognitive wellness.',
      draft: true,
    },
    whatIBuilt: [
      'Built a full-stack machine learning application trained on 5,000 student survey responses to analyze digital lifestyle impacts on mental health.',
      'Trained and evaluated multiple regression architectures, deploying a tuned Random Forest regression pipeline (R² = 0.864, MAE = ±0.37) with ColumnTransformer preprocessing.',
      'Engineered a FastAPI backend and React 19 frontend featuring an animated semicircular wellness score gauge, waterfall driver analysis, and real-time What-If habit simulation.',
    ],
    architectureOverview: {
      label: 'Predictive Regression Pipeline',
      draft: true,
      nodes: [
        { id: 'survey', label: 'Habit Telemetry', sub: '12 Lifestyle Features' },
        { id: 'prep', label: 'Preprocessing', sub: 'ColumnTransformer' },
        { id: 'rf', label: 'Random Forest', sub: 'Tuned Regressor (R²=0.864)' },
        { id: 'driver', label: 'Driver Engine', sub: 'Impact Waterfall' },
        { id: 'client', label: 'Interactive UI', sub: 'React 19 + Score Gauge' },
      ],
      connections: [
        { from: 'survey', to: 'prep', label: 'Student profile' },
        { from: 'prep', to: 'rf', label: 'Transformed feature matrix' },
        { from: 'rf', to: 'driver', label: 'Predicted wellness index' },
        { from: 'driver', to: 'client', label: 'What-if feedback & PDF' },
      ],
      confirmationNote: 'Evaluated with 70/30 train/test split on empirical student dataset.',
    },
    stack: ['React 19', 'Vite', 'Python', 'FastAPI', 'Scikit-Learn', 'Tailwind CSS', 'Framer Motion'],
    links: {
      github: {
        label: 'Source Code',
        url: 'https://github.com/JasmanjotSarna/Mind_Scroll_AI',
        isTodo: false,
      },
      live: {
        label: 'Live Platform',
        url: 'https://mindscrollai.vercel.app/',
        isTodo: false,
      },
    },
  },
]

export const projects = PROJECTS

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'AI Full Stack Developer',
    company: 'Lavelda Coffee Beans',
    period: 'Mar 2026 – Aug 2026',
    location: 'Remote',
    bullets: [
      'Developed and deployed LLM-powered AI chatbots using the OpenAI API to automate customer support and product inquiries.',
      'Designed prompt engineering workflows to optimize chatbot accuracy and improve response quality.',
    ],
  },
  {
    role: 'Data Analyst Intern',
    company: 'AppGallop Pvt. Ltd.',
    period: 'Feb 2025 – Jan 2026',
    location: 'Remote',
    bullets: [
      'Performed data preprocessing and EDA in Python/Pandas to support accurate, reliable reporting.',
      'Built and automated KPI dashboards in Power BI, translating raw data into structured insights.',
    ],
  },
  {
    role: 'Summer Intern',
    company: 'Samatrix Consulting Pvt. Ltd.',
    period: 'June 2025 – July 2025',
    location: 'Remote',
    bullets: [
      'Cleaned and transformed real-world datasets using statistical techniques, preparing structured data for downstream analysis.',
    ],
  },
]

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Generative AI & LLMs',
    skills: ['OpenAI API', 'LangChain', 'RAG', 'Multi-Agent Systems', 'Prompt Engineering'],
  },
  {
    category: 'ML & Deep Learning',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'CNNs', 'BiGRU', 'Regression', 'Model Evaluation'],
  },
  {
    category: 'Full Stack Development',
    skills: ['React', 'Next.js 15', 'TypeScript', 'NestJS', 'Node.js', 'REST APIs', 'PostgreSQL', 'Redis'],
  },
  {
    category: 'Data & Analytics',
    skills: ['Python', 'Pandas', 'NumPy', 'SQL', 'Power BI', 'EDA', 'Statistical Analysis'],
  },
  {
    category: 'Tools & Practices',
    skills: ['Git', 'pnpm/Turborepo', 'Google Colab'],
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Meta Full Stack Developer Professional Certificate',
    issuer: 'Meta',
    platform: 'Coursera Online',
  },
  {
    title: 'IBM AI Engineering Certificate',
    issuer: 'IBM',
    platform: 'Coursera Online',
  },
  {
    title: 'IBM Data Scientist Professional Certificate',
    issuer: 'IBM',
    platform: 'Coursera Online',
  },
  {
    title: 'Google Data Analytics Certificate',
    issuer: 'Google',
    platform: 'Coursera Online',
  },
]

export const LEADERSHIP_EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Head of Incoming Social Sector',
    company: 'AIESEC Jaipur',
    period: '2025 – 2026',
    location: 'Jaipur, India',
    bullets: [
      'Led an executive team managing incoming social-impact projects and volunteer onboarding.',
      'Managed stakeholder communication, logistics, and partner coordination.',
    ],
  },
  {
    role: 'LCVP iGV (Vice President)',
    company: 'AIESEC Jaipur',
    period: '2024 – 2025',
    location: 'Jaipur, India',
    bullets: [
      'Managed operations for incoming global volunteer exchange cohorts in Jaipur.',
      'Oversaw project alignment, cross-team logistics, and onboarding events.',
    ],
  },
]
