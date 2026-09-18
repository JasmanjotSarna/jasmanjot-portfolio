'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const SECTIONS = [
  { id: 'projects', label: '01. Projects' },
  { id: 'proof-piece', label: '02. Pipeline' },
  { id: 'experience', label: '03. Experience' },
  { id: 'skills', label: '04. Stack' },
  { id: 'contact', label: '05. Contact' },
]

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  })

  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hairline Scroll Progress Bar at the top of the viewport */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Fixed Section Index in the Margin (Desktop Only) */}
      <nav
        aria-label="Section Index"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-3.5 p-3 rounded bg-paper/80 backdrop-blur-md border border-border/80 text-[11px] font-mono shadow-xs select-none"
      >
        <span className="text-[9px] uppercase tracking-widest text-muted border-b border-border pb-1">
          Index
        </span>
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={`flex items-center gap-2 transition-colors duration-200 no-underline ${
                isActive ? 'text-accent font-semibold' : 'text-muted hover:text-ink'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-accent scale-125' : 'bg-border'
                }`}
              />
              <span>{sec.label}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}
