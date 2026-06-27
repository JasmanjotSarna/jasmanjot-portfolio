import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const groups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 80 },
      { name: 'Java', level: 65 },
      { name: 'C++', level: 60 },
    ],
  },
  {
    category: 'AI & Data',
    skills: [
      { name: 'Machine Learning', level: 85 },
      { name: 'Computer Vision', level: 85 },
      { name: 'Deep Learning', level: 75 },
      { name: 'Pandas / NumPy', level: 88 },
    ],
  },
  {
    category: 'Frameworks & Tools',
    skills: [
      { name: 'TensorFlow', level: 75 },
      { name: 'OpenCV', level: 85 },
      { name: 'Power BI', level: 78 },
      { name: 'Git / GitHub', level: 85 },
    ],
  },
  {
    category: 'Currently Building With',
    accent: true,
    skills: [
      { name: 'LLM Application Design', level: 70 },
      { name: 'Prompt Engineering', level: 75 },
      { name: 'LangChain', level: 60 },
      { name: 'Vector Search', level: 55 },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 container-grid">
      <SectionHeader
        index="// 03"
        kicker="Tech Stack"
        title="What I work with"
        description="A working stack across AI research, data engineering, and software delivery — from raw data to production endpoint."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {groups.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 0.07} className="panel p-6">
            <h3
              className={`font-mono text-[11px] tracking-[0.16em] uppercase mb-5 ${
                group.accent ? 'text-amber' : 'text-muted'
              }`}
            >
              {group.category}
            </h3>
            <div className="space-y-4">
              {group.skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-paper/85">{s.name}</span>
                    <span className="font-mono text-muted">{s.level}</span>
                  </div>
                  <div className="h-[3px] bg-white/[0.06] w-full">
                    <div
                      className="h-full"
                      style={{
                        width: `${s.level}%`,
                        background: group.accent ? 'var(--amber)' : 'var(--signal)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
