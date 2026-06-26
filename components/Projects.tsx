'use client'

import { ExternalLink, Github } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const projects = [
  {
    title: 'CareerForge AI',
    featured: true,
    status: 'In progress',
    problem:
      'Engineering students in India largely lack accessible, personalized career guidance — most tools are generic, English-only, and ignore individual skill gaps.',
    solution:
      'An AI-powered career platform that pairs voice assistance and multilingual support with personalized recommendations, skill assessment, and real-time job matching.',
    highlights: [
      'Personalized recommendation engine',
      'Multilingual voice assistant',
      'Skill-gap assessment',
      'Real-time job matching',
    ],
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Pinecone', 'Claude 3.5'],
    github: 'https://github.com/JasmanjotSarna',
    live: '',
  },
  {
    title: 'Face Emotion Recognition',
    status: 'Complete',
    problem:
      'Manual emotion annotation for UX research and human-state monitoring is slow, inconsistent, and doesn\u2019t scale past small studies.',
    solution:
      'A real-time computer vision model that classifies human emotion from live video at 95%+ accuracy across seven categories.',
    highlights: ['95%+ test accuracy', 'Real-time inference', '7-class emotion taxonomy'],
    stack: ['Python', 'OpenCV', 'TensorFlow', 'Deep Learning'],
    github: 'https://github.com/JasmanjotSarna',
    live: '',
  },
  {
    title: 'Air Canvas',
    status: 'Complete',
    problem:
      'Touch-based drawing tools assume a screen or stylus — there was no lightweight way to draw using just hand motion and a webcam.',
    solution:
      'A contactless drawing application that tracks hand landmarks in real time and renders smooth, jitter-free strokes in the air.',
    highlights: ['Hand-landmark gesture tracking', 'EMA smoothing for stable strokes', 'Multi-color, multi-tool support'],
    stack: ['OpenCV', 'MediaPipe', 'NumPy', 'Python'],
    github: 'https://github.com/JasmanjotSarna',
    live: '',
  },
  {
    title: 'AI ATS Resume Builder',
    status: 'Complete',
    problem:
      'Applicant Tracking Systems silently reject qualified candidates over formatting and keyword mismatches, not ability.',
    solution:
      'An LLM-driven tool that restructures and rewrites resumes per role — optimizing keywords and formatting for ATS parsing without sounding generic.',
    highlights: ['ATS-safe formatting', 'Role-specific keyword tuning', 'Prompt-engineered rewriting'],
    stack: ['Python', 'NLP', 'Prompt Engineering', 'LLMs'],
    github: 'https://github.com/JasmanjotSarna',
    live: '',
  },
]

function ProjectCard({ project, i }: { project: typeof projects[0]; i: number }) {
  return (
    <Reveal delay={i * 0.06} className={project.featured ? 'md:col-span-2' : ''}>
      <div className="panel-hover p-7 md:p-9 h-full flex flex-col gap-6 group">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              {project.featured && <span className="chip-amber">FEATURED</span>}
              <span className="chip">{project.status}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-paper tracking-tight">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-3 mt-1 flex-shrink-0">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-signal transition-colors"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink size={17} />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-signal transition-colors"
              aria-label={`${project.title} on GitHub`}
            >
              <Github size={17} />
            </a>
          </div>
        </div>

        <div className={`grid gap-5 ${project.featured ? 'md:grid-cols-2' : ''}`}>
          <div>
            <p className="index-label mb-1.5">Problem</p>
            <p className="text-paper/75 text-sm leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <p className="index-label mb-1.5">Approach</p>
            <p className="text-paper/75 text-sm leading-relaxed">{project.solution}</p>
          </div>
        </div>

        <ul className="flex flex-wrap gap-2">
          {project.highlights.map((h) => (
            <li key={h} className="text-xs text-muted border border-white/10 px-3 py-1">
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-[11px] text-signal px-2.5 py-1 border border-signal/25 bg-signal-dim">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="work" className="py-24 md:py-32 container-grid">
      <SectionHeader
        index="// 02"
        kicker="Selected Work"
        title="Things I've built and shipped"
        description="Each project started as a real problem — not a tutorial. Stack and outcomes are listed honestly, status included."
      />

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} i={i} />
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 text-center">
        <a href="https://github.com/JasmanjotSarna" target="_blank" rel="noreferrer" className="btn-ghost">
          View all repositories <Github size={15} />
        </a>
      </Reveal>
    </section>
  )
}
