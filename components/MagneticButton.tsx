'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number // Default capped pull strength (0.15)
  maxOffset?: number // Max pixels offset (default 6px)
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.15,
  maxOffset = 6,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)

    // Calculate pull and cap at maxOffset
    const pullX = Math.max(-maxOffset, Math.min(maxOffset, middleX * strength))
    const pullY = Math.max(-maxOffset, Math.min(maxOffset, middleY * strength))

    setPosition({ x: pullX, y: pullY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
