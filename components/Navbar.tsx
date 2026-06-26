'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About', i: '01' },
  { href: '#work', label: 'Work', i: '02' },
  { href: '#skills', label: 'Skills', i: '03' },
  { href: '#experience', label: 'Experience', i: '04' },
  { href: '#credentials', label: 'Credentials', i: '05' },
  { href: '#contact', label: 'Contact', i: '06' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-white/[0.06]' : ''
        }`}
      >
        <div className="container-grid h-16 flex items-center justify-between">
          <a href="#home" className="flex items-baseline gap-1.5 group">
            <span className="font-display text-xl font-bold tracking-tight text-paper">JSS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-signal group-hover:bg-amber transition-colors" />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-sm text-muted hover:text-paper transition-colors"
              >
                <span className="font-mono text-[10px] text-signal/70">{link.i}</span>
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="/resume.pdf" target="_blank" className="hidden lg:inline-flex btn-ghost py-2 text-xs">
              Resume
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-paper"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[100] bg-ink flex flex-col items-start justify-center gap-6 px-8 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-5 right-6 text-paper"
          aria-label="Close menu"
        >
          <X size={26} />
        </button>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="font-display text-4xl font-semibold text-paper hover:text-signal transition-colors flex items-center gap-4"
          >
            <span className="font-mono text-sm text-signal">{link.i}</span>
            {link.label}
          </a>
        ))}
        <a href="/resume.pdf" target="_blank" className="btn-signal mt-4">
          Download Resume
        </a>
      </div>
    </>
  )
}
