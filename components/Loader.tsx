'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import silhouetteData from '@/lib/silhouette-data.json'

// TIMING CONSTANTS (Milliseconds)
const T_DATA_END = 1000      // Phase 1: Data scatter ends
const T_MODEL_END = 2200     // Phase 2: Silhouette & face detection ends
const T_TOTAL = 3000         // Phase 3: Product reveal & curtain split finishes
const T_REPEAT_TOTAL = 600   // Repeat visit duration

export default function Loader({ onComplete }: { onComplete?: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<'data' | 'model' | 'product' | 'curtain' | 'done'>('data')
  const [isRepeat, setIsRepeat] = useState(false)
  const [isSkipped, setIsSkipped] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  // Handle dismissal
  const handleDismiss = useCallback(() => {
    setIsSkipped(true)
    setPhase('done')
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('js_loader_seen', 'true')
    }
    if (onComplete) onComplete()
  }, [onComplete])

  useEffect(() => {
    // 1. Check if ?noloader flag is in URL
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('noloader')) {
      handleDismiss()
      return
    }

    // 2. Check prefers-reduced-motion or Save-Data
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator as unknown as { connection?: { saveData?: boolean } })?.connection?.saveData === true
    if (reducedMotion || saveData) {
      handleDismiss()
      return
    }

    // 3. Check repeat visit
    const alreadySeen = sessionStorage.getItem('js_loader_seen')
    if (alreadySeen) {
      setIsRepeat(true)
    }

    setMounted(true)

    // Keyboard listener for skip
    const handleKeyDown = (e: KeyboardEvent) => {
      handleDismiss()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [handleDismiss])

  // Canvas Particle Animation
  useEffect(() => {
    if (!mounted || isSkipped) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isMobile = width < 768
    const pointsData = isMobile ? silhouetteData.mobilePoints : silhouetteData.points
    const totalPoints = pointsData.length

    // Target portrait dimensions and center position on screen
    const targetSize = Math.min(width * 0.75, height * 0.65, 480)
    const targetLeft = (width - targetSize) / 2
    const targetTop = (height - targetSize) / 2 + 10

    // Initialize point objects
    const particles = pointsData.map(([nx, ny]) => {
      return {
        // Random initial scatter (Phase 1)
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        // Target silhouette coordinate (Phase 2)
        targetX: targetLeft + nx * targetSize,
        targetY: targetTop + ny * targetSize,
        size: Math.random() > 0.8 ? 2.2 : 1.4,
        alpha: 0.2 + Math.random() * 0.4,
      }
    })

    // Face detection box coordinates
    const faceBox = {
      x: targetLeft + silhouetteData.faceBox.x * targetSize,
      y: targetTop + silhouetteData.faceBox.y * targetSize,
      w: silhouetteData.faceBox.width * targetSize,
      h: silhouetteData.faceBox.height * targetSize,
    }

    // Landmarks
    const landmarks = silhouetteData.landmarks.map((lm) => ({
      x: targetLeft + lm.x * targetSize,
      y: targetTop + lm.y * targetSize,
      label: lm.label,
    }))

    // Background floating numerals (Unsorted data)
    const floatingData = [
      { text: 'x_0 = [0.824, 0.129]', x: width * 0.15, y: height * 0.25, v: 0.3 },
      { text: 'tensor([1254, 1254, 4])', x: width * 0.78, y: height * 0.32, v: -0.2 },
      { text: 'alpha_channel: 0xFF', x: width * 0.12, y: height * 0.72, v: 0.25 },
      { text: 'loss: 0.0031', x: width * 0.82, y: height * 0.68, v: -0.35 },
    ]

    const startTime = performance.now()
    startTimeRef.current = startTime

    const render = (now: number) => {
      const elapsed = now - startTime
      ctx.clearRect(0, 0, width, height)

      // 1. DATA PHASE (0 - 1000ms)
      if (elapsed < T_DATA_END) {
        setPhase('data')
        const p = elapsed / T_DATA_END

        // Draw faint data strings
        ctx.font = '11px monospace'
        ctx.fillStyle = `rgba(158, 154, 146, ${0.4 * (1 - p * 0.5)})`
        floatingData.forEach((d) => {
          ctx.fillText(d.text, d.x, d.y + p * 15 * d.v)
        })

        // Draw drifting particles
        particles.forEach((pt) => {
          pt.x += pt.vx
          pt.y += pt.vy
          // Boundary bounce
          if (pt.x < 0 || pt.x > width) pt.vx *= -1
          if (pt.y < 0 || pt.y > height) pt.vy *= -1

          ctx.fillStyle = `rgba(158, 154, 146, ${pt.alpha})`
          ctx.fillRect(pt.x, pt.y, pt.size, pt.size)
        })
      }
      // 2. MODEL PHASE (1000 - 2200ms)
      else if (elapsed < T_MODEL_END) {
        setPhase('model')
        const modelElapsed = elapsed - T_DATA_END
        const modelProgress = Math.min(1, modelElapsed / 1000)

        // Ease interpolation using cubic-bezier(0.22, 1, 0.36, 1) approximation
        const ease =
          modelProgress < 0.5
            ? 4 * modelProgress * modelProgress * modelProgress
            : 1 - Math.pow(-2 * modelProgress + 2, 3) / 2

        // Interpolate particles toward silhouette target
        particles.forEach((pt) => {
          const curX = pt.x + (pt.targetX - pt.x) * ease
          const curY = pt.y + (pt.targetY - pt.y) * ease

          ctx.fillStyle = `rgba(192, 74, 38, ${0.4 + ease * 0.55})`
          ctx.fillRect(curX, curY, pt.size * (1 + ease * 0.3), pt.size * (1 + ease * 0.3))
        })

        // When silhouette converges (modelElapsed > 500ms), draw face detection bounding box
        if (modelElapsed > 500) {
          const boxAlpha = Math.min(1, (modelElapsed - 500) / 400)
          ctx.strokeStyle = `rgba(192, 74, 38, ${boxAlpha * 0.85})`
          ctx.lineWidth = 1.2

          // Detection Box with Corner Ticks
          const tick = 14
          ctx.beginPath()
          // Top Left
          ctx.moveTo(faceBox.x, faceBox.y + tick)
          ctx.lineTo(faceBox.x, faceBox.y)
          ctx.lineTo(faceBox.x + tick, faceBox.y)
          // Top Right
          ctx.moveTo(faceBox.x + faceBox.w - tick, faceBox.y)
          ctx.lineTo(faceBox.x + faceBox.w, faceBox.y)
          ctx.lineTo(faceBox.x + faceBox.w, faceBox.y + tick)
          // Bottom Left
          ctx.moveTo(faceBox.x, faceBox.y + faceBox.h - tick)
          ctx.lineTo(faceBox.x, faceBox.y + faceBox.h)
          ctx.lineTo(faceBox.x + tick, faceBox.y + faceBox.h)
          // Bottom Right
          ctx.moveTo(faceBox.x + faceBox.w - tick, faceBox.y + faceBox.h)
          ctx.lineTo(faceBox.x + faceBox.w, faceBox.y + faceBox.h)
          ctx.lineTo(faceBox.x + faceBox.w, faceBox.y + faceBox.h - tick)
          ctx.stroke()

          // Detection Label
          ctx.font = '10px monospace'
          ctx.fillStyle = `rgba(24, 23, 22, ${boxAlpha})`
          ctx.fillRect(faceBox.x, faceBox.y - 18, 140, 16)
          ctx.fillStyle = `rgba(251, 249, 245, ${boxAlpha})`
          ctx.fillText('Jasmanjot Singh Sarna', faceBox.x + 5, faceBox.y - 6)

          // Facial Landmark Ticks
          if (!isMobile && modelElapsed > 800) {
            const lmAlpha = Math.min(1, (modelElapsed - 800) / 300)
            ctx.fillStyle = `rgba(192, 74, 38, ${lmAlpha * 0.9})`
            landmarks.forEach((lm) => {
              ctx.beginPath()
              ctx.arc(lm.x, lm.y, 2, 0, Math.PI * 2)
              ctx.fill()
            })
          }
        }
      }
      // 3. PRODUCT PHASE (2200 - 3000ms)
      else if (elapsed < T_TOTAL) {
        setPhase('product')
        const prodElapsed = elapsed - T_MODEL_END
        const curtainProgress = prodElapsed / (T_TOTAL - T_MODEL_END)

        // Draw settled outline
        particles.forEach((pt) => {
          ctx.fillStyle = `rgba(192, 74, 38, ${0.8 * (1 - curtainProgress)})`
          ctx.fillRect(pt.targetX, pt.targetY, pt.size, pt.size)
        })

        if (curtainProgress > 0.85) {
          setPhase('curtain')
        }
      } else {
        handleDismiss()
        return
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [mounted, isSkipped, handleDismiss])

  if (!mounted || isSkipped || phase === 'done') return null

  // Fast 0.5s repeat visit mode
  if (isRepeat) {
    return (
      <div
        className="fixed inset-0 z-[99999] pointer-events-none flex flex-col"
        onAnimationEnd={handleDismiss}
      >
        <div className="w-full h-1/2 bg-[#141413] animate-curtain-top" />
        <div className="w-full h-1/2 bg-[#141413] animate-curtain-bottom" />
        <style jsx>{`
          @keyframes curtainTop {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100%); }
          }
          @keyframes curtainBottom {
            0% { transform: translateY(0); }
            100% { transform: translateY(100%); }
          }
          .animate-curtain-top {
            animation: curtainTop 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          .animate-curtain-bottom {
            animation: curtainBottom 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[99999] select-none flex flex-col justify-between overflow-hidden"
      onClick={handleDismiss}
      role="dialog"
      aria-label="Loading portfolio"
    >
      {/* Canvas for Point Cloud & Detection Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full bg-[#141413]"
      />

      {/* Top Header Information */}
      <div className="relative z-20 flex items-center justify-between p-6 font-mono text-xs text-[#9E9A92]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[#ECEAE4] font-semibold">JSS</span>
          <span>{"//"}</span>
          <span className="uppercase text-[11px]">
            {phase === 'data' && '01. Raw Data Space'}
            {phase === 'model' && '02. Feature Localization & Landmark Extraction'}
            {phase === 'product' && '03. Resolved Model Output'}
            {phase === 'curtain' && '04. Final Handoff'}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDismiss()
          }}
          className="min-h-[44px] min-w-[44px] px-3 py-2 rounded border border-white/20 bg-white/5 text-[#ECEAE4] hover:bg-white/15 text-[12px] font-mono transition-colors flex items-center justify-center"
          title="Skip intro animation"
          aria-label="Skip intro animation"
        >
          Skip [Esc]
        </button>
      </div>

      {/* Bottom Stage Narrative */}
      <div className="relative z-20 flex items-end justify-between p-6 font-mono text-[11px] text-[#9E9A92] border-t border-white/10">
        <div>
          <span className="text-accent font-semibold">Sequence:</span> Data &rarr; Model &rarr; Product
        </div>
        <div className="hidden sm:block">
          Face Emotion Recognition Architecture [MediaPipe &amp; CNNs]
        </div>
      </div>

      {/* Split Curtain Exit Transition */}
      {phase === 'curtain' && (
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col">
          <div className="w-full h-1/2 bg-[#141413] animate-curtain-top" />
          <div className="w-full h-1/2 bg-[#141413] animate-curtain-bottom" />
        </div>
      )}

      <style jsx>{`
        @keyframes curtainTop {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        @keyframes curtainBottom {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        .animate-curtain-top {
          animation: curtainTop 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-curtain-bottom {
          animation: curtainBottom 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  )
}
