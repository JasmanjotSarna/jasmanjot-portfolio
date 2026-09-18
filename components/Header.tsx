'use client'

import { useState } from 'react'
import { PERSONAL_INFO } from '@/lib/content'
import { FileDown, Github, Linkedin, Mail, Sun, Moon, ArrowUpRight } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Header() {
  const { theme, toggle } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-border transition-colors duration-200">
      <div className="container-editorial">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Masthead Identity */}
          <div className="flex flex-col">
            <a href="#top" className="group text-inherit no-underline">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-ink group-hover:text-accent transition-colors">
                {PERSONAL_INFO.name}
              </span>
            </a>
            <span className="font-mono text-[11px] text-muted hidden sm:inline tracking-tight">
              AI/ML Engineer • Full Stack • Jaipur, IN
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-muted">
            <a href="#projects" className="hover:text-ink transition-colors no-underline">
              Projects
            </a>
            <a href="#proof-piece" className="hover:text-ink transition-colors no-underline">
              Agent Pipeline
            </a>
            <a href="#experience" className="hover:text-ink transition-colors no-underline">
              Experience
            </a>
            <a href="#skills" className="hover:text-ink transition-colors no-underline">
              Skills
            </a>
            <a href="#contact" className="hover:text-ink transition-colors no-underline">
              Contact
            </a>
          </nav>

          {/* Quick Action Links */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial text-xs sm:text-sm py-1.5 px-3"
            >
              <FileDown size={14} />
              <span>Resume</span>
            </a>

            <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-border">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 text-muted hover:text-ink hover:bg-surface rounded transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 text-muted hover:text-ink hover:bg-surface rounded transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email Jasmanjot"
                className="p-2 text-muted hover:text-ink hover:bg-surface rounded transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>

            <button
              onClick={(e) => toggle(e)}
              aria-label="Toggle Color Theme"
              data-cursor="Theme"
              className="p-2 text-muted hover:text-ink hover:bg-surface rounded transition-colors"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
