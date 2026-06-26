import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const pillars = [
  {
    tag: 'GOAL',
    title: 'Ship systems, not demos',
    body: 'I care less about a model that scores well in a notebook and more about one that holds up behind an API, on real data, on a bad day.',
  },
  {
    tag: 'FOCUS',
    title: 'Vision, ML & applied data',
    body: 'Machine learning, computer vision, and data analysis — from exploratory research to a deployed, measurable result.',
  },
  {
    tag: 'CURRENT',
    title: 'LLMs & generative systems',
    body: 'Going deep on LLM application design, retrieval, and prompt engineering — building products on top of foundation models, responsibly.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 container-grid">
      <SectionHeader
        index="// 01"
        kicker="About"
        title="Engineer first. Researcher by necessity."
        description="I'm a B.Tech CSE (AI & ML) student based in Jaipur, India — building practical AI systems, data pipelines, and intelligent products, and pressure-testing what I learn through internships, leadership, and side projects."
      />

      <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className="bg-ink p-7 md:p-9">
            <span className="font-mono text-[11px] tracking-[0.18em] text-signal">{p.tag}</span>
            <h3 className="font-display text-xl font-semibold text-paper mt-4 mb-3">{p.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{p.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="flex flex-wrap gap-6 mt-10">
        <a
          href="https://www.linkedin.com/in/jasmanjot-singh-sarna-0a2539286/"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-paper hover:text-signal transition-colors font-mono"
        >
          linkedin/jasmanjot-singh-sarna ↗
        </a>
        <a
          href="https://github.com/JasmanjotSarna"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted hover:text-signal transition-colors font-mono"
        >
          github/JasmanjotSarna ↗
        </a>
      </Reveal>
    </section>
  )
}
