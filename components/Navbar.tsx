'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Sun, Moon, Command } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const navLinks = [
  { href: '#about', label: 'About', i: '01' },
  { href: '#work', label: 'Work', i: '02' },
  { href: '#skills', label: 'Skills', i: '03' },
  { href: '#experience', label: 'Experience', i: '04' },
  { href: '#credentials', label: 'Credentials', i: '05' },
  { href: '#github', label: 'GitHub', i: '06' },
  { href: '#contact', label: 'Contact', i: '07' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('#home')
  const lastY = useRef(0)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (y > lastY.current && y > 120) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['#home', ...navLinks.map((l) => l.href)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((s) => {
      const el = document.querySelector(s)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-white/[0.06]' : ''}`}
      >
        <div className="container-grid h-16 flex items-center justify-between">
          <a href="#home" className="flex items-baseline gap-1.5 group">
            <span className="font-display text-xl font-bold tracking-tight text-paper">JSS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-signal group-hover:bg-amber transition-colors" />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  active === link.href ? 'text-signal' : 'text-muted hover:text-paper'
                }`}
              >
                <span className="font-mono text-[10px] text-signal/70">{link.i}</span>
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
              className="hidden lg:flex items-center gap-1.5 text-muted hover:text-signal transition-colors font-mono text-xs border border-white/10 px-2.5 py-1.5"
              aria-label="Open command palette"
            >
              <Command size={12} /> K
            </button>
            <button
              onClick={toggle}
              className="text-muted hover:text-signal transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
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
