export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] py-8 container-grid">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a href="#home" className="font-display text-lg font-bold tracking-tight text-paper hover:text-signal transition-colors">
          JSS
        </a>

        <span className="font-mono text-xs text-muted">
          &copy; {year} Jasmanjot Singh Sarna
        </span>

        <div className="flex gap-6">
          <a href="#work" className="hover:text-signal transition-colors text-xs text-muted tracking-wide">Work</a>
          <a href="#contact" className="hover:text-signal transition-colors text-xs text-muted tracking-wide">Contact</a>
          <a href="/resume.pdf" target="_blank" className="hover:text-signal transition-colors text-xs text-muted tracking-wide">Resume</a>
        </div>
      </div>
    </footer>
  )
}
