'use client'

import { useEffect, useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ArrowRight, Github, Linkedin, FileDown } from 'lucide-react'

type Command = {
  label: string
  hint: string
  action: () => void
  icon: typeof ArrowRight
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const commands: Command[] = useMemo(
    () => [
      { label: 'Go to About', hint: '// 01', icon: ArrowRight, action: () => scrollTo('#about') },
      { label: 'Go to Work', hint: '// 02', icon: ArrowRight, action: () => scrollTo('#work') },
      { label: 'Go to Skills', hint: '// 03', icon: ArrowRight, action: () => scrollTo('#skills') },
      { label: 'Go to Experience', hint: '// 04', icon: ArrowRight, action: () => scrollTo('#experience') },
      { label: 'Go to Credentials', hint: '// 05', icon: ArrowRight, action: () => scrollTo('#credentials') },
      { label: 'Go to GitHub stats', hint: '// 06', icon: ArrowRight, action: () => scrollTo('#github') },
      { label: 'Go to Contact', hint: '// 07', icon: ArrowRight, action: () => scrollTo('#contact') },
      {
        label: 'Open GitHub profile',
        hint: 'external',
        icon: Github,
        action: () => window.open('https://github.com/JasmanjotSarna', '_blank'),
      },
      {
        label: 'Open LinkedIn profile',
        hint: 'external',
        icon: Linkedin,
        action: () => window.open('https://www.linkedin.com/in/jasmanjot-singh-sarna-0a2539286/', '_blank'),
      },
      {
        label: 'Download resume',
        hint: 'pdf',
        icon: FileDown,
        action: () => window.open('/resume.pdf', '_blank'),
      },
    ],
    []
  )

  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-strong flex items-start justify-center pt-[18vh] px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg panel bg-ink-raised shadow-2xl"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search size={16} className="text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section or action..."
                className="flex-1 bg-transparent outline-none text-sm text-paper placeholder:text-muted/60"
              />
              <kbd className="font-mono text-[10px] text-muted border border-white/10 px-1.5 py-0.5">esc</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="text-sm text-muted px-4 py-6 text-center">No matches.</p>
              )}
              {filtered.map((c) => (
                <button
                  key={c.label}
                  onClick={() => {
                    c.action()
                    setOpen(false)
                    setQuery('')
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-paper hover:bg-signal-dim hover:text-signal transition-colors text-left"
                >
                  <c.icon size={14} className="text-muted" />
                  <span className="flex-1">{c.label}</span>
                  <span className="font-mono text-[10px] text-muted">{c.hint}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
