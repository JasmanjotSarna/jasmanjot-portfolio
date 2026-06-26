import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const achievements = [
  { title: 'IBM Data Analyst', org: 'Professional Certificate', year: '2026' },
  { title: 'Google Business Intelligence', org: 'Professional Certificate', year: '2026' },
  { title: 'Google Project Management', org: 'Professional Certificate', year: '2026' },
  { title: 'Google Digital Marketing', org: 'Professional Certificate', year: '2026' },
  { title: 'Head of Incoming Social Sector', org: 'AIESEC Jaipur — Leadership', year: '2025\u201326' },
  { title: '4+ AI / CV Projects', org: 'Production-oriented applications', year: 'Ongoing' },
]

export default function Achievements() {
  return (
    <section id="credentials" className="py-24 md:py-32 container-grid">
      <SectionHeader
        index="// 05"
        kicker="Credentials"
        title="Certifications & milestones"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05} className="bg-ink p-6">
            <span className="font-mono text-[11px] text-amber tracking-widest">{a.year}</span>
            <h3 className="font-display text-base font-semibold text-paper mt-3 leading-snug">{a.title}</h3>
            <p className="text-muted text-sm mt-1.5">{a.org}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
