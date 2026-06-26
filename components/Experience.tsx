import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const experiences = [
  {
    role: 'Data Analyst Intern',
    company: 'AppGallop Pvt. Ltd.',
    period: '2024',
    bullets: [
      'Analyzed business data with Python and SQL to surface operational trends',
      'Built interactive Power BI dashboards used directly by stakeholders',
      'Cleaned and transformed large, messy datasets into analysis-ready form',
      'Shifted team decisions from gut-feel to visualization-backed evidence',
    ],
    stack: ['Python', 'SQL', 'Power BI'],
  },
  {
    role: 'Summer Intern',
    company: 'Samatrix Consulting Pvt. Ltd.',
    period: '2023',
    bullets: [
      'Contributed to analytics and business-intelligence engagements',
      'Supported research, data analysis, and client-facing reporting',
      'Collaborated across functions on technical documentation',
      'Built early data pipelines for automated reporting',
    ],
    stack: ['Python', 'Data Science', 'Analytics'],
  },
  {
    role: 'Head of Incoming Social Sector',
    company: 'AIESEC Jaipur',
    period: '2025 \u2014 2026',
    bullets: [
      'Led a team supporting incoming social-impact volunteers',
      'Owned logistics, onboarding, and partner communication',
      'Managed end-to-end volunteer placement and integration',
    ],
    stack: ['Leadership', 'Team Management'],
  },
  {
    role: 'LCVP iGV',
    company: 'AIESEC Jaipur',
    period: '2024 \u2014 2025',
    bullets: [
      'Managed incoming global volunteer exchange operations',
      'Ran event planning and cross-team coordination',
      'Facilitated cultural integration and onboarding programs',
    ],
    stack: ['Event Management', 'Coordination'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 container-grid">
      <SectionHeader
        index="// 04"
        kicker="Career Path"
        title="Experience"
        description="Real-world reps through internships and leadership roles — where the work had stakeholders, not just a grading rubric."
      />

      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.08] hidden md:block" />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role + exp.company} delay={i * 0.07} className="md:pl-10 relative">
              <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-ink border-2 border-signal hidden md:block" />

              <div className="panel-hover p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-paper tracking-tight">{exp.role}</h3>
                    <p className="text-signal text-sm mt-0.5">{exp.company}</p>
                  </div>
                  <span className="font-mono text-xs text-muted border border-white/10 px-3 py-1">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-1.5 mb-5">
                  {exp.bullets.map((b) => (
                    <li key={b} className="text-muted text-sm flex gap-2.5 leading-relaxed">
                      <span className="text-signal/60 mt-[3px] flex-shrink-0">—</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
