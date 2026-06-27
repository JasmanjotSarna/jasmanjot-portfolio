'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileDown, X, Eye } from 'lucide-react'

export default function ResumeModal({ trigger }: { trigger?: 'button' | 'link' }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={trigger === 'link' ? 'text-sm text-muted hover:text-signal transition-colors' : 'btn-ghost'}
      >
        {trigger === 'link' ? (
          'Preview Resume'
        ) : (
          <>
            Preview <Eye size={15} />
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-strong flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl h-[80vh] panel bg-ink-raised flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                <span className="font-mono text-xs text-muted">resume.pdf</span>
                <div className="flex items-center gap-3">
                  <a href="/resume.pdf" download className="text-muted hover:text-signal transition-colors" aria-label="Download resume">
                    <FileDown size={17} />
                  </a>
                  <button onClick={() => setOpen(false)} className="text-muted hover:text-signal transition-colors" aria-label="Close preview">
                    <X size={18} />
                  </button>
                </div>
              </div>
              <iframe src="/resume.pdf" title="Resume preview" className="flex-1 w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
