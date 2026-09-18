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
  resumePdf: '/resume.pdf',
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
    problem: {
      text: 'Job seekers face fragmented tools for resume tailoring, interview preparation, and application tracking, frequently encountering automated screening hurdles.',
      draft: true,
    },
    whatIBuilt: [
      'Built both the frontend (React/Next.js 15) and backend (NestJS) for a 10-module SaaS platform, including the AI Resume Suite, Interview Suite, and Job Tracker modules.',
      'Integrated the OpenAI API with prompt engineering to power an AI ATS Resume Builder module.',
    ],
    architectureOverview: {
      label: 'Simplified Overview (Pending Confirmation)',
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
      confirmationNote: 'Confirm backend queue (BullMQ/Redis) and database schema wiring.',
    },
    stack: ['React', 'Next.js 15', 'NestJS', 'PostgreSQL', 'Redis', 'BullMQ', 'OpenAI API'],
    links: {
      github: {
        label: 'Source Code',
        isTodo: true,
        todoNote: 'CareerOS repository URL (public or private)',
      },
      live: {
        label: 'Live Platform',
        isTodo: true,
        todoNote: 'CareerOS live deployment URL',
      },
      demoMedia: {
        label: 'Walkthrough Video',
        isTodo: true,
        todoNote: 'Walkthrough video or GIF demonstrating the AI Resume Suite, Interview Suite, or Job Tracker',
      },
    },
  },
  {
    id: 'multi-ai-agent-research',
    title: 'Multi AI Agent Research System',
    subtitle: 'Multi-Agent Research Pipeline',
    timeline: '2026',
    role: 'AI Engineer',
    problem: {
      text: 'Single-prompt queries struggle to independently retrieve diverse sources, verify facts, draft multi-section chapters, and critique content.',
      draft: true,
    },
    whatIBuilt: [
      'Built a multi-agent research pipeline using LangChain and GPT-4o-mini, with search and reader agents collecting data and writer and critic agents producing the final report.',
    ],
    architectureOverview: {
      label: 'Simplified Overview (Pending Confirmation)',
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
      confirmationNote: 'Confirm message passing format between LangChain agents.',
    },
    stack: ['Python', 'LangChain', 'GPT-4o-mini'],
    links: {
      github: {
        label: 'Source Code',
        isTodo: true,
        todoNote: 'Multi AI Agent Research System GitHub repository URL',
      },
      demoMedia: {
        label: 'Pipeline Demo',
        isTodo: true,
        todoNote: 'CLI execution recording or GIF showing the search, reader, writer, and critic agents executing',
      },
    },
  },
  {
    id: 'face-emotion-recognition',
    title: 'Face Emotion Recognition System',
    subtitle: 'Comparative CNN Deep Learning Models',
    timeline: 'Dec 2025 – Jan 2026',
    role: 'Deep Learning Developer',
    problem: {
      text: 'Real-time facial classification requires balancing model parameter count with webcam frame inference latency.',
      draft: true,
    },
    whatIBuilt: [
      'Built and evaluated two CNN-based deep learning models — one in TensorFlow, one in PyTorch — for real-time facial emotion classification via webcam input.',
    ],
    architectureOverview: {
      label: 'Simplified Overview (Pending Confirmation)',
      draft: true,
      nodes: [
        { id: 'webcam', label: 'Webcam Stream', sub: 'OpenCV VideoCapture' },
        { id: 'detect', label: 'Face Detection', sub: 'ROI extraction' },
        { id: 'cnn', label: 'CNN Models', sub: 'TensorFlow vs PyTorch' },
        { id: 'class', label: 'Classification', sub: 'Real-time emotion class' },
      ],
      connections: [
        { from: 'webcam', to: 'detect', label: 'Video frame' },
        { from: 'detect', to: 'cnn', label: 'Normalized face ROI' },
        { from: 'cnn', to: 'class', label: 'Predicted class' },
      ],
      confirmationNote: 'Confirm webcam input resolution and model input dimensions.',
    },
    stack: ['Python', 'OpenCV', 'TensorFlow', 'PyTorch'],
    links: {
      github: {
        label: 'Source Code',
        isTodo: true,
        todoNote: 'Face Emotion Recognition System GitHub repository URL',
      },
      demoMedia: {
        label: 'Webcam Demo',
        isTodo: true,
        todoNote: 'Screen recording or GIF showing the real-time webcam emotion classifier in action',
      },
    },
    metricTodo: 'Validation accuracy % or FPS metrics from training notebooks',
  },
  {
    id: 'health-score-predictor',
    title: 'Health Score Predictor',
    subtitle: 'Student Health Score Regression Model',
    timeline: '2026',
    role: 'Data Scientist',
    problem: {
      text: 'Student health variance is influenced by interconnected lifestyle habits, sleep patterns, and academic pressures.',
      draft: true,
    },
    whatIBuilt: [
      'Built a regression model to predict a student health score from demographic, academic, lifestyle, social media usage, sleep, and stress-related features.',
    ],
    architectureOverview: {
      label: 'Simplified Overview (Pending Confirmation)',
      draft: true,
      nodes: [
        { id: 'data', label: 'Student Data', sub: 'Demographic & lifestyle features' },
        { id: 'prep', label: 'EDA & Preprocessing', sub: 'Pandas' },
        { id: 'model', label: 'Regression Model', sub: 'Scikit-Learn' },
        { id: 'score', label: 'Health Score', sub: 'Predicted metric' },
      ],
      connections: [
        { from: 'data', to: 'prep', label: 'Feature matrix' },
        { from: 'prep', to: 'model', label: 'Cleaned features' },
        { from: 'model', to: 'score', label: 'Health prediction' },
      ],
      confirmationNote: 'Confirm specific regression algorithm used (e.g. Ridge, Lasso, Random Forest Regressor).',
    },
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'Regression'],
    links: {
      github: {
        label: 'Source Code',
        isTodo: true,
        todoNote: 'Health Score Predictor GitHub repository URL',
      },
    },
    metricTodo: 'R² score, MAE, or dataset sample count from analysis scripts',
  },
]

export const projects = PROJECTS

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'AI Full Stack Developer',
    company: 'Lavelda Coffee Beans',
    period: 'Jan 2026 – July 2026',
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
