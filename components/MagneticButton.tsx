'use client'

import { useRef, useState, ReactNode, MouseEvent } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({
  children,
  href,
  target,
  className = '',
  onClick,
}: {
  children: ReactNode
  href?: string
  target?: string
  className?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    setPos({ x, y })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={target ? 'noreferrer' : undefined}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}
