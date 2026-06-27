'use client'

import { useRef, useState, ReactNode, MouseEvent } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    const rotateX = (-py * 6).toFixed(2)
    const rotateY = (px * 6).toFixed(2)
    setTransform(`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
  }

  const reset = () => setTransform('perspective(900px) rotateX(0deg) rotateY(0deg)')

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform, transition: 'transform 0.25s ease' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
