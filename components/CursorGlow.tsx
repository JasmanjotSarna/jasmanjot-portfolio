'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReduced) return

    const el = ref.current
    if (!el) return

    let x = 0
    let y = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const render = () => {
      if (el) el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`
      raf = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[5] hidden md:block"
      style={{
        background: 'radial-gradient(circle, rgba(76,141,255,0.08), transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}
