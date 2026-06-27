'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import NodeField from './NodeField'
import MagneticButton from './MagneticButton'
import ResumeModal from './ResumeModal'

const roles = ['AI Engineer', 'Machine Learning Engineer', 'Data Scientist', 'Software Developer', 'Problem Solver']
const bootLine = '> initializing portfolio.exe — jasmanjot_singh_sarna.run()'

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(bootLine.slice(0, i))
      if (i >= bootLine.length) clearInterval(id)
    }, 20)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((r) => (r + 1) % roles.length), 2200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setGlow({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100vh] flex flex-col overflow-hidden border-b border-white/[0.06]"
    >
      <div className="absolute inset-0">
        <NodeField className="w-full h-full opacity-60" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none transition-[background] duration-300"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(76,141,255,0.14), transparent 55%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,180,84,0.06), transparent 60%)',
        }}
      />

      <div className="relative z-10 flex-1 flex items-center container-grid pt-28 pb-16">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center w-full">
          <div>
            <div className="font-mono text-xs sm:text-sm text-signal mb-7 h-5">
              {typed}
              <span className="animate-blink">_</span>
            </div>

            <h1 className="font-display font-semibold tracking-tight leading-[0.98] text-[clamp(2.4rem,6.4vw,5.4rem)]">
              <span className="text-paper">Building production-ready</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #4C8DFF, #8FB8FF, #FFB454)',
                }}
              >
                AI systems
              </span>
              <span className="text-paper">, not demos.</span>
            </h1>

            <div className="mt-6 flex items-center gap-3 font-mono text-base sm:text-lg">
              <span className="text-muted">role:</span>
              <span className="relative inline-flex h-7 overflow-hidden min-w-[18ch]">
                {roles.map((role, i) => (
                  <motion.span
                    key={role}
                    className="absolute left-0 text-amber whitespace-nowrap"
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
              I design and ship intelligent systems — computer vision pipelines, ML models,
              and LLM-driven products — end to end, from research notebook to a working
              endpoint someone else can rely on.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <MagneticButton href="#work" className="btn-signal">
                View Projects <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton href="/resume.pdf" target="_blank" className="btn-ghost">
                Download Resume <ArrowUpRight size={15} />
              </MagneticButton>
              <ResumeModal />
              <MagneticButton href="#contact" className="btn-ghost">
                Contact Me <ArrowUpRight size={15} />
              </MagneticButton>
            </div>

            <div className="flex items-center gap-5 mt-7">
              <a
                href="https://github.com/JasmanjotSarna"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="text-muted hover:text-signal transition-colors"
              >
                <Github size={19} />
              </a>
              <a
                href="https://www.linkedin.com/in/jasmanjot-singh-sarna-0a2539286/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="text-muted hover:text-signal transition-colors"
              >
                <Linkedin size={19} />
              </a>
            </div>

            <div className="flex gap-10 mt-12">
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

          <motion.div
            className="relative mx-auto lg:mx-0 lg:justify-self-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <motion.div
                className="absolute -inset-3 rounded-[2.2rem]"
                style={{
                  background: 'linear-gradient(135deg, rgba(76,141,255,0.55), rgba(255,180,84,0.35))',
                  filter: 'blur(18px)',
                }}
                animate={{ opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="relative w-full h-full rounded-[2rem] overflow-hidden panel"
                style={{ border: '1px solid rgba(76,141,255,0.3)' }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/profile.png"
                  alt="Jasmanjot Singh Sarna"
                  fill
                  priority
                  sizes="(max-width: 640px) 256px, 320px"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 60%, rgba(9,11,15,0.55))',
                  }}
                />
              </motion.div>

              <motion.div
                className="absolute -top-4 -right-4 panel px-3 py-1.5 text-xs font-mono text-signal"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                AI
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 panel px-3 py-1.5 text-xs font-mono text-amber"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
              >
                ML
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-9 panel px-3 py-1.5 text-xs font-mono text-paper/80"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.9 }}
              >
                CV
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/[0.06] py-4 overflow-hidden">
        <div className="flex gap-10 animate-marquee w-max">
          {[...Array(2)].flatMap(() =>
            [
              'Python',
              'TensorFlow',
              'PyTorch',
              'OpenCV',
              'Pandas',
              'SQL',
              'Power BI',
              'LangChain',
              'Scikit-learn',
              'Next.js',
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
