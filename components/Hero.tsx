'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, FileDown } from 'lucide-react'
import NodeField from './NodeField'

const roles = ['AI Engineer', 'ML Engineer', 'Data Scientist', 'Data Analyst']
const bootLine = '> initializing profile: jasmanjot_singh_sarna.run()'

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(bootLine.slice(0, i))
      if (i >= bootLine.length) clearInterval(id)
    }, 22)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((r) => (r + 1) % roles.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="relative min-h-[100vh] flex flex-col overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0">
        <NodeField className="w-full h-full opacity-70" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(76,141,255,0.10), transparent 60%)',
        }}
      />

      <div className="relative z-10 flex-1 flex items-center container-grid pt-28 pb-16">
        <div className="w-full max-w-4xl">
          <div className="font-mono text-xs sm:text-sm text-signal mb-7 h-5">
            {typed}
            <span className="animate-blink">_</span>
          </div>

          <h1 className="font-display font-semibold tracking-tight text-paper leading-[0.98] text-[clamp(2.6rem,8vw,6.2rem)]">
            Jasmanjot Singh
            <br />
            Sarna
          </h1>

          <div className="mt-6 flex items-center gap-3 font-mono text-base sm:text-lg">
            <span className="text-muted">build:</span>
            <span className="relative inline-flex h-7 overflow-hidden min-w-[13ch]">
              {roles.map((role, i) => (
                <motion.span
                  key={role}
                  className="absolute left-0 text-amber"
                  initial={false}
                  animate={{
                    y: i === roleIndex ? 0 : i < roleIndex ? -28 : 28,
                    opacity: i === roleIndex ? 1 : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {role}
                </motion.span>
              ))}
            </span>
          </div>

          <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mt-7">
            B.Tech CSE (AI &amp; ML) student in Jaipur who builds applied AI systems —
            computer vision pipelines, ML models, and LLM-driven products — and ships
            them past the notebook, into something people can actually use.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <a href="#work" className="btn-signal">
              View Work <ArrowUpRight size={15} />
            </a>
            <a href="/resume.pdf" target="_blank" className="btn-ghost">
              Resume <FileDown size={15} />
            </a>
          </div>

          <div className="flex gap-10 mt-16">
            {[
              { value: '04', label: 'AI / CV Projects' },
              { value: '02', label: 'Internships' },
              { value: '06', label: 'Certifications' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-mono text-2xl text-paper">{s.value}</div>
                <div className="text-xs text-muted tracking-wide mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/[0.06] py-4 overflow-hidden">
        <div className="flex gap-10 animate-marquee w-max">
          {[...Array(2)].flatMap(() =>
            [
              'Python',
              'TensorFlow',
              'OpenCV',
              'Pandas',
              'SQL',
              'Power BI',
              'LangChain',
              'Scikit-learn',
              'Java',
              'C++',
            ].map((t, idx) => (
              <span
                key={t + idx}
                className="font-mono text-xs tracking-[0.15em] uppercase text-muted/60 whitespace-nowrap"
              >
                {t}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
