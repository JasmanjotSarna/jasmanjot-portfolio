'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const stages = [
  'Initializing Portfolio.exe',
  'Loading AI Models...',
  'Loading Projects...',
  'Connecting Neural Network...',
  'Training Model...',
  'Deploying Portfolio...',
  'Ready.',
]

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [stageIndex, setStageIndex] = useState(0)
  const loadedRef = useRef(false)

  useEffect(() => {
    // Real progress: tracks actual document/asset readiness, not a fake timer.
    const updateFromReadiness = () => {
      if (document.readyState === 'complete') {
        loadedRef.current = true
      }
    }
    document.addEventListener('readystatechange', updateFromReadiness)
    window.addEventListener('load', updateFromReadiness)
    updateFromReadiness()

    let raf: number
    const start = performance.now()
    const minDuration = 1600 // floor so the animation reads intentionally, not a flash
    const tick = () => {
      const elapsed = performance.now() - start
      const timeBased = Math.min(92, (elapsed / minDuration) * 92)
      const target = loadedRef.current ? 100 : timeBased
      setProgress((p) => {
        const next = p + (target - p) * 0.18
        return next > 99.4 ? 100 : next
      })
      if (progress < 100) {
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('readystatechange', updateFromReadiness)
      window.removeEventListener('load', updateFromReadiness)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const stageFor = (p: number) => Math.min(stages.length - 1, Math.floor((p / 100) * stages.length))
    setStageIndex(stageFor(progress))
    if (progress >= 100) {
      const t = setTimeout(() => setVisible(false), 450)
      return () => clearTimeout(t)
    }
  }, [progress])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          {/* ambient particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-signal/40 animate-drift"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${10 + Math.random() * 8}s`,
                }}
              />
            ))}
            <div
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(76,141,255,0.12), transparent 70%)' }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            {/* circular loader */}
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#4C8DFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44}
                  strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-paper">
                {Math.round(progress)}%
              </div>
            </div>

            {/* terminal text */}
            <div className="font-mono text-xs sm:text-sm text-signal h-5 min-w-[260px] text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={stageIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  {stages[stageIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* progress bar */}
            <div className="w-64 h-[2px] bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-signal"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
