'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  pulse: number
  pulseSpeed: number
}

export default function NodeField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let raf = 0
    let mouse = { x: -9999, y: -9999 }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      width = rect?.width ?? window.innerWidth
      height = rect?.height ?? window.innerHeight
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      const count = Math.min(70, Math.max(28, Math.floor((width * height) / 18000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
      }))
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const linkDist = 130
    const mouseDist = 160

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (!prefersReduced) {
          a.x += a.vx
          a.y += a.vy
          a.pulse += a.pulseSpeed
          if (a.x < 0 || a.x > width) a.vx *= -1
          if (a.y < 0 || a.y > height) a.vy *= -1
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDist) {
            const o = (1 - dist / linkDist) * 0.16
            ctx.strokeStyle = `rgba(76,141,255,${o})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        const mdx = a.x - mouse.x
        const mdy = a.y - mouse.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < mouseDist) {
          const o = (1 - mdist / mouseDist) * 0.5
          ctx.strokeStyle = `rgba(255,180,84,${o})`
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }

        const glow = 0.55 + Math.sin(a.pulse) * 0.35
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(236,238,242,${0.25 + glow * 0.25})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
